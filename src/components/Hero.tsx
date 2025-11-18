import { Button } from "@/components/ui/button";
import ormozyMascots from "@/assets/ormozy-mascots.webp";

const Hero = () => {
  return (
    <section className="py-24 md:py-32 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 flex justify-center">
          <img 
            src={ormozyMascots} 
            alt="Ormozy mascots" 
            className="h-48 w-auto"
          />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-semibold mb-8 leading-tight">
          Know exactly how you<br />spend your day
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Simple 15-minute check-ins that help you stay present and understand your work patterns
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="font-medium px-8">
            Start Tracking
          </Button>
          <Button variant="outline" size="lg" className="font-medium px-8">
            Product Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
