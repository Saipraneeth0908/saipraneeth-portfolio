/**
 * Canonical origin for metadata. Vercel is the primary host; the GitHub Pages
 * build points its canonical here too. Change this one constant if it moves.
 */
export const SITE_URL = "https://portfolio-henna-zeta-6a0662eupa.vercel.app";

/** basePath is injected by next.config.ts so it is identical on server and client. */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefix a public/ asset with the deployment basePath.
 * next/link and next/image do this automatically; plain <a href> does not.
 */
export function asset(path: string) {
  return `${BASE_PATH}${path}`;
}
