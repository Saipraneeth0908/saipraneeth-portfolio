"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Grade, gradeFilter } from "@/components/graded-video";
import { experience } from "@/content/experience";
import { Chapter } from "@/components/chapter";
import { asset } from "@/lib/site";

/*
 * Self-hosted re-encode of FILM.wave (lib/films): keyframe every 3 frames so it
 * can be seeked in both directions without stutter, desaturated at encode.
 */
const ROUTE_FILM = asset("/films/experience-route.mp4");

const ease = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - (-2 * k + 2) ** 3 / 2);

/*
 * Chapter 02 — creative-portfolio hero: an `01 / LIMEIQ` switcher, status
 * dot, and the giant name with an accent full stop. The film is a journey:
 * role 1 holds its first frame, the last role its final frame, and switching
 * roles travels the footage (plane and trees) between those points, either way.
 */
export function ExperienceSection() {
  const [active, setActive] = useState(0);
  const role = experience[active];
  const video = useRef<HTMLVideoElement>(null);
  const tween = useRef(0);

  // Load once nearby, as a blob so every seek is local.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const io = new IntersectionObserver(
      async ([e]) => {
        if (!e.isIntersecting || v.src) return;
        io.disconnect();
        try {
          v.src = URL.createObjectURL(await (await fetch(ROUTE_FILM)).blob());
        } catch {
          v.src = ROUTE_FILM;
        }
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // Travel from the current frame to this role's frame.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const travel = () => {
      cancelAnimationFrame(tween.current);
      const end = Math.max(0, v.duration - 0.05);
      const target = (active / (experience.length - 1)) * end;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        v.currentTime = target;
        return;
      }
      const from = v.currentTime;
      const ms = Math.min(2800, 700 + Math.abs(target - from) * 420);
      const t0 = performance.now();
      const step = (t: number) => {
        const k = Math.min(1, (t - t0) / ms);
        if (k === 1) v.currentTime = target;
        else if (!v.seeking) v.currentTime = from + (target - from) * ease(k);
        if (k < 1) tween.current = requestAnimationFrame(step);
      };
      tween.current = requestAnimationFrame(step);
    };
    if (v.readyState >= 1) travel();
    else v.addEventListener("loadedmetadata", travel, { once: true });
    return () => {
      cancelAnimationFrame(tween.current);
      v.removeEventListener("loadedmetadata", travel);
    };
  }, [active]);

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative overflow-hidden bg-ink-base"
    >
      <div aria-hidden="true" className="film-feather absolute inset-0 overflow-hidden">
        <video
          ref={video}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          // Scaled from the bottom: crops the dark pergola beam along the top of this footage.
          className="absolute inset-0 h-full w-full origin-bottom scale-[1.2] object-cover"
          style={{ filter: gradeFilter() }}
        />
        <Grade scrim={0.4} />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,15,0.35)_0%,transparent_18%,rgba(10,11,15,0.2)_60%,rgba(10,11,15,0.85)_100%)]"
        />
      </div>

      {/*
        Two columns that share the viewport: left = intro + switcher on top, giant name pinned to the
        bottom; right = the role's details. No row of its own for the name, so no dead space above it.
      */}
      <div className="relative z-[2] mx-auto grid min-h-[100svh] max-w-[1340px] gap-12 px-[18px] pb-11 pt-24 md:grid-cols-[1.15fr_0.85fr] md:gap-[50px] md:px-[15px] md:pb-10">
        <div className="flex flex-col justify-between gap-12">
          <div>
            <Chapter>02 / Experience</Chapter>
            <h2 id="experience-title" className="mt-4 text-xs font-medium uppercase tracking-[-0.12px] text-copy-primary">
              Where I&apos;ve done the work
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-copy-secondary">
              Five years across applied GenAI, machine learning, and data engineering — moving from analytics
              pipelines into LLM systems that run in production.
            </p>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
              <div role="tablist" aria-label="Roles" className="flex flex-col gap-2">
                {experience.map((r, i) => (
                  <button
                    key={r.company}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-controls={`experience-panel-${i}`}
                    onClick={() => setActive(i)}
                    className={`role-link w-fit text-left uppercase text-copy-primary ${
                      i === active ? "opacity-100" : "opacity-55 hover:opacity-75"
                    }`}
                  >
                    <span className="text-[8px] font-medium leading-3 tracking-[-0.08px]">0{i + 1} / </span>
                    <span className="text-xs font-medium leading-4 tracking-[-0.12px]">{r.company}</span>
                  </button>
                ))}
              </div>
              <p className="flex items-center gap-2.5 text-xs font-medium uppercase text-copy-primary">
                <span
                  aria-hidden="true"
                  className={`pulse-dot h-[7px] w-[7px] rounded-full ${
                    role.current ? "bg-accent text-accent" : "bg-copy-primary text-copy-primary"
                  }`}
                />
                {role.current ? "Current role" : role.period}
              </p>
            </div>
          </div>

          <p
            key={active}
            aria-hidden="true"
            className="reveal-up text-[clamp(56px,9vw,168px)] font-medium uppercase leading-[0.81] tracking-[-0.04em] text-copy-primary"
          >
            {role.company}
            <span className="text-accent">.</span>
          </p>
        </div>

        <div className="flex flex-col justify-end">
          {experience.map((r, i) => (
            // All panels stay in the HTML (crawlers, no-JS); inactive ones are hidden. Unhiding replays the reveal.
            <div key={r.company} id={`experience-panel-${i}`} role="tabpanel" aria-label={r.company} hidden={i !== active}>
              <div className="reveal-right">
                <h3 className="text-base font-medium leading-6 text-copy-primary">{r.role}</h3>
                <p className="font-mono text-xs text-copy-secondary">{r.period}</p>
                <p className="mt-4 text-base font-medium leading-6 tracking-[-0.16px] text-copy-primary">
                  {r.summary}
                </p>
                <ul className="mt-5 space-y-2">
                  {r.highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-[13px] leading-5 text-copy-secondary">
                      <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase text-copy-muted">
                  {r.stack.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={() => setActive((i + 1) % experience.length)}
                className="fill-btn reveal-right mt-7 inline-flex items-center gap-2 border border-copy-primary px-5 py-2.5 text-sm text-copy-primary"
                style={{ "--d": "0.08s" } as CSSProperties}
              >
                next role — {experience[(i + 1) % experience.length].company}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
