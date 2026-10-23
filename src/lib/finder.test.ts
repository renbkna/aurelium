import { describe, expect, it } from 'vitest';
import { journeys } from '#lib/data/journeys.ts';
import { photos } from '#lib/data/photos.ts';
import { rankJourneys } from '#lib/finder.ts';
import { monthOfDate } from '#lib/format.ts';
import { MONTH_INDICES } from '#lib/season.ts';

describe('rankJourneys', () => {
	it('puts the finest journeys for a month first and never ranks a closed one above an open one', () => {
		for (const month of MONTH_INDICES) {
			const fits = rankJourneys(journeys, month).map((match) => match.fit);
			expect(fits).toEqual(fits.toSorted((a, b) => b - a));
		}
	});

	it('prefers a journey you can join that month over an equally good one you cannot', () => {
		// November: Kyoto (fit 3, two departures) and Jordan (fit 3, one departure) both peak.
		const [first, second] = rankJourneys(journeys, 10);
		if (!first || !second) throw new Error('expected at least two journeys');
		expect(first.journey.slug).toBe('kyoto-in-the-maple-weeks');
		expect(first.departures.map((d) => d.start)).toEqual(['2027-11-18', '2027-11-29']);
		expect(second.journey.slug).toBe('jordan-petra-and-wadi-rum');
	});
});

describe('photo catalogue', () => {
	it('shows every photo exactly once, so each credited image is one the site uses', () => {
		const used = journeys.flatMap((j) => [j.cover, ...j.itinerary.map((stop) => stop.photo)]);
		expect(new Set(used).size).toBe(used.length);
		expect(new Set(used)).toEqual(new Set(Object.values(photos)));
	});
});

describe('journey data', () => {
	it('covers every day of each journey exactly once, in order', () => {
		for (const journey of journeys) {
			let next = 1;
			for (const stop of journey.itinerary) {
				expect(stop.from, `${journey.slug} day ${String(stop.from)}`).toBe(next);
				next = (stop.to ?? stop.from) + 1;
			}
			expect(next - 1, journey.slug).toBe(journey.days);
		}
	});

	it('only departs in months the journey runs', () => {
		for (const journey of journeys) {
			for (const departure of journey.departures) {
				const fit = journey.season[monthOfDate(departure.start)];
				expect(fit, `${journey.slug} ${departure.start}`).toBeGreaterThan(0);
			}
		}
	});
});
