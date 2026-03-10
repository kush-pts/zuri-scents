"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getFeaturedProducts } from "@/lib/firebase-service";
import { ProductCard } from "@/components/shop/product-card";
import { motion, useScroll, useTransform } from "framer-motion";

export default function LandingPage() {
    const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getFeaturedProducts();
            setFeaturedProducts(products);
        };
        fetchProducts();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-[#050505] text-white font-sans selection:bg-primary selection:text-black">

            {/* ── HERO SECTION ───────────────────────────────────── */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y: y1, opacity }}
                    className="absolute inset-0 z-0"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center scale-110"
                        style={{ backgroundImage: 'url("/assets/hero-perfume.png")' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#050505]" />
                </motion.div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center text-center"
                    >
                        <motion.span
                            initial={{ opacity: 0, letterSpacing: "0.5em" }}
                            animate={{ opacity: 1, letterSpacing: "0.25em" }}
                            transition={{ delay: 0.2, duration: 1 }}
                            className="text-primary font-bold uppercase text-[10px] mb-6 tracking-[0.25em]"
                        >
                            The Artisans of Scent
                        </motion.span>

                        <h1 className="text-5xl sm:text-7xl md:text-8xl font-light leading-[0.9] mb-8 tracking-tighter">
                            Pure <span className="font-serif italic text-primary">Essence</span><br />
                            of Luxury
                        </h1>

                        <p className="text-white/50 text-sm md:text-base max-w-lg leading-relaxed mb-12 font-light">
                            Crafting a new legacy of Kenyan artisanal perfumery. From the heart of the Rift Valley to the world, we create scents that capture the soul of the Savannah.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-6">
                            <Link
                                href="/shop"
                                className="group relative overflow-hidden bg-primary text-black px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-500 hover:scale-105 active:scale-95"
                            >
                                <span className="relative z-10">Explore Collection</span>
                                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </Link>

                            <Link
                                href="/about"
                                className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300"
                            >
                                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Our Story</span>
                                <div className="w-10 h-px bg-white/20 group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Background Text Decor */}
                <div className="absolute bottom-10 left-10 hidden lg:block opacity-5">
                    <span className="text-9xl font-black uppercase tracking-tighter">ZURI</span>
                </div>
            </section>

            {/* ── CATEGORY BAR ───────────────────────────────────── */}
            <div className="glass-dark border-y border-white/5 py-8 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6">
                    <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                        {["Floral", "Woody", "Oriental", "Fresh"].map((cat) => (
                            <li key={cat}>
                                <Link href={`/shop?category=${cat}`} className="hover:text-primary transition-all duration-300 relative group">
                                    {cat}
                                    <span className="absolute -bottom-2 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* ── FEATURED SECTION ───────────────────────────────── */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div className="max-w-xl">
                            <motion.span
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="text-primary text-[10px] font-black uppercase tracking-[0.4em] block mb-4"
                            >
                                Curator's Choice
                            </motion.span>
                            <h2 className="text-4xl md:text-5xl font-light tracking-tight">Signature <span className="font-serif italic">Fragrances</span></h2>
                        </div>
                        <Link href="/shop" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-primary transition-all">
                            View All Masterpieces
                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                        {[
                            { id: '1', name: 'Rose Éternelle', brand: 'The Floral Series', price: 120, imageUrl: '/assets/product-floral.png', category: 'Floral' },
                            { id: '2', name: 'Midnight Velvet', brand: 'The Woody Series', price: 145, imageUrl: '/assets/product-woody.png', category: 'Woody' },
                            { id: '3', name: 'Oud Mystique', brand: 'The Oriental Series', price: 180, imageUrl: '/assets/product-oriental.png', category: 'Oriental' },
                            { id: '4', name: 'Azure Breeze', brand: 'The Fresh Series', price: 95, imageUrl: '/assets/product-fresh.png', category: 'Fresh' },
                        ].map((p) => (
                            <ProductCard
                                key={p.id}
                                product={p}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── IMMERSIVE EXPERIENCE SECTION ────────────────────── */}
            <section className="py-20 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative rounded-[2.5rem] overflow-hidden bg-[#0a0a0a] border border-white/5 min-h-[600px] flex items-center">
                        <div className="absolute inset-0 z-0">
                            <div
                                className="w-full h-full bg-cover bg-center opacity-40 grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                                style={{ backgroundImage: 'url("/assets/fragrance-collection.png")' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
                        </div>

                        <div className="relative z-10 p-12 md:p-24 max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em] block mb-6">The Atelier</span>
                                <h2 className="text-4xl md:text-6xl font-light mb-8 leading-tight">Beyond <br /> <span className="font-serif italic">The Senses</span></h2>
                                <p className="text-white/60 text-lg font-light leading-relaxed mb-12">
                                    Our alchemy begins in Nakuru, where Kenyan botanicals meet world-class craftsmanship. Every Zuri fragrance is a narrative of the land, hand-poured at our flagship boutique.
                                </p>
                                <Link
                                    href="/discovery"
                                    className="inline-block border border-white/20 px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black hover:border-white transition-all duration-500"
                                >
                                    Start Your Discovery
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS (GLASSMORPHISM) ────────────────────── */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto text-center mb-24">
                    <span className="text-white/30 text-[10px] font-black uppercase tracking-[0.5em] block mb-4">Reviews</span>
                    <h2 className="text-4xl font-light italic font-serif">A Legacy of <span className="text-primary">Elegance</span></h2>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { quote: "An absolute masterpiece. The longevity and sillage are unmatched by even the most famous Parisian houses.", author: "Elena V.", role: "Fashion Editor" },
                        { quote: "Zuri has captured the soul of Africa in a bottle. It's sophisticated, bold, and incredibly unique.", author: "Marcus T.", role: "Fragrance Connoisseur" },
                        { quote: "The presentation alone is worth the price. But the scent itself is where the true luxury lies.", author: "Sarah J.", role: "Verified Buyer" },
                    ].map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass p-12 rounded-[2rem] flex flex-col items-center text-center group"
                        >
                            <div className="text-primary mb-8 opacity-40 group-hover:opacity-100 transition-opacity">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 14.691 16.708 12 20.017 12L20.017 3L3.017 3L3.017 12C3.017 15.309 5.708 18 9.017 18L9.017 21L14.017 21ZM14.017 21L9.017 21L9.017 18C5.708 18 3.017 15.309 3.017 12L3.017 3L20.017 3L20.017 12C16.708 12 14.017 14.691 14.017 18L14.017 21Z" /></svg>
                            </div>
                            <p className="text-white/70 text-lg font-light italic leading-relaxed mb-8">"{t.quote}"</p>
                            <div className="mt-auto">
                                <p className="text-primary text-[11px] font-black uppercase tracking-[0.2em] mb-1">{t.author}</p>
                                <p className="text-white/30 text-[9px] uppercase tracking-widest">{t.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>


            {/* ── FOOTER ─────────────────────────────────────────── */}
            <footer className="py-20 px-6 border-t border-white/5 bg-[#030303]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="text-2xl font-black tracking-tighter text-primary mb-8 block">ZURI</Link>
                        <p className="text-white/40 text-[11px] font-light leading-relaxed uppercase tracking-widest mb-4">Maison Nakuru</p>
                        <p className="text-white/40 text-sm font-light leading-relaxed">
                            Biashara Plaza, 1st Floor, Nakuru.<br />
                            Crafting Kenyan luxury for the global stage.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 col-span-1 md:col-span-2 gap-8">
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6">Collections</h4>
                            <ul className="space-y-4 text-sm font-light text-white/50">
                                <li><Link href="/shop" className="hover:text-primary transition-colors">Shop All</Link></li>
                                <li><Link href="/shop?category=Floral" className="hover:text-primary transition-colors">The Floral Series</Link></li>
                                <li><Link href="/shop?category=Woody" className="hover:text-primary transition-colors">The Woody Series</Link></li>
                                <li><Link href="/discovery" className="hover:text-primary transition-colors">Discovery Sets</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6">Maison</h4>
                            <ul className="space-y-4 text-sm font-light text-white/50">
                                <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
                                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6 uppercase">Follow</h4>
                        <div className="flex gap-6">
                            {["Instagram", "Twitter"].map(s => (
                                <Link key={s} href="#" className="text-white/40 hover:text-white text-sm font-light transition-colors">{s}</Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] font-medium text-white/20 uppercase tracking-widest">© 2026 Zuri Perfumes — All Rights Reserved</p>
                    <div className="flex gap-8 text-[9px] font-bold uppercase tracking-widest text-white/20">
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                    </div>
                </div>
            </footer>
        </div >
    );
}
