import { cn } from "@/lib/utils";
import { Bell, Check, BarChart3, Zap, Edit3, LineChart, Eye, Focus, Shield, Repeat } from "lucide-react";
const FeaturesUnified = () => {
  const features = [{
    title: "Gentle nudges every 15 minutes",
    description: "A friendly notification every 15 minutes. No pressure, just a simple reminder to check in. The rhythm becomes second nature.",
    icon: <Bell className="w-6 h-6" />
  }, {
    title: "One-tap logging",
    description: "Quick note what you've been doing. One tap. That's it. Back to work in seconds. Tested over 1,000 times to feel effortless.",
    icon: <Check className="w-6 h-6" />
  }, {
    title: "Crystal clear patterns",
    description: "See exactly where your day went. No guessing, no estimating. Just clear insights into how you spend your time.",
    icon: <Eye className="w-6 h-6" />
  }, {
    title: "Better focus & accountability",
    description: "Regular check-ins naturally encourage mindful work. Stay on track throughout the day. Your future self will thank you.",
    icon: <Focus className="w-6 h-6" />
  }];
  return <section className="py-12 md:py-20 px-4 bg-muted/20 md:bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl mb-6 font-semibold">Everything you need to track your time</h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto font-normal">
            Simple, effortless, and designed to help you understand how you spend your day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-6xl mx-auto">
          {features.map((feature, index) => <Feature key={feature.title} {...feature} index={index} />)}
        </div>
      </div>
    </section>;
};
const Feature = ({
  title,
  description,
  icon,
  index
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return <div className={cn("flex flex-col lg:border-r py-6 md:py-10 relative group/feature border-border", index === 0 && "lg:border-l border-border", index < 4 && "lg:border-b border-border")}>
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-muted/50 to-transparent pointer-events-none" />
      <div className="mb-4 relative z-10 px-10 text-primary/80 md:text-muted-foreground">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-muted-foreground/20 group-hover/feature:bg-primary transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-foreground font-medium">
          {title}
        </span>
      </div>
      <p className="text-sm text-muted-foreground max-w-xs relative z-10 px-10 font-extralight">
        {description}
      </p>
    </div>;
};
export default FeaturesUnified;