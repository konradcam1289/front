import React, { useEffect, useState } from "react";
import appointmentService, { AvailableDate } from "../../services/appointmentService";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";

const WorkerManageAppointments: React.FC = () => {
    const [dates, setDates] = useState<AvailableDate[]>([]);
    const [newDate, setNewDate] = useState<Date | null>(null);

    const loadDates = async () => {
        try {
            const result = await appointmentService.getAvailableDates();
            const sorted = result.sort(
                (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
            );
            setDates(sorted);
        } catch (err) {
            toast.error("Błąd podczas pobierania terminów.");
        }
    };

    useEffect(() => {
        loadDates();
    }, []);

    const handleAddDate = async () => {
        if (!newDate) {
            toast.warning("Wprowadź datę i godzinę.");
            return;
        }

        const now = new Date();
        if (newDate.getTime() < now.getTime()) {
            toast.warning("Nie można dodać terminu z przeszłości.");
            return;
        }

        const duplicate = dates.find(d => {
            const existing = new Date(d.dateTime);
            return Math.abs(existing.getTime() - newDate.getTime()) < 60000;
        });

        if (duplicate) {
            toast.warning("Ten termin już istnieje.");
            return;
        }

        try {
            await appointmentService.addAvailableDate(newDate);
            toast.success("Nowy termin został dodany!");
            setNewDate(null);
            loadDates();
        } catch (err) {
            toast.error("Błąd podczas dodawania terminu.");
        }
    };

    const handleDeleteDate = async (id: number) => {
        try {
            await appointmentService.deleteAvailableDate(id);
            toast.success("Termin został usunięty.");
            loadDates();
        } catch (err) {
            toast.error("Błąd podczas usuwania terminu.");
        }
    };

    const filterPassedTime = (time: Date) => {
        const now = new Date();
        return time.getTime() > now.getTime();
    };

    return (
        <div className="max-w-5xl mx-auto mt-20 p-8 bg-white rounded-2xl shadow-lg">
            <h1 className="text-4xl font-bold text-blue-700 mb-10 text-center">
                📅 Zarządzaj dostępnymi terminami (WORKER)
            </h1>

            <div className="flex items-center justify-center mb-10 gap-4">
                <DatePicker
                    selected={newDate}
                    onChange={(date: Date | null) => setNewDate(date)}
                    showTimeSelect
                    timeIntervals={15}
                    timeCaption="Godzina"
                    dateFormat="Pp"
                    minDate={new Date()}
                    filterTime={filterPassedTime}
                    className="border border-gray-300 p-3 rounded-lg w-80 shadow-sm text-center"
                    placeholderText="Wybierz datę i godzinę"
                />
                <button
                    onClick={handleAddDate}
                    className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg shadow-md text-lg transition"
                >
                    ➕ Dodaj termin
                </button>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
                    Lista dostępnych terminów
                </h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-blue-100 text-gray-700">
                                <th className="py-3 px-6 border-b">Data i godzina</th>
                                <th className="py-3 px-6 border-b">Status</th>
                                <th className="py-3 px-6 border-b">Użytkownik</th>
                                <th className="py-3 px-6 border-b">Akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dates.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-6 text-gray-500">
                                        Brak dostępnych terminów
                                    </td>
                                </tr>
                            ) : (
                                dates.map((date) => (
                                    <tr key={date.id} className="text-center hover:bg-gray-50">
                                        <td className="py-4 px-6 border-b">
                                            {new Date(date.dateTime).toLocaleString("pl-PL")}
                                        </td>
                                        <td className="py-4 px-6 border-b">
                                            {date.reserved ? (
                                                <span className="text-red-600 font-semibold">Zajęty</span>
                                            ) : (
                                                <span className="text-green-600 font-semibold">Wolny</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 border-b">
                                            {date.username ?? "-"}
                                        </td>
                                        <td className="py-4 px-6 border-b">
                                            <button
                                                onClick={() => handleDeleteDate(date.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow transition"
                                            >
                                                🗑 Usuń
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WorkerManageAppointments;
