import React, { useState, useEffect } from "react";
import { apiRequest } from "../../services/apiService";
import { toast } from "react-toastify";

interface Order {
    id: number;
    clientName: string;
    serviceName: string;
    status: string;
}

const WorkerStatusUpdate: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [updatingId, setUpdatingId] = useState<number | null>(null);
    const statuses = ["PENDING", "IN_PROGRESS", "COMPLETED"];

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const data = await apiRequest("/api/orders/all-for-worker");
            setOrders(data);
        } catch {
            toast.error("Błąd podczas ładowania zamówień");
        }
    };

    const handleStatusChange = async (orderId: number, newStatus: string) => {
        setUpdatingId(orderId);
        try {
            await apiRequest(`/api/orders/${orderId}/update-status`, {
                method: "PUT",
                body: JSON.stringify({ status: newStatus }),
            });
            toast.success("Status zaktualizowany");
            loadOrders();
        } catch {
            toast.error("Błąd przy aktualizacji statusu");
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className="max-w-5xl mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-blue-700 mb-10 text-center">🔄 Aktualizacja Statusów</h1>

            {orders.length === 0 ? (
                <p className="text-center text-gray-500">Brak zamówień do aktualizacji.</p>
            ) : (
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-3 border">ID</th>
                            <th className="p-3 border">Klient</th>
                            <th className="p-3 border">Usługa</th>
                            <th className="p-3 border">Status</th>
                            <th className="p-3 border">Aktualizuj</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} className="text-center">
                                <td className="p-3 border">{order.id}</td>
                                <td className="p-3 border">{order.clientName}</td>
                                <td className="p-3 border">{order.serviceName}</td>
                                <td className="p-3 border">{order.status}</td>
                                <td className="p-3 border">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        disabled={updatingId === order.id}
                                        className="p-2 rounded border"
                                    >
                                        {statuses.map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default WorkerStatusUpdate;
