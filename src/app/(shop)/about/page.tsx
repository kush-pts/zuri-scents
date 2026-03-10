"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans">
            {/* ── HERO SECTION ───────────────────────────────────── */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div
                        className="w-full h-full bg-cover bg-center opacity-40 grayscale"
                        style={{ backgroundImage: 'url("/assets/fragrance-collection.png")' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]" />
                </div>

                <div className="relative z-10 text-center px-6">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-primary text-[10px] font-black uppercase tracking-[0.5em] block mb-6"
                    >
                        Our Heritage
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-light tracking-tighter mb-8"
                    >
                        A Kenyan <span className="font-serif italic text-primary">Soul</span>
                    </motion.h1>
                </div>
            </section>

            {/* ── NARRATIVE SECTION ──────────────────────────────── */}
            <section className="py-32 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="space-y-16 text-lg md:text-xl font-light leading-relaxed text-white/70"
                    >
                        <p>
                            In the vast, golden landscapes of the Rift Valley, where the air is thick with the scent of wild jasmine and ancient resins, the idea for <span className="text-white font-medium">Zuri</span> was born. We didn't just want to create perfumes; we wanted to capture the very essence of Kenya—a land of profound beauty and untold stories.
                        </p>

                        <div className="glass p-12 rounded-[2.5rem] border border-white/5 my-20">
                            <h3 className="text-primary text-sm font-black uppercase tracking-[0.3em] mb-8 text-center">The Artisan Path</h3>
                            <p className="text-center text-white/80">
                                "Our fragrances are a bridge between tradition and modern luxury. We source the finest botanicals from local farmers, ensuring every drop reflects the richness of our soil."
                            </p>
                        </div>

                        <p>
                            From our flagship boutique at <span className="text-primary font-medium">Biashara Plaza, 1st Floor, Nakuru</span>, Kenyan entrepreneur Mercy leads a team of dedicated artisans. Here, the art of perfumery is celebrated daily, hand-pouring and aging each batch to a perfection that rivals the world's most storied houses.
                        </p>

                        <p>
                            Zuri is more than a brand; it is a celebration of Kenyan craftsmanship. It is the scent of a sunrise over the Savannah, the lingering memory of a coastal breeze, and the sophisticated spirit of the modern Kenyan woman and man.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── CALL TO ACTION ─────────────────────────────────── */}
            <section className="py-32 bg-white/5 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-light mb-12">Experience the <span className="font-serif italic text-primary">Alchemy</span></h2>
                    <Link
                        href="/shop"
                        className="inline-block bg-primary text-black px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 transition-all duration-500"
                    >
                        Explore the Collection
                    </Link>
                </div>
            </section>
        </div>
    );
}
