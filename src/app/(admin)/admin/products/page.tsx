"use client";

import { useState } from "react";
import { products as initialProducts } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Search } from "lucide-react";

// Since I haven't installed `shadcn` table, I will use manual Tailwind table or quick divs.
// Actually, `shadcn` table is just `rafc` with styles. I'll implement a simple one here or use standard HTML table for speed if I don't want to add more components.
// To keep it premium, I'll write a clean table using standard HTML with Tailwind classes matching the design.

export default function AdminProductsPage() {
    const [products, setProducts] = useState(initialProducts);
    const [searchTerm, setSearchTerm] = useState("");

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this product?")) {
            setProducts(products.filter(p => p.id !== id));
            toast.success("Product deleted successfully");
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Inventory</h1>
                    <p className="text-gray-500">Manage your perfume catalog.</p>
                </div>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" /> Add Product
                </Button>
            </div>

            <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm">
                <Search className="w-5 h-5 text-gray-400" />
                <Input
                    placeholder="Search products..."
                    className="border-none shadow-none focus-visible:ring-0 px-0 h-auto"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-zinc-800/50 text-gray-500 font-medium border-b border-gray-200 dark:border-zinc-800">
                            <tr>
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4">Brand</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Stock</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{product.name}</td>
                                    <td className="px-6 py-4 text-gray-500">{product.brand}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-parfumerie-gold/10 text-parfumerie-gold">
                                            {product.scentProfile}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-serif">${product.price}</td>
                                    <td className="px-6 py-4 text-gray-500">124</td> {/* Mock stock */}
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600">
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-600" onClick={() => handleDelete(product.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredProducts.length === 0 && (
                        <div className="p-12 text-center text-gray-500">
                            No products found matching "{searchTerm}"
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
