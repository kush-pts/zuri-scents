"use client";

import { useState, useEffect } from "react";
import { getOrders, updateOrderStatus, Order, OrderStatus } from "@/lib/firebase-service";
import { Loader2, Search, Package, MapPin, Mail, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const STATUS_COLORS: Record<OrderStatus, string> = {
    'Pending': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    'Processing': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'Shipped': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    'Delivered': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'Cancelled': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
};

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchOrders = async () => {
        setLoading(true);
        const data = await getOrders();
        setOrders(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
            toast.success(`Order ${orderId.slice(0, 8)} marked as ${newStatus}`);
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const filteredOrders = orders.filter(o =>
        o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Orders</h1>
                <p className="text-gray-500">Manage incoming orders and fulfillment.</p>
            </div>

            <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm">
                <Search className="w-5 h-5 text-gray-400" />
                <Input
                    placeholder="Search by order ID, name, or email..."
                    className="border-none shadow-none focus-visible:ring-0 px-0 h-auto"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex justify-center items-center p-12">
                        <Loader2 className="w-8 h-8 animate-spin text-parfumerie-gold" />
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                        <Package className="w-12 h-12 mb-4 text-gray-300" />
                        <p>No orders found.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200 dark:divide-zinc-800">
                        {filteredOrders.map(order => (
                            <div key={order.id} className="p-6 hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono text-sm text-gray-500">#{order.id.slice(0, 8)}</span>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[order.status]}`}>
                                                {order.status}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleString() : new Date().toLocaleString()}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div className="flex gap-2 text-gray-600 dark:text-gray-300">
                                                <User className="w-4 h-4 mt-0.5 shrink-0" />
                                                <span>{order.customerName}</span>
                                            </div>
                                            <div className="flex gap-2 text-gray-600 dark:text-gray-300">
                                                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                                                <span>{order.email}</span>
                                            </div>
                                            <div className="flex gap-2 text-gray-600 dark:text-gray-300 md:col-span-2">
                                                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                                                <span>{order.address}, {order.city} {order.zipCode}</span>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
                                            <h4 className="text-sm font-medium mb-2">Order Items</h4>
                                            <ul className="space-y-2">
                                                {order.items?.map((item, idx) => (
                                                    <li key={idx} className="flex justify-between text-sm">
                                                        <span>{item.quantity}x {item.name}</span>
                                                        <span className="font-serif">KSh {item.price * item.quantity}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800">
                                                <span className="font-medium">Total</span>
                                                <span className="font-serif font-bold text-lg text-parfumerie-gold">KSh {order.total}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-48 space-y-2 shrink-0">
                                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Update Status</label>
                                        <select
                                            className="w-full bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-sm rounded-md focus:ring-parfumerie-gold focus:border-parfumerie-gold block p-2.5"
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
