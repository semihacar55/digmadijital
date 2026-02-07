// @ts-nocheck
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const CONTACT_TO_EMAIL = Deno.env.get("CONTACT_TO_EMAIL");

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FormRequest {
    form_type: string;
    name: string;
    email: string;
    phone?: string;
    message?: string;
    website?: string;
    budget?: string;
    metadata?: any;
}

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    const result = {
        db_saved: false,
        email_status: "skipped", // pending, sent, failed, skipped
        error: null as string | null,
    };

    try {
        const supabase = createClient(
            SUPABASE_URL!,
            SUPABASE_SERVICE_ROLE_KEY!
        );

        const body: FormRequest = await req.json();

        // Normalize website URL if present
        let normalizedWebsite = body.website;
        if (normalizedWebsite && !normalizedWebsite.startsWith('http://') && !normalizedWebsite.startsWith('https://')) {
            normalizedWebsite = `https://${normalizedWebsite}`;
        }
        // Update body with normalized website for consistency
        body.website = normalizedWebsite;

        // 1. Insert into DB (pending status)
        const { data: insertedData, error: dbError } = await supabase
            .from('form_submissions')
            .insert([{
                form_type: body.form_type,
                name: body.name,
                email: body.email,
                phone: body.phone,
                message: body.message,
                metadata: {
                    website: body.website,
                    budget: body.budget,
                    ...body.metadata
                },
                status: 'new',
                email_status: 'pending',
                created_at: new Date().toISOString()
            }])
            .select('id')
            .single();

        if (dbError) {
            console.error("DB Insert Error:", dbError);
            throw new Error("Database insertion failed: " + dbError.message);
        }

        result.db_saved = true;
        const submissionId = insertedData.id;

        // 2. Determine Notification Email
        let notificationEmail = CONTACT_TO_EMAIL;

        // Check custom settings
        const { data: settingsData } = await supabase
            .from('site_settings')
            .select('data')
            .single();

        if (settingsData?.data?.forms?.notificationEmail) {
            notificationEmail = settingsData.data.forms.notificationEmail;
        }

        console.log("Target Email:", notificationEmail ? "Masked" : "None");

        // 3. Send Email Check
        if (!notificationEmail) {
            console.log("No notification email set. Skipping.");
            result.email_status = "skipped_no_email";
        } else if (!RESEND_API_KEY) {
            console.error("RESEND_API_KEY missing.");
            result.email_status = "skipped_no_key";
        } else {
            // Send Email
            try {
                const submissionDate = new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" });
                const subject = `[Digma] Yeni Form Başvurusu - ${body.form_type === 'analysis' ? 'Ücretsiz Analiz' : 'İletişim'}`;

                const htmlContent = `
               <h2>Yeni Form Başvurusu</h2>
               <p><strong>Form:</strong> ${body.form_type}</p>
               <p><strong>Tarih:</strong> ${submissionDate}</p>
               <hr/>
               <h3>Detaylar</h3>
               <ul>
                 <li><strong>Ad Soyad:</strong> ${body.name}</li>
                 <li><strong>E-posta:</strong> ${body.email}</li>
                 <li><strong>Telefon:</strong> ${body.phone || "-"}</li>
                 ${body.website ? `<li><strong>Web Sitesi:</strong> ${body.website}</li>` : ""}
                 ${body.budget ? `<li><strong>Bütçe:</strong> ${body.budget}</li>` : ""}
               </ul>
               <h3>Mesaj</h3>
               <p style="background-color: #f5f5f5; padding: 15px;">${body.message || "-"}</p>
             `;

                const res = await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${RESEND_API_KEY}`,
                    },
                    body: JSON.stringify({
                        from: "Digma Bildirim <onboarding@resend.dev>",
                        to: [notificationEmail],
                        subject: subject,
                        html: htmlContent,
                    }),
                });

                const emailData = await res.json();

                if (!res.ok) {
                    throw new Error("Resend Error: " + JSON.stringify(emailData));
                }

                console.log("Email Sent ID:", emailData.id);
                result.email_status = "sent";

            } catch (emailErr) {
                console.error("Email send failed:", emailErr);
                result.email_status = "failed";
                result.error = emailErr instanceof Error ? emailErr.message : "Unknown email error";
            }
        }

        // 4. Update DB with Email Status
        await supabase
            .from('form_submissions')
            .update({
                email_status: result.email_status,
                email_error: result.error
            })
            .eq('id', submissionId);

        return new Response(
            JSON.stringify({
                success: true,
                message: "Form processed",
                detail: result
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            }
        );

    } catch (error) {
        console.error("Critical Error:", error);
        return new Response(
            JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : "Internal Server Error"
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 500,
            }
        );
    }
});
