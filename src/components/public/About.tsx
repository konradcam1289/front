import React from "react";

const About: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto mt-20 p-8 bg-white rounded-xl shadow-xl">
            <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">🛠 O nas</h1>

            {/* Sekcja o firmie */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Kim jesteśmy?</h2>
                <p className="text-gray-600 text-lg">
                    AutoWorkshop to profesjonalny serwis samochodowy działający od ponad 15 lat na rynku.
                    Naszą misją jest dostarczanie usług najwyższej jakości w przystępnych cenach. 
                    Nasz zespół to doświadczeni mechanicy i diagności, którzy z pasją dbają o każdy pojazd.
                </p>
            </section>

            {/* Sekcja zalet */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dlaczego warto nas wybrać?</h2>
                <ul className="list-disc list-inside text-gray-600 text-lg space-y-2">
                    <li>✅ Nowoczesne zaplecze diagnostyczne</li>
                    <li>✅ Wykwalifikowani i doświadczeni mechanicy</li>
                    <li>✅ Krótkie terminy realizacji</li>
                    <li>✅ Indywidualne podejście do klienta</li>
                    <li>✅ Atrakcyjne ceny i rabaty dla stałych klientów</li>
                    <li>✅ Gwarancja jakości na wykonane usługi</li>
                </ul>
            </section>

            {/* Sekcja realizacji */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nasze realizacje:</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gray-100 p-4 rounded-lg shadow text-center">
                        <img src="/img/realizacja1.jpg" alt="Realizacja 1" className="rounded-lg mb-4 mx-auto"/>
                        <p className="font-semibold">Kompleksowa naprawa silnika BMW</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow text-center">
                        <img src="/img/realizacja2.jpg" alt="Realizacja 2" className="rounded-lg mb-4 mx-auto"/>
                        <p className="font-semibold">Wymiana skrzyni biegów Audi</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow text-center">
                        <img src="/img/realizacja3.jpg" alt="Realizacja 3" className="rounded-lg mb-4 mx-auto"/>
                        <p className="font-semibold">Lakierowanie i naprawa powypadkowa</p>
                    </div>
                </div>
            </section>

            {/* Sekcja CTA */}
            <section className="text-center mt-10">
                <h2 className="text-2xl font-semibold mb-4">Masz pytania? Skontaktuj się z nami!</h2>
                <a
                    href="/contact"
                    className="inline-block bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg text-lg shadow"
                >
                    Skontaktuj się
                </a>
            </section>
        </div>
    );
};

export default About;
