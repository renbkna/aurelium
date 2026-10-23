import { error } from '@sveltejs/kit';
import { journeyBySlug, journeys } from '#lib/data/journeys.ts';
import type { EntryGenerator, PageLoad } from './$types.js';

export const entries: EntryGenerator = () => journeys.map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
	const journey = journeyBySlug(params.slug);
	if (!journey) error(404, 'No journey by that name');
	return { journey };
};
