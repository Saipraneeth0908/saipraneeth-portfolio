"use client";

import { useState, type CSSProperties } from "react";
import { BrainCircuit, Check, Copy, FileText, Github, Linkedin, Server, Sparkles, Workflow } from "lucide-react";
import { InView } from "@/components/motion";
import { Grade, GradedVideo } from "@/components/graded-video";
import { profile } from "@/content/profile";
import { asset } from "@/lib/site";
import { Chapter, IconBadge } from "@/components/chapter";

const OPEN_TO = [
  "Generative AI engineering roles",
  "AI/ML engineering roles",
  "Backend AI application development",
  "Technical collaboration on retrieval and agent systems",
];
const ICONS = [Sparkles, BrainCircuit, Server, Workflow];
const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/*
 * Chapter 06 — intelligent-operations landing: film, ring-avatar trust row,
 * dot-matrix headline, glowing CTA, and a four-column footer row.
 */
export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const rings = [
    { label: "GitHub", href: profile.github, icon: Github },
    ...(profile.linkedin ? [{ label: "LinkedIn", href: profile.linkedin, icon: Linkedin }] : []),
    { label: "Resume PDF", href: asset(profile.resumePath), icon: FileText },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-ink-base">
      <div aria-hidden="true" className="film-feather absolute inset-0 overflow-hidden">
        <GradedVideo film="contact-ops" />
        <Grade scrim={0.4} />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,15,0.85)_0%,transparent_30%,transparent_60%,rgba(10,11,15,0.9)_100%)]"
        />
      </div>

      <InView className="relative z-10 mx-auto flex min-h-[100svh] max-w-[920px] flex-col items-center px-[clamp(14px,3vw,32px)] pb-[clamp(16px,2.4vh,28px)] pt-28">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="fx-reveal inline-flex items-center [--ring:clamp(36px,4.5vw,42px)]" style={d(0.05)}>
            {rings.map(({ label, href, icon: Icon }, i) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="relative grid h-[var(--ring)] w-[var(--ring)] place-items-center rounded-full border border-white/40 bg-ink-raised p-[5px] transition-transform duration-300 hover:-translate-y-1"
                style={{ marginLeft: i ? "calc(var(--ring) * -0.42)" : 0, zIndex: i + 1 }}
              >
                <span className="grid h-full w-full place-items-center rounded-full bg-copy-primary text-ink-base">
                  <Icon aria-hidden="true" className="h-[calc(var(--ring)*0.34)] w-[calc(var(--ring)*0.34)]" />
                </span>
              </a>
            ))}
            <span
              className="flex min-h-[var(--ring)] items-center rounded-[calc(var(--ring)/2)] border border-white/40 bg-ink-raised py-1 pr-4 t-small leading-snug text-copy-secondary"
              style={{ marginLeft: "calc(var(--ring) * -0.42)", paddingLeft: "calc(var(--ring) * 0.58)" }}
            >
              {profile.location} · {profile.relocation}
            </span>
          </div>

          <Chapter className="fx-reveal mt-8" style={d(0.1)}>
            06 / Contact
          </Chapter>
          <h2
            id="contact-title"
            className="fx-reveal t-display mt-5"
            style={d(0.12)}
          >
            Get in touch
          </h2>
          <p
            className="fx-reveal t-lead mt-5 max-w-[min(500px,92%)]"
            style={d(0.28)}
          >
            Based in {profile.location} and open to relocation. The fastest way to reach me is email.
          </p>

          <div className="fx-reveal mt-9 flex flex-wrap items-center justify-center gap-3" style={d(0.4)}>
            <a
              href={`mailto:${profile.email}`}
              className="ops-glow rounded-full bg-accent px-7 py-3 text-sm font-semibold text-ink-base"
            >
              Email me
            </a>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-ink-raised/70 px-5 py-3 text-sm text-copy-secondary backdrop-blur transition-colors hover:text-copy-primary"
            >
              {copied ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
              <span aria-live="polite">{copied ? "Copied" : profile.email}</span>
            </button>
          </div>
        </div>

        <div className="mt-16 w-full">
          <h3 className="fx-reveal t-label mb-5 text-center text-copy-muted" style={d(0.45)}>
            Open to
          </h3>
          <ul className="grid w-full grid-cols-2 gap-6 md:grid-cols-4">
            {OPEN_TO.map((item, i) => (
              <li key={item} className="fx-reveal flex flex-col items-center text-center" style={d(0.5 + i * 0.08)}>
                <IconBadge icon={ICONS[i]} />
                <span className="t-small mt-4">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </InView>
    </section>
  );
}
