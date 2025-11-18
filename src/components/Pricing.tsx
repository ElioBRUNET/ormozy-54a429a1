import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  const features = [
    "15-minute interval notifications",
    "Quick logging interface",
    "Daily and weekly summaries",
    "Work pattern insights",
    "Export your data anytime",
    "Available on all devices"
  ];

  return (
    <section className="py-20 md:py-28 px-4 bg-muted">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-6">Simple pricing</h2>
        <p className="text-center text-lg text-muted-foreground mb-20">One plan. Everything included.</p>
        
        <div className="max-w-md mx-auto">
          <div className="bg-background rounded-2xl p-8 border-2 border-border">
            <h3 className="text-2xl font-semibold mb-2">Ormozy Pro</h3>
            <div className="mb-6">
              <span className="text-5xl font-bold">$8</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">14-day free trial</p>
            
            <div className="space-y-4 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
            
            <Button className="w-full" size="lg">
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
