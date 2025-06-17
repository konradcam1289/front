import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>⚙️ Panel Administratora</h1>
            <p style={styles.description}>
                Witaj w panelu administratora! Wybierz, którą sekcją chcesz zarządzać.
            </p>

            <div style={styles.buttonContainer}>
                <button style={styles.userButton} onClick={() => navigate("/admin/users")}>
                    Zarządzanie użytkownikami
                </button>

                <button style={styles.serviceButton} onClick={() => navigate("/admin/services")}>
                    Zarządzanie usługami
                </button>

                <button style={styles.reservationButton} onClick={() => navigate("/admin/appointments")}>
                    Zarządzanie rezerwacjami
                </button>

                <button style={styles.statsButton} onClick={() => navigate("/admin/stats")}>
                    Przegląd statystyk
                </button>
            </div>

            <p style={styles.footer}>
                Wybierz jedną z dostępnych opcji, aby rozpocząć zarządzanie danymi.
            </p>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        width: "100%",
        maxWidth: "800px",
        margin: "50px auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: 10,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center" as "center",
        fontFamily: "Arial, sans-serif"
    },
    header: {
        color: "#333",
        marginBottom: "20px"
    },
    description: {
        fontSize: "16px",
        color: "#666",
        marginBottom: "20px"
    },
    buttonContainer: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "15px",
        justifyContent: "center",
        marginBottom: "20px"
    },
    userButton: {
        padding: "15px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: 5,
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold"
    },
    serviceButton: {
        padding: "15px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: 5,
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold"
    },
    reservationButton: {
        padding: "15px",
        backgroundColor: "#ffc107",
        color: "black",
        border: "none",
        borderRadius: 5,
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold"
    },
    statsButton: {
        padding: "15px",
        backgroundColor: "#6c757d",
        color: "white",
        border: "none",
        borderRadius: 5,
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold"
    },
    footer: {
        fontSize: "14px",
        color: "#777"
    }
};

export default AdminPanel;
