import Hero from "@/components/Hero";
import MicroTracking from "@/components/MicroTracking";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import WhyOrmozy from "@/components/WhyOrmozy";
import ProductDemo from "@/components/ProductDemo";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <MicroTracking />
      <HowItWorks />
      <Benefits />
      <WhyOrmozy />
      <ProductDemo />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
