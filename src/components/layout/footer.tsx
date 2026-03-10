import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-accent-green dark:bg-black text-slate-400 py-20 px-6 md:px-20 border-t border-primary/20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3 text-primary">
                        <div className="size-6">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold uppercase tracking-widest text-white">Zuri</h2>
                    </div>
                    <p className="text-sm font-light leading-relaxed">Luxury perfumery born in Kenya, crafted for the world. Capturing the spirit of the savannah and the pulse of the city.</p>
                </div>
                <div>
                    <h4 className="text-white font-bold uppercase text-xs tracking-[0.2em] mb-8">Boutique</h4>
                    <ul className="flex flex-col gap-4 text-sm">
                        <li><Link href="/shop?category=Men" className="hover:text-primary transition-colors">Men's Collection</Link></li>
                        <li><Link href="/shop?category=Women" className="hover:text-primary transition-colors">Women's Collection</Link></li>
                        <li><Link href="/shop?category=Discovery" className="hover:text-primary transition-colors">Discovery Sets</Link></li>
                        <li><Link href="/shop" className="hover:text-primary transition-colors">Gift Cards</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold uppercase text-xs tracking-[0.2em] mb-8">Maison Zuri</h4>
                    <ul className="flex flex-col gap-4 text-sm">
                        <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Sustainability</Link></li>
                        <li><Link href="/recommender" className="hover:text-primary transition-colors">Fragrance Finder</Link></li>
                        <li><Link href="#" className="hover:text-primary transition-colors">Store Locator</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold uppercase text-xs tracking-[0.2em] mb-8">Contact</h4>
                    <p className="text-sm mb-4">Nairobi Boutique: Village Market, Unit 42</p>
                    <p className="text-sm mb-4">Email: concierge@zuriperfumes.co.ke</p>
                    <div className="flex gap-4 mt-6">
                        <a href="#" className="size-8 rounded-full border border-primary/30 flex items-center justify-center hover:bg-primary hover:text-background-dark transition-all">
                            <span className="material-symbols-outlined text-sm">language</span>
                        </a>
                        <a href="#" className="size-8 rounded-full border border-primary/30 flex items-center justify-center hover:bg-primary hover:text-background-dark transition-all">
                            <span className="material-symbols-outlined text-sm">share</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-20 pt-8 border-t border-primary/10 text-[10px] uppercase tracking-widest flex justify-between max-w-7xl mx-auto">
                <p>© {new Date().getFullYear()} Zuri Luxury Fragrances. All Rights Reserved.</p>
                <div className="flex gap-8">
                    <Link href="#">Privacy Policy</Link>
                    <Link href="#">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
