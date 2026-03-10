"use client";

import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { createOrder } from "@/lib/firebase-service";
import Image from "next/image";

const KENYAN_COUNTIES = [
    "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret",
    "Nyeri", "Machakos", "Meru", "Thika", "Kilifi",
    "Kakamega", "Kisii", "Garissa", "Malindi", "Lamu",
];

const DELIVERY_FEE = 500;

export default function CheckoutPage() {
    const { items, subtotal, clearCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card">("mpesa");
    const [promoCode, setPromoCode] = useState("");
    const [promoApplied, setPromoApplied] = useState(false);

    const total = subtotal + DELIVERY_FEE;
    const orderRef = `ZR-${Math.floor(10000 + Math.random() * 90000)}`;

    const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsProcessing(true);
        const formData = new FormData(e.currentTarget);

        try {
            const newOrderId = await createOrder({
                customerName: `${formData.get("firstName")} ${formData.get("lastName")}`,
                email: formData.get("email") as string,
                address: `${formData.get("street")}, ${formData.get("town")}`,
                city: formData.get("county") as string,
                zipCode: "",
                items: items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.sizePrice,
                    quantity: item.quantity,
                    size: item.selectedSize,
                } as any)),
                subtotal,
                total,
            });
            setOrderId(newOrderId || orderRef);
            setIsSuccess(true);
            clearCart();
        } catch {
            toast.error("Failed to place order. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    /* ─── SUCCESS SCREEN ─── */
    if (isSuccess) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-start pt-8 pb-20 px-4">
                {/* Header */}
                <div className="w-full max-w-lg flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-2xl">spa</span>
                        <span className="font-bold text-white">Zuri Perfume</span>
                    </div>
                    <Link href="/shop">
                        <span className="material-symbols-outlined text-white/60 hover:text-white transition-colors">close</span>
                    </Link>
                </div>

                {/* Checkmark */}
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6 shadow-xl shadow-primary/30">
                    <span className="material-symbols-outlined text-black text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>

                <h1 className="text-3xl font-bold mb-2 text-center">Thank You for Your Order</h1>
                <p className="text-white/60 text-sm mb-8 text-center max-w-sm">
                    Your M-Pesa payment was successful. We&apos;re preparing your luxury fragrance for delivery to your doorstep.
                </p>

                {/* Order Info */}
                <div className="w-full max-w-lg grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#111] rounded-2xl p-5">
                        <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">ORDER NUMBER</p>
                        <p className="text-primary font-bold text-lg">#{orderId || orderRef}</p>
                    </div>
                    <div className="bg-[#111] rounded-2xl p-5">
                        <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">ESTIMATED DELIVERY</p>
                        <p className="font-bold">3 - 5 Business Days</p>
                    </div>
                </div>

                {/* Order Summary Card */}
                <div className="w-full max-w-lg bg-[#111] rounded-2xl p-6 mb-8">
                    <h3 className="font-bold mb-4">Order Summary</h3>
                    <div className="space-y-4 mb-5">
                        {items.length > 0 ? items.map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-[#1a1a1a] rounded-xl overflow-hidden flex-shrink-0" />
                                <div className="flex-1">
                                    <p className="font-bold text-sm">{item.name}</p>
                                    <p className="text-white/50 text-xs">{item.selectedSize === "10ml" ? "Travel Size, 10ml" : "Eau de Parfum, 100ml"}</p>
                                    <p className="text-white/50 text-xs">Qty: {item.quantity}</p>
                                </div>
                                <p className="text-sm font-medium">KES {(item.sizePrice * item.quantity).toLocaleString()}</p>
                            </div>
                        )) : (
                            <p className="text-white/40 text-sm">No items</p>
                        )}
                    </div>
                    <div className="border-t border-white/5 pt-4 space-y-2">
                        <div className="flex justify-between text-sm text-white/60">
                            <span>Subtotal</span>
                            <span>KES {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-white/60">
                            <span>Delivery Fee</span>
                            <span>KES {DELIVERY_FEE.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-bold text-base pt-2">
                            <span>Total Paid</span>
                            <span className="text-primary">KES {total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="w-full max-w-lg flex gap-4">
                    <Link href="/shop" className="flex-1">
                        <button className="w-full bg-primary text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-lg">local_shipping</span>
                            Track My Order
                        </button>
                    </Link>
                    <Link href="/shop" className="flex-1">
                        <button className="w-full border border-primary/60 text-primary font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors">
                            <span className="material-symbols-outlined text-lg">shopping_bag</span>
                            Continue Shopping
                        </button>
                    </Link>
                </div>

                <p className="text-white/40 text-xs mt-6">
                    Need help with your order?{" "}
                    <Link href="#" className="text-primary hover:underline">Contact our Concierge</Link>
                </p>

                {/* Trust badges */}
                <div className="flex gap-6 mt-8 text-primary">
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                </div>
            </div>
        );
    }

    /* ─── EMPTY CART ─── */
    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white gap-6">
                <span className="material-symbols-outlined text-6xl text-white/20">shopping_bag</span>
                <h2 className="text-2xl font-bold">Your cart is empty</h2>
                <Link href="/shop">
                    <button className="bg-primary text-black font-bold px-8 py-3 rounded-full">Shop Now</button>
                </Link>
            </div>
        );
    }

    /* ─── CHECKOUT FORM ─── */
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Top banner */}
            <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
                <h1 className="text-4xl font-bold mb-1">Checkout</h1>
                <p className="text-primary text-sm">Complete your order for premium Kenyan fragrances</p>
            </div>

            <form onSubmit={handlePlaceOrder}>
                <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-20 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">

                    {/* Left: Forms */}
                    <div className="space-y-8">

                        {/* Shipping */}
                        <section>
                            <h2 className="font-bold text-lg mb-5 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                                Shipping Details
                            </h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-white/60 mb-1.5">First Name</label>
                                        <input required name="firstName" placeholder="John" className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder-white/20" />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-white/60 mb-1.5">Last Name</label>
                                        <input required name="lastName" placeholder="Doe" className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder-white/20" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs text-white/60 mb-1.5">Region / County</label>
                                    <select required name="county" className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-white appearance-none">
                                        <option value="">Select County</option>
                                        {KENYAN_COUNTIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs text-white/60 mb-1.5">Town / District</label>
                                    <input name="town" placeholder="e.g. Westlands, Kilimani, Nyali" className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder-white/20" />
                                </div>

                                <div>
                                    <label className="block text-xs text-white/60 mb-1.5">Street Address / Apartment</label>
                                    <input name="street" placeholder="Building name, Floor, House number" className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder-white/20" />
                                </div>

                                <div>
                                    <label className="block text-xs text-white/60 mb-1.5">Email</label>
                                    <input required name="email" type="email" placeholder="you@example.com" className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder-white/20" />
                                </div>
                            </div>
                        </section>

                        {/* Payment */}
                        <section>
                            <h2 className="font-bold text-lg mb-5 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                                Payment Method
                            </h2>
                            <div className="space-y-3">

                                {/* M-Pesa */}
                                <label className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${paymentMethod === "mpesa" ? "border-primary bg-primary/5" : "border-white/10 hover:border-white/20"}`}>
                                    <input type="radio" name="payment" value="mpesa" checked={paymentMethod === "mpesa"} onChange={() => setPaymentMethod("mpesa")} className="mt-1 accent-amber-500" />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className="font-bold text-sm">M-Pesa Express</p>
                                            <span className="text-[10px] bg-green-900/30 text-green-400 px-2 py-0.5 rounded font-bold">M-PESA</span>
                                        </div>
                                        <p className="text-white/50 text-xs mt-0.5">Enter your number and wait for the STK push on your phone</p>
                                        {paymentMethod === "mpesa" && (
                                            <div className="mt-4">
                                                <label className="block text-xs text-primary mb-1.5">M-Pesa Phone Number</label>
                                                <div className="flex gap-2">
                                                    <div className="flex items-center gap-2 bg-[#1a1a1a] border border-white/10 rounded-xl px-3 py-2.5">
                                                        <span className="text-sm">🇰🇪</span>
                                                        <span className="text-sm text-white/60">+254</span>
                                                    </div>
                                                    <input type="tel" name="mpesaPhone" placeholder="7XXXXXXXX" className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </label>

                                {/* Card */}
                                <label className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${paymentMethod === "card" ? "border-primary bg-primary/5" : "border-white/10 hover:border-white/20"}`}>
                                    <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} className="mt-1 accent-amber-500" />
                                    <div>
                                        <p className="font-bold text-sm">Credit/Debit Card</p>
                                        <p className="text-white/50 text-xs mt-0.5">Visa, Mastercard, American Express</p>
                                    </div>
                                </label>
                            </div>
                        </section>
                    </div>

                    {/* Right: Order Summary */}
                    <div>
                        <div className="bg-[#111] border border-white/5 rounded-2xl p-6 sticky top-24">
                            <h3 className="font-bold text-base mb-5">Order Summary</h3>

                            {/* Items */}
                            <div className="space-y-4 mb-5">
                                {items.map((item) => (
                                    <div key={`${item.id}-${item.selectedSize}`} className="flex items-start gap-3">
                                        <div className="w-14 h-14 rounded-xl bg-[#1a1a1a] overflow-hidden flex-shrink-0">
                                            {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm truncate">{item.name}</p>
                                            <p className="text-primary text-xs">{item.selectedSize} • Qty: {item.quantity}</p>
                                            <p className="text-white/50 text-xs">KES {(item.sizePrice * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Promo */}
                            <div className="flex gap-2 mb-5">
                                <input
                                    value={promoCode}
                                    onChange={e => setPromoCode(e.target.value)}
                                    placeholder="Promo code"
                                    className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary placeholder-white/20"
                                />
                                <button
                                    type="button"
                                    onClick={() => { setPromoApplied(true); toast.success("Promo code applied!"); }}
                                    className="bg-primary text-black font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
                                >
                                    Apply
                                </button>
                            </div>

                            {/* Totals */}
                            <div className="border-t border-white/5 pt-4 space-y-2.5 mb-5">
                                <div className="flex justify-between text-sm text-white/60">
                                    <span>Subtotal</span>
                                    <span>KES {subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-white/60">Delivery Fee</span>
                                    <span className="text-primary">KES {DELIVERY_FEE.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-bold text-base pt-2 border-t border-white/5">
                                    <span>Total</span>
                                    <span className="text-primary">KES {total.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full bg-primary text-black font-extrabold uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-60"
                            >
                                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                {isProcessing ? "Processing..." : "COMPLETE ORDER →"}
                            </button>
                            <p className="text-center text-[10px] text-white/30 uppercase tracking-widest mt-3">Secure Encrypted Checkout</p>
                        </div>
                    </div>
                </div>
            </form>

            <footer className="py-6 border-t border-white/5 text-center text-white/30 text-xs">
                © 2024 Zuri Premium House. Handcrafted Luxury from Nairobi.
            </footer>
        </div>
    );
}
