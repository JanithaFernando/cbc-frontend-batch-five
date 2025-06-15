import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../../components/loading";
import Modal from 'react-modal';

Modal.setAppElement('#root'); // For accessibility

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeOrderIndex, setActiveOrderIndex] = useState(null);

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

    const activeOrder = activeOrderIndex !== null ? orders[activeOrderIndex] : null;

    return (
        <div className="w-full h-full overflow-y-auto p-6 bg-white">
            {isLoading ? (
                <Loading />
            ) : (
                <div className="overflow-x-auto">
                    <Modal
                        isOpen={isModalOpen}
                        onAfterOpen={()=>{}}
                        onRequestClose={() => setIsModalOpen(false)}
                        contentLabel="Order Details"
                        style={{
                            content: {
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                maxWidth: '800px',
                                width: '95%',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                borderRadius: '10px',
                                padding: '20px',
                            },
                        }}
                    >
                        {activeOrder && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold">Order #{activeOrder.orderId}</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p><strong>Name:</strong> {activeOrder.name}</p>
                                        <p><strong>Email:</strong> {activeOrder.email}</p>
                                        <p><strong>Phone:</strong> {activeOrder.phone}</p>
                                        <p><strong>Address:</strong> {activeOrder.address}</p>
                                    </div>
                                    <div>
                                        <p><strong>Date:</strong> {new Date(activeOrder.date).toLocaleString()}</p>
                                        <p>
                                            <strong>Status:</strong>{" "}
                                            <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                                                activeOrder.status.toLowerCase() === "pending"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : activeOrder.status.toLowerCase() === "completed"
                                                    ? "bg-green-100 text-green-800"
                                                    : ["cancelled", "canceled"].includes(activeOrder.status.toLowerCase())
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}>
                                                {activeOrder.status}
                                            </span>
                                        </p>
                                        <p><strong>Total:</strong> LKR {activeOrder.total.toFixed(2)}</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mt-6 mb-2">Products</h3>
                                    <table className="w-full text-left text-sm divide-y divide-gray-200">
                                        <thead className="bg-gray-100 text-gray-700">
                                            <tr>
                                                <th className="p-2">Image</th>
                                                <th className="p-2">Product</th>
                                                <th className="p-2">Price</th>
                                                <th className="p-2">Quantity</th>
                                                <th className="p-2">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {activeOrder.products.map((item, idx) => {
                                                const product = item.productInfo || {};
                                                const subtotal = (product.price || 0) * item.quantity;

                                                return (
                                                    <tr key={item._id || idx}>
                                                        <td className="p-2">
                                                            <img
                                                                src={product.images[0] || "/placeholder.jpg"}
                                                                alt={product.name|| "Product"}
                                                                className="w-16 h-16 object-cover rounded"
                                                            />
                                                        </td>
                                                        <td className="p-2">{product.name || "Unnamed Product"}</td>
                                                        <td className="p-2">LKR {product.price?.toFixed(2) || "0.00"}</td>
                                                        <td className="p-2">{item.quantity}</td>
                                                        <td className="p-2">LKR {subtotal.toFixed(2)}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="text-right mt-4">
                                    <button
                                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </Modal>

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
                                    onClick={() => {
                                        setActiveOrderIndex(index);
                                        setIsModalOpen(true);
                                    }}
                                    key={index}
                                    className="cursor-pointer odd:bg-gray-100 hover:bg-gray-200 transition text-center"
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
                                                : ["cancelled", "canceled"].includes(order.status.toLowerCase())
                                                ? "bg-red-100 text-red-800"
                                                : "bg-gray-100 text-gray-800"
                                        }`}>
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
