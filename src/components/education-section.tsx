import type { CSSProperties } from "react";
import { CountUp, InView } from "@/components/motion";
import { education } from "@/content/profile";
import { Chapter } from "@/components/chapter";

const GLYPHS = ["*", "#"];
const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/* Chapter 05 — intelligent-operations stat band: dot-matrix headline, glyph + count-up value + muted label. */
export function EducationSection() {
  return (
    <section
      id="education"
      aria-labelledby="education-title"
      className="relative scroll-mt-16 bg-ink-base px-5 py-24 md:px-8 md:py-32"
    >
      <InView className="mx-auto max-w-[920px] text-center">
        <Chapter className="fx-reveal" style={d(0.05)}>
          05 / Education
        </Chapter>
        <h2
          id="education-title"
          className="fx-reveal mt-5 font-dot text-[clamp(32px,6.2vw,80px)] font-black leading-[1.12] tracking-[-0.04em] text-copy-primary max-md:tracking-[-0.08em]"
          style={d(0.12)}
        >
          Academic background
        </h2>

        <div className="mt-16 grid gap-12 text-left md:grid-cols-2">
          {education.map((item, i) => (
            <div key={item.school} className="fx-reveal flex flex-col" style={d(0.5 + i * 0.08)}>
              <span aria-hidden="true" className="font-dot text-[clamp(22px,3vw,33px)] font-black leading-none text-accent">
                {GLYPHS[i]}
              </span>
              <p className="mt-4 flex items-baseline gap-2 text-[clamp(36px,4.4vw,56px)] font-medium leading-none tracking-[-0.025em] text-copy-primary">
                <CountUp to={parseFloat(item.gpa)} decimals={2} />
                <span className="text-sm font-normal tracking-normal text-copy-muted">GPA</span>
              </p>
              <h3 className="mt-5 text-base font-medium text-copy-primary">{item.school}</h3>
              <p className="mt-1 text-sm leading-6 text-copy-secondary">{item.degree}</p>
              {item.detail ? <p className="text-sm leading-6 text-copy-muted">{item.detail}</p> : null}
            </div>
          ))}
        </div>
      </InView>
    </section>
  );
}
