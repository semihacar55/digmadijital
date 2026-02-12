
import { useEffect } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import GlobalBackground from '../ui/GlobalBackground';

import ScrollToHashElement from './ScrollToHashElement';

const Layout = () => {
    // Force dark mode
    useEffect(() => {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
    }, []);

    return (
        <div className="min-h-screen flex flex-col font-sans text-foreground selection:bg-primary/30 selection:text-white">
            <GlobalBackground />
            <ScrollToHashElement />
            <Header />
            <main className="flex-grow pt-24">
                <Outlet />
            </main>
            <Footer />
            <ScrollRestoration />
        </div>
    );
};

export { Layout };
