# Ticket Watcher

A TypeScript prototype for discovering and ranking event tickets by preferred days and adjacent seats.

## Status

**Demo only.** This starter does not query live ticketing providers, verify live seat maps, send notifications, or purchase tickets. The demo adapter returns fabricated showings and non-bookable example URLs.

## Requirements

Node.js 22+ and npm.

## Setup

```bash
npm install
npm run typecheck
npm test
npm run search -- "Any movie title"
```

## Design

- `src/types.ts`: event, seat, showing, and provider contracts
- `src/config.ts`: hardcoded theater list and search preferences
- `src/demo-provider.ts`: deterministic-looking simulated theater inventory
- `src/matcher.ts`: adjacent-seat matching and ranked results
- `src/cli.ts`: demo search command

The initial ranking emphasizes preferred days (65%) and seat quality (35%). Seat location is expressed in normalized auditorium coordinates. The weekday currently uses UTC; production adapters must supply the venue timezone and score the local calendar day.

## Next milestones

1. Implement one permitted live provider adapter and verify actual showtime URLs.
2. Add provider-specific seat map support, where available and authorized.
3. Track previous observations in persistent storage; send deduplicated alerts.
4. Add a web interface and expand to theater and concerts.

Do not attempt to bypass access controls, CAPTCHAs, or ticketing queues. Respect provider terms and request limits.
