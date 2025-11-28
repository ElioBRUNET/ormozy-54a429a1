import { cn } from "@/lib/utils";
import { Bell, Check, BarChart3, Zap, Edit3, LineChart, Eye, Focus, Shield, Repeat } from "lucide-react";

const FeaturesUnified = () => {
  const features = [
    // Micro-tracking section
    {
      title: "Gentle nudges",
      description: "Every 15 minutes, a friendly ping. No pressure, just presence.",
      icon: <Bell className="w-6 h-6" />,
    },
    {
      title: "Quick logging",
      description: "One tap. That's it. Tested over 1,000 times to get it right.",
      icon: <Check className="w-6 h-6" />,
    },
    {
      title: "Crystal clarity",
      description: "See where your day went. No guessing, just patterns.",
      icon: <BarChart3 className="w-6 h-6" />,
    },
    {
      title: "Zero friction",
      description: "Built to disappear into your workflow. Like magic, but real.",
      icon: <Zap className="w-6 h-6" />,
    },
    // How it works section
    {
      title: "Receive notification",
      description: "Every 15 minutes, Ormozy gently reminds you to check in. Ping. What are you working on?",
      icon: <Bell className="w-6 h-6" />,
    },
    {
      title: "Log in seconds",
      description: "Quickly note what you've been working on—no complexity. One tap. Done. Back to work.",
      icon: <Edit3 className="w-6 h-6" />,
    },
    {
      title: "View your day",
      description: "See a clear summary of how you spent your time and where your focus went. Patterns emerge. Clarity follows.",
      icon: <LineChart className="w-6 h-6" />,
    },
    // Benefits section
    {
      title: "Improved clarity",
      description: "See exactly where your time goes without guessing or estimating. No more 'where did my day go?'",
      icon: <Eye className="w-6 h-6" />,
    },
    {
      title: "Better focus",
      description: "Regular check-ins naturally encourage mindful work and reduce distractions. Stay in the zone.",
      icon: <Focus className="w-6 h-6" />,
    },
    {
      title: "Built-in accountability",
      description: "Knowing you'll log your time helps you stay on track throughout the day. Your future self will thank you.",
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: "Consistent tracking",
      description: "The 15-minute rhythm becomes second nature—no manual timers needed. Set it and forget it (well, almost).",
      icon: <Repeat className="w-6 h-6" />,
    },
  ];

  return (
    <section className="py-20 md:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Everything you need to track your time</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, effortless, and designed to help you understand how you spend your day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-border",
        (index === 0 || index === 4 || index === 8) && "lg:border-l border-border",
        index < 8 && "lg:border-b border-border"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-muted/50 to-transparent pointer-events-none" />
      )}
      {index >= 4 && index < 8 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-muted/50 to-transparent pointer-events-none" />
      )}
      {index >= 8 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-muted/50 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-muted-foreground">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-muted-foreground/20 group-hover/feature:bg-primary transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-foreground">
          {title}
        </span>
      </div>
      <p className="text-sm text-muted-foreground max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};

export default FeaturesUnified;
