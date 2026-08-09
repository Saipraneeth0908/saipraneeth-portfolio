import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { caseStudies, type CaseStudy } from "@/content/case-studies";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{title}</h4>
      <div className="mt-3 text-sm leading-7 text-copy-secondary">{children}</div>
    </div>
  );
}

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <article className="rounded-lg border border-ink-line bg-ink-surface/50 p-6 transition-colors duration-200 hover:border-accent/40 md:p-8">
      <p className="font-mono text-xs text-copy-muted">
        {String(index + 1).padStart(2, "0")} — {study.context}
      </p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-copy-primary md:text-2xl">
        {study.title}
      </h3>

      <div className="mt-7 grid gap-7 md:grid-cols-2">
        <Block title="Problem">
          <p className="max-w-prose">{study.problem}</p>
        </Block>
        <Block title="Approach">
          <p className="max-w-prose">{study.approach}</p>
        </Block>
      </div>

      <div className="mt-7 grid gap-7 md:grid-cols-2">
        <Block title="Workflow">
          <ol className="space-y-2">
            {study.workflow.map((step, i) => (
              <li key={step} className="flex gap-3">
                <span aria-hidden="true" className="font-mono text-xs text-copy-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Block>
        <Block title="Engineering challenges">
          <ul className="space-y-2">
            {study.challenges.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-3 h-px w-3 shrink-0 bg-accent/60" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Block>
      </div>

      <div className="mt-7">
        <Block title="Outcome">
          <p className="max-w-prose">{study.outcome}</p>
        </Block>
      </div>

      <ul className="mt-7 flex flex-wrap gap-2">
        {study.technologies.map((tech) => (
          <li
            key={tech}
            className="rounded border border-ink-line px-2.5 py-1 font-mono text-xs text-copy-muted"
          >
            {tech}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function CaseStudiesSection() {
  return (
    <Section
      id="work"
      label="Selected engineering work"
      title="Representative case studies"
      intro="Generalized accounts of systems built in professional roles. Client names, proprietary data, and internal metrics are deliberately excluded, so these describe the engineering rather than the business outcome."
    >
      <div className="space-y-6">
        {caseStudies.map((study, i) => (
          <Reveal key={study.slug}>
            <CaseStudyCard study={study} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
