import { Card, CardContent } from "@/components/ui/card";
import { Eye, Focus, Shield, Repeat } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: Eye,
      title: "Improved clarity",
      description: "See exactly where your time goes without guessing or estimating",
      highlight: "No more 'where did my day go?'"
    },
    {
      icon: Focus,
      title: "Better focus",
      description: "Regular check-ins naturally encourage mindful work and reduce distractions",
      highlight: "Stay in the zone"
    },
    {
      icon: Shield,
      title: "Built-in accountability",
      description: "Knowing you'll log your time helps you stay on track throughout the day",
      highlight: "Your future self will thank you"
    },
    {
      icon: Repeat,
      title: "Consistent tracking",
      description: "The 15-minute rhythm becomes second nature—no manual timers needed",
      highlight: "Set it and forget it (well, almost)"
    }
  ];

  return (
    <section className="py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">The benefits</h2>
          <p className="text-lg text-muted-foreground">
            Tested for months. They're real.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="border-border/40 hover:border-primary/30 transition-all group">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  {benefit.description}
                </p>
                <p className="text-sm font-medium text-primary">
                  {benefit.highlight}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
