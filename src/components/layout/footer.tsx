import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-parfumerie-gold/20 bg-parfumerie-cream dark:bg-zinc-900">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <span className="text-xl font-serif font-bold text-parfumerie-gold">Parfumerie</span>
                        <p className="mt-4 text-sm text-parfumerie-gray max-w-xs">
                            Curating exquiste fragrances for the discerning individual. Powered by intelligent scent discovery.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold tracking-wider text-parfumerie-black dark:text-parfumerie-gold uppercase">Shop</h3>
                        <ul className="mt-4 space-y-2 text-sm text-parfumerie-gray">
                            <li><Link href="/shop/new" className="hover:text-parfumerie-gold">New Arrivals</Link></li>
                            <li><Link href="/shop/bestsellers" className="hover:text-parfumerie-gold">Bestsellers</Link></li>
                            <li><Link href="/shop/brands" className="hover:text-parfumerie-gold">Brands</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold tracking-wider text-parfumerie-black dark:text-parfumerie-gold uppercase">Company</h3>
                        <ul className="mt-4 space-y-2 text-sm text-parfumerie-gray">
                            <li><Link href="/about" className="hover:text-parfumerie-gold">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-parfumerie-gold">Contact</Link></li>
                            <li><Link href="/privacy" className="hover:text-parfumerie-gold">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-parfumerie-gold/10 pt-8 text-center text-sm text-parfumerie-gray">
                    &copy; {new Date().getFullYear()} Parfumerie. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
