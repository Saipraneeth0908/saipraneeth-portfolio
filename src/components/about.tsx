import { InView } from "@/components/motion";
import { Grade, GradedVideo } from "@/components/graded-video";
import { about, focusAreas } from "@/content/profile";
import type { CSSProperties } from "react";
import { Chapter } from "@/components/chapter";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/*
 * Chapter 01 — Velorah: full-bleed film, centred cinematic serif, liquid glass.
 * The muted <em> mirrors Velorah's "dreams … through the silence." contrast.
 */
export function About() {
  const [lead, ...rest] = about;
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative scroll-mt-16 bg-ink-base"
    >
      {/* Sits over the hero's bottom edge: blurs and fades the white portrait into ink. */}
      <div aria-hidden="true" className="seam-blur pointer-events-none absolute inset-x-0 bottom-full h-10 md:h-[12vh]" />

      {/* Night footage (lifted at encode), light scrim — Velorah lets the film carry the depth. */}
      <div aria-hidden="true" className="film-feather absolute inset-0 overflow-hidden">
        <GradedVideo film="about-velorah" />
        <Grade scrim={0.12} />
      </div>

      <InView className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center px-6 pb-24 pt-32 text-center md:pt-40">
        <Chapter className="fx-rise">01 / About</Chapter>
        <h2
          id="about-title"
          className="fx-rise t-display mt-8 max-w-4xl"
          style={delay(0.1)}
        >
          What I <em className="not-italic text-copy-muted">build</em>
        </h2>
        <p className="fx-rise t-lead mt-6 max-w-2xl" style={delay(0.2)}>
          {lead}
        </p>

        <div className="t-body mt-12 grid max-w-4xl gap-6 text-left md:grid-cols-2">
          {rest.map((p, i) => (
            <p key={p} className="fx-rise" style={delay(0.3 + i * 0.1)}>
              {p}
            </p>
          ))}
        </div>

        <ul className="mt-14 grid w-full max-w-5xl gap-4 text-left md:grid-cols-3">
          {focusAreas.map((area, k) => (
            <li
              key={area.title}
              className="fx-rise liquid-glass rounded-3xl p-6 transition-transform duration-300 hover:scale-[1.03]"
              style={delay(0.45 + k * 0.1)}
            >
              <h3 className="t-title">{area.title}</h3>
              <p className="t-small mt-3">{area.detail}</p>
            </li>
          ))}
        </ul>
      </InView>
    </section>
  );
}
