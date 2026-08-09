import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { about, focusAreas } from "@/content/profile";

export function About() {
  return (
    <Section id="about" label="About" title="What I build">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="space-y-5">
          {about.map((paragraph) => (
            <p key={paragraph} className="max-w-prose text-base leading-8 text-copy-secondary">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Reveal>
          <ul className="space-y-3">
            {focusAreas.map((area) => (
              <li
                key={area.title}
                className="rounded-lg border border-ink-line bg-ink-surface/50 p-5"
              >
                <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                  {area.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-copy-secondary">{area.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
