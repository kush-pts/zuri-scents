import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

import { CartProvider } from "@/context/cart-context";
import { CartSheet } from "@/components/cart/cart-sheet";
import { Toaster } from "sonner";

export default function ShopLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <CartProvider>
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <CartSheet />
                <Toaster position="bottom-right" richColors />
            </div>
        </CartProvider>
    );
}
