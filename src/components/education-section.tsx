import type { CSSProperties } from "react";
import { CountUp, InView } from "@/components/motion";
import { education } from "@/content/profile";
import { Chapter, IconBadge } from "@/components/chapter";
import { GraduationCap, Zap } from "lucide-react";

// MS Data Science, B.Tech Electrical & Electronics.
const ICONS = [GraduationCap, Zap];
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
          className="fx-reveal t-display mt-6"
          style={d(0.12)}
        >
          Academic background
        </h2>

        <div className="mt-16 grid gap-12 text-left md:grid-cols-2">
          {education.map((item, i) => (
            <div key={item.school} className="fx-reveal flex flex-col" style={d(0.5 + i * 0.08)}>
              <IconBadge icon={ICONS[i]} />
              <p className="t-display mt-4 flex items-baseline gap-3">
                <CountUp to={parseFloat(item.gpa)} decimals={2} />
                <span className="t-label text-copy-muted">GPA</span>
              </p>
              <h3 className="t-title mt-6">{item.school}</h3>
              <p className="t-body mt-2">{item.degree}</p>
              {item.detail ? <p className="t-small text-copy-muted">{item.detail}</p> : null}
            </div>
          ))}
        </div>
      </InView>
    </section>
  );
}
