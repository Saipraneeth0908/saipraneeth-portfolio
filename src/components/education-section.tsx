import { GraduationCap } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { education } from "@/content/profile";

export function EducationSection() {
  return (
    <Section id="education" label="Education" title="Academic background">
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((item) => (
          <Reveal key={item.school} className="h-full">
            <article className="flex h-full flex-col rounded-lg border border-ink-line bg-ink-surface/50 p-6">
              <GraduationCap aria-hidden="true" className="h-5 w-5 text-accent" />
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-copy-primary">
                {item.school}
              </h3>
              <p className="mt-2 leading-7 text-copy-secondary">{item.degree}</p>
              {item.detail ? (
                <p className="mt-1 text-sm leading-6 text-copy-muted">{item.detail}</p>
              ) : null}
              <p className="mt-4 font-mono text-xs text-copy-muted">GPA {item.gpa}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
