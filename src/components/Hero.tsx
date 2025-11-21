import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ormozyMascots from "@/assets/ormozy-mascots.webp";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-12 pb-16 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex justify-center">
          <img 
            src={ormozyMascots} 
            alt="Ormozy mascots" 
            className="h-48 w-auto"
          />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-semibold mb-6 leading-tight">
          Know exactly how you<br />spend your day
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Simple 15-minute check-ins that help you stay present and understand your work patterns
        </p>
        
        <div className="flex justify-center">
          <Button size="lg" className="font-medium px-8" onClick={() => navigate('/auth')}>
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
