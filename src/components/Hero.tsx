import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { Glow } from "@/components/ui/glow";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
const Hero = () => {
  const navigate = useNavigate();
  return <section className={cn("bg-background text-foreground", "py-12 sm:py-16 md:py-20 px-4", "overflow-hidden pb-0")}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 pt-8 sm:gap-12">
        <div className="flex flex-col items-center gap-4 text-center sm:gap-8">
          {/* Logo */}
          <img src={logo} alt="Ormozy" className="h-16 w-16 sm:h-20 sm:w-20 animate-appear" />
          
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
          <p className="text-md relative z-10 max-w-[550px] animate-appear text-muted-foreground opacity-0 delay-100 sm:text-xl font-normal">
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

          {/* Arcade Demo with Glow */}
          <div className="relative pt-6 w-full max-w-5xl mx-auto">
            <Glow variant="top" className="animate-appear-zoom opacity-0 delay-1000" />
            <div className="animate-appear opacity-0 delay-700 relative z-20" style={{
            position: "relative",
            paddingBottom: "calc(65.034% + 41px)",
            height: 0,
            width: "100%"
          }}>
              <iframe src="https://demo.arcade.software/7TuF5S0OxugbkSt1QCXf?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true" title="Review Time Tracking Activity on the Ormozy Dashboard" frameBorder="0" loading="lazy" allowFullScreen allow="clipboard-write" style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              colorScheme: "light"
            }} />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;