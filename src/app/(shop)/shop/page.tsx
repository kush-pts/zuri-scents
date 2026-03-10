import Link from "next/link";
import { categories } from "@/lib/mock-data";
import { getProducts, getProductsByCategory } from "@/lib/firebase-service";
import { ProductCard } from "@/components/shop/product-card";

function FilterContent({ selectedCategory, selectedGender }: { selectedCategory?: string, selectedGender?: string }) {
    return (
        <>
            {/* Collections */}
            <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-white/30 mb-4">COLLECTIONS</p>
                <ul className="space-y-3">
                    <li>
                        <Link
                            href="/shop"
                            className={`text-sm transition-colors flex items-center gap-2.5 ${!selectedCategory ? 'font-bold text-primary' : 'text-white/50 hover:text-white'}`}
                        >
                            {!selectedCategory && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
                            All Fragrances
                        </Link>
                    </li>
                    {categories.map((cat) => (
                        <li key={cat.name}>
                            <Link
                                href={`/shop?category=${cat.name}`}
                                className={`text-sm transition-colors flex items-center gap-2.5 ${selectedCategory === cat.name ? 'font-bold text-primary' : 'text-white/50 hover:text-white'}`}
                            >
                                {selectedCategory === cat.name && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
                                {cat.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Gender */}
            <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-white/30 mb-4">GENDER</p>
                <ul className="space-y-3">
                    {["Male", "Female", "Unisex"].map((gender) => {
                        const params = new URLSearchParams();
                        if (selectedCategory) params.set('category', selectedCategory);
                        if (selectedGender !== gender) params.set('gender', gender);
                        const href = `/shop?${params.toString()}`;

                        return (
                            <li key={gender}>
                                <Link
                                    href={href}
                                    className={`text-sm transition-colors flex items-center gap-2.5 ${selectedGender === gender ? 'font-bold text-primary' : 'text-white/50 hover:text-white'}`}
                                >
                                    {selectedGender === gender && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
                                    {gender} Fragrances
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Price Range */}
            <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-white/30 mb-4">PRICE RANGE</p>
                <div className="flex justify-between text-xs text-white/40 mb-3">
                    <span>KES 0</span>
                    <span>KES 30,000+</span>
                </div>
                <input type="range" className="w-full accent-primary appearance-none h-0.5 bg-white/10 rounded outline-none" />
            </div>

            {/* Size Filter */}
            <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-white/30 mb-4">SIZE</p>
                <div className="flex gap-2">
                    {["10ml", "100ml"].map((size) => (
                        <button key={size} className="border border-white/10 text-white/50 text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg hover:border-primary hover:text-primary transition-colors">
                            {size}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}

export default async function ShopPage(props: {
    searchParams: Promise<{ category?: string, sort?: string, gender?: string }>
}) {
    const searchParams = await props.searchParams;
    const selectedCategory = searchParams.category;
    const selectedGender = searchParams.gender;

    let preFilteredProducts;
    if (selectedCategory) {
        preFilteredProducts = await getProductsByCategory(selectedCategory);
    } else {
        preFilteredProducts = await getProducts();
    }

    const filteredProducts = preFilteredProducts.filter(p => {
        if (!selectedGender) return true;
        return p.gender === selectedGender || p.gender === 'Unisex';
    });


    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white font-sans">
            <div className="max-w-screen-xl mx-auto px-5 sm:px-10 py-10">
                {/* Header */}
                <div className="mb-10 pb-7 border-b border-white/5">
                    <h1 className="text-3xl md:text-4xl font-light mb-1">
                        {selectedCategory ? (
                            <>Shop <span className="font-serif italic text-primary">{selectedCategory}</span></>
                        ) : (
                            <>Our <span className="font-serif italic text-primary">Fragrances</span></>
                        )}
                    </h1>
                    <p className="text-white/40 text-sm mt-1">
                        {filteredProducts.length} masterfully crafted creations
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-10">
                    {/* Mobile Filters Accordion */}
                    <div className="md:hidden">
                        <details className="group bg-[#111] border border-white/5 rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden">
                            <summary className="font-bold text-xs uppercase tracking-widest flex items-center justify-between cursor-pointer text-white">
                                Filter Collection
                                <span className="material-symbols-outlined transition-transform duration-300 group-open:-rotate-180">expand_more</span>
                            </summary>
                            <div className="pt-6 space-y-8 border-t border-white/5 mt-4">
                                <FilterContent selectedCategory={selectedCategory} selectedGender={selectedGender} />
                            </div>
                        </details>
                    </div>

                    {/* Desktop Sidebar */}
                    <aside className="hidden md:block w-52 shrink-0 space-y-8">
                        <FilterContent selectedCategory={selectedCategory} selectedGender={selectedGender} />
                    </aside>


                    {/* Grid */}
                    <div className="flex-1">
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/5">
                                <span className="material-symbols-outlined text-4xl text-white/20 mb-3 block">search_off</span>
                                <p className="text-white/40 text-sm mb-5">No fragrances found in this collection.</p>
                                <Link href="/shop">
                                    <button className="border border-primary/40 text-primary text-[10px] font-extrabold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-primary hover:text-black transition-all">
                                        View All Fragrances
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={{ ...product, imageUrl: product.image || '' }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
