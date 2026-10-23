import { getTimes, type SunTimes } from 'suncalc';
import type { Place } from '#lib/data/journeys.ts';

export interface DayLight {
	sunrise: string;
	/** When the evening golden hour begins. */
	goldenHour: string;
	sunset: string;
	/** Hours between sunrise and sunset, one decimal. */
	hours: number;
}

const MS_PER_HOUR = 3_600_000;

/** SunCalc picks the solar day containing the instant; local solar noon pins it to the calendar day. */
function sunTimes(place: Place, isoDate: string): SunTimes {
	const solarNoon = Date.parse(`${isoDate}T12:00:00Z`) - (place.lng / 15) * MS_PER_HOUR;
	return getTimes(new Date(solarNoon), place.lat, place.lng);
}

/** Sunrise, golden hour and sunset on a calendar day, as clock times in the place's time zone. */
export function dayLight(place: Place, isoDate: string): DayLight {
	const times = sunTimes(place, isoDate);
	const clock = new Intl.DateTimeFormat('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		hourCycle: 'h23',
		timeZone: place.timeZone
	});
	const show = (instant: Date | null) => (instant ? clock.format(instant) : '—');
	const hours =
		times.sunrise && times.sunset
			? Math.round(((times.sunset.getTime() - times.sunrise.getTime()) / MS_PER_HOUR) * 10) / 10
			: 0;
	return {
		sunrise: show(times.sunrise),
		goldenHour: show(times.goldenHour),
		sunset: show(times.sunset),
		hours
	};
}
