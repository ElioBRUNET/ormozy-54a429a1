import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Heart, Brain, Target } from "lucide-react";

const WhyOrmozy = () => {
  const [openItems, setOpenItems] = useState<string[]>(["story"]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const sections = [
    {
      id: "story",
      icon: Heart,
      title: "The story behind Ormozy",
      content: "Built after realizing days were disappearing without a trace. Every evening felt like a blur. Sound familiar? Most time tracking tools are built for billing or management—heavy, complex, easy to ignore. Ormozy is different. It's built for you."
    },
    {
      id: "philosophy",
      icon: Brain,
      title: "Our philosophy",
      content: "The 15-minute rhythm keeps you grounded without interrupting flow. You're not tracking projects or clients. You're noting what you've been doing. Over time, patterns emerge. You see where energy goes. You make better decisions. It's clarity without complexity. Presence without pressure."
    },
    {
      id: "mission",
      icon: Target,
      title: "The mission",
      content: "Help people stay present, avoid overwhelm, and gain real awareness of their work habits. No friction. No guilt. Just gentle nudges that become second nature. Because everyone deserves to know where their time goes."
    }
  ];

  return (
    <section className="py-20 md:py-28 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Why Ormozy exists</h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Spoiler: It's personal
        </p>
        
        <div className="space-y-4">
          {sections.map((section) => (
            <Card key={section.id} className="border-border/40">
              <Collapsible
                open={openItems.includes(section.id)}
                onOpenChange={() => toggleItem(section.id)}
              >
                <CollapsibleTrigger className="w-full">
                  <CardContent className="p-6 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <section.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-left">{section.title}</h3>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                        openItems.includes(section.id) ? "rotate-180" : ""
                      }`} 
                    />
                  </CardContent>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="px-6 pb-6 pt-0">
                    <p className="text-muted-foreground leading-relaxed pl-14">
                      {section.content}
                    </p>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyOrmozy;
