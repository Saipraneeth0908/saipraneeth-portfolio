import { FileText, Github, Linkedin, Mail } from "lucide-react";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { profile } from "@/content/profile";
import { asset } from "@/lib/site";

const OPEN_TO = [
  "Generative AI engineering roles",
  "AI/ML engineering roles",
  "Backend AI application development",
  "Technical collaboration on retrieval and agent systems",
];

export function ContactSection() {
  const links = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail, external: false },
    { label: "GitHub", value: "Saipraneeth0908", href: profile.github, icon: Github, external: true },
    ...(profile.linkedin
      ? [
          {
            label: "LinkedIn",
            value: "Profile",
            href: profile.linkedin,
            icon: Linkedin,
            external: true,
          },
        ]
      : []),
    {
      label: "Resume",
      value: "PDF",
      href: asset(profile.resumePath),
      icon: FileText,
      external: true,
    },
  ];

  return (
    <Section
      id="contact"
      label="Contact"
      title="Get in touch"
      intro={`Based in ${profile.location} and open to relocation. The fastest way to reach me is email.`}
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Open to</h3>
          <ul className="mt-4 space-y-2.5">
            {OPEN_TO.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-7 text-copy-secondary">
                <span aria-hidden="true" className="mt-3 h-px w-3 shrink-0 bg-accent/60" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <ul className="grid gap-3 sm:grid-cols-2">
            {links.map(({ label, value, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex min-h-[76px] flex-col justify-center gap-1 rounded-lg border border-ink-line bg-ink-surface/50 px-5 py-4 transition-colors duration-200 hover:border-accent/50 hover:bg-accent-dim"
                >
                  <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-accent">
                    <Icon aria-hidden="true" className="h-4 w-4" />
                    {label}
                  </span>
                  <span className="break-all text-sm text-copy-secondary">{value}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
