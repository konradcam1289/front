import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../services/apiService";  // pamiętaj folder components!

interface Service {
    id: number;
    name: string;
    price: number;
}

interface Order {
    id: number;
    status: string;
    appointmentDate: string;
    services: Service[];
}

const UserReservationsPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        apiRequest(`/api/admin/users/${userId}/orders`, { method: "GET" })
            .then((data) => setOrders(data))
            .catch((error) => console.error("❌ Błąd pobierania rezerwacji:", error));
    }, [userId]);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-semibold mb-6 text-center text-blue-700">📅 Rezerwacje użytkownika</h1>
            {orders.length === 0 ? (
                <p className="text-center text-gray-500">Brak rezerwacji dla tego użytkownika.</p>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white p-4 rounded-lg shadow border">
                            <p><strong>ID:</strong> {order.id}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                            <p><strong>Data:</strong> {new Date(order.appointmentDate).toLocaleString()}</p>
                            <p><strong>Usługi:</strong></p>
                            <ul className="list-disc list-inside">
                                {order.services.map((service) => (
                                    <li key={service.id}>
                                        {service.name} - {service.price} PLN
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserReservationsPage;
