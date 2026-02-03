import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { products, categories } from "@/lib/mock-data";

export default function LandingPage() {
    const featuredProducts = products.filter(p => p.isFeatured);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center bg-parfumerie-black text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 z-10" />
                {/* Placeholder for Hero Image */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2504&auto=format&fit=crop')] bg-cover bg-center opacity-50" />

                <div className="relative z-20 container mx-auto px-4">
                    <h1 className="text-5xl md:text-7xl font-serif text-parfumerie-cream mb-6 tracking-tight animate-fade-in-up">
                        Discover Your <span className="text-parfumerie-gold">Signature Scent</span>
                    </h1>
                    <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-light">
                        Experience the art of perfumery with our AI-powered recommendation engine, tailored to find the fragrance that speaks to your soul.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/recommender">
                            <Button size="lg" className="min-w-[200px] text-lg bg-parfumerie-gold hover:bg-parfumerie-gold-dark text-black border-none">
                                Start AI Quiz
                            </Button>
                        </Link>
                        <Link href="/shop">
                            <Button size="lg" variant="outline" className="min-w-[200px] text-lg border-parfumerie-cream text-parfumerie-cream hover:bg-parfumerie-cream hover:text-black">
                                Explore Collection
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Collection */}
            <section className="py-20 bg-parfumerie-cream dark:bg-zinc-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-parfumerie-black dark:text-parfumerie-gold mb-4">Curated Excellence</h2>
                        <p className="text-parfumerie-gray">Our most coveted fragrances, hand-picked for the season.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredProducts.map((product) => (
                            <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300 border-none shadow-md overflow-hidden">
                                <div className="relative h-64 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                                    {/* Placeholder for Product Image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200">
                                        [Image: {product.name}]
                                    </div>
                                </div>
                                <CardHeader className="text-center pb-2">
                                    <span className="text-xs uppercase tracking-widest text-parfumerie-gray mb-1">{product.brand}</span>
                                    <CardTitle className="text-xl group-hover:text-parfumerie-gold transition-colors">{product.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center pb-4">
                                    <p className="text-parfumerie-black dark:text-white font-serif italic">${product.price}</p>
                                </CardContent>
                                <CardFooter className="justify-center pt-0 pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Link href={`/product/${product.id}`}>
                                        <Button variant="secondary" size="sm">View Details</Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-20 bg-white dark:bg-black">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-parfumerie-black dark:text-parfumerie-gold mb-12">Shop by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {categories.map((cat) => (
                            <Link key={cat.name} href={`/shop?category=${cat.name}`} className="group relative h-40 md:h-60 overflow-hidden rounded-lg">
                                <div className="absolute inset-0 bg-parfumerie-black/40 group-hover:bg-parfumerie-black/20 transition-colors z-10" />
                                <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                                    [Img: {cat.name}]
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center z-20">
                                    <span className="text-white text-xl md:text-2xl font-serif font-bold tracking-wider group-hover:scale-110 transition-transform">{cat.name}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
