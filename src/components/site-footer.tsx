import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-line px-5 py-8 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-sm text-copy-muted">
        <p>
          {profile.name} — {profile.title}
        </p>
        <p className="font-mono text-xs">Built with Next.js, TypeScript, and Tailwind CSS</p>
      </div>
    </footer>
  );
}
