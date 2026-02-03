import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-gray-500">Overview of your store's performance.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Total Revenue" value="$45,231.89" change="+20.1% from last month" icon={DollarSign} />
                <StatsCard title="Active Orders" value="+2350" change="+180.1% from last month" icon={ShoppingBag} />
                <StatsCard title="Customers" value="+12,234" change="+19% from last month" icon={Users} />
                <StatsCard title="Active Now" value="+573" change="+201 since last hour" icon={TrendingUp} />
            </div>

            {/* Recent Activity / Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                <Card className="col-span-1 lg:col-span-4 border-gray-200 dark:border-zinc-800 shadow-sm">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex items-center justify-center bg-gray-50 dark:bg-zinc-900 rounded-md text-gray-400">
                            [Revenue Chart Placeholder]
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-1 lg:col-span-3 border-gray-200 dark:border-zinc-800 shadow-sm">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                        <p className="text-sm text-gray-500">You made 265 sales this month.</p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center">
                                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                        OM
                                    </div>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">Olivia Martin</p>
                                        <p className="text-sm text-gray-500">olivia.martin@email.com</p>
                                    </div>
                                    <div className="ml-auto font-medium">+$1,999.00</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function StatsCard({ title, value, change, icon: Icon }: any) {
    return (
        <Card className="border-gray-200 dark:border-zinc-800 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</CardTitle>
                <Icon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-gray-500 mt-1">{change}</p>
            </CardContent>
        </Card>
    )
}
