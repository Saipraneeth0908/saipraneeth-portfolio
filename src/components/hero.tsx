import { ArrowRight, Github, MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import { asset } from "@/lib/site";
import { ScratchReveal } from "@/components/scratch-reveal";

/*
 * Text uses white + mix-blend-difference so it reads as near-black on the white
 * portrait and inverts to light wherever the tech backdrop is scratched in.
 * No z-index/transform on the text wrappers: either would isolate the blend
 * from the canvas beneath.
 */
export function Hero() {
  return (
    <ScratchReveal
      top={asset("/hero/bottom.webp")}
      bottom={asset("/hero/top.webp")}
      className="relative h-[100svh] w-full touch-pan-y overflow-hidden bg-white"
    >
      <div
        id="home"
        aria-labelledby="hero-title"
        role="region"
        className="absolute inset-0 flex flex-col justify-end gap-6 px-5 pb-8 pt-24 md:flex-row md:items-center md:justify-between md:px-10 md:pb-0"
      >
        <div className="text-white mix-blend-difference">
          <p
            className="animate-rise-in inline-block rounded-full border border-white/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em]"
            style={{ animationDelay: "40ms" }}
          >
            {profile.title}
          </p>
          <h1
            id="hero-title"
            className="animate-rise-in mt-4 max-w-[10ch] text-4xl font-bold uppercase leading-[0.95] tracking-tight md:text-5xl 2xl:text-6xl"
            style={{ animationDelay: "100ms" }}
          >
            {profile.name}
          </h1>
        </div>

        <div className="md:max-w-xs">
          <div className="text-white mix-blend-difference">
            <p
              className="animate-rise-in font-medium leading-7 md:text-lg"
              style={{ animationDelay: "160ms" }}
            >
              {profile.tagline}
            </p>
            <p
              className="animate-rise-in mt-2 hidden text-sm leading-6 opacity-80 sm:block"
              style={{ animationDelay: "200ms" }}
            >
              I work across embeddings-based retrieval, contextual memory, structured outputs, and
              tool calling — and the Python and FastAPI services that hold it all together.
            </p>
          </div>

          <div
            className="animate-rise-in mt-5 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "260ms" }}
          >
            <a
              href="#work"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-accent px-5 font-medium text-ink-base transition-colors duration-200 hover:bg-accent-soft"
            >
              Explore my work
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-ink-base px-5 font-medium text-copy-primary transition-colors duration-200 hover:bg-ink-surface"
            >
              <Github aria-hidden="true" className="h-4 w-4" />
              View GitHub
            </a>
          </div>

          <p
            className="animate-rise-in mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-white mix-blend-difference"
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
