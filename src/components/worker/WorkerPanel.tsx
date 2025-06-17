import React from "react";
import { useNavigate } from "react-router-dom";

const WorkerPanel: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-4xl mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg text-center">
            <h1 className="text-3xl font-bold text-blue-700 mb-10">🔧 Panel Pracownika</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <button
                    onClick={() => navigate("/worker/orders")}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-5 px-8 rounded-xl shadow-md text-xl transition"
                >
                    📋 Zamówienia do obsługi
                </button>

                <button
                    onClick={() => navigate("/worker/schedule")}
                    className="bg-green-600 hover:bg-green-700 text-white py-5 px-8 rounded-xl shadow-md text-xl transition"
                >
                    📅 Zarządzaj terminarzem
                </button>

                <button
                    onClick={() => navigate("/worker/status-update")}
                    className="bg-purple-600 hover:bg-purple-700 text-white py-5 px-8 rounded-xl shadow-md text-xl transition"
                >
                    🔄 Aktualizacja statusów
                </button>

                {/* Dodajemy nowy przycisk do zarządzania dostępnymi terminami */}
                <button
                    onClick={() => navigate("/worker/manage-appointments")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-5 px-8 rounded-xl shadow-md text-xl transition"
                >
                    📅 Zarządzaj dostępnymi terminami
                </button>
            </div>

            <div className="mt-12">
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("role");
                        localStorage.removeItem("username");
                        navigate("/login");
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-lg text-lg shadow-md transition"
                >
                    Wyloguj się
                </button>
            </div>
        </div>
    );
};

export default WorkerPanel;
