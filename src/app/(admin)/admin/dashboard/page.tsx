"use server";

import { getDashboardStats } from "@/lib/firebase-service";
import { getProducts } from "@/lib/firebase-service";

export const dynamic = "force-dynamic";

// Simple SVG line chart
function SalesTrendChart() {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"];
    const values = [25, 45, 35, 30, 72, 60, 55];
    const maxVal = Math.max(...values);
    const width = 600;
    const height = 200;
    const pad = { l: 20, r: 20, t: 20, b: 30 };
    const chartW = width - pad.l - pad.r;
    const chartH = height - pad.t - pad.b;

    const points = values.map((v, i) => ({
        x: pad.l + (i / (values.length - 1)) * chartW,
        y: pad.t + chartH - (v / maxVal) * chartH,
    }));

    const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
    const areaD = `${pathD} L ${points[points.length - 1].x} ${pad.t + chartH} L ${points[0].x} ${pad.t + chartH} Z`;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
            <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e0a81a" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#e0a81a" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={areaD} fill="url(#areaGrad)" />
            <path d={pathD} fill="none" stroke="#e0a81a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="5" fill="#e0a81a" stroke="#0a0a0a" strokeWidth="2" />
            ))}
            {months.map((m, i) => (
                <text key={m} x={pad.l + (i / (months.length - 1)) * chartW} y={height - 5} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.3)" fontFamily="sans-serif">{m}</text>
            ))}
        </svg>
    );
}

