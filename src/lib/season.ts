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

/** Months with the top fit, as readable text ("October and November"). */
export function finestMonths(season: SeasonFit): string {
	const names = MONTH_INDICES.filter((month) => season[month] === 3).map((month) => MONTHS[month]);
	return new Intl.ListFormat('en', { type: 'conjunction' }).format(names);
}
