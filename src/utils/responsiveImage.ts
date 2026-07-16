const WIDTHS = [320, 480, 640, 768, 1024, 1280, 1600, 1920] as const;

const withWidth = (source: string, width: number) => {
  const url = new URL(source);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("q", "80");
  url.searchParams.set("w", String(width));
  return url.toString();
};

export const responsiveImage = (source: string, sizes: string) => ({
  sizes,
  src: withWidth(source, 1920),
  srcSet: WIDTHS.map((width) => `${withWidth(source, width)} ${width}w`).join(", "),
});
