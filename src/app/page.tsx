import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { ExperienceSection } from "@/components/experience-section";
import { ExpertiseSection } from "@/components/expertise-section";
import { CaseStudiesSection } from "@/components/case-studies-section";
import { EducationSection } from "@/components/education-section";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
import { PointerFX } from "@/components/motion";

export default function Home() {
  return (
    <>
      <PointerFX />
      <SiteNav />
      <main id="main">
        <Hero />
        <About />
        <ExperienceSection />
        <ExpertiseSection />
        <CaseStudiesSection />
        <EducationSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
