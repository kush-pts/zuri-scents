"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2, Loader2, Plus, Save, AlertCircle } from "lucide-react";
import { addProduct } from "@/lib/firebase-service";
import { uploadImageAction } from "@/lib/actions";
import type { Product } from "@/lib/mock-data";

export default function AddProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<Product>>({
        name: "",
        brand: "",
        price: 0,
        price10ml: 0,
        stockBottles: 0,
        sold10ml: 0,
        description: "",
        scentProfile: "",
        gender: "Unisex",
        image: "",
        notes: {
            top: [],
            heart: [],
            base: []
        },
        isFeatured: false
    });

    const [uploading, setUploading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [createdProductId, setCreatedProductId] = useState("");


    // Helper to handle nested notes changes
    const handleNoteChange = (type: 'top' | 'heart' | 'base', value: string) => {
        setFormData(prev => ({
            ...prev,
            notes: {
                ...prev.notes!,
                [type]: value.split(',').map(n => n.trim())
            }
        }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        console.log(`Attempting server-side upload: ${file.name}`);

        setUploading(true);
        try {
            // Create FormData for the Server Action
            const uploadData = new FormData();
            uploadData.append("file", file);

            // Call the Server Action
            const result = await uploadImageAction(uploadData);

            if (result.success && result.url) {
                setFormData(prev => ({ ...prev, image: result.url }));
                toast.success("Image uploaded successfully (via server)");
            } else {
                throw new Error(result.error || "Server failed to return a URL");
            }
        } catch (error: any) {
            console.error("Error in handleImageUpload:", error);
            toast.error(`Upload Failed: ${error.message}`, {
                duration: 5000,
            });
        } finally {
            setUploading(false);
            e.target.value = '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatusMessage("Validating product data...");
        console.log("Submitting form data:", formData);

        try {
            // Validate fields
            const errors = [];
            if (!formData.name?.trim()) errors.push("Product Name");
            if (!formData.brand?.trim()) errors.push("Brand");
            if (formData.price === undefined || Number.isNaN(Number(formData.price))) errors.push("Price");

            if (!formData.image) errors.push("Product Image");

            if (errors.length > 0) {
                console.warn("Validation failed for fields:", errors);
                toast.error(`Please fill in required fields: ${errors.join(", ")}`);
                setLoading(false);
                return;
            }

            const finalData = {
                ...formData
            };

            setStatusMessage("Saving product to database...");
            // Cast to Product (omitting ID since it's generated)
            const id = await addProduct(finalData as Omit<Product, "id">);
            console.log("Product added with ID:", id);



            setCreatedProductId(id);
            setIsSuccess(true);
            toast.success("Product added successfully");
            // router.push("/admin/products"); // Removed for success screen
        } catch (error: any) {
            console.error("Error submitting form:", error);
            if (error.code === 'permission-denied') {
                toast.error("You do not have permission. Please try logging in again.");
            } else {
                toast.error("Failed to add product. Check console for details.");
            }
        } finally {
            setLoading(false);
            setStatusMessage("");
        }
    };

    const resetForm = () => {
        setIsSuccess(false);
        setFormData({
            name: "",
            brand: "",
            price: 0,
            price10ml: 0,
            stockBottles: 0,
            sold10ml: 0,
            description: "",
            scentProfile: "",
            gender: "Unisex",
            image: "",
            notes: {
                top: [],
                heart: [],
                base: []
            },
            isFeatured: false
        });
    };

    if (isSuccess) {
        return (
            <div className="max-w-2xl mx-auto py-12 px-4 text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                        <h1 className="text-3xl font-serif font-bold text-white">Product Accepted!</h1>
                    </div>
                    <p className="text-white/60">
                        <span className="font-semibold text-white">{formData.name}</span> by {formData.brand} has been added to your collection.
                    </p>
                </div>

                <div className="bg-black border border-white/10 rounded-xl p-6 flex items-center gap-6 text-left">
                    {formData.image && (
                        <div className="w-24 h-24 rounded-lg bg-white/5 overflow-hidden flex-shrink-0">
                            <img src={formData.image} alt={formData.name} className="w-full h-full object-contain" />
                        </div>
                    )}
                    <div className="flex-1">
                        <div className="text-xs text-parfumerie-gold font-bold uppercase tracking-wider mb-1">{formData.scentProfile}</div>
                        <div className="text-lg font-bold text-white">{formData.name}</div>
                        <div className="text-sm text-white/60">KSh {formData.price?.toLocaleString()}</div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button onClick={resetForm} variant="outline" className="w-full sm:w-auto gap-2 border-white/20 text-white hover:bg-white/10">
                        <Plus className="w-4 h-4" />
                        Add Another
                    </Button>
                    <Link href="/admin/products" className="w-full sm:w-auto">
                        <Button className="w-full gap-2 bg-primary hover:bg-primary/90 text-black font-bold border-none">
                            View All Products
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/products">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </Link>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-serif font-bold text-white">Add New Product</h1>
                    </div>
                    <p className="text-white/60 text-sm">Create a new fragrance listing.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-black p-6 rounded-lg border border-white/10 shadow-sm">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Product Name *</label>
                        <Input
                            required
                            className="border-white/10 bg-[#0a0a0a] text-white"
                            placeholder="e.g. Midnight Bloom"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Brand *</label>
                        <Input
                            required
                            className="border-white/10 bg-[#0a0a0a] text-white"
                            placeholder="e.g. Zuri Scents"
                            value={formData.brand}
                            onChange={e => setFormData({ ...formData, brand: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Price — 100ml (KSh) *</label>
                        <Input
                            type="number"
                            required
                            className="border-white/10 bg-[#0a0a0a] text-white"
                            placeholder="e.g. 14500"
                            value={Number.isNaN(Number(formData.price)) ? "" : formData.price}
                            onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Price — 10ml (KSh)</label>
                        <Input
                            type="number"
                            className="border-white/10 bg-[#0a0a0a] text-white"
                            placeholder="e.g. 2500"
                            value={Number.isNaN(Number(formData.price10ml)) ? "" : formData.price10ml}
                            onChange={e => setFormData({ ...formData, price10ml: parseFloat(e.target.value) })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Initial Stock (100ml bottles)</label>
                        <Input
                            type="number"
                            className="border-white/10 bg-[#0a0a0a] text-white"
                            placeholder="e.g. 24"
                            value={Number.isNaN(Number(formData.stockBottles)) ? "" : formData.stockBottles}
                            onChange={e => setFormData({ ...formData, stockBottles: parseInt(e.target.value) || 0 })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Scent Profile</label>
                        <Input
                            className="border-white/10 bg-[#0a0a0a] text-white"
                            placeholder="e.g. Floral, Woody, Fresh"
                            value={formData.scentProfile}
                            onChange={e => setFormData({ ...formData, scentProfile: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">Target Gender</label>
                        <select
                            className="flex h-10 w-full rounded-md border border-white/10 bg-[#0a0a0a] px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                            value={formData.gender || "Unisex"}
                            onChange={e => setFormData({ ...formData, gender: e.target.value as any })}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Unisex">Unisex / Both</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Description</label>
                    <textarea
                        className="flex min-h-[80px] w-full rounded-md border border-white/10 bg-[#0a0a0a] px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                        placeholder="Describe the fragrance..."
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Product Image</label>
                    <div className="flex flex-col gap-4">
                        {formData.image && (
                            <div className="relative w-full h-48 bg-[#0a0a0a] rounded-lg overflow-hidden border border-white/5">
                                <img src={formData.image} alt="Preview" className="w-full h-full object-contain" />
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploading}
                                className="border-white/10 bg-[#0a0a0a] text-white/80"
                            />
                            {uploading && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
                        </div>
                        <p className="text-xs text-white/40">Upload a product image (JPG, PNG).</p>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-4 mt-2">
                    <h3 className="text-sm font-semibold mb-3 text-white">Fragrance Notes (comma separated)</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs uppercase text-white/40">Top Notes</label>
                            <Input
                                className="border-white/10 bg-[#0a0a0a] text-white"
                                placeholder="Bergamot, Lemon, Pear..."
                                onChange={e => handleNoteChange('top', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase text-white/40">Heart Notes</label>
                            <Input
                                className="border-white/10 bg-[#0a0a0a] text-white"
                                placeholder="Jasmine, Rose, Orchid..."
                                onChange={e => handleNoteChange('heart', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase text-white/40">Base Notes</label>
                            <Input
                                className="border-white/10 bg-[#0a0a0a] text-white"
                                placeholder="Vanilla, Musk, Amber..."
                                onChange={e => handleNoteChange('base', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="isFeatured"
                        checked={formData.isFeatured}
                        onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                        className="rounded border-white/20 bg-black text-parfumerie-gold focus:ring-parfumerie-gold"
                    />
                    <label htmlFor="isFeatured" className="text-sm text-white/80">Feature this product on homepage</label>
                </div>

                <div className="flex justify-end pt-4 border-t border-white/10 mt-6 pt-6">
                    <Button type="submit" disabled={loading} className="w-full md:w-auto gap-2 bg-primary hover:bg-primary/90 text-black font-bold border-none">
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin text-black" />
                                {statusMessage || "Saving..."}
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Save Product
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
