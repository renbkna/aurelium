const euro = new Intl.NumberFormat('en-IE', {
	style: 'currency',
	currency: 'EUR',
	maximumFractionDigits: 0
});

const dayMonth = new Intl.DateTimeFormat('en-GB', {
	day: 'numeric',
	month: 'short',
	timeZone: 'UTC'
});
const longDate = new Intl.DateTimeFormat('en-GB', {
	weekday: 'short',
	day: 'numeric',
	month: 'long',
	year: 'numeric',
	timeZone: 'UTC'
});

/** Journey dates are calendar days ('2027-11-18'); read them in UTC so no time zone shifts them. */
const at = (isoDate: string) => new Date(`${isoDate}T00:00:00Z`);

export const monthOfDate = (isoDate: string) => at(isoDate).getUTCMonth();

export const formatPrice = (amount: number) => euro.format(amount);

/** '34.999° N 135.782° E' */
export const formatCoordinates = (lat: number, lng: number) =>
	`${Math.abs(lat).toFixed(3)}° ${lat >= 0 ? 'N' : 'S'}  ${Math.abs(lng).toFixed(3)}° ${lng >= 0 ? 'E' : 'W'}`;

export const formatDayMonth = (isoDate: string) => dayMonth.format(at(isoDate));

export const formatLongDate = (isoDate: string) => longDate.format(at(isoDate));

/** Add whole days to an ISO calendar date. */
export function addDays(isoDate: string, days: number): string {
	const date = at(isoDate);
	date.setUTCDate(date.getUTCDate() + days);
	return date.toISOString().slice(0, 10);
}

/** 'Day 5' or 'Days 6–7' */
export const formatDays = (from: number, to?: number) =>
	to === undefined ? `Day ${String(from)}` : `Days ${String(from)}–${String(to)}`;

/** Last day of a journey that starts on isoDate and lasts `days` days. */
export const endDate = (isoDate: string, days: number) => addDays(isoDate, days - 1);
