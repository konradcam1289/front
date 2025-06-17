import React, { useEffect, useState } from "react";
import { apiRequest } from "../../services/apiService";

const AdminStats: React.FC = () => {
    const [stats, setStats] = useState<any>({});

    useEffect(() => {
        apiRequest("/api/admin/stats", { method: "GET" })
            .then((data) => setStats(data))
            .catch((error) => console.error("❌ Błąd pobierania statystyk:", error));
    }, []);

    return (
        <div>
            <h1>📊 Statystyki systemu</h1>
            <p>👥 Użytkownicy: {stats.totalUsers}</p>
            <p>🛠 Usługi: {stats.totalServices}</p>
            <p>📅 Rezerwacje: {stats.totalAppointments}</p>
        </div>
    );
};

export default AdminStats;
