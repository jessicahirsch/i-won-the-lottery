import type { RankedShowing, SearchPreferences, Seat, Showing } from './types.js';

function pairScore(seats: Seat[], rowCount: number, columnCount: number, prefs: SearchPreferences): number | null {
  const depth = rowCount > 1 ? seats[0].row / (rowCount - 1) : 0.5;
  const center = (seats[0].column + seats[seats.length - 1].column) / 2;
  const offset = columnCount > 1 ? Math.abs(center - (columnCount - 1) / 2) / ((columnCount - 1) / 2) : 0;
  if (depth < prefs.minDepth || depth > prefs.maxDepth || offset > prefs.maxCenterOffset) return null;
  return Math.round(60 * (1 - offset) + 40 * (1 - Math.abs(depth - 0.65)));
}

export function findBestSeats(showing: Showing, prefs: SearchPreferences): { seats: Seat[]; score: number } | null {
  if (!showing.seats || !showing.rowCount || !showing.columnCount) return null;
  const seats = showing.seats.filter(s => s.available).sort((a, b) => a.row - b.row || a.column - b.column);
  let best: { seats: Seat[]; score: number } | null = null;
  for (let i = 0; i <= seats.length - prefs.adjacentSeats; i++) {
    const group = seats.slice(i, i + prefs.adjacentSeats);
    const first = group[0];
    if (!group.every((s, j) => s.row === first.row && s.column === first.column + j && s.section === first.section)) continue;
    const score = pairScore(group, showing.rowCount, showing.columnCount, prefs);
    if (score !== null && (!best || score > best.score)) best = { seats: group, score };
  }
  return best;
}

export function rankShowings(showings: Showing[], prefs: SearchPreferences): RankedShowing[] {
  return showings.flatMap((showing): RankedShowing[] => {
    if (showing.availability !== 'available') return [];
    const match = findBestSeats(showing, prefs);
    if (!match && prefs.requireVerifiedSeats) return [];
    const weekday = new Date(showing.startsAt).getUTCDay();
    // Date-only priority is evaluated in the showing's local timezone in a future provider iteration.
    const dayRank = prefs.preferredDays.indexOf(weekday);
    const dayScore = dayRank < 0 ? 0 : 100 - 15 * dayRank;
    const score = Math.round(dayScore * 0.65 + (match?.score ?? 0) * 0.35);
    return [{ showing, seats: match?.seats, score, reason: match ? `Day score ${dayScore}; seat score ${match.score}` : 'Seat map unavailable' }];
  }).sort((a, b) => b.score - a.score || a.showing.startsAt.localeCompare(b.showing.startsAt));
}
