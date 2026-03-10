export type Product = {
    id: string;
    name: string;
    brand: string;
    price: number;         // 100ml price (main price)
    price10ml?: number;    // 10ml bottle price
    stockBottles?: number; // 100ml bottles currently in stock
    sold10ml?: number;     // total 10ml units sold (tracked)
    description: string;
    scentProfile: string;
    notes: {
        top: string[];
        heart: string[];
        base: string[];
    };
    image: string;
    isFeatured?: boolean;
    gender?: 'Male' | 'Female' | 'Unisex';
};

export const products: Product[] = [
    {
        id: "1",
        name: "Golden Hour",
        brand: "Lumière",
        price: 14500,
        price10ml: 2500,
        stockBottles: 24,
        sold10ml: 38,
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
        price: 18000,
        price10ml: 3200,
        stockBottles: 12,
        sold10ml: 61,
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
        price: 12000,
        price10ml: 2000,
        stockBottles: 3,
        sold10ml: 19,
        description: "Crisp, clean, and refreshing. A breath of fresh sea air.",
        scentProfile: "Fresh",
        notes: {
            top: ["Sea Salt", "Mint"],
            heart: ["Sage", "Driftwood"],
            base: ["White Musk", "Cedar"],
        },
        image: "/images/perfume-3.jpg",
        isFeatured: true,
    },
    {
        id: "4",
        name: "Rose Éternelle",
        brand: "Maison Fleur",
        price: 16000,
        price10ml: 2800,
        stockBottles: 18,
        sold10ml: 45,
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
        price: 21000,
        price10ml: 3800,
        stockBottles: 2,
        sold10ml: 84,
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
