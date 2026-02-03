"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { type Product } from "@/lib/mock-data";

export function AddToCartButton({ product }: { product: Product }) {
    const { addToCart } = useCart();

    return (
        <Button
            size="lg"
            onClick={() => addToCart(product)}
            className="flex-1 text-lg"
        >
            Add to Cart
        </Button>
    );
}
