import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Clock, Mail, Sparkles } from "lucide-react";
import { Glow } from "@/components/ui/glow";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ThreeDButton } from "@/components/ui/3d-button";
import { IconArrowRight } from "@tabler/icons-react";
const Hero = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    try {
      const {
        error
      } = await supabase.functions.invoke('send-download-link', {
        body: {
          email
        }
      });
      if (error) throw error;
      toast({
        title: "Check your inbox! 📧",
        description: "We've sent you the download link. Open it on your desktop to get started."
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Oops!",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  return <section className={cn("bg-background text-foreground", "pt-8 sm:pt-10 md:pt-12 pb-12 md:pb-0 px-4", "overflow-hidden relative")}>
      {/* Mobile Blue Gradient Shade - Top */}
      <div className="md:hidden absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent animate-appear opacity-0 pointer-events-none" />
      
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:gap-12 relative z-10">
        <div className="flex flex-col items-center gap-4 text-center sm:gap-8">
          {/* Logo */}
          <img src={logo} alt="Ormozy" className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 animate-appear" />
          
          {/* Badge */}
          <Badge variant="outline" className="animate-appear gap-2 text-xs sm:text-sm">
            <span className="text-muted-foreground">Inspired by a JACKED businessman</span>
            
          </Badge>

          {/* Title */}
          <h1 className="relative z-10 animate-appear bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text font-semibold text-transparent drop-shadow-2xl leading-tight md:leading-tight md:text-7xl md:px-32 lg:px-48 pb-2 text-5xl">
            No more "Where the fu**k did my day go"
          </h1>

          {/* Actions - Hidden on Mobile */}
          <div className="relative z-10 hidden md:flex animate-appear justify-center gap-4 opacity-0 delay-300">
            <Button size="lg" className="text-base sm:text-lg" onClick={() => navigate('/auth')}>
              <Clock className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Get Started
            </Button>
          </div>

          {/* Mobile Email Capture - Only on Mobile */}
          <div className="md:hidden w-full max-w-md mx-auto animate-appear opacity-0 delay-700 space-y-4 mt-10">
            {!email ? <>
                <div className="flex justify-center">
                  <ThreeDButton onClick={() => setEmail(" ")} variant="default" size="default" className="px-6 py-2.5 text-base font-medium" leadingIcon={IconArrowRight}>
                    Send me the desktop app
                  </ThreeDButton>
                </div>
                
                <div className="space-y-1 text-center text-xs font-light text-muted-foreground px-4">
                  <p>Link sent to inbox</p>
                  <p>Open on desktop</p>
                </div>
              </> : <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3 px-4">
                <Input type="email" placeholder="your@email.com" value={email === " " ? "" : email} onChange={e => setEmail(e.target.value)} required className="h-12 text-base" disabled={isLoading} autoFocus />
                <Button type="submit" size="lg" className="w-full h-12 text-base" disabled={isLoading}>
                  <Mail className="mr-2 h-5 w-5" />
                  {isLoading ? "Sending..." : "Send Me the Link"}
                </Button>
              </form>}
          </div>

          {/* Arcade Demo with Glow - Hidden on Mobile */}
          <div className="hidden md:block relative pt-6 w-full max-w-5xl mx-auto">
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