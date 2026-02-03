export type Product = {
    id: string;
    name: string;
    brand: string;
    price: number;
    description: string;
    scentProfile: string; // e.g., Floral, Woody, Oriental
    notes: {
        top: string[];
        heart: string[];
        base: string[];
    };
    image: string;
    isFeatured?: boolean;
};

export const products: Product[] = [
    {
        id: "1",
        name: "Golden Hour",
        brand: "Lumière",
        price: 145,
        description: "A radiant blend of citrus and warm woods, capturing the essence of the setting sun.",
        scentProfile: "Citrus",
        notes: {
            top: ["Bergamot", "Mandarin"],
            heart: ["Neroli", "Jasmine"],
            base: ["Sandalwood", "Amber"],
        },
        image: "/images/perfume-1.jpg",
        isFeatured: true,
    },
    {
        id: "2",
        name: "Midnight Velvet",
        brand: "Noir Absolu",
        price: 180,
        description: "An intoxicating mix of dark florals and rich spices for the mysterious soul.",
        scentProfile: "Oriental",
        notes: {
            top: ["Black Pepper", "Plum"],
            heart: ["Black Rose", "Clove"],
            base: ["Vanilla", "Patchouli"],
        },
        image: "/images/perfume-2.jpg",
        isFeatured: true,
    },
    {
        id: "3",
        name: "Oceanic Drift",
        brand: "Aqua Pura",
        price: 120,
        description: "Crisp, clean, and refreshing. A breath of fresh sea air.",
        scentProfile: "Fresh",
        notes: {
            top: ["Sea Salt", "Mint"],
            heart: ["Sage", "Driftwood"],
            base: ["White Musk", "Cedar"],
        },
        image: "/images/perfume-3.jpg",
    },
    {
        id: "4",
        name: "Rose Éternelle",
        brand: "Maison Fleur",
        price: 160,
        description: "A timeless bouquet of roses, reimagined for the modern era.",
        scentProfile: "Floral",
        notes: {
            top: ["Pink Pepper", "Litchi"],
            heart: ["Rose Centifolia", "Peony"],
            base: ["Musk", "Cashmere Wood"],
        },
        image: "/images/perfume-4.jpg",
        isFeatured: true,
    },
    {
        id: "5",
        name: "Oud Mystique",
        brand: "Desert Winds",
        price: 210,
        description: "Deep, resinous, and commanding. A scent for those who lead.",
        scentProfile: "Woody",
        notes: {
            top: ["Cardamom", "Saffron"],
            heart: ["Oud", "Leather"],
            base: ["Vetiver", "Dark Amber"],
        },
        image: "/images/perfume-5.jpg",
    }
];

export const categories = [
    { name: "Floral", image: "/images/cat-floral.jpg" },
    { name: "Woody", image: "/images/cat-woody.jpg" },
    { name: "Fresh", image: "/images/cat-fresh.jpg" },
    { name: "Oriental", image: "/images/cat-oriental.jpg" },
];
