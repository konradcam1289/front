import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import GoogleLogin from "./GoogleLogin"; // 🔹 Importujemy logowanie Google

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const data = await login(username, password);

            if (!data || !data.token || !data.role || !data.username) {
                setErrorMessage("Błędna odpowiedź serwera.");
                return;
            }

            const token = data.token;
            const role = data.role;
            const loggedInUsername = data.username;

            console.log("DEBUG: Otrzymana rola użytkownika ->", role);

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("username", loggedInUsername);

            switch (role) {
                case "ROLE_ADMIN":
                    navigate("/admin/home");
                    break;
                case "ROLE_WORKER":
                    navigate("/worker/home");
                    break;
                case "ROLE_CLIENT":
                    navigate("/client/home");
                    break;
                default:
                    setErrorMessage(`Nieznana rola użytkownika: ${role}`);
            }
        } catch (error) {
            setErrorMessage("Nie udało się zalogować. Sprawdź login i hasło.");
        }
    };

    return (
        <div style={{
            width: "100%",
            maxWidth: "350px",
            margin: "50px auto",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            fontFamily: "Arial, sans-serif"
        }}>
            <h2 style={{ color: "#333", marginBottom: "20px" }}>Logowanie</h2>
            
            {errorMessage && <p style={{ color: "red", fontSize: "14px" }}>{errorMessage}</p>}
            
            <input 
                type="text" 
                placeholder="Login" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px",
                    margin: "10px 0",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    fontSize: "16px"
                }}
            />
            <input 
                type="password" 
                placeholder="Hasło" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                style={{
                    width: "100%",
                    padding: "10px",
                    margin: "10px 0",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    fontSize: "16px"
                }}
            />
            
            <button 
                onClick={handleLogin} 
                style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    marginTop: "10px"
                }}>
                Zaloguj
            </button>

            <div style={{ margin: "15px 0", fontSize: "14px", color: "#777" }}>lub</div>

            <GoogleLogin /> {/* 🔹 Dodajemy przycisk logowania Google */}
        </div>
    );
};

export default Login;
