"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { type Product } from "@/lib/mock-data";
import { toast } from "sonner";

export type CartItem = Product & {
    quantity: number;
    selectedSize: "10ml" | "100ml";
    sizePrice: number; // price for the selected size
};

type CartContextType = {
    items: CartItem[];
    addToCart: (product: Product, size?: "10ml" | "100ml") => void;
    removeFromCart: (productId: string, size?: "10ml" | "100ml") => void;
    updateQuantity: (productId: string, quantity: number, size?: "10ml" | "100ml") => void;
    clearCart: () => void;
    cartCount: number;
    subtotal: number;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const savedCart = localStorage.getItem("parfumerie-cart");
        if (savedCart) {
            try { setItems(JSON.parse(savedCart)); } catch (e) { console.error("Failed to parse cart", e); }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("parfumerie-cart", JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product, size: "10ml" | "100ml" = "100ml") => {
        const sizePrice = size === "10ml" ? (product.price10ml ?? Math.round(product.price * 0.18)) : product.price;

        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id && item.selectedSize === size);
            if (existing) {
                toast.success(`Updated quantity for ${product.name} (${size})`);
                return prev.map((item) =>
                    item.id === product.id && item.selectedSize === size
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            toast.success(`Added ${product.name} (${size}) to cart`);
            return [...prev, { ...product, quantity: 1, selectedSize: size, sizePrice }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId: string, size?: "10ml" | "100ml") => {
        setItems((prev) => prev.filter((item) => !(item.id === productId && (!size || item.selectedSize === size))));
        toast.info("Item removed from cart");
    };

    const updateQuantity = (productId: string, quantity: number, size?: "10ml" | "100ml") => {
        if (quantity < 1) {
            removeFromCart(productId, size);
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item.id === productId && (!size || item.selectedSize === size) ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
        localStorage.removeItem("parfumerie-cart");
    };

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = items.reduce((acc, item) => acc + item.sizePrice * item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, subtotal, isCartOpen, setIsCartOpen }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) throw new Error("useCart must be used within a CartProvider");
    return context;
}
