import { ArrowRight, Github, MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import { RetrievalDiagram } from "@/components/retrieval-diagram";

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="scroll-mt-24 px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p
            className="animate-rise-in font-mono text-xs uppercase tracking-[0.2em] text-accent"
            style={{ animationDelay: "40ms" }}
          >
            {profile.title}
          </p>
          <h1
            id="hero-title"
            className="animate-rise-in mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-copy-primary md:text-6xl"
            style={{ animationDelay: "100ms" }}
          >
            {profile.name}
          </h1>
          <p
            className="animate-rise-in mt-6 max-w-prose text-lg leading-8 text-copy-secondary"
            style={{ animationDelay: "160ms" }}
          >
            {profile.tagline}
          </p>
          <p
            className="animate-rise-in mt-4 max-w-prose leading-7 text-copy-secondary"
            style={{ animationDelay: "200ms" }}
          >
            I work across embeddings-based retrieval, contextual memory, structured outputs, and
            tool calling — and the Python and FastAPI services that hold it all together.
          </p>

          <div
            className="animate-rise-in mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "260ms" }}
          >
            <a
              href="#work"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-accent px-5 font-medium text-ink-base transition-colors duration-200 hover:bg-accent-soft"
            >
              Explore my work
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-ink-line px-5 font-medium text-copy-primary transition-colors duration-200 hover:border-accent/50 hover:bg-accent-dim"
            >
              <Github aria-hidden="true" className="h-4 w-4" />
              View GitHub
            </a>
          </div>

          <p
            className="animate-rise-in mt-9 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-copy-muted"
            style={{ animationDelay: "320ms" }}
          >
            <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
            <span>{profile.location}</span>
            <span aria-hidden="true">·</span>
            <span>{profile.relocation}</span>
          </p>
        </div>

        <div
          className="animate-rise-in rounded-xl border border-ink-line bg-ink-surface/60 p-5 md:p-7"
          style={{ animationDelay: "220ms" }}
        >
          <RetrievalDiagram />
        </div>
      </div>
    </section>
  );
}
