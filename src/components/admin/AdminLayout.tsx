
import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    Users,
    MessageSquare,
    Settings,
    LogOut,
    Menu,
    X,
    Search,
    Bell,
    Image as ImageIcon,
    CheckCircle,
    ChevronDown,
    Layout,
    Mail,
    Share2,
    Shield
} from 'lucide-react';

interface MenuItem {
    icon: any;
    label: string;
    path: string;
}

interface MenuGroup {
    title: string;
    icon: any;
    defaultOpen: boolean;
    items: MenuItem[];
}

interface SidebarStructure {
    standaloneTop: MenuItem[];
    groups: MenuGroup[];
    standaloneBottom: MenuItem[];
}

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
    const navigate = useNavigate();
    const location = useLocation();

    const sidebarStructure: SidebarStructure = {
        standaloneTop: [
            { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' }
        ],
        groups: [
            {
                title: 'HEADER',
                icon: Layout,
                defaultOpen: false,
                items: [
                    { icon: ImageIcon, label: 'Header Yönetimi', path: '/admin/header' },
                ]
            },
            {
                title: 'GÖVDE',
                icon: FileText,
                defaultOpen: true,
                items: [
                    { icon: LayoutDashboard, label: 'Anasayfa', path: '/admin/homepage' },
                    { icon: Briefcase, label: 'Hizmetler', path: '/admin/services' },
                    { icon: Briefcase, label: 'Vaka Çalışmaları', path: '/admin/case-studies' },
                    { icon: FileText, label: 'Blog', path: '/admin/blog' },
                    { icon: FileText, label: 'Hakkımızda', path: '/admin/pages/about' },
                    { icon: Mail, label: 'İletişim', path: '/admin/pages/contact' },
                    { icon: CheckCircle, label: 'Neden Digma', path: '/admin/homepage/why-digma' },
                    { icon: MessageSquare, label: 'Referanslar', path: '/admin/referanslar' },
                    { icon: ImageIcon, label: 'Referans Logoları', path: '/admin/homepage/logos' },
                    { icon: Users, label: 'Ekip', path: '/admin/team' },
                    { icon: ImageIcon, label: 'Medya', path: '/admin/media' },
                    { icon: MessageSquare, label: 'Formlar', path: '/admin/forms' },
                ]
            },
            {
                title: 'FOOTER',
                icon: Layout,
                defaultOpen: false,
                items: [
                    { icon: Layout, label: 'Footer Yönetimi', path: '/admin/footer' },
                ]
            }
        ],
        standaloneBottom: [
            { icon: Settings, label: 'Ayarlar', path: '/admin/settings' }
        ]
    };

    // Initialize expanded groups based on defaultOpen
    useEffect(() => {
        const initialExpanded: Record<string, boolean> = {};
        sidebarStructure.groups.forEach(group => {
            initialExpanded[group.title] = group.defaultOpen;
        });
        setExpandedGroups(initialExpanded);
    }, []);

    // Auto-expand group containing active route
    useEffect(() => {
        const currentPath = location.pathname;
        const newExpanded = { ...expandedGroups };

        sidebarStructure.groups.forEach(group => {
            const hasActiveItem = group.items.some(item =>
                currentPath === item.path || currentPath.startsWith(item.path + '/')
            );
            if (hasActiveItem) {
                newExpanded[group.title] = true;
            }
        });

        setExpandedGroups(newExpanded);
    }, [location.pathname]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    const toggleGroup = (groupTitle: string) => {
        setExpandedGroups(prev => ({
            ...prev,
            [groupTitle]: !prev[groupTitle]
        }));
    };

    const renderMenuItem = (item: MenuItem) => (
        <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive
                    ? 'bg-accent-blue/10 text-accent-blue'
                    : 'text-text-muted hover:text-white hover:bg-white/5'}
            `}
        >
            <item.icon size={18} />
            {item.label}
        </NavLink>
    );

    const renderGroup = (group: MenuGroup) => {
        const isExpanded = expandedGroups[group.title];

        return (
            <div key={group.title} className="space-y-1">
                <button
                    onClick={() => toggleGroup(group.title)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-text-muted/60 uppercase tracking-wider hover:text-text-muted transition-colors"
                >
                    <group.icon size={14} />
                    <span className="flex-1 text-left">{group.title}</span>
                    <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                </button>
                {isExpanded && (
                    <div className="space-y-1 pl-2">
                        {group.items.map(renderMenuItem)}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-secondary flex">
            {/* Sidebar - Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-primary border-r border-white/5 
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-white/5">
                        <span className="text-xl font-display font-bold text-white">
                            Digma<span className="text-accent-blue">Admin</span>
                        </span>
                        <button
                            className="ml-auto lg:hidden text-text-muted"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                        {/* Standalone Top (Dashboard) */}
                        {sidebarStructure.standaloneTop.map(renderMenuItem)}

                        <div className="h-4" />

                        {/* Groups */}
                        {sidebarStructure.groups.map(renderGroup)}

                        <div className="h-4" />

                        {/* Standalone Bottom (Settings) */}
                        {sidebarStructure.standaloneBottom.map(renderMenuItem)}
                    </nav>

                    {/* User & Logout */}
                    <div className="p-4 border-t border-white/5">
                        <div className="flex items-center gap-3 mb-4 px-2">
                            <div className="w-8 h-8 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue font-bold text-xs">
                                AD
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">Admin User</p>
                                <p className="text-xs text-text-muted truncate">admin@digma.com</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                            <LogOut size={16} />
                            Çıkış Yap
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Topbar */}
                <header className="h-16 bg-primary/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden text-text-muted hover:text-white"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                            <input
                                type="text"
                                placeholder="Ara..."
                                className="bg-secondary border border-white/10 rounded-full pl-10 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-accent-blue w-64 transition-colors"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative text-text-muted hover:text-white transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-primary"></span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
