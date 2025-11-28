import { Card, CardContent } from "@/components/ui/card";
import { Bell, Check, BarChart3, Zap } from "lucide-react";

const MicroTracking = () => {
  const features = [
    {
      icon: Bell,
      title: "Gentle nudges",
      description: "Every 15 minutes, a friendly ping. No pressure, just presence."
    },
    {
      icon: Check,
      title: "Quick logging",
      description: "One tap. That's it. Tested over 1,000 times to get it right."
    },
    {
      icon: BarChart3,
      title: "Crystal clarity",
      description: "See where your day went. No guessing, just patterns."
    },
    {
      icon: Zap,
      title: "Zero friction",
      description: "Built to disappear into your workflow. Like magic, but real."
    }
  ];

  return (
    <section className="py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Micro-tracking made effortless</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Ormozy sends you a gentle notification every 15 minutes. Just note what you've been doing. 
            That's it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border/40 hover:border-primary/30 transition-all hover:shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MicroTracking;
