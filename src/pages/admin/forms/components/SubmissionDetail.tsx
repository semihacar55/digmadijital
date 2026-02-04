
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { FormSubmission } from '../FormSubmissionsList';
import { Button } from '@/components/ui/Button';
import { X, Mail, Phone, Calendar, Copy, Check, Save } from 'lucide-react';
import { Textarea } from '@/components/ui/Textarea';

interface SubmissionDetailProps {
    submission: FormSubmission;
    onClose: () => void;
    onStatusChange: (id: string, status: string) => void;
    onUpdate: (updated: FormSubmission) => void;
}

const SubmissionDetail = ({ submission, onClose, onStatusChange, onUpdate }: SubmissionDetailProps) => {
    const [note, setNote] = useState(submission.notes || '');
    const [savingNote, setSavingNote] = useState(false);
    const [copied, setCopied] = useState('');

    const copyToClipboard = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(''), 2000);
    };

    const saveNote = async () => {
        setSavingNote(true);
        try {
            const { error } = await supabase
                .from('form_submissions')
                .update({ notes: note })
                .eq('id', submission.id);

            if (error) throw error;
            onUpdate({ ...submission, notes: note });
        } catch (error) {
            console.error('Error saving note:', error);
            alert('Not kaydedilemedi.');
        } finally {
            setSavingNote(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-white/5">
                <h3 className="font-semibold text-white">Başvuru Detayı</h3>
                <div className="flex items-center gap-2">
                    <select
                        value={submission.status}
                        onChange={(e) => onStatusChange(submission.id, e.target.value)}
                        className="bg-black/20 border border-white/10 rounded px-2 py-1 text-xs text-white focus:outline-none"
                    >
                        <option value="new">Yeni</option>
                        <option value="contacted">Ulaşıldı</option>
                        <option value="spam">Spam</option>
                        <option value="archived">Arşiv</option>
                    </select>
                    <button onClick={onClose} className="text-text-muted hover:text-white">
                        <X size={18} />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Contact Info */}
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue font-bold text-lg">
                            {submission.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">{submission.name}</h2>
                            <div className="flex items-center gap-2 text-xs text-text-muted">
                                <Calendar size={12} />
                                {new Date(submission.created_at).toLocaleString()}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-3 space-y-2">
                        {submission.email && (
                            <div className="flex items-center justify-between group">
                                <div className="flex items-center gap-2 text-sm text-text-muted">
                                    <Mail size={14} />
                                    <span className="text-white">{submission.email}</span>
                                </div>
                                <button onClick={() => copyToClipboard(submission.email, 'email')} className="opacity-0 group-hover:opacity-100 text-text-muted hover:text-white">
                                    {copied === 'email' ? <Check size={14} /> : <Copy size={14} />}
                                </button>
                            </div>
                        )}
                        {submission.phone && (
                            <div className="flex items-center justify-between group">
                                <div className="flex items-center gap-2 text-sm text-text-muted">
                                    <Phone size={14} />
                                    <span className="text-white">{submission.phone}</span>
                                </div>
                                <button onClick={() => copyToClipboard(submission.phone, 'phone')} className="opacity-0 group-hover:opacity-100 text-text-muted hover:text-white">
                                    {copied === 'phone' ? <Check size={14} /> : <Copy size={14} />}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Mesaj</label>
                    <div className="bg-white/5 rounded-lg p-4 text-sm text-white leading-relaxed whitespace-pre-wrap">
                        {submission.message || "Mesaj yok"}
                    </div>
                </div>

                {/* Internal Notes */}
                <div className="space-y-2 pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Yönetici Notu</label>
                        {note !== submission.notes && (
                            <Button size="sm" variant="accent" onClick={saveNote} disabled={savingNote} className="h-6 text-xs px-2">
                                {savingNote ? '...' : <Save size={12} className="mr-1" />} Kaydet
                            </Button>
                        )}
                    </div>
                    <Textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Bu başvuru ile ilgili notlarınızı buraya ekleyin..."
                        className="min-h-[100px] text-sm"
                    />
                </div>

                {/* Metadata */}
                {submission.metadata && Object.keys(submission.metadata).length > 0 && (
                    <div className="space-y-2 pt-4 border-t border-white/5">
                        <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">Metadata</label>
                        <pre className="bg-black/30 p-3 rounded text-xs text-text-muted overflow-x-auto">
                            {JSON.stringify(submission.metadata, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubmissionDetail;
