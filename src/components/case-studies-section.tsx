"use client";

import { useEffect, useRef, useState } from "react";
import { Grade } from "@/components/graded-video";
import { filmSrc } from "@/lib/films";
import { caseStudies } from "@/content/case-studies";
import { Chapter } from "@/components/chapter";

const COUNT = caseStudies.length;
const shadow = "[text-shadow:0_2px_24px_rgba(10,11,15,0.65)]";

function Chip({ children }: { children: React.ReactNode }) {
  return <li className="liquid-glass t-small rounded-full px-3 py-1 text-copy-primary">{children}</li>;
}

type Study = (typeof caseStudies)[number];

function StudyIntro({ s, i }: { s: Study; i: number }) {
  return (
    <div>
      <p className="t-meta text-copy-secondary">
        {String(i + 1).padStart(2, "0")} — {s.context}
      </p>
      <h3
        className={`t-title mt-4 text-[clamp(1.75rem,2.8vw,2.75rem)] ${shadow}`}
      >
        {s.title}
      </h3>
      <p className={`t-lead mt-6 max-w-xl text-copy-primary/90 ${shadow}`}>{s.outcome}</p>
      <ul aria-label="Technologies" className="mt-6 flex flex-wrap gap-2">
        {s.technologies.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </ul>
    </div>
  );
}

function StudyDetail({ s }: { s: Study }) {
  return (
    <div className="liquid-glass rounded-3xl p-6 md:p-7">
      <div className="t-small grid gap-5 md:grid-cols-2">
        <div>
          <h4 className="t-label text-accent">Problem</h4>
          <p className="mt-2">{s.problem}</p>
        </div>
        <div>
          <h4 className="t-label text-accent">Approach</h4>
          <p className="mt-2">{s.approach}</p>
        </div>
      </div>
      <h4 className="t-label mt-6 text-accent">Workflow</h4>
      <ol className="mt-2 flex flex-wrap gap-2">
        {s.workflow.map((step, k) => (
          <Chip key={step}>
            <span className="t-meta mr-1.5 text-accent-soft">{String(k + 1).padStart(2, "0")}</span>
            {step}
          </Chip>
        ))}
      </ol>
      <h4 className="t-label mt-6 text-accent">Engineering challenges</h4>
      <ul className="t-small mt-2 space-y-1.5">
        {s.challenges.map((c) => (
          <li key={c} className="flex gap-3">
            <span aria-hidden="true" className="mt-3 h-px w-3 shrink-0 bg-accent" />
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

/*
 * Chapter 04 — NovaAI: a full-viewport film scrubbed by scroll, sparse
 * editorial type with drop shadows, frosted chips. On large screens the
 * section pins for 400svh and scroll walks the three studies; elsewhere it is
 * a stacked page over a looping film.
 */
export function CaseStudiesSection() {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const sec = section.current;
    const v = video.current;
    if (!sec || !v) return;
    let raf = 0;
    let visible = false;

    // Fetched as a blob once nearby, so scrubbing seeks locally instead of over the network.
    const load = async () => {
      if (v.src) return;
      // Blob so scrub seeks are local. The NovaAI source had 1 keyframe in 241 frames; this
      // re-encode (lib/films) has one every 3, which is what made scrubbing smooth.
      const src = filmSrc("runtime-scrub");
      try {
        v.src = URL.createObjectURL(await (await fetch(src)).blob());
      } catch {
        v.src = src;
      }
      if (!pinned && visible) v.play().catch(() => {});
    };
    const near = new IntersectionObserver(([e]) => e.isIntersecting && load(), { rootMargin: "50% 0px" });
    const seen = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (pinned) return;
      if (visible && v.src) v.play().catch(() => {});
      else v.pause();
    });
    near.observe(sec);
    seen.observe(sec);

    v.loop = !pinned;
    if (pinned) {
      v.pause();
      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!visible) return;
        const r = sec.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
        setActive(Math.min(COUNT - 1, Math.floor(p * COUNT)));
        if (!v.duration || v.seeking) return;
        const next = v.currentTime + (p * (v.duration - 0.05) - v.currentTime) * 0.12;
        if (Math.abs(next - v.currentTime) > 1 / 60) v.currentTime = next;
      };
      raf = requestAnimationFrame(tick);
    }
    return () => {
      near.disconnect();
      seen.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [pinned]);

  const goTo = (i: number) => {
    const sec = section.current;
    if (!sec) return;
    const top = sec.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((i + 0.5) / COUNT) * (sec.offsetHeight - window.innerHeight), behavior: "smooth" });
  };

  // Pinned: only the active study is visible; the rest fade out in place.
  const swap = (i: number) =>
    `absolute inset-0 flex items-center transition-[opacity,transform,filter] duration-700 ${
      i === active ? "opacity-100" : "pointer-events-none translate-y-6 opacity-0 blur-sm"
    }`;

  const header = (
    <header>
      <Chapter>04 / Selected engineering work</Chapter>
      <h2 id="work-title" className={`t-display mt-5 ${shadow}`}>
        Representative case studies
      </h2>
    </header>
  );

  return (
    <section
      ref={section}
      id="work"
      aria-labelledby="work-title"
      className={`relative scroll-mt-16 bg-ink-base ${pinned ? "h-[400svh]" : ""}`}
    >
      <div aria-hidden="true" className="film-feather absolute inset-0">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <video
            ref={video}
            muted
            playsInline
            preload="none"
            disablePictureInPicture
            className="h-full w-full object-cover"
          />
          <Grade scrim={0.25} />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,11,15,0.88)_0%,rgba(10,11,15,0.35)_55%,rgba(10,11,15,0.6)_100%)]" />
        </div>
      </div>

      {pinned ? (
        <div className="sticky top-0 z-10 mx-auto grid h-[100svh] max-w-[1340px] grid-cols-[0.95fr_1.05fr] gap-12 px-10 pb-8 pt-24">
          <div className="flex min-h-0 flex-col">
            {header}
            <div className="relative min-h-0 flex-1">
              {caseStudies.map((s, i) => (
                <div key={s.slug} aria-hidden={i === active ? undefined : true} className={swap(i)}>
                  <StudyIntro s={s} i={i} />
                </div>
              ))}
            </div>
            <nav aria-label="Case studies" className="grid grid-cols-3 gap-4">
              {caseStudies.map((s, i) => (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={i === active ? "true" : undefined}
                  className={`text-left transition-opacity duration-300 ${i === active ? "opacity-100" : "opacity-50 hover:opacity-80"}`}
                >
                  <span className="block h-px w-full bg-copy-primary/20">
                    <span
                      className={`block h-full origin-left bg-accent transition-transform duration-700 ${
                        i <= active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </span>
                  <span className="t-label mt-3 flex gap-2 text-copy-primary">
                    <span className="shrink-0 text-accent">0{i + 1} /</span>
                    <span className="line-clamp-2">{s.title}</span>
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="relative min-h-0">
            {caseStudies.map((s, i) => (
              <div key={s.slug} aria-hidden={i === active ? undefined : true} className={swap(i)}>
                <div className="no-scrollbar max-h-full w-full overflow-y-auto rounded-3xl">
                  <StudyDetail s={s} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative z-10 mx-auto max-w-[1340px] px-6 pb-16 pt-28 md:px-10">
          {header}
          <div className="mt-12 space-y-20">
            {caseStudies.map((s, i) => (
              <article key={s.slug} className="grid gap-8">
                <StudyIntro s={s} i={i} />
                <StudyDetail s={s} />
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
