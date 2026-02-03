import Link from "next/link";
import { ShoppingBag, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";

export function Navbar() {
    const { cartCount, setIsCartOpen } = useCart();
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-parfumerie-gold/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 flex h-16 items-center">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="text-2xl font-serif font-bold text-parfumerie-gold tracking-tighter">Parfumerie</span>
                </Link>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <div className="hidden md:flex gap-8 text-sm font-medium text-parfumerie-gray">
                            <Link href="/shop" className="hover:text-parfumerie-gold transition-colors">Shop</Link>
                            <Link href="/recommender" className="hover:text-parfumerie-gold transition-colors">AI Scent Finder</Link>
                            <Link href="/about" className="hover:text-parfumerie-gold transition-colors">Our Story</Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="hover:text-parfumerie-gold">
                            <Search className="h-5 w-5" />
                            <span className="sr-only">Search</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:text-parfumerie-gold relative" onClick={() => setIsCartOpen(true)}>
                            <ShoppingBag className="h-5 w-5" />
                            <span className="sr-only">Cart</span>
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 h-3 w-3 flex items-center justify-center rounded-full bg-parfumerie-gold text-[10px] text-parfumerie-black font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </Button>
                        <Button variant="ghost" size="icon" className="md:hidden hover:text-parfumerie-gold">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Menu</span>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
