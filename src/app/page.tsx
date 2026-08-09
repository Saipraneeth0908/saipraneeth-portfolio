import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { ExperienceSection } from "@/components/experience-section";
import { ExpertiseSection } from "@/components/expertise-section";
import { CaseStudiesSection } from "@/components/case-studies-section";
import { EducationSection } from "@/components/education-section";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
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
