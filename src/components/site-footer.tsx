import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="overflow-hidden px-5 pb-8 pt-16 md:px-8">
      <p
        aria-hidden="true"
        className="rise-big select-none whitespace-nowrap text-center font-display text-[15vw] leading-[0.85] tracking-tight text-copy-primary"
      >
        Sai Praneeth<span className="text-accent">.</span>
      </p>
      <div className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-between gap-3 text-sm text-copy-muted">
        <p>
          {profile.name} — {profile.title}
        </p>
        <p className="font-mono text-xs">Built with Next.js, TypeScript, and Tailwind CSS</p>
      </div>
    </footer>
  );
}
