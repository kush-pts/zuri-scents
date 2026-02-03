import Link from "next/link";
import { LayoutDashboard, Package, Users, Settings, LogOut, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-zinc-950 text-gray-900 dark:text-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 hidden md:flex flex-col">
                <div className="p-6 h-16 flex items-center border-b border-gray-200 dark:border-zinc-800">
                    <span className="text-xl font-serif font-bold text-parfumerie-gold">Parfumerie Admin</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                        <Package className="w-5 h-5" />
                        Inventory
                    </Link>
                    <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                        <Users className="w-5 h-5" />
                        Orders
                    </Link>
                    <Link href="/admin/offers" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                        <Tag className="w-5 h-5" />
                        Offers & Pricing
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
                    <Link href="/admin/login">
                        <Button variant="ghost" className="w-full justify-start gap-3 hover:text-red-500 hover:bg-red-50">
                            <LogOut className="w-5 h-5" />
                            Logout
                        </Button>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                {/* Mobile Header */}
                <header className="h-16 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between px-6 md:hidden">
                    <span className="font-serif font-bold">Parfumerie Admin</span>
                    <Button variant="ghost" size="icon"><MenuIcon /></Button>
                </header>

                <div className="flex-1 p-6 md:p-8 overflow-auto">
                    {children}
                </div>
            </main>
            <Toaster position="top-right" richColors />
        </div>
    );
}

function MenuIcon() {
    return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
}
