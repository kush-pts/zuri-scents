"use client";

import { useState } from "react";
import Link from "next/link";
import { Toaster } from "sonner";

const navItems = [
    { href: "/admin/dashboard", icon: "dashboard", label: "Dashboard" },
    { href: "/admin/orders", icon: "receipt_long", label: "Orders" },
    { href: "/admin/products", icon: "inventory_2", label: "Inventory" },
    { href: "/admin/offers", icon: "local_offer", label: "Offers & Pricing" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden">

            {/* Mobile Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`w-56 bg-[#0f0f0f] border-r border-white/5 flex flex-col flex-shrink-0 transition-transform z-50 ${isSidebarOpen ? "fixed inset-y-0 left-0 translate-x-0" : "hidden md:flex md:static"} md:translate-x-0`}>
                {/* Brand */}
                <div className="p-5 border-b border-white/5">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-black text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
                        </div>
                        <div>
                            <p className="font-bold text-sm leading-none">Zuri Perfume</p>
                            <p className="text-primary text-[9px] uppercase tracking-widest font-bold mt-0.5">Admin Console</p>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-3 space-y-1">
                    {navItems.map(({ href, icon, label }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setIsSidebarOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all group"
                        >
                            <span className="material-symbols-outlined text-[18px] group-hover:text-primary transition-colors">{icon}</span>
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* Bottom */}
                <div className="p-3 border-t border-white/5 space-y-1">
                    <Link href="/admin/login"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-all">
                        <span className="material-symbols-outlined text-[18px]">settings</span>
                        Settings
                    </Link>
                    <div className="flex items-center gap-3 px-4 py-3">
                        <div className="w-7 h-7 bg-primary/20 rounded-full flex items-center justify-center text-primary text-xs font-bold">A</div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold truncate">Admin</p>
                            <p className="text-white/40 text-[10px] truncate">Store Manager</p>
                        </div>
                        <Link href="/admin/login">
                            <span className="material-symbols-outlined text-white/30 hover:text-red-400 text-[16px] cursor-pointer transition-colors">logout</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Mobile header */}
                <header className="h-14 bg-[#0f0f0f] border-b border-white/5 flex items-center justify-between px-5 md:hidden">
                    <span className="font-bold text-sm">Zuri Admin</span>
                    <button onClick={() => setIsSidebarOpen(true)}>
                        <span className="material-symbols-outlined text-primary">menu</span>
                    </button>
                </header>

                <div className="flex-1 p-6 md:p-8 overflow-auto">
                    {children}
                </div>
            </main>

            <Toaster position="top-right" richColors theme="dark" />
        </div>
    );
}
