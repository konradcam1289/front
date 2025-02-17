const API_URL = "http://localhost:8080/api/auth";

export const register = async (userData: any) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error("Rejestracja nie powiodła się.");
    }

    return response.json();
};

export const login = async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error("Błąd logowania.");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    return data;
};

// 🔹 Nowa funkcja: obsługuje sukces logowania przez Google
export const handleOAuth2Success = () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
        localStorage.setItem("token", token);
        window.location.href = "/client/home"; // 🔹 Przekierowanie na stronę klienta
    }
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const getRole = () => {
    return localStorage.getItem("role");
};
