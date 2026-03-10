"use client";

import { useCart } from "@/context/cart-context";
import { X, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export function CartSheet() {
    const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal } = useCart();

    useEffect(() => {
        document.body.style.overflow = isCartOpen ? "hidden" : "unset";
        return () => { document.body.style.overflow = "unset"; };
    }, [isCartOpen]);

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />

            {/* Panel */}
            <div className="relative w-full max-w-sm bg-[#0f0f0f] border-l border-white/5 h-full shadow-2xl flex flex-col animate-slide-in-right text-white">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_mall</span>
                        <h2 className="font-bold text-base">Your Cart</h2>
                        {items.length > 0 && (
                            <span className="bg-primary text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{items.length}</span>
                        )}
                    </div>
                    <button onClick={() => setIsCartOpen(false)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-white/30 gap-3">
                            <span className="material-symbols-outlined text-5xl">shopping_bag</span>
                            <p className="text-sm">Your cart is empty</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="text-primary text-sm font-bold mt-2 hover:underline"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                                <div className="w-16 h-16 bg-[#1a1a1a] rounded-xl overflow-hidden flex-shrink-0">
                                    {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="font-medium text-sm truncate">{item.name}</h3>
                                        <span className="text-primary font-bold text-sm whitespace-nowrap">
                                            KES {(item.sizePrice * item.quantity).toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-white/40 text-xs mb-2">
                                        {item.selectedSize} • {item.brand}
                                    </p>

                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center border border-white/10 rounded-lg bg-white/5">
                                            <button
                                                className="px-2 py-1 hover:text-primary transition-colors"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize)}
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="w-7 text-center text-sm font-medium">{item.quantity}</span>
                                            <button
                                                className="px-2 py-1 hover:text-primary transition-colors"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize)}
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id, item.selectedSize)}
                                            className="text-red-400/60 hover:text-red-400 text-xs transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-white/5 px-6 py-5 bg-black/30 space-y-4">
                        <div className="flex justify-between text-sm text-white/60">
                            <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                            <span className="text-white font-bold">KES {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-white/60">
                            <span>Delivery Fee</span>
                            <span className="text-primary">KES 500</span>
                        </div>
                        <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                            <button className="w-full bg-primary text-black font-extrabold py-4 rounded-xl text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>
                                Checkout — KES {(subtotal + 500).toLocaleString()}
                            </button>
                        </Link>
                        <p className="text-center text-[10px] text-white/20 uppercase tracking-widest">
                            Secure & Encrypted Checkout
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
