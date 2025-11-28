import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { Mockup, MockupFrame } from "@/components/ui/mockup";
import { Glow } from "@/components/ui/glow";
import { cn } from "@/lib/utils";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      className={cn(
        "bg-background text-foreground",
        "py-12 sm:py-16 md:py-20 px-4",
        "overflow-hidden pb-0"
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 pt-8 sm:gap-12">
        <div className="flex flex-col items-center gap-4 text-center sm:gap-8">
          {/* Badge */}
          <Badge variant="outline" className="animate-appear gap-2">
            <span className="text-muted-foreground">For people who lose track of time</span>
            <a href="#benefits" className="flex items-center gap-1">
              Learn more
              <ArrowRight className="h-3 w-3" />
            </a>
          </Badge>

          {/* Title */}
          <h1 className="relative z-10 inline-block animate-appear bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-4xl font-semibold leading-tight text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-7xl md:leading-tight">
            Know exactly how you<br />spend your day
          </h1>

          {/* Description */}
          <p className="text-md relative z-10 max-w-[550px] animate-appear font-medium text-muted-foreground opacity-0 delay-100 sm:text-xl">
            Simple 15-minute check-ins that help you stay present and understand your work patterns.
            <span className="block mt-2 text-foreground font-medium">No complex timers. No friction.</span>
          </p>

          {/* Actions */}
          <div className="relative z-10 flex animate-appear justify-center gap-4 opacity-0 delay-300">
            <Button size="lg" onClick={() => navigate('/auth')}>
              <Clock className="mr-2 h-4 w-4" />
              Get Started
            </Button>
          </div>

          {/* Mockup Image with Glow */}
          <div className="relative pt-6 w-full">
            <Glow
              variant="top"
              className="animate-appear-zoom opacity-0 delay-1000"
            />
            <MockupFrame
              className="animate-appear opacity-0 delay-700 mx-auto max-w-5xl relative z-20"
              size="small"
            >
              <Mockup type="responsive">
                <div className="w-full aspect-[16/10] bg-gradient-to-br from-primary/5 to-accent/10 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <Clock className="w-16 h-16 mx-auto text-primary opacity-50" />
                    <p className="text-muted-foreground text-sm">Dashboard Preview Coming Soon</p>
                  </div>
                </div>
              </Mockup>
            </MockupFrame>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
