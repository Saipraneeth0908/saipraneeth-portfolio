"use client";

import { useEffect, useState } from "react";
import { FileText, Menu, X } from "lucide-react";
import { profile } from "@/content/profile";
import { asset } from "@/lib/site";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "expertise", label: "Expertise" },
  { id: "work", label: "Case Studies" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [time, setTime] = useState("");

  // Rendered after mount only, so static HTML and hydration agree.
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "America/New_York",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const resumeHref = asset(profile.resumePath);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-line/70 bg-ink-base/85 backdrop-blur">
      <nav aria-label="Primary" className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <a href="#home" className="-my-3 py-3 font-mono text-sm font-medium tracking-tight text-copy-primary">
            sai<span className="text-accent">.</span>praneeth
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={`rounded-md px-3 py-2 text-sm transition-colors duration-200 hover:text-copy-primary ${
                    active === id ? "text-accent" : "text-copy-secondary"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {time ? (
              <span className="mr-2 hidden font-mono text-xs tabular-nums text-copy-muted xl:inline">
                TLH {time}
              </span>
            ) : null}
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-md border border-accent/40 px-3.5 py-2 text-sm font-medium text-accent transition-colors duration-200 hover:bg-accent-dim sm:inline-flex"
            >
              <FileText aria-hidden="true" className="h-4 w-4" />
              Resume
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-ink-line text-copy-primary transition-colors duration-200 hover:border-accent/50 lg:hidden"
            >
              {open ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <ul id="mobile-nav" className="border-t border-ink-line/70 py-2 lg:hidden">
            {NAV.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === id ? "true" : undefined}
                  className={`flex min-h-[44px] items-center rounded-md px-3 text-base ${
                    active === id ? "text-accent" : "text-copy-secondary"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex min-h-[44px] items-center gap-2 rounded-md px-3 text-base text-copy-secondary"
              >
                <FileText aria-hidden="true" className="h-4 w-4" />
                Resume
              </a>
            </li>
          </ul>
        ) : null}
      </nav>
      <div aria-hidden="true" className="scroll-progress absolute inset-x-0 bottom-0 h-px bg-accent" />
    </header>
  );
}
