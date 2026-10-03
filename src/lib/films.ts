import { asset } from "@/lib/site";

/*
 * Background films, self-hosted in public/films. Each is a re-encode of a
 * motionsites reference clip with its colour grade baked in (no per-frame CSS
 * filter) in two sizes: 1280w for desktop and a lighter 720w `-m` cut for
 * phones. Seekable films (experience-route, runtime-scrub) keep a keyframe
 * every 3 frames so they scrub smoothly in both directions.
 */
export type Film = "about-velorah" | "contact-ops" | "experience-route" | "runtime-scrub";

/** Client-only: picks the phone cut on small screens. */
export function filmSrc(name: Film) {
  const small = window.matchMedia("(max-width: 768px)").matches;
  return asset(`/films/${name}${small ? "-m" : ""}.mp4`);
}
