import { MONTH_INDICES } from '#lib/season.ts';
import type { PageLoad } from './$types.js';

/** Prerendered with the build month; the page moves to the visitor's own month once it runs. */
export const load: PageLoad = () => ({
	buildMonth: MONTH_INDICES[new Date().getUTCMonth()] ?? 0
});
