
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const AuthGuard = () => {
    const [session, setSession] = useState<boolean | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(!!session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(!!session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (session === null) {
        return <div className="min-h-screen bg-primary flex items-center justify-center text-white">Yükleniyor...</div>;
    }

    if (!session) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default AuthGuard;
