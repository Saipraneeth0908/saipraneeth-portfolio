import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { experience, type Role } from "@/content/experience";

function RoleCard({ role }: { role: Role }) {
  return (
    <article className="relative rounded-lg border border-ink-line bg-ink-surface/50 p-6 transition-colors duration-200 hover:border-accent/40 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-copy-primary">{role.role}</h3>
          <p className="mt-1 text-copy-secondary">
            {role.company}
            {role.current ? (
              <span className="ml-3 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent-dim px-2.5 py-0.5 align-middle font-mono text-xs uppercase tracking-wider text-accent">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                Current
              </span>
            ) : null}
          </p>
        </div>
        <p className="font-mono text-xs text-copy-muted">{role.period}</p>
      </div>

      <p className="mt-4 max-w-prose leading-7 text-copy-secondary">{role.summary}</p>

      <ul className="mt-6 space-y-3">
        {role.highlights.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-7 text-copy-secondary">
            <span aria-hidden="true" className="mt-3 h-px w-3 shrink-0 bg-accent/60" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-6 flex flex-wrap gap-2">
        {role.stack.map((tool) => (
          <li
            key={tool}
            className="rounded border border-ink-line px-2.5 py-1 font-mono text-xs text-copy-muted"
          >
            {tool}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      label="Experience"
      title="Where I've done the work"
      intro="Five years across applied GenAI, machine learning, and data engineering — moving from analytics pipelines into LLM systems that run in production."
    >
      <div className="space-y-6">
        {experience.map((role) => (
          <Reveal key={role.company}>
            <RoleCard role={role} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
