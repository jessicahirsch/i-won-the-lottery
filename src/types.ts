export type EventKind = 'movie' | 'theater' | 'concert';
export type Availability = 'available' | 'sold_out' | 'unknown';
export interface Seat {
  id: string;
  row: number; // 0 = front row
  column: number; // 0 = leftmost seat
  available: boolean;
  section?: string;
}
export interface Showing {
  id: string;
  eventTitle: string;
  kind: EventKind;
  theaterId: string;
  startsAt: string; // ISO timestamp with timezone
  bookingUrl: string;
  availability: Availability;
  seats?: Seat[]; // absent means seating could not be verified
  rowCount?: number;
  columnCount?: number;
  source: 'demo' | 'live';
}
export interface Provider {
  id: string;
  search(movieTitle: string, theaterIds: string[]): Promise<Showing[]>;
}
export interface SearchPreferences {
  adjacentSeats: number;
  preferredDays: number[]; // JS weekday: Sunday=0
  minDepth: number; // 0 front, 1 back
  maxDepth: number;
  maxCenterOffset: number; // 0=center, 1=edge
  requireVerifiedSeats: boolean;
}
export interface RankedShowing {
  showing: Showing;
  seats?: Seat[];
  score: number;
  reason: string;
}
