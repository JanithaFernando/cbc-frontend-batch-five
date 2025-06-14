import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../../components/loading";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login first");
                return;
            }
            axios
                .get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then((res) => {
                    setOrders(res.data);
                    setIsLoading(false);
                })
                .catch((e) => {
                    alert("Error fetching orders: " + (e.response?.data?.message || "Unknown error"));
                    setIsLoading(false);
                });
        }
    }, [isLoading]);

    return (
        <div className="w-full h-full overflow-y-auto p-6 bg-white">
            {isLoading ? (
                <Loading />
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm md:text-base text-center">
                        <thead>
                            <tr className="bg-accent text-white">
                                <th className="p-3">Order ID</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Address</th>
                                <th className="p-3">Phone</th>
                                <th className="p-3">Total</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr
                                    key={index}
                                    className="odd:bg-gray-100 hover:bg-gray-200 transition text-center"
                                >
                                    <td className="p-3">{order.orderId}</td>
                                    <td className="p-3">{order.name}</td>
                                    <td className="p-3">{order.email}</td>
                                    <td className="p-3">{order.address}</td>
                                    <td className="p-3">{order.phone}</td>
                                    <td className="p-3">LKR {order.total.toFixed(2)}</td>
                                    <td className="p-3">
                                        {new Date(order.date).toLocaleDateString()}
                                    </td>
                                    <td className="p-3"> 
                                        <span className={`px-3 py-1 rounded-full font-semibold text-xs md:text-sm ${
                                                order.status.toLowerCase() === "pending"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : order.status.toLowerCase() === "completed"
                                                    ? "bg-green-100 text-green-800"
                                                    : order.status.toLowerCase() === "cancelled" || order.status.toLowerCase() === "canceled"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-gray-100 text-gray-800" }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
