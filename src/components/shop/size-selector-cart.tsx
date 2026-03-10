"use client";

import { useState } from "react";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/lib/mock-data";

interface SizeSelectorAndCartProps {
    product: Product;
}

export function SizeSelectorAndCart({ product }: SizeSelectorAndCartProps) {
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState<"10ml" | "100ml">("100ml");

    const currentPrice = selectedSize === "10ml"
        ? (product.price10ml ?? Math.round(product.price * 0.18))
        : product.price;

    const handleAddToCart = () => {
        addToCart(product, selectedSize);
    };

    return (
        <div className="space-y-5">
            {/* Size Selector */}
            <div>
                <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">Select Size</p>
                <div className="flex gap-3">
                    {[
                        { size: "10ml" as const, label: "10ml", sublabel: "Travel Size", price: product.price10ml ?? Math.round(product.price * 0.18) },
                        { size: "100ml" as const, label: "100ml", sublabel: "Full Bottle", price: product.price },
                    ].map(({ size, label, sublabel, price }) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`flex-1 py-3 px-4 rounded-xl border text-sm font-medium transition-all ${selectedSize === size
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-white/10 bg-white/5 text-white/60 hover:border-white/30"
                                }`}
                        >
                            <span className="block font-bold">{label}</span>
                            <span className="block text-[10px] mt-0.5 opacity-70">{sublabel}</span>
                            <span className="block text-[11px] font-bold mt-1">
                                KES {price.toLocaleString()}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Price display */}
            <p className="text-3xl font-bold text-primary">
                KES {currentPrice.toLocaleString()}
            </p>

            {/* Add to Cart */}
            <div className="flex gap-3">
                <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/80 text-black py-4 px-8 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20"
                >
                    <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                    Add to Cart — {selectedSize}
                </button>
                <button className="flex items-center justify-center w-14 h-14 rounded-xl border border-white/20 hover:bg-white/5 transition-colors text-white">
                    <span className="material-symbols-outlined text-xl">favorite</span>
                </button>
            </div>

            {/* Mobile Fixed Add To Cart Bar */}
            <div className="md:hidden fixed bottom-0 left-0 w-full p-4 bg-black/90 backdrop-blur-md border-t border-white/10 z-50 animate-in slide-in-from-bottom pb-6">
                <button
                    onClick={handleAddToCart}
                    className="w-full bg-primary text-black py-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                    <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                    Add to Cart • KES {currentPrice.toLocaleString()}
                </button>
            </div>
        </div>
    );
}
