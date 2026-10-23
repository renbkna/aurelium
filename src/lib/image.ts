/** A Wikimedia Commons photograph, served from the Commons thumbnail CDN. */
export interface Photo {
	/** Commons upload path: '1/10/File_name.jpg'. */
	path: string;
	/** Width of the original file; no thumbnail is requested above it. */
	width: number;
	alt: string;
	/** Focal point for object-position, e.g. '50% 40%'. */
	focus: string;
	credit: {
		author: string;
		license: string;
		/** The file's Commons page, which carries the full licence terms. */
		source: string;
	};
}

// Commons serves thumbnails only at these widths; others are refused.
const WIDTHS = [500, 960, 1280, 1920, 3840] as const;

const fileName = (photo: Photo) => photo.path.slice(photo.path.lastIndexOf('/') + 1);

export const photoUrl = (photo: Photo, width: number) =>
	`https://upload.wikimedia.org/wikipedia/commons/thumb/${photo.path}/${String(width)}px-${fileName(photo)}`;

export const photoWidths = (photo: Photo) => WIDTHS.filter((width) => width <= photo.width);

export const photoSrcset = (photo: Photo) =>
	photoWidths(photo)
		.map((width) => `${photoUrl(photo, width)} ${String(width)}w`)
		.join(', ');
