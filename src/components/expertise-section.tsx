import { BarChart3, Rocket, Search, Server, Sparkles, Wrench } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { expertise, type ExpertiseGroup } from "@/content/expertise";

const ICONS = {
  sparkles: Sparkles,
  search: Search,
  server: Server,
  chart: BarChart3,
  rocket: Rocket,
  wrench: Wrench,
} satisfies Record<ExpertiseGroup["icon"], typeof Sparkles>;

export function ExpertiseSection() {
  return (
    <Section
      id="expertise"
      label="Expertise"
      title="Capabilities, grouped by how they're used"
      intro="Organized by the layer of the system each one belongs to, rather than as a flat keyword list."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {expertise.map((group) => {
          const Icon = ICONS[group.icon];
          return (
            <Reveal key={group.title} className="h-full">
              <article className="flex h-full flex-col rounded-lg border border-ink-line bg-ink-surface/50 p-6 transition-colors duration-200 hover:border-accent/40">
                <Icon aria-hidden="true" className="h-5 w-5 text-accent" />
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-copy-primary">
                  {group.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-copy-muted">{group.blurb}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded border border-ink-line bg-ink-raised/60 px-2.5 py-1 text-xs text-copy-secondary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
