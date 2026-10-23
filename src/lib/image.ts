/** An Unsplash photo by id; the CDN serves the sizes and formats the page asks for. */
export interface Photo {
	id: string;
	alt: string;
	/** Focal point for object-position, e.g. '50% 40%'. */
	focus?: string;
}

const WIDTHS = [160, 480, 800, 1200, 1600, 2200] as const;

export const photoUrl = (photo: Photo, width: number) =>
	`https://images.unsplash.com/${photo.id}?auto=format&fit=crop&w=${String(width)}&q=72`;

export const photoSrcset = (photo: Photo) =>
	WIDTHS.map((width) => `${photoUrl(photo, width)} ${String(width)}w`).join(', ');
