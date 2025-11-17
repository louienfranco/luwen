import SiteHeader from "@/components/misc/navbar";
import HeroSection from "@/components/custom/hero-section";
import AboutPage from "@/components/custom/about";
import Footer from "@/components/custom/footer";
import ProjectsSection from "@/components/custom/projects";
import { ToolCards } from "@/components/custom/stack";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutPage />
        <ProjectsSection />
        <ToolCards />
      </main>
      <Footer />
    </>
  );
}
