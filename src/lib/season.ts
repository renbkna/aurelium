export const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
] as const;

export type MonthIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export const MONTH_INDICES: readonly MonthIndex[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

/** How well a journey suits a month: 0 we do not depart, 1 possible, 2 good, 3 the finest weeks. */
export type Fit = 0 | 1 | 2 | 3;

/** One fit per month, January first. */
export type SeasonFit = readonly [Fit, Fit, Fit, Fit, Fit, Fit, Fit, Fit, Fit, Fit, Fit, Fit];

export const FIT_LABEL: Record<Fit, string> = {
	0: 'Not running',
	1: 'Possible',
	2: 'Good',
	3: 'At its finest'
};

export const shortMonth = (month: MonthIndex) => MONTHS[month].slice(0, 3);

/** URL form of a month: 'jan' … 'dec'. */
export const monthSlug = (month: MonthIndex) => shortMonth(month).toLowerCase();

export const monthFromSlug = (slug: string | null): MonthIndex | null =>
	MONTH_INDICES.find((month) => monthSlug(month) === slug) ?? null;

/**
 * The finest months as compact ranges: 'Jul–Sep', 'Mar–Apr · Oct–Nov', 'Dec–Mar' (runs may cross
 * the turn of the year).
 */
export function finestRange(season: SeasonFit): string {
	const finest = MONTH_INDICES.filter((month) => season[month] === 3);
	if (finest.length === 12) return 'All year';
	// Start counting at a month that is not finest, so a run across December stays whole.
	const offset = MONTH_INDICES.find((month) => season[month] !== 3) ?? 0;
	const runs: MonthIndex[][] = [];
	for (let step = 1; step <= 12; step++) {
		const month = MONTH_INDICES[(offset + step) % 12];
		if (month === undefined || season[month] !== 3) continue;
		const run = runs.at(-1);
		const previous = MONTH_INDICES[(month + 11) % 12];
		if (run && previous !== undefined && run.at(-1) === previous) run.push(month);
		else runs.push([month]);
	}
	return runs
		.map((run) => {
			const first = run[0];
			const last = run.at(-1);
			if (first === undefined || last === undefined) return '';
			return first === last ? shortMonth(first) : `${shortMonth(first)}–${shortMonth(last)}`;
		})
		.join(' · ');
}

/** Months with the top fit, as readable text ("October and November"). */
export function finestMonths(season: SeasonFit): string {
	const names = MONTH_INDICES.filter((month) => season[month] === 3).map((month) => MONTHS[month]);
	return new Intl.ListFormat('en', { type: 'conjunction' }).format(names);
}
