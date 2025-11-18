import Hero from "@/components/Hero";
import VideoDemo from "@/components/VideoDemo";
import MicroTracking from "@/components/MicroTracking";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import WhyOrmozy from "@/components/WhyOrmozy";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <VideoDemo />
      <MicroTracking />
      <HowItWorks />
      <Benefits />
      <WhyOrmozy />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
