import { Reveal } from "@/components/reveal";

export function Section({
  id,
  label,
  title,
  intro,
  children,
}: {
  id: string;
  label: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{label}</p>
          <h2
            id={`${id}-title`}
            className="mt-4 text-3xl font-semibold tracking-tight text-copy-primary md:text-4xl"
          >
            {title}
          </h2>
          {intro ? (
            <p className="mt-4 max-w-prose text-base leading-7 text-copy-secondary">{intro}</p>
          ) : null}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
