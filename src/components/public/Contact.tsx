import React, { useState } from "react";

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("✅ Wiadomość została wysłana!");
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                const errorText = await response.text();
                alert("❌ Wystąpił błąd: " + errorText);
            }
        } catch (error) {
            console.error("Błąd:", error);
            alert("❌ Nie udało się połączyć z serwerem.");
        }
    };

    return (
        <div className="max-w-5xl mx-auto mt-20 p-8 bg-white rounded-xl shadow-xl">
            <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">📞 Kontakt z warsztatem</h1>

            <div className="grid md:grid-cols-2 gap-10">
                {/* Dane warsztatu */}
                <div className="space-y-5">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Adres warsztatu:</h2>
                        <p>AutoWorkshop Sp. z o.o.</p>
                        <p>ul. Mechaników 123</p>
                        <p>00-123 Warszawa</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Telefon:</h2>
                        <p>📞 +48 123 456 789</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Email:</h2>
                        <p>📧 kontakt@autoworkshop.pl</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Godziny otwarcia:</h2>
                        <p>Poniedziałek - Piątek: 8:00 - 18:00</p>
                        <p>Sobota: 9:00 - 14:00</p>
                        <p>Niedziela: nieczynne</p>
                    </div>
                </div>

                {/* Formularz kontaktowy */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Formularz kontaktowy:</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Imię i nazwisko"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg shadow"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Adres email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg shadow"
                            required
                        />
                        <input
                            type="text"
                            name="subject"
                            placeholder="Temat"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg shadow"
                        />
                        <textarea
                            name="message"
                            placeholder="Treść wiadomości"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg shadow h-32"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg shadow"
                        >
                            Wyślij wiadomość
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
