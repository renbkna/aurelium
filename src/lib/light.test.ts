import { describe, expect, it } from 'vitest';
import { journeyBySlug, type Place } from '#lib/data/journeys.ts';
import { addDays } from '#lib/format.ts';
import { dayLight } from '#lib/light.ts';

const minutes = (clock: string) => {
	const [hours = 0, mins = 0] = clock.split(':').map(Number);
	return hours * 60 + mins;
};

const placeOf = (slug: string): Place => {
	const place = journeyBySlug(slug)?.place;
	if (!place) throw new Error(`missing journey ${slug}`);
	return place;
};

describe('dayLight', () => {
	it('reports local clock times, not UTC', () => {
		// Kyoto in late November: a short autumn day, sunrise before seven and sunset before five.
		const light = dayLight(placeOf('kyoto-in-the-maple-weeks'), '2027-11-18');
		expect(minutes(light.sunrise)).toBeGreaterThan(minutes('06:15'));
		expect(minutes(light.sunrise)).toBeLessThan(minutes('06:55'));
		expect(minutes(light.sunset)).toBeGreaterThan(minutes('16:30'));
		expect(minutes(light.sunset)).toBeLessThan(minutes('17:10'));
		expect(minutes(light.goldenHour)).toBeLessThan(minutes(light.sunset));
	});

	it('follows the seasons: long Dolomite summer days, near-constant equatorial ones', () => {
		const dolomites = placeOf('dolomites-hut-to-hut');
		expect(dayLight(dolomites, '2027-07-04').hours).toBeGreaterThan(15);
		expect(dayLight(dolomites, '2027-12-21').hours).toBeLessThan(9.5);
		const bali = placeOf('bali-the-quiet-highlands');
		expect(Math.abs(dayLight(bali, '2027-07-10').hours - 12)).toBeLessThan(0.6);
	});
});

describe('addDays', () => {
	it('crosses month and year ends', () => {
		expect(addDays('2027-11-29', 8)).toBe('2027-12-07');
		expect(addDays('2027-12-30', 3)).toBe('2028-01-02');
	});
});
