import { ArrowRight, Github, MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import { asset } from "@/lib/site";
import { ScratchReveal } from "@/components/scratch-reveal";

export function Hero() {
  return (
    <ScratchReveal
      top={asset("/hero/top.png")}
      bottom={asset("/hero/bottom.png")}
      className="relative h-[100svh] w-full touch-pan-y overflow-hidden bg-ink-base"
    >
      <div
        id="home"
        aria-labelledby="hero-title"
        role="region"
        className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-5 pb-8 pt-24 md:items-center md:px-8 md:pb-0"
      >
        <div className="max-w-md rounded-xl border border-ink-line bg-ink-base/80 p-6 backdrop-blur-md md:p-7">
          <p
            className="animate-rise-in font-mono text-xs uppercase tracking-[0.2em] text-accent"
            style={{ animationDelay: "40ms" }}
          >
            {profile.title}
          </p>
          <h1
            id="hero-title"
            className="animate-rise-in mt-4 text-3xl font-semibold leading-[1.08] tracking-tight text-copy-primary md:text-5xl"
            style={{ animationDelay: "100ms" }}
          >
            {profile.name}
          </h1>
          <p
            className="animate-rise-in mt-4 leading-7 text-copy-secondary md:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            {profile.tagline}
          </p>
          <p
            className="animate-rise-in mt-3 text-sm leading-6 text-copy-secondary md:text-base md:leading-7"
            style={{ animationDelay: "200ms" }}
          >
            I work across embeddings-based retrieval, contextual memory, structured outputs, and
            tool calling — and the Python and FastAPI services that hold it all together.
          </p>

          <div
            className="animate-rise-in mt-6 flex flex-wrap items-center gap-3"
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
            className="animate-rise-in mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-copy-muted"
            style={{ animationDelay: "320ms" }}
          >
            <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
            <span>{profile.location}</span>
            <span aria-hidden="true">·</span>
            <span>{profile.relocation}</span>
          </p>
        </div>
      </div>
    </ScratchReveal>
  );
}
