import React, { useEffect, useState } from "react";
import { apiRequest } from "../../services/apiService";
import { useNavigate } from "react-router-dom";

const ManageUsers: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        apiRequest("/api/admin/users", { method: "GET" })
            .then((data) => setUsers(data))
            .catch((error) => console.error("❌ Błąd pobierania użytkowników:", error));
    }, []);

    const deleteUser = (id: number) => {
        apiRequest(`/api/admin/users/${id}`, { method: "DELETE" })
            .then(() => setUsers(users.filter((user) => user.id !== id)))
            .catch((error) => console.error("❌ Błąd usuwania użytkownika:", error));
    };

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-3xl font-semibold mb-6 text-center text-blue-700">👤 Zarządzanie użytkownikami</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                    <div key={user.id} className="bg-white p-5 rounded-xl shadow-lg border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">{user.username}</h2>
                        <p className="text-gray-600 mb-1">{user.email}</p>
                        <p className="text-gray-600 mb-4">Rola: <span className="font-semibold text-indigo-600">{user.primaryRole}</span></p>
                        <div className="flex flex-col space-y-2">
                            <button 
                                onClick={() => deleteUser(user.id)} 
                                className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg shadow"
                            >
                                Usuń
                            </button>
                            <button 
                                onClick={() => navigate(`/admin/users/${user.id}/reservations`)}
                                className="bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg shadow"
                            >
                                Zobacz rezerwacje użytkownika
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageUsers;
