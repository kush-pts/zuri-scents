"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";

export function Navbar() {
    const { cartCount, setIsCartOpen } = useCart();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="flex items-center justify-between px-6 md:px-12 py-4 bg-black border-b border-white/10 sticky top-0 z-50">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 text-white hover:text-primary transition-colors">
                <div className="size-5 md:size-6 text-primary">
                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
                    </svg>
                </div>
                <h2 className="text-lg md:text-xl font-bold uppercase tracking-widest">Zuri</h2>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
                <Link href="/shop" className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-primary transition-colors">Shop</Link>
                <Link href="/shop?gender=Male" className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-primary transition-colors">Men</Link>
                <Link href="/shop?gender=Female" className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-primary transition-colors">Women</Link>
                <Link href="/recommender" className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-primary transition-colors">The Atelier</Link>
                <Link href="/contact" className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-primary transition-colors">Contact</Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4 md:gap-6">
                <div className="hidden md:flex items-center relative">
                    <input
                        className="bg-white/10 border border-white/20 rounded-full h-9 pl-10 pr-4 text-xs text-white placeholder-white/50 focus:outline-none focus:border-primary w-40 lg:w-48 transition-all"
                        placeholder="Search fragrant..."
                    />
                    <span className="material-symbols-outlined absolute left-3 text-white/50 text-[18px]">search</span>
                </div>

                {/* Cart Icon */}
                <button
                    onClick={() => setIsCartOpen(true)}
                    className="relative flex items-center justify-center rounded-full size-9 bg-white/10 hover:bg-white/20 transition-all text-white border border-white/20"
                >
                    <span className="material-symbols-outlined text-[18px]">local_mall</span>
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-black border-[1.5px] border-black">
                            {cartCount}
                        </span>
                    )}
                </button>

                {/* Removed Profile Icon per user request */}

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden flex items-center justify-center text-white hover:text-primary transition-colors"
                >
                    <span className="material-symbols-outlined text-2xl">
                        {isMobileMenuOpen ? "close" : "menu"}
                    </span>
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-black border-b border-white/10 lg:hidden py-6 px-6 flex flex-col gap-6 shadow-2xl">
                    <div className="flex items-center relative mb-2">
                        <input
                            className="bg-white/10 border border-white/20 rounded-full h-10 pl-10 pr-4 text-sm text-white placeholder-white/50 focus:outline-none focus:border-primary w-full transition-all"
                            placeholder="Search fragrant..."
                        />
                        <span className="material-symbols-outlined absolute left-3 text-white/50 text-[18px]">search</span>
                    </div>
                    <nav className="flex flex-col gap-6">
                        <Link onClick={() => setIsMobileMenuOpen(false)} href="/shop" className="text-sm font-bold uppercase tracking-[0.2em] text-white hover:text-primary transition-colors">Shop</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} href="/shop?gender=Male" className="text-sm font-bold uppercase tracking-[0.2em] text-white hover:text-primary transition-colors">Men</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} href="/shop?gender=Female" className="text-sm font-bold uppercase tracking-[0.2em] text-white hover:text-primary transition-colors">Women</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} href="/recommender" className="text-sm font-bold uppercase tracking-[0.2em] text-white hover:text-primary transition-colors">The Atelier</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} href="/contact" className="text-sm font-bold uppercase tracking-[0.2em] text-white hover:text-primary transition-colors">Contact</Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
