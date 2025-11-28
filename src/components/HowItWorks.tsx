import { Card, CardContent } from "@/components/ui/card";
import { Bell, Edit3, LineChart, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Bell,
      title: "Receive notification",
      description: "Every 15 minutes, Ormozy gently reminds you to check in",
      detail: "Ping. What are you working on?"
    },
    {
      icon: Edit3,
      title: "Log in seconds",
      description: "Quickly note what you've been working on—no complexity",
      detail: "One tap. Done. Back to work."
    },
    {
      icon: LineChart,
      title: "View your day",
      description: "See a clear summary of how you spent your time and where your focus went",
      detail: "Patterns emerge. Clarity follows."
    }
  ];

  return (
    <section className="py-20 md:py-28 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How it works</h2>
          <p className="text-lg text-muted-foreground">
            Three steps. That's all.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <Card className="border-border/40 h-full hover:shadow-lg transition-all">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {step.description}
                  </p>
                  <p className="text-sm font-medium text-primary">
                    {step.detail}
                  </p>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 w-6 h-6 text-muted-foreground/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