export default async function DashboardPage() {
    const stats = await getDashboardStats();
    const products = await getProducts();

    const statCards = [
        { label: "Total Revenue", value: `KES ${stats.totalRevenue.toLocaleString()}`, icon: "payments", change: "Lifetime revenue" },
        { label: "Total Orders", value: stats.totalOrders.toLocaleString(), icon: "shopping_bag", change: `${stats.activeOrders} active` },
        { label: "Active Customers", value: stats.productsCount.toLocaleString(), icon: "group", change: "Products in catalog" },
    ];

    return (
        <div className="space-y-7 text-white">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Store Overview</h1>
                    <p className="text-white/40 text-sm mt-0.5">Real-time store performance</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-[#111] border border-white/5 rounded-xl px-4 py-2.5 flex items-center gap-2">
                        <span className="material-symbols-outlined text-white/40 text-[18px]">search</span>
                        <input placeholder="Search data..." className="bg-transparent text-sm text-white/60 placeholder-white/30 focus:outline-none w-40" />
                    </div>
                    <div className="w-9 h-9 bg-[#111] border border-white/5 rounded-xl flex items-center justify-center cursor-pointer hover:border-primary/40 transition-colors">
                        <span className="material-symbols-outlined text-white/60 text-[18px]">notifications</span>
                    </div>
                    <div className="w-9 h-9 bg-[#111] border border-white/5 rounded-xl flex items-center justify-center cursor-pointer">
                        <span className="material-symbols-outlined text-white/60 text-[18px]">help</span>
                    </div>

                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {statCards.map(({ label, value, icon, change }) => (
                    <div key={label} className="bg-[#111] border border-white/5 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-white/50 text-xs uppercase tracking-wider">{label}</p>
                            <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                            </div>
                        </div>
                        <p className="text-3xl font-bold mb-1">{value}</p>
                        <p className="text-white/40 text-xs flex items-center gap-1">
                            <span className="text-green-400">↑</span> {change}
                        </p>
                    </div>
                ))}
            </div>

            {/* Chart + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
                {/* Sales Trend */}
                <div className="bg-[#111] border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-1">
                        <div>
                            <h2 className="font-bold">Sales Trends</h2>
                            <p className="text-white/40 text-xs">Revenue performance for the last 7 months</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="bg-primary text-black text-[10px] font-bold px-3 py-1.5 rounded-lg">Monthly</button>
                            <button className="text-white/40 text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-white/5">Weekly</button>
                        </div>
                    </div>
                    <div className="mt-4">
                        <SalesTrendChart />
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-[#111] border border-white/5 rounded-2xl p-6">
                    <h2 className="font-bold mb-5">Recent Activity</h2>
                    <div className="space-y-4">
                        {stats.recentOrders.slice(0, 4).map((order, i) => (
                            <div key={order.id} className="flex items-start gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${i === 0 ? "bg-green-900/40 text-green-400" :
                                    i === 1 ? "bg-blue-900/40 text-blue-400" :
                                        i === 2 ? "bg-primary/20 text-primary" :
                                            "bg-red-900/40 text-red-400"
                                    }`}>
                                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                        {i === 0 ? "shopping_cart" : i === 1 ? "person_add" : i === 2 ? "inventory_2" : "warning"}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">New order #{order.id?.slice(-5) || "00000"}</p>
                                    <p className="text-white/40 text-xs">{order.customerName} • KES {order.total?.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                        {stats.recentOrders.length === 0 && (
                            <>
                                {[
                                    { icon: "shopping_cart", color: "bg-green-900/40 text-green-400", title: "New order #12,405", sub: "2 mins ago • KES 12,400" },
                                    { icon: "person_add", color: "bg-blue-900/40 text-blue-400", title: "New customer registered", sub: "45 mins ago • Sarah J." },
                                    { icon: "inventory_2", color: "bg-primary/20 text-primary", title: "Stock update: Velvet Oud", sub: "3 hours ago • +24 units" },
                                    { icon: "warning", color: "bg-red-900/40 text-red-400", title: "Low stock alert", sub: "5 hours ago • Amber Night (2 left)" },
                                ].map((act, j) => (
                                    <div key={j} className="flex items-start gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${act.color}`}>
                                            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>{act.icon}</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{act.title}</p>
                                            <p className="text-white/40 text-xs">{act.sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                    <button className="mt-4 w-full border border-primary/30 text-primary text-xs font-bold py-2.5 rounded-xl hover:bg-primary/5 transition-colors">
                        View All Activity
                    </button>
                </div>
            </div>

            {/* Top Selling Products */}
            <div className="bg-[#111] border border-white/5 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="font-bold">Top Selling Products</h2>
                        <p className="text-white/40 text-xs">Current best performers in inventory</p>
                    </div>
                    <button className="text-primary text-xs font-bold flex items-center gap-1 hover:text-white transition-colors">
                        Export CSV
                        <span className="material-symbols-outlined text-[14px]">download</span>
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-white/30 text-[10px] uppercase tracking-wider border-b border-white/5">
                                <th className="text-left pb-3 font-medium">Product</th>
                                <th className="text-left pb-3 font-medium">Category</th>
                                <th className="text-left pb-3 font-medium">Stock Level</th>
                                <th className="text-left pb-3 font-medium">Price (100ml)</th>
                                <th className="text-left pb-3 font-medium">10ml Sold</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {products.slice(0, 5).map((p) => {
                                const stock = p.stockBottles ?? 0;
                                const maxStock = 50;
                                const pct = Math.min(100, (stock / maxStock) * 100);
                                const barColor = stock <= 3 ? "bg-red-500" : stock <= 10 ? "bg-amber-500" : "bg-green-500";

                                return (
                                    <tr key={p.id} className="hover:bg-white/2 transition-colors">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-[#1a1a1a] rounded-lg overflow-hidden flex-shrink-0">
                                                    {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover" />}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{p.name}</p>
                                                    <p className="text-white/40 text-xs">ID: ZP-{p.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <span className="bg-primary/10 text-primary text-[10px] font-bold px-2.5 py-1 rounded-full">{p.scentProfile}</span>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                    <div className={`h-full ${barColor} rounded-full`} style={{ width: `${pct}%` }} />
                                                </div>
                                                <span className={`text-xs font-medium ${stock <= 3 ? "text-red-400" : stock <= 10 ? "text-amber-400" : "text-green-400"}`}>{stock} in stock</span>
                                            </div>
                                        </td>
                                        <td className="py-4 font-medium">KES {p.price.toLocaleString()}</td>
                                        <td className="py-4">
                                            <span className="text-green-400 font-bold">{p.sold10ml ?? 0} units</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {products.length === 0 && (
                        <p className="text-center text-white/30 py-8">No products yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
