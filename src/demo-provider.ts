import type { Provider, Seat, Showing } from './types.js';
export const demoProvider: Provider = {
  id: 'demo',
  async search(movieTitle, theaterIds): Promise<Showing[]> {
    const date = new Date();
    const nextSaturday = (6 - date.getUTCDay() + 7) % 7 || 7;
    date.setUTCDate(date.getUTCDate() + nextSaturday);
    date.setUTCHours(19, 30, 0, 0);
    return theaterIds.slice(0, 2).map((theaterId, i) => {
      const seats: Seat[] = Array.from({ length: 120 }, (_, index) => ({
        id: `R${Math.floor(index / 12) + 1}-S${index % 12 + 1}`,
        row: Math.floor(index / 12),
        column: index % 12,
        available: index % 9 !== 0 && (i === 0 || index % 4 !== 0),
      }));
      return {
        id: `demo-${i}`,
        eventTitle: movieTitle,
        kind: 'movie',
        theaterId,
        startsAt: date.toISOString(),
        bookingUrl: 'https://example.com/demo-only',
        availability: 'available',
        seats,
        rowCount: 10,
        columnCount: 12,
        source: 'demo',
      };
    });
  },
};
