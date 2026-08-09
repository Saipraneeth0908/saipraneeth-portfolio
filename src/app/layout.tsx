import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const description =
  "Sai Praneeth Kamishetty is an Applied Generative AI Engineer building retrieval-augmented generation systems, semantic search, AI agents, conversational applications, and Python/FastAPI services.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${profile.name} — ${profile.title}`,
  description,
  keywords: [
    "Applied Generative AI Engineer",
    "Retrieval-Augmented Generation",
    "RAG",
    "Semantic search",
    "AI agents",
    "LangChain",
    "LangGraph",
    "FastAPI",
    "Python",
    "Machine learning",
    "NLP",
  ],
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: `${profile.name} — Portfolio`,
    title: `${profile.name} — ${profile.title}`,
    description,
  },
  twitter: {
    card: "summary",
    title: `${profile.name} — ${profile.title}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0b0f",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  sameAs: [profile.github, profile.linkedin].filter(Boolean),
  address: { "@type": "PostalAddress", addressLocality: "Tallahassee", addressRegion: "FL" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Florida State University" },
    {
      "@type": "CollegeOrUniversity",
      name: "VNR Vignana Jyothi Institute of Engineering and Technology",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-medium focus:text-ink-base"
        >
          Skip to main content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
