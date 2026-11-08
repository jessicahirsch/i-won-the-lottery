import { describe, expect, it } from 'vitest';
import { findBestSeats, rankShowings } from '../src/matcher.js';
import { defaultPreferences } from '../src/config.js';
import type { Showing } from '../src/types.js';
const base: Showing = {
  id: '1', eventTitle: 'Test', kind: 'movie', theaterId: 'demo',
  startsAt: '2026-11-14T19:30:00Z', bookingUrl: 'https://example.com',
  availability: 'available', source: 'demo', rowCount: 10, columnCount: 10,
  seats: [{ id: 'a', row: 6, column: 4, available: true }, { id: 'b', row: 6, column: 5, available: true }],
};
describe('seat matching', () => {
  it('accepts adjacent central seats', () => {
    expect(findBestSeats(base, defaultPreferences)?.seats.map(s => s.id)).toEqual(['a', 'b']);
  });
  it('rejects separated seats', () => {
    const showing = { ...base, seats: [{ ...base.seats![0] }, { ...base.seats![1], column: 6 }] };
    expect(findBestSeats(showing, defaultPreferences)).toBeNull();
  });
  it('rejects sold-out showings', () => {
    expect(rankShowings([{ ...base, availability: 'sold_out' }], defaultPreferences)).toEqual([]);
  });
  it('rejects unknown seating when verification is required', () => {
    expect(rankShowings([{ ...base, seats: undefined }], defaultPreferences)).toEqual([]);
  });
});
