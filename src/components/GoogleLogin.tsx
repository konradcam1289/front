import React from "react";

const GOOGLE_AUTH_URL = "http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:5173/oauth2/success";

const GoogleLogin: React.FC = () => {
    const handleGoogleLogin = () => {
        window.location.href = GOOGLE_AUTH_URL; // Przekierowanie do OAuth2 Google
    };

    return (
        <button 
            onClick={handleGoogleLogin}
            style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#db4437",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
            <img 
                src="/assets/google-icon.png" 
                alt="Google logo" 
                style={{ width: "20px", height: "20px", marginRight: "10px" }}
            />
            Zaloguj się przez Google
        </button>
    );
};

export default GoogleLogin;
