"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Tag, Trash2 } from "lucide-react";

type Offer = {
    id: string;
    code: string;
    discount: string; // e.g. "20%" or "$10"
    status: "Active" | "Expired";
};

const initialOffers: Offer[] = [
    { id: "1", code: "WELCOME10", discount: "10%", status: "Active" },
    { id: "2", code: "SUMMER25", discount: "25%", status: "Expired" },
    { id: "3", code: "GOLDVIP", discount: "$50", status: "Active" },
];

export default function AdminOffersPage() {
    const [offers, setOffers] = useState<Offer[]>(initialOffers);

    const handleDelete = (id: string) => {
        setOffers(offers.filter(o => o.id !== id));
        toast.success("Offer removed");
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Offers & Pricing</h1>
                    <p className="text-gray-500">Manage discount codes and special pricing.</p>
                </div>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" /> New Offer
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map((offer) => (
                    <div key={offer.id} className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-6 shadow-sm flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                                <div className="bg-parfumerie-gold/10 p-2 rounded-md">
                                    <Tag className="w-5 h-5 text-parfumerie-gold" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{offer.code}</h3>
                                    <p className="text-sm text-gray-500">{offer.discount} Off</p>
                                </div>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${offer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {offer.status}
                            </span>
                        </div>

                        <div className="flex gap-2 mt-4">
                            <Button variant="outline" className="flex-1 text-xs">Edit</Button>
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(offer.id)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}

                {/* Add New Placeholder */}
                <div className="border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-lg p-6 flex flex-col items-center justify-center text-gray-400 hover:border-parfumerie-gold hover:text-parfumerie-gold transition-colors cursor-pointer min-h-[160px]">
                    <Plus className="w-8 h-8 mb-2" />
                    <span className="font-medium">Create New Campaign</span>
                </div>
            </div>
        </div>
    );
}
