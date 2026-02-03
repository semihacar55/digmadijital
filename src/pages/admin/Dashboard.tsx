
const Dashboard = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Toplam Ziyaret', value: '1,234' },
                    { label: 'Yeni Lead', value: '12' },
                    { label: 'Yayınlanan Yazı', value: '5' },
                ].map((stat, i) => (
                    <div key={i} className="bg-secondary/50 border border-white/5 rounded-xl p-6">
                        <p className="text-text-muted text-sm mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-white">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
