import Hero from "@/components/Hero";
import FeaturesUnified from "@/components/FeaturesUnified";
import Comparison from "@/components/Comparison";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
const Index = () => {
  return <div className="min-h-screen">
      <Hero />
      <FeaturesUnified className="bg-secondary" />
      <Comparison />
      <FinalCTA />
      <Footer />
    </div>;
};
export default Index;