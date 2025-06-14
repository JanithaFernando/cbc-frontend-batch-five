import { useEffect, useState } from "react";
import { sampleProducts } from "../../assets/sampleData";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AdminProductsPage() {
    const [products, setProducts] = useState(sampleProducts);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
                .then((res) => {
                    setProducts(res.data);
                    setIsLoading(false);
                })
                .catch(() => toast.error("Failed to fetch products"));
        }
    }, [isLoading]);

    function deleteProduct(productId) {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login first");
            return;
        }

        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                toast.success("Product deleted successfully");
                setIsLoading(true);
            })
            .catch((e) => {
                toast.error(e.response?.data?.message || "Deletion failed");
            });
    }

    return (
        <div className="w-full h-full overflow-y-auto p-6 relative bg-white">
            <Link
                to="/admin/add-product"
                className="fixed bottom-6 right-6 bg-accent hover:bg-purple-800 text-white text-3xl font-bold w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition duration-300"
                title="Add Product"
            >
                +
            </Link>

            {isLoading ? (
                <div className="flex justify-center items-center h-full">
                    <div className="w-16 h-16 border-4 border-gray-300 border-t-accent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm md:text-base">
                        <thead>
                            <tr className="bg-accent text-white text-center">
                                <th className="p-3">Product ID</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Image</th>
                                <th className="p-3">Labelled Price</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Stock</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item, index) => (
                                <tr key={index} className="odd:bg-gray-100 hover:bg-gray-200 transition text-center">
                                    <td className="p-3">{item.productId}</td>
                                    <td className="p-3">{item.name}</td>
                                    <td className="p-3">
                                        <img
                                            src={item.images[0]}
                                            alt={item.name}
                                            className="w-12 h-12 object-cover mx-auto rounded"
                                        />
                                    </td>
                                    <td className="p-3">{item.labelledPrice}</td>
                                    <td className="p-3">{item.price}</td>
                                    <td className="p-3">{item.stock}</td>
                                    <td className="p-3">
                                        <div className="flex items-center justify-center gap-4">
                                            <button
                                                onClick={() => deleteProduct(item.productId)}
                                                className="text-red-500 hover:text-red-700 transition text-lg"
                                                title="Delete Product"
                                            >
                                                <FaTrash />
                                            </button>
                                            <button
                                                onClick={() => navigate("/admin/edit-product", { state: item })}
                                                className="text-blue-500 hover:text-blue-700 transition text-lg"
                                                title="Edit Product"
                                            >
                                                <FaEdit />
                                            </button>
                                        </div>
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
