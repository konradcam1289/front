// dateUtils.ts

/**
 * Konwertuje lokalną datę na ISO string w UTC (dokładnie w formacie jaki backend potrzebuje)
 */
export function formatDateForBackend(date: Date): string {
    return date.toISOString(); // np. "2025-06-17T20:00:00.000Z"
}

/**
 * Odbiera datę z backendu (która już jest w UTC) i konwertuje do lokalnej strefy dla wyświetlania
 */
export function parseBackendDate(dateStr: string): Date {
    return new Date(dateStr);
}
