"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { getProductById, updateProduct } from "@/lib/firebase-service";
import { uploadImageAction } from "@/lib/actions";
import type { Product } from "@/lib/mock-data";

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<Partial<Product>>({
        name: "",
        brand: "",
        price: 0,
        description: "",
        scentProfile: "",
        image: "",
        notes: { top: [], heart: [], base: [] },
        isFeatured: false
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await getProductById(id);
                if (product) {
                    setFormData(product);
                } else {
                    toast.error("Product not found");
                    router.push("/admin/products");
                }
            } catch (error) {
                console.error(error);
                toast.error("Error fetching product");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id, router]);

    const [uploading, setUploading] = useState(false);

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
        setSaving(true);

        try {
            await updateProduct(id, formData);
            toast.success("Product updated successfully");
            router.push("/admin/products");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update product");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-parfumerie-gold" />
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
                    <h1 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">Edit Product</h1>
                    <p className="text-gray-500 text-sm">Update product details.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Product Name *</label>
                        <Input
                            required
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Brand *</label>
                        <Input
                            required
                            value={formData.brand}
                            onChange={e => setFormData({ ...formData, brand: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Price (KSh) *</label>
                        <Input
                            type="number"
                            required
                            value={Number.isNaN(Number(formData.price)) ? "" : formData.price}
                            onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Scent Profile</label>
                        <Input
                            value={formData.scentProfile}
                            onChange={e => setFormData({ ...formData, scentProfile: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Product Image</label>
                    <div className="flex flex-col gap-4">
                        {formData.image && (
                            <div className="relative w-full h-48 bg-gray-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
                                <img src={formData.image} alt="Preview" className="w-full h-full object-contain" />
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploading}
                            />
                            {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
                        </div>
                        <p className="text-xs text-gray-500">Upload a new image to replace the current one.</p>
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-zinc-800 PT-4">
                    <h3 className="text-sm font-semibold mb-3">Fragrance Notes (comma separated)</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs uppercase text-gray-500">Top Notes</label>
                            <Input
                                value={formData.notes?.top?.join(', ') || ''}
                                onChange={e => handleNoteChange('top', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase text-gray-500">Heart Notes</label>
                            <Input
                                value={formData.notes?.heart?.join(', ') || ''}
                                onChange={e => handleNoteChange('heart', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase text-gray-500">Base Notes</label>
                            <Input
                                value={formData.notes?.base?.join(', ') || ''}
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
                        className="rounded border-gray-300 text-parfumerie-gold focus:ring-parfumerie-gold"
                    />
                    <label htmlFor="isFeatured" className="text-sm">Feature this product on homepage</label>
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={saving} className="w-full md:w-auto gap-2">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
}
