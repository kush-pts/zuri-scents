"use client";

import { useCart } from "@/context/cart-context";
import { type Product } from "@/lib/mock-data";

export function AddToCartButton({ product }: { product: Product }) {
    const { addToCart } = useCart();

    return (
        <button
            onClick={() => addToCart(product)}
            className="w-full bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90 text-[#050505] py-4 px-8 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20"
        >
            <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
            Add to Cart
        </button>
    );
}
