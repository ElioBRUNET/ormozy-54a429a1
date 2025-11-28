import Hero from "@/components/Hero";
import FeaturesUnified from "@/components/FeaturesUnified";
import PricingAndWhy from "@/components/PricingAndWhy";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturesUnified />
      <PricingAndWhy />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
