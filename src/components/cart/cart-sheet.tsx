"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image"; // Placeholder usage text
import Link from "next/link";
import { useEffect } from "react";

export function CartSheet() {
    const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal } = useCart();

    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; }
    }, [isCartOpen]);

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Panel */}
            <div className="relative w-full max-w-md bg-white dark:bg-zinc-950 h-full shadow-2xl flex flex-col animate-slide-in-right">
                <div className="flex items-center justify-between p-6 border-b border-parfumerie-gold/10">
                    <h2 className="text-xl font-serif font-bold flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-parfumerie-gold" />
                        Your Cart
                    </h2>
                    <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="text-center py-20 text-parfumerie-gray">
                            <p>Your cart is empty.</p>
                            <Button variant="link" onClick={() => setIsCartOpen(false)} className="mt-2 text-parfumerie-gold">Continue Shopping</Button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <div className="h-20 w-20 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-400 shrink-0">
                                    [Img]
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                        <h3 className="font-medium">{item.name}</h3>
                                        <span className="font-serif font-semibold">${item.price * item.quantity}</span>
                                    </div>
                                    <p className="text-xs text-parfumerie-gray mb-2">{item.brand}</p>

                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center border border-gray-200 rounded-md">
                                            <button
                                                className="p-1 hover:bg-gray-100"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                                            <button
                                                className="p-1 hover:bg-gray-100"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-auto px-2 text-xs text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => removeFromCart(item.id)}>
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t border-parfumerie-gold/10 p-6 bg-parfumerie-cream/30 dark:bg-zinc-900/50">
                        <div className="flex justify-between mb-4">
                            <span className="font-medium text-parfumerie-gray">Subtotal</span>
                            <span className="font-serif font-bold text-xl">${subtotal}</span>
                        </div>
                        <p className="text-xs text-parfumerie-gray mb-6 text-center">Shipping and taxes calculated at checkout.</p>
                        <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                            <Button size="lg" className="w-full text-lg">Checkout</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
