"use client";

import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"; // Note: Need to verify if I have generic separator or just use div
import { toast } from "sonner";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function CheckoutPage() {
    const { items, subtotal, clearCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsProcessing(false);
        setIsSuccess(true);
        clearCart();
        toast.success("Order placed successfully!");
    };

    if (isSuccess) {
        return (
            <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h1 className="text-4xl font-serif font-bold text-parfumerie-black mb-4">Thank You!</h1>
                <p className="text-lg text-parfumerie-gray mb-8">Your order #18294 has been received and is being prepared.</p>
                <Link href="/shop">
                    <Button size="lg">Continue Shopping</Button>
                </Link>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-serif mb-4">Your cart is empty</h1>
                <Link href="/shop"><Button>Go to Shop</Button></Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-serif font-bold mb-8 text-center md:text-left">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Checkout Form */}
                <div>
                    <Card className="border-parfumerie-gold/20">
                        <CardHeader>
                            <CardTitle>Shipping Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">First Name</label>
                                        <Input required placeholder="Jane" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Last Name</label>
                                        <Input required placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input required type="email" placeholder="jane@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Address</label>
                                    <Input required placeholder="123 Perfume Lane" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">City</label>
                                        <Input required placeholder="New York" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Zip Code</label>
                                        <Input required placeholder="10001" />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <h3 className="text-lg font-medium mb-4">Payment</h3>
                                    <div className="p-4 border rounded-md bg-gray-50 dark:bg-zinc-900 border-parfumerie-gold/10">
                                        <p className="text-sm text-parfumerie-gray">Mock Payment Gateway - Card ending in 4242</p>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter>
                            {/* Mobile button if needed, but main button is in summary for better sticky handling usually. 
                   I'll put the submit button coupled with form or reference it. Sticking to form context. */}
                        </CardFooter>
                    </Card>
                </div>

                {/* Order Summary */}
                <div>
                    <Card className="bg-parfumerie-cream/30 dark:bg-zinc-900/50 sticky top-24 border-parfumerie-gold/20">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                            <CardDescription>{items.length} items in cart</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {items.map(item => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span>{item.quantity}x {item.name}</span>
                                    <span>${item.price * item.quantity}</span>
                                </div>
                            ))}
                            <div className="h-px bg-parfumerie-gold/20 my-4" />
                            <div className="flex justify-between font-medium">
                                <span>Subtotal</span>
                                <span>${subtotal}</span>
                            </div>
                            <div className="flex justify-between text-sm text-parfumerie-gray">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="h-px bg-parfumerie-gold/20 my-4" />
                            <div className="flex justify-between font-serif font-bold text-xl">
                                <span>Total</span>
                                <span>${subtotal}</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" form="checkout-form" className="w-full text-lg" size="lg" disabled={isProcessing}>
                                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Place Order
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
