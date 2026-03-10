"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        brand: string;
        price: number;
        price10ml?: number;
        imageUrl?: string;
        notes?: { top?: string[], heart?: string[], base?: string[] };
        scentProfile?: string;
        isFeatured?: boolean;
    };
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            brand: product.brand,
            description: "",
            scentProfile: product.scentProfile || "Unknown",
            notes: product.notes || { top: [], heart: [], base: [] },
            image: product.imageUrl || ''
        } as any);
        toast.success(`${product.name} added to bag`);
    };

    const imgSrc = product.imageUrl || "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <Link href={`/product/${product.id}`} className="group flex flex-col h-full">
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#111] rounded-2xl mb-4 border border-white/5 ring-1 ring-white/5 transition-all duration-500 group-hover:ring-primary/20">
                    {/* Product Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-[1.1]"
                        style={{ backgroundImage: `url('${imgSrc}')` }}
                    />

                    {/* Subtle dark gradient at bottom for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                    {/* Scent Profile Badge */}
                    {product.scentProfile && (
                        <div className="absolute top-3 left-3">
                            <span className="glass-dark text-white/90 text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                                {product.scentProfile}
                            </span>
                        </div>
                    )}

                    {/* Quick Add Overlay */}
                    <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-10">
                        <button
                            onClick={handleQuickAdd}
                            className="w-full bg-white text-black py-3 rounded-xl text-[10px] font-extrabold uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all duration-300 shadow-2xl"
                        >
                            Quick Add
                        </button>
                    </div>
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1 px-1">
                    <p className="text-primary/60 text-[9px] font-extrabold uppercase tracking-[0.3em] mb-1.5">{product.brand}</p>
                    <h3 className="text-sm font-medium text-white/90 group-hover:text-primary transition-colors leading-tight mb-2 tracking-wide font-display">{product.name}</h3>
                    <div className="flex items-baseline gap-2 mt-auto">
                        <span className="text-white font-bold text-sm tracking-tight">KES {(product.price || 0).toLocaleString()}</span>
                        {product.price10ml && (
                            <span className="text-white/30 text-[9px] font-medium tracking-wider uppercase">/ KES {product.price10ml?.toLocaleString()} 10ml</span>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
