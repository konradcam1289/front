import React, { useEffect, useState } from "react";
import { apiRequest } from "../../services/apiService";
import { useNavigate } from "react-router-dom";

interface Order {
  id: number;
  clientFullName: string;
  date: string; // ✅ poprawiona właściwość
  paymentMethod: string;
  repairStatus: string;
  paymentStatus: string;
  services: {
    id: number;
    name: string;
    price: number;
  }[];
}

const WorkerOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiRequest("/api/worker/orders", { method: "GET" })
      .then(setOrders)
      .catch((err) => console.error("❌ Błąd ładowania zamówień:", err));
  }, []);

  const handleDelete = (id: number) => {
    if (!window.confirm("Czy na pewno chcesz usunąć to zamówienie?")) return;

    apiRequest(`/api/worker/orders/${id}`, { method: "DELETE" })
      .then(() => {
        setOrders((prev) => prev.filter((order) => order.id !== id));
      })
      .catch((err) => console.error("❌ Błąd usuwania zamówienia:", err));
  };

  const handleEdit = (id: number) => {
    navigate(`/worker/orders/edit/${id}`);
  };

  const formatDate = (dateString: string) => {
    const parsed = new Date(dateString);
    return isNaN(parsed.getTime())
      ? "Nieznana data"
      : parsed.toLocaleString("pl-PL", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">
        Lista zamówień do obsługi
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">Brak dostępnych zamówień.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Zamówienie #{order.id}
                  </h2>
                  <p className="text-gray-700">
                    <span className="font-medium">Klient:</span>{" "}
                    {order.clientFullName}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Termin:</span>{" "}
                    {formatDate(order.date)}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Metoda płatności:</span>{" "}
                    {order.paymentMethod}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Status naprawy:</span>{" "}
                    {order.repairStatus}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Status płatności:</span>{" "}
                    {order.paymentStatus}
                  </p>
                </div>

                <div className="flex gap-2 mt-2 md:mt-0">
                  <button
                    onClick={() => handleEdit(order.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Edytuj
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    Usuń
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-medium mb-2 text-gray-800">Usługi:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {order.services.map((service) => (
                    <li key={service.id}>
                      {service.name} – {service.price.toFixed(2)} zł
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkerOrders;
