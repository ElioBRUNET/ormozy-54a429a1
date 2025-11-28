import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, Clock } from "lucide-react";
import ormozyMascots from "@/assets/ormozy-mascots.webp";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-12 pb-16 px-4 text-center">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex justify-center items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            Built by Alex (🧔🏻‍♂️) for people who lose track of time
          </span>
        </div>

        <div className="mb-8 flex justify-center">
          <img 
            src={ormozyMascots} 
            alt="Ormozy mascots" 
            className="h-40 w-auto"
          />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Know exactly how you<br />spend your day
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          Simple 15-minute check-ins that help you stay present and understand your work patterns. 
          <span className="text-foreground font-medium"> No complex timers. No friction.</span>
        </p>
        
        <div className="flex justify-center gap-4">
          <Button size="lg" className="font-medium px-8" onClick={() => navigate('/auth')}>
            Get Started <Clock className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
