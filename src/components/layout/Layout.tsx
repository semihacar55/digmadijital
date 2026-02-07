
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

import ScrollToHashElement from './ScrollToHashElement';

const Layout = () => {
    return (
        <div className="min-h-screen bg-primary flex flex-col font-sans text-text-main selection:bg-accent-blue/30 selection:text-white">
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
