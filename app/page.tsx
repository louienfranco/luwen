import SiteHeader from "@/components/misc/navbar";
import HeroSection from "@/components/custom/hero-section";
import AboutPage from "@/components/custom/about";
import Footer from "@/components/custom/footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutPage />
      </main>
      <Footer />
    </>
  );
}
