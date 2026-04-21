"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Database,
  FileText,
  Github,
  GraduationCap,
  MapPin,
  Mail,
  Network,
  Phone,
  ShieldCheck,
  Workflow,
  X,
} from "lucide-react";
import { allProofAssets, projects } from "@/content/projects";
import { heroMetrics } from "@/content/metrics";
import { education, experienceTimeline, profile } from "@/content/profile";
import { skillGroups } from "@/content/skills";
import { cn } from "@/lib/utils";

const navItems = [
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Proof", "#proof"],
  ["Skills", "#skills"],
  ["Contact", "#contact"],
];

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

function SectionHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent-cyan">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold leading-tight text-copy-primary md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-copy-secondary md:text-lg">{children}</p>
    </motion.div>
  );
}

function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink-base/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="focus-ring rounded-md text-sm font-semibold text-copy-primary">
          Sai Praneeth
        </a>
        <div className="hidden items-center gap-6 text-sm text-copy-secondary md:flex">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} className="focus-ring rounded-md transition hover:text-copy-primary">
              {label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="focus-ring rounded-md border border-accent-blue/40 px-4 py-2 text-sm font-semibold text-accent-blue transition hover:bg-accent-blue/10"
        >
          Let&apos;s connect
        </a>
      </nav>
    </header>
  );
}

function HeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="depth-stage relative min-h-[520px] overflow-hidden rounded-lg border border-white/10 bg-ink-deep/70 shadow-panel">
      <div className="absolute inset-0 bg-radial-grid opacity-90" />
      <div className="absolute inset-8 rounded-lg border border-accent-blue/20" />
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -14, 0], rotateX: [8, 4, 8] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[12%] top-[16%] w-[76%] rounded-lg border border-white/14 bg-white/[0.055] p-5 shadow-glow backdrop-blur-xl"
        style={{ transform: "translateZ(80px) rotateX(8deg) rotateY(-8deg)" }}
      >
        <div className="mb-5 flex items-center justify-between">
          <span className="text-sm font-semibold text-copy-primary">Live Data Workspace</span>
          <span className="rounded-md bg-accent-green/15 px-3 py-1 text-xs font-semibold text-accent-green">
            validated
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {["ETL", "Model", "BI"].map((item, index) => (
            <div key={item} className="rounded-md border border-white/10 bg-ink-surface/80 p-4">
              <div className="mb-3 h-2 rounded-full bg-white/10">
                <motion.div
                  initial={{ width: "20%" }}
                  animate={reduceMotion ? undefined : { width: `${62 + index * 12}%` }}
                  transition={{ duration: 1.2, delay: index * 0.2 }}
                  className="h-full rounded-full bg-accent-cyan"
                />
              </div>
              <p className="text-xs text-copy-secondary">{item} layer</p>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[14%] left-[18%] h-28 w-28 rounded-lg border border-accent-cyan/25 bg-accent-cyan/10"
        style={{ transformStyle: "preserve-3d" }}
      />
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, 18, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[18%] right-[12%] rounded-lg border border-accent-violet/25 bg-ink-surface/80 p-5 backdrop-blur-xl"
      >
        <Network className="mb-3 h-6 w-6 text-accent-violet" />
        <p className="text-sm font-semibold text-copy-primary">messy data to decisions</p>
      </motion.div>
    </div>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 120]);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden px-5 pb-20 pt-28 md:px-8">
      <motion.div style={{ y }} className="absolute inset-x-0 top-12 -z-10 mx-auto h-[520px] max-w-6xl rounded-full bg-accent-blue/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.12 }} className="max-w-3xl">
          <motion.p variants={fadeUp} className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-accent-cyan">
            Analytics / ETL / Modeling / Dashboards
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl font-semibold leading-[1.05] text-copy-primary md:text-6xl">
            Building insight from messy, multi-source, high-impact data.
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-copy-secondary">
            I&apos;m {profile.name}, a {profile.title.toLowerCase()} working across healthcare and banking analytics, OCR pipelines, churn modeling, and business-ready BI experiences.
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base leading-8 text-copy-secondary">
            What ties the journey together is pretty simple: I enjoy working with messy data and turning it into something meaningful and actionable for decision-making.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
            <a className="focus-ring rounded-md bg-accent-blue px-5 py-3 font-semibold text-ink-base transition hover:bg-accent-cyan" href="#experience">
              Explore experience
            </a>
            <a className="focus-ring rounded-md border border-white/18 px-5 py-3 font-semibold text-copy-primary transition hover:border-accent-blue hover:bg-accent-blue/10" href={profile.resumeHref} target="_blank" rel="noreferrer">
              View resume
            </a>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {heroMetrics.map((metric) => (
              <div key={metric.label} className="rounded-lg border border-white/10 bg-white/[0.045] p-4 backdrop-blur">
                <p className="text-3xl font-semibold text-copy-primary">{metric.value}</p>
                <p className="mt-1 text-xs leading-5 text-copy-secondary">{metric.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}>
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-panel rounded-lg p-6">
          <ShieldCheck className="mb-5 h-8 w-8 text-accent-green" />
          <h2 className="text-2xl font-semibold text-copy-primary">Profile</h2>
          <p className="mt-4 leading-8 text-copy-secondary">
            {profile.summary}
          </p>
          <div className="mt-6 space-y-3 text-sm text-copy-secondary">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent-cyan" />
              {profile.location}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent-cyan" />
              <a className="focus-ring rounded-sm hover:text-copy-primary" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent-cyan" />
              <a className="focus-ring rounded-sm hover:text-copy-primary" href={`tel:${profile.phone.replace(/[^\d+]/g, "")}`}>
                {profile.phone}
              </a>
            </p>
          </div>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-lg border border-white/10 bg-ink-deep/60 p-6 md:p-10">
          <p className="text-xl leading-9 text-copy-primary">
            My path has been a progression from broad early exposure across the full data lifecycle, to working with more sensitive and complex healthcare data, to building analytics in regulated environments where validation, accuracy, and impact really matter.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Foundation", "ETL, ingestion, analysis, dashboards, and multi-domain problem solving"],
              ["Complex data", "OCR, healthcare records, structuring, optimization, and collaboration"],
              ["Decision intelligence", "Churn, satisfaction modeling, scenario analysis, and BI storytelling"],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
                <h3 className="font-semibold text-copy-primary">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-copy-secondary">{copy}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CareerJourney() {
  return (
    <section className="px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-lg border border-white/10 bg-ink-deep/70 p-6 md:p-8">
          <div className="mb-8 flex items-center gap-3">
            <FileText className="h-6 w-6 text-accent-cyan" />
            <h2 className="text-2xl font-semibold text-copy-primary">Career Timeline</h2>
          </div>
          <div className="space-y-5">
            {experienceTimeline.map((item) => (
              <div key={`${item.company}-${item.period}`} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-copy-primary">{item.company}</h3>
                    <p className="text-sm text-copy-secondary">{item.role}</p>
                  </div>
                  <p className="text-sm font-medium text-accent-cyan">{item.period}</p>
                </div>
                <p className="mt-3 text-sm leading-7 text-copy-secondary">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-ink-deep/70 p-6 md:p-8">
          <div className="mb-8 flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-accent-violet" />
            <h2 className="text-2xl font-semibold text-copy-primary">Education</h2>
          </div>
          <div className="space-y-5">
            {education.map((item) => (
              <div key={item.school} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
                <p className="text-sm font-medium text-accent-violet">{item.period}</p>
                <h3 className="mt-2 text-lg font-semibold text-copy-primary">{item.school}</h3>
                <p className="mt-2 text-sm leading-7 text-copy-secondary">{item.degree}</p>
                <p className="mt-2 text-sm text-copy-secondary">{item.detail}</p>
              </div>
            ))}
            <a
              href={profile.resumeHref}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/14 px-4 py-3 font-semibold text-copy-primary transition hover:border-accent-blue hover:bg-accent-blue/10"
            >
              Open full resume <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceWorlds() {
  return (
    <section id="experience" className="px-5 py-24 md:px-8">
      <SectionHeader eyebrow="Experience worlds" title="Three project environments, one data story.">
        Each world shows the business problem, the data work, the stakeholder use case, and the proof artifact that makes the work tangible.
      </SectionHeader>
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        {projects.map((project, index) => (
          <motion.article
            key={project.slug}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            className="overflow-hidden rounded-lg border border-white/10 bg-ink-deep/74"
          >
            <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="p-6 md:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: project.theme.primary }}>
                  {project.eyebrow}
                </p>
                <h3 className="mt-4 text-3xl font-semibold text-copy-primary md:text-4xl">{project.company}</h3>
                <p className="mt-2 text-sm font-medium text-copy-secondary">{project.period}</p>
                <p className="mt-3 text-xl text-copy-primary">{project.title}</p>
                <p className="mt-5 leading-8 text-copy-secondary">{project.summary}</p>
                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                      <p className="text-xl font-semibold text-copy-primary">{metric.value}</p>
                      <p className="mt-1 text-xs text-copy-secondary">{metric.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-copy-secondary">
                      {tool}
                    </span>
                  ))}
                </div>
                <Link href={`/projects/${project.slug}`} className="focus-ring mt-8 inline-flex items-center gap-2 rounded-md border border-white/14 px-4 py-3 font-semibold text-copy-primary transition hover:border-accent-blue hover:bg-accent-blue/10">
                  Open case study <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="relative min-h-[420px] border-t border-white/10 bg-black/20 lg:border-l lg:border-t-0">
                <Image src={project.proof[0].src} alt={project.proof[0].title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 55vw" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function ProofGallery() {
  const [active, setActive] = useState<(typeof allProofAssets)[number] | null>(null);

  return (
    <section id="proof" className="px-5 py-24 md:px-8">
      <SectionHeader eyebrow="Proof of work" title="Artifacts that make the work concrete.">
        Dashboards, workflows, OCR pipelines, and ETL architecture diagrams arranged as a focused evidence layer instead of a loose screenshot dump.
      </SectionHeader>
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
        {allProofAssets.map((asset, index) => (
          <motion.button
            key={asset.title}
            type="button"
            onClick={() => setActive(asset)}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="focus-ring group overflow-hidden rounded-lg border border-white/10 bg-ink-deep/70 text-left transition hover:-translate-y-1 hover:border-accent-blue/50"
          >
            <div className="relative aspect-[1.58] overflow-hidden">
              <Image src={asset.src} alt={asset.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: asset.theme.primary }}>
                {asset.project} / {asset.type}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-copy-primary">{asset.title}</h3>
              <p className="mt-2 text-sm leading-6 text-copy-secondary">{asset.caption}</p>
            </div>
          </motion.button>
        ))}
      </div>
      {active ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/78 p-4 backdrop-blur-md" role="dialog" aria-modal="true">
          <div className="relative w-full max-w-6xl overflow-hidden rounded-lg border border-white/12 bg-ink-deep shadow-panel">
            <button type="button" onClick={() => setActive(null)} className="focus-ring absolute right-4 top-4 z-10 rounded-md bg-black/55 p-2 text-copy-primary">
              <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-[1.58]">
              <Image src={active.src} alt={active.title} fill className="object-contain" sizes="100vw" />
            </div>
            <div className="border-t border-white/10 p-5">
              <p className="text-sm text-copy-secondary">{active.project} / {active.type}</p>
              <h3 className="mt-1 text-xl font-semibold text-copy-primary">{active.title}</h3>
              <p className="mt-2 text-copy-secondary">{active.caption}</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function Skills() {
  const icons = [BarChart3, Database, Workflow, FileText, Network, ShieldCheck];

  return (
    <section id="skills" className="px-5 py-24 md:px-8">
      <SectionHeader eyebrow="Skills & tools" title="A practical stack for data products.">
        The site frames skills by how they are used: analytics, engineering, modeling, dashboarding, document processing, and collaboration.
      </SectionHeader>
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => {
          const Icon = icons[index % icons.length];
          return (
            <motion.div
              key={group.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
            >
              <Icon className="mb-5 h-7 w-7 text-accent-cyan" />
              <h3 className="text-xl font-semibold text-copy-primary">{group.title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="rounded-md border border-white/10 bg-ink-deep/70 px-3 py-2 text-sm text-copy-secondary">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-5xl rounded-lg border border-white/10 bg-ink-deep/80 p-7 text-center shadow-panel md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-cyan">Contact</p>
        <h2 className="mt-4 text-3xl font-semibold text-copy-primary md:text-5xl">Ready for recruiter review and project conversations.</h2>
        <p className="mx-auto mt-5 max-w-2xl leading-8 text-copy-secondary">
          Explore the case studies, review the proof artifacts, and connect for data analytics, BI, ETL, or healthcare and banking analytics opportunities.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {[
            ["Email", `mailto:${profile.email}`, Mail],
            ["Call", `tel:${profile.phone.replace(/[^\d+]/g, "")}`, Phone],
            ["Resume", profile.resumeHref, FileText],
          ].map(([label, href, Icon]) => (
            <a
              key={label as string}
              href={href as string}
              target={label === "Resume" ? "_blank" : undefined}
              rel={label === "Resume" ? "noreferrer" : undefined}
              className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/14 px-5 py-3 font-semibold text-copy-primary transition hover:border-accent-blue hover:bg-accent-blue/10"
            >
              <Icon className="h-4 w-4" /> {label as string}
            </a>
          ))}
        </div>
        <p className="mt-6 text-sm text-copy-secondary">
          {profile.location} / {profile.email} / {profile.phone}
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-copy-muted md:px-8">
      <p>Sai Praneeth Kamishetty / Data analytics, ETL, modeling, dashboards, and decision intelligence.</p>
    </footer>
  );
}

export function PortfolioHome() {
  return (
    <main className={cn("relative")}>
      <Navbar />
      <Hero />
      <About />
      <CareerJourney />
      <ExperienceWorlds />
      <ProofGallery />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
