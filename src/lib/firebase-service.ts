import {
    collection,
    getDocs,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp,
    Timestamp
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";

// Re-using the Product type from mock-data for now
import { Product } from "./mock-data";

const COLLECTION_NAME = "products";

export const uploadProductImage = async (file: File): Promise<string> => {
    try {
        console.log("Starting image upload for:", file.name);
        const timestamp = Date.now();
        const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
        const storageRef = ref(storage, `products/${timestamp}_${sanitizedFileName}`);

        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error: any) {
        console.error("Error inside uploadProductImage:", error);
        if (error.code === 'storage/unauthorized') {
            throw new Error("Permission denied: Please check your Firebase Storage security rules.");
        }
        throw error;
    }
};

export const getProducts = async (): Promise<Product[]> => {
    try {
        const qs = await getDocs(collection(db, COLLECTION_NAME));
        return qs.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
    } catch (error: any) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const getProductById = async (id: string): Promise<Product | null> => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Product;
        } else {
            return null;
        }
    } catch (error: any) {
        console.error("Error fetching product by ID:", error);
        throw error;
    }
};

export const addProduct = async (product: Omit<Product, "id">): Promise<string> => {
    try {
        const sanitizedProduct = Object.fromEntries(
            Object.entries(product).filter(([_, v]) => v !== undefined)
        );

        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...sanitizedProduct,
            createdAt: serverTimestamp()
        });

        return docRef.id;
    } catch (error: any) {
        console.error("Error adding product:", error);
        throw error;
    }
};


export const updateProduct = async (id: string, updates: Partial<Product>): Promise<void> => {
    try {
        const sanitizedUpdates = Object.fromEntries(
            Object.entries(updates).filter(([_, v]) => v !== undefined)
        );
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, sanitizedUpdates);
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

export const deleteProduct = async (id: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};

// Featured products query
export const getFeaturedProducts = async (): Promise<Product[]> => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where("isFeatured", "==", true),
            limit(6)
        );
        const qs = await getDocs(q);
        return qs.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
    } catch (error: any) {
        console.error("Error fetching featured products:", error);
        throw error;
    }
};

// Get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where("scentProfile", "==", category)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((d) => ({
            id: d.id,
            ...d.data()
        } as Product));
    } catch (error: any) {
        console.error("Error fetching products by category:", error);
        throw error;
    }
};

// --- Orders & Dashboard ---

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: string;
    customerName: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    items: OrderItem[];
    subtotal: number;
    total: number;
    status: OrderStatus;
    createdAt: any; // Firestore Timestamp
}

const ORDERS_COLLECTION = "orders";

export const createOrder = async (orderData: Omit<Order, "id" | "createdAt" | "status">): Promise<string> => {
    try {
        const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
            ...orderData,
            status: 'Pending',
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
};

export const getOrders = async (): Promise<Order[]> => {
    try {
        const q = query(collection(db, ORDERS_COLLECTION), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Order));
    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
};

export const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<void> => {
    try {
        const docRef = doc(db, ORDERS_COLLECTION, orderId);
        await updateDoc(docRef, { status });
    } catch (error) {
        console.error("Error updating order status:", error);
        throw error;
    }
};

export const getDashboardStats = async () => {
    try {
        // 1. Get all orders
        const ordersSnapshot = await getDocs(collection(db, ORDERS_COLLECTION));
        const orders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));

        // Calculate Total Revenue
        const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

        // Calculate Active Orders
        const activeOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;

        // 2. Get Products count
        const productsSnapshot = await getDocs(collection(db, COLLECTION_NAME));
        const productsCount = productsSnapshot.size;

        return {
            totalRevenue,
            activeOrders,
            totalOrders: orders.length,
            productsCount,
            recentOrders: orders
                .sort((a, b) => {
                    const timeA = a.createdAt?.toMillis?.() || 0;
                    const timeB = b.createdAt?.toMillis?.() || 0;
                    return timeB - timeA;
                })
                .slice(0, 5)
        };
    } catch (error) {
        console.error("Error fetching dashboard stats", error);
        return {
            totalRevenue: 0,
            activeOrders: 0,
            totalOrders: 0,
            productsCount: 0,
            recentOrders: []
        };
    }
};
