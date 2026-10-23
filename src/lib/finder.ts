import type { Departure, Journey } from '#lib/data/journeys.ts';
import { monthOfDate } from '#lib/format.ts';
import type { Fit, MonthIndex } from '#lib/season.ts';

export interface Match {
	journey: Journey;
	fit: Fit;
	/** Departures that start in the chosen month, soonest first. */
	departures: Departure[];
}

/**
 * Journeys ranked for a month: best seasonal fit first, then the ones you can actually join that
 * month, then the soonest departure.
 */
export function rankJourneys(journeys: readonly Journey[], month: MonthIndex): Match[] {
	return journeys
		.map((journey) => ({
			journey,
			fit: journey.season[month],
			departures: journey.departures
				.filter((departure) => monthOfDate(departure.start) === month)
				.toSorted((a, b) => a.start.localeCompare(b.start))
		}))
		.toSorted(
			(a, b) =>
				b.fit - a.fit ||
				b.departures.length - a.departures.length ||
				(a.departures[0]?.start ?? '9999').localeCompare(b.departures[0]?.start ?? '9999')
		);
}
