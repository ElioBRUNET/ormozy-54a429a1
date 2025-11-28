import Hero from "@/components/Hero";
import FeaturesUnified from "@/components/FeaturesUnified";
import WhyOrmozy from "@/components/WhyOrmozy";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturesUnified />
      <WhyOrmozy />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
