import type { SearchPreferences } from './types.js';
export const theaters = [
  { id: 'amc-lincoln-square', name: 'AMC Lincoln Square 13', provider: 'amc' },
  { id: 'amc-empire', name: 'AMC Empire 25', provider: 'amc' },
  { id: 'regal-union-square', name: 'Regal Union Square', provider: 'regal' },
  { id: 'ifc-center', name: 'IFC Center', provider: 'independent' },
] as const;
export const defaultPreferences: SearchPreferences = {
  adjacentSeats: 2,
  preferredDays: [5, 6, 0],
  minDepth: 0.4,
  maxDepth: 0.85,
  maxCenterOffset: 0.35,
  requireVerifiedSeats: true,
};
