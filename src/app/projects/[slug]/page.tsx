import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.company} | Sai Praneeth Kamishetty`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen px-5 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/#experience"
          className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/12 px-4 py-3 text-sm font-semibold text-copy-primary transition hover:border-accent-blue hover:bg-accent-blue/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>

        <section className="mt-10 grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p
              className="text-sm font-semibold uppercase tracking-[0.18em]"
              style={{ color: project.theme.primary }}
            >
              {project.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-copy-primary md:text-6xl">
              {project.company}
            </h1>
            <p className="mt-3 text-sm font-medium text-copy-secondary">{project.period}</p>
            <p className="mt-4 text-2xl text-copy-primary">{project.title}</p>
            <p className="mt-6 text-lg leading-8 text-copy-secondary">{project.summary}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-copy-secondary"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div className="relative aspect-[1.58] overflow-hidden rounded-lg border border-white/10 bg-ink-deep shadow-panel">
            <Image
              src={project.proof[0].src}
              alt={project.proof[0].title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>
        </section>

        <section className="mt-14 grid gap-5 md:grid-cols-3">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="rounded-lg border border-white/10 bg-ink-deep/70 p-6">
              <p className="text-3xl font-semibold text-copy-primary">{metric.value}</p>
              <p className="mt-2 text-copy-secondary">{metric.label}</p>
            </div>
          ))}
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-3">
          {[
            ["Business Problem", project.problem],
            ["My Role", project.role],
            ["Stakeholder Use", project.stakeholderUse],
          ].map(([title, copy]) => (
            <article key={title} className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-xl font-semibold text-copy-primary">{title}</h2>
              <p className="mt-4 leading-8 text-copy-secondary">{copy}</p>
            </article>
          ))}
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-2">
          <article className="rounded-lg border border-white/10 bg-ink-deep/70 p-6">
            <h2 className="text-2xl font-semibold text-copy-primary">Data Sources</h2>
            <div className="mt-5 grid gap-3">
              {project.dataSources.map((item) => (
                <p key={item} className="rounded-md border border-white/10 bg-white/[0.035] px-4 py-3 text-copy-secondary">
                  {item}
                </p>
              ))}
            </div>
          </article>
          <article className="rounded-lg border border-white/10 bg-ink-deep/70 p-6">
            <h2 className="text-2xl font-semibold text-copy-primary">What I Owned</h2>
            <div className="mt-5 grid gap-3">
              {project.owned.map((item) => (
                <p key={item} className="rounded-md border border-white/10 bg-white/[0.035] px-4 py-3 text-copy-secondary">
                  {item}
                </p>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p
                className="text-sm font-semibold uppercase tracking-[0.18em]"
                style={{ color: project.theme.primary }}
              >
                Evidence
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-copy-primary">Proof Artifacts</h2>
            </div>
            <Link
              href="/#proof"
              className="focus-ring hidden items-center gap-2 rounded-md border border-white/12 px-4 py-3 text-sm font-semibold text-copy-primary transition hover:border-accent-blue hover:bg-accent-blue/10 md:inline-flex"
            >
              Full gallery <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {project.proof.map((asset) => (
              <article key={asset.title} className="overflow-hidden rounded-lg border border-white/10 bg-ink-deep/70">
                <div className="relative aspect-[1.58]">
                  <Image src={asset.src} alt={asset.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="p-5">
                  <p className="text-sm text-copy-secondary">{asset.type}</p>
                  <h3 className="mt-2 text-xl font-semibold text-copy-primary">{asset.title}</h3>
                  <p className="mt-2 leading-7 text-copy-secondary">{asset.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
