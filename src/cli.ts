import { theaters, defaultPreferences } from './config.js';
import { demoProvider } from './demo-provider.js';
import { rankShowings } from './matcher.js';
const movie = process.argv.slice(2).join(' ').trim();
if (!movie) {
  console.error('Usage: npm run search -- "Movie title"');
  process.exit(1);
}
console.log('\nDEMO MODE — all availability is simulated; links are not real tickets.\n');
const showings = await demoProvider.search(movie, theaters.map(t => t.id));
const results = rankShowings(showings, defaultPreferences);
for (const result of results) {
  const theater = theaters.find(t => t.id === result.showing.theaterId)?.name ?? result.showing.theaterId;
  console.log(`${result.score}/100 | ${theater} | ${result.showing.startsAt} | ${result.seats?.map(s => s.id).join(' + ') ?? 'Unverified seats'}`);
}
if (!results.length) console.log('No matching demo showings.');
