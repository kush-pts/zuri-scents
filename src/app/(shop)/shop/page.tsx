import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { products, categories } from "@/lib/mock-data";

export default async function ShopPage(props: {
    searchParams: Promise<{ category?: string, sort?: string }>
}) {
    const searchParams = await props.searchParams;
    const selectedCategory = searchParams.category;

    // Basic filtering logic
    let filteredProducts = products;
    if (selectedCategory) {
        filteredProducts = products.filter(p => p.scentProfile.toLowerCase() === selectedCategory?.toLowerCase() ||
            categories.some(c => c.name.toLowerCase() === selectedCategory.toLowerCase() && p.scentProfile.includes(c.name)));
        // Note: My mock data has "scentProfile" like "Floral", matching categories. 
        // Just a simple match for now.
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 space-y-8">
                    <div>
                        <h3 className="text-lg font-serif font-semibold mb-4 text-parfumerie-gold">Categories</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/shop" className={`text-sm hover:text-parfumerie-gold ${!selectedCategory ? 'font-bold text-parfumerie-gold' : 'text-parfumerie-gray'}`}>
                                    All Fragrances
                                </Link>
                            </li>
                            {categories.map((cat) => (
                                <li key={cat.name}>
                                    <Link href={`/shop?category=${cat.name}`} className={`text-sm hover:text-parfumerie-gold ${selectedCategory === cat.name ? 'font-bold text-parfumerie-gold' : 'text-parfumerie-gray'}`}>
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Placeholder for more filters */}
                    <div>
                        <h3 className="text-lg font-serif font-semibold mb-4 text-parfumerie-gold">Price</h3>
                        <div className="flex gap-2 text-sm text-parfumerie-gray">
                            <span>$0</span> - <span>$300+</span>
                        </div>
                        <input type="range" className="w-full mt-2 accent-parfumerie-gold" />
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-serif font-bold">{selectedCategory || "All Fragrances"}</h1>
                        <span className="text-sm text-parfumerie-gray">{filteredProducts.length} Products</span>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 dark:bg-zinc-900 rounded-lg">
                            <p className="text-parfumerie-gray">No perfumes found in this category.</p>
                            <Button variant="link" className="mt-2 text-parfumerie-gold">Clear Filters</Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-parfumerie-gold/10">
                                    <div className="relative h-60 bg-gray-100 dark:bg-zinc-800 overflow-hidden rounded-t-lg">
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                            [Image: {product.name}]
                                        </div>
                                    </div>
                                    <CardHeader className="pb-2">
                                        <p className="text-xs text-parfumerie-gold font-medium uppercase tracking-wider">{product.brand}</p>
                                        <CardTitle className="text-lg">{product.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pb-2">
                                        <p className="text-sm text-parfumerie-gray line-clamp-2">{product.description}</p>
                                    </CardContent>
                                    <CardFooter className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-zinc-800">
                                        <span className="font-serif font-semibold">${product.price}</span>
                                        <Link href={`/product/${product.id}`}>
                                            <Button size="sm" variant="secondary">Details</Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
