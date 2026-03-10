"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { getProducts, deleteProduct, updateProduct } from "@/lib/firebase-service";
import type { Product } from "@/lib/mock-data";

type SortKey = "name" | "stock" | "sold10ml" | "price";

export default function AdminInventoryPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const [adjustingId, setAdjustingId] = useState<string | null>(null);
    const [sortKey, setSortKey] = useState<SortKey>("name");

    const fetchProducts = async () => {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this product permanently?")) return;
        try {
            await deleteProduct(id);
            setProducts(products.filter(p => p.id !== id));
            toast.success("Product deleted");
        } catch { toast.error("Failed to delete product"); }
    };

    const adjustStock = async (id: string, delta: number) => {
        setAdjustingId(id);
        try {
            const product = products.find(p => p.id === id);
            if (!product) return;
            const newStock = Math.max(0, (product.stockBottles ?? 0) + delta);
            await updateProduct(id, { stockBottles: newStock });
            setProducts(prev => prev.map(p => p.id === id ? { ...p, stockBottles: newStock } : p));
            toast.success(`Stock ${delta > 0 ? "added" : "removed"}: ${Math.abs(delta)} bottle(s)`);
        } catch { toast.error("Stock update failed"); }
        finally { setAdjustingId(null); }
    };

    const filteredProducts = products
        .filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortKey === "stock") return (a.stockBottles ?? 0) - (b.stockBottles ?? 0);
            if (sortKey === "sold10ml") return (b.sold10ml ?? 0) - (a.sold10ml ?? 0);
            if (sortKey === "price") return b.price - a.price;
            return a.name.localeCompare(b.name);
        });

    const totalStock = products.reduce((sum, p) => sum + (p.stockBottles ?? 0), 0);
    const lowStockCount = products.filter(p => (p.stockBottles ?? 0) <= 3).length;
    const total10mlSold = products.reduce((sum, p) => sum + (p.sold10ml ?? 0), 0);

    return (
        <div className="space-y-6 text-white">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold">Inventory</h1>
                    </div>
                    <p className="text-white/40 text-sm mt-0.5">Monitor and manage your fragrance stock</p>
                </div>
                <Link href="/admin/products/add">
                    <button className="bg-white text-black font-bold px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-white/90 transition-colors text-sm">
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        Add Product
                    </button>
                </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: "Total Bottles in Stock", value: totalStock, icon: "inventory_2", color: "text-blue-400", bg: "bg-blue-900/20" },
                    { label: "Low Stock Alerts", value: lowStockCount, icon: "warning", color: "text-red-400", bg: "bg-red-900/20" },
                    { label: "Total 10ml Units Sold", value: total10mlSold, icon: "sell", color: "text-green-400", bg: "bg-green-900/20" },
                ].map(({ label, value, icon, color, bg }) => (
                    <div key={label} className="bg-[#111] border border-white/5 rounded-2xl p-5 flex items-center gap-4">
                        <div className={`${bg} w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <span className={`material-symbols-outlined ${color} text-[20px]`} style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                        </div>
                        <div>
                            <p className="text-white/40 text-[10px] uppercase tracking-wider">{label}</p>
                            <p className="text-xl font-bold">{value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search + Sort */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-2 bg-[#111] border border-white/5 rounded-xl px-4 py-2.5 flex-1">
                    <span className="material-symbols-outlined text-white/30 text-[18px]">search</span>
                    <input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="bg-transparent text-sm text-white placeholder-white/30 focus:outline-none flex-1"
                    />
                </div>
                <select
                    value={sortKey}
                    onChange={e => setSortKey(e.target.value as SortKey)}
                    className="bg-[#111] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white/60 focus:outline-none focus:border-primary appearance-none transition-colors"
                >
                    <option value="name">Sort: Name</option>
                    <option value="stock">Sort: Stock (Low → High)</option>
                    <option value="sold10ml">Sort: 10ml Sold</option>
                    <option value="price">Sort: Price</option>
                </select>
            </div>

            {/* Products Table */}
            <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-7 h-7 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-white/30 text-[10px] uppercase tracking-wider border-b border-white/5">
                                    <th className="text-left px-6 py-4 font-medium">Product</th>
                                    <th className="text-left px-6 py-4 font-medium">Category</th>
                                    <th className="text-left px-6 py-4 font-medium">Stock Remaining</th>
                                    <th className="text-left px-6 py-4 font-medium">Adjust Stock</th>
                                    <th className="text-left px-6 py-4 font-medium">100ml Price</th>
                                    <th className="text-left px-6 py-4 font-medium">10ml Price</th>
                                    <th className="text-left px-6 py-4 font-medium">10ml Sold</th>
                                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredProducts.map((product) => {
                                    const stock = product.stockBottles ?? 0;
                                    const maxStock = 50;
                                    const pct = Math.min(100, Math.round((stock / maxStock) * 100));
                                    const isLow = stock <= 3;
                                    const isMedium = stock > 3 && stock <= 10;
                                    const barColor = isLow ? "bg-red-500" : isMedium ? "bg-amber-500" : "bg-green-500";
                                    const textColor = isLow ? "text-red-400" : isMedium ? "text-amber-400" : "text-green-400";

                                    return (
                                        <tr key={product.id} className="hover:bg-white/[0.02] transition-colors">
                                            {/* Product */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-[#1a1a1a] rounded-xl overflow-hidden flex-shrink-0">
                                                        {product.image && <img src={product.image} alt={product.name} className="w-full h-full object-cover" />}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-white truncate max-w-[12rem]">{product.name}</p>
                                                        <p className="text-white/40 text-xs">{product.brand}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Category */}
                                            <td className="px-6 py-4">
                                                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2.5 py-1 rounded-full">{product.scentProfile}</span>
                                            </td>

                                            {/* Stock Bar */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-28 h-2 bg-white/10 rounded-full overflow-hidden">
                                                        <div className={`h-full rounded-full ${barColor} transition-all`} style={{ width: `${pct}%` }} />
                                                    </div>
                                                    <div>
                                                        <span className={`text-xs font-bold ${textColor}`}>{stock} left</span>
                                                        {isLow && <p className="text-red-400 text-[9px] font-bold uppercase tracking-wider">LOW STOCK!</p>}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Stock Controls */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => adjustStock(product.id, -1)}
                                                        disabled={adjustingId === product.id || stock === 0}
                                                        className="w-7 h-7 bg-red-900/20 text-red-400 rounded-lg flex items-center justify-center hover:bg-red-900/40 transition-colors disabled:opacity-30 text-lg leading-none"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="min-w-[2rem] text-center text-sm font-bold">{stock}</span>
                                                    <button
                                                        onClick={() => adjustStock(product.id, 1)}
                                                        disabled={adjustingId === product.id}
                                                        className="w-7 h-7 bg-green-900/20 text-green-400 rounded-lg flex items-center justify-center hover:bg-green-900/40 transition-colors disabled:opacity-30 text-lg leading-none"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>

                                            {/* 100ml Price */}
                                            <td className="px-6 py-4 font-medium">
                                                KES {product.price.toLocaleString()}
                                            </td>

                                            {/* 10ml Price */}
                                            <td className="px-6 py-4">
                                                <span className="text-primary font-medium">
                                                    {product.price10ml ? `KES ${product.price10ml.toLocaleString()}` : <span className="text-white/30">—</span>}
                                                </span>
                                            </td>

                                            {/* 10ml Sold */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="material-symbols-outlined text-green-400 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>sell</span>
                                                    <span className="text-green-400 font-bold">{product.sold10ml ?? 0}</span>
                                                    <span className="text-white/30 text-xs">units</span>
                                                </div>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <Link href={`/admin/products/edit/${product.id}`}>
                                                        <button className="w-8 h-8 bg-white/5 text-white/60 rounded-lg flex items-center justify-center hover:text-white hover:bg-white/10 transition-colors">
                                                            <span className="material-symbols-outlined text-[15px]">edit</span>
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="w-8 h-8 bg-red-900/10 text-red-400/60 rounded-lg flex items-center justify-center hover:text-red-400 hover:bg-red-900/20 transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined text-[15px]">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {!loading && filteredProducts.length === 0 && (
                            <div className="py-16 text-center text-white/30">
                                <span className="material-symbols-outlined text-5xl mb-3 block">inventory_2</span>
                                No products found{searchTerm && ` matching "${searchTerm}"`}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
