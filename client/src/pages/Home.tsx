import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedSection from "@/components/FeaturedSection";
import MenuSection from "@/components/MenuSection";
import CustomizeSection from "@/components/CustomizeSection";
import SlimDaySection from "@/components/SlimDaySection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <HeroSection />
        <FeaturedSection />
        <MenuSection />
        <CustomizeSection />
        <SlimDaySection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
