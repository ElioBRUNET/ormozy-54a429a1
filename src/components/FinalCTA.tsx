import { Button } from "@/components/ui/button";
import { Glow } from "@/components/ui/glow";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className={cn("group relative overflow-hidden py-20 sm:py-24")}>
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 text-center sm:gap-8 px-4">
        <h2 className="text-2xl font-semibold sm:text-4xl md:text-5xl animate-appear">
          Start tracking your time for free
        </h2>
        <Button 
          size="lg" 
          className="animate-appear delay-100 px-10"
          onClick={() => navigate('/auth')}
        >
          Get Started - It's Free
        </Button>
        <p className="text-sm text-muted-foreground animate-appear delay-300">
          No credit card required • Free forever
        </p>
      </div>
      <div className="absolute left-0 top-0 h-full w-full translate-y-[1rem] opacity-80 transition-all duration-500 ease-in-out group-hover:translate-y-[-2rem] group-hover:opacity-100">
        <Glow variant="bottom" className="animate-appear-zoom delay-300" />
      </div>
    </section>
  );
};

export default FinalCTA;
