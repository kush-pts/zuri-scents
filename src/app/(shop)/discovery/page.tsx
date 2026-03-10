"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function DiscoveryPage() {
    const notes = [
        { name: "Rift Valley Cedar", description: "Deep, woody, and grounding—harvested from the sustainable highlands.", category: "Woody" },
        { name: "Coastal Jasmine", description: "Sweet, ethereal, and intoxicating—blooming under the equatorial moon.", category: "Floral" },
        { name: "Savannah Resins", description: "Ancient, smoky, and mysterious—the soul of traditional Kenyan scent.", category: "Oriental" },
        { name: "Mountain Mist", description: "Clean, crisp, and revitalizing—inspired by the morning air of Mt. Kenya.", category: "Fresh" },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans">
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-32"
                    >
                        <span className="text-primary text-[10px] font-black uppercase tracking-[0.5em] block mb-6">The Atelier</span>
                        <h1 className="text-5xl md:text-8xl font-light tracking-tighter mb-8 leading-[0.9]">
                            The <span className="font-serif italic">Alchemy</span><br /> of Kenya
                        </h1>
                        <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                            Discover the raw materials that define our signature scents. Every note is a testament to the diverse beauty of the Kenyan landscape.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-40">
                        {notes.map((note, i) => (
                            <motion.div
                                key={note.name}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass p-12 rounded-[2.5rem] border border-white/5 group hover:border-primary/20 transition-all duration-500"
                            >
                                <span className="text-primary/40 text-[9px] font-black uppercase tracking-[0.4em] block mb-6 group-hover:text-primary transition-colors">{note.category}</span>
                                <h3 className="text-3xl font-light mb-6 tracking-tight">{note.name}</h3>
                                <p className="text-white/60 font-light leading-relaxed text-lg">
                                    {note.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="relative rounded-[3rem] overflow-hidden bg-[#0a0a0a] border border-white/5 p-12 md:p-32 text-center">
                        <div className="absolute inset-0 z-0 opacity-10">
                            <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-light mb-12">Begin Your <br /><span className="font-serif italic text-primary">Olfactory Journey</span></h2>
                            <p className="text-white/50 text-lg mb-16 max-w-xl mx-auto font-light">
                                Our Discovery Set allows you to experience the full range of Zuri masterpieces in the comfort of your home.
                            </p>
                            <Link
                                href="/shop"
                                className="inline-block bg-white text-black px-16 py-6 rounded-full text-[11px] font-black uppercase tracking-[0.3em] hover:bg-primary transition-all duration-500"
                            >
                                Order Discovery Set
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
