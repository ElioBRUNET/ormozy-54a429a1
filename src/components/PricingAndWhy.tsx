import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import * as PricingCard from '@/components/ui/pricing-card';
import { CheckCircle2, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FaqAccordion } from '@/components/ui/faq-chat-accordion';

const PricingAndWhy = () => {
  const navigate = useNavigate();

  const features = [
    '15-minute interval notifications',
    'Quick logging interface',
    'Daily and weekly summaries',
    'Work pattern insights',
    'Export your data anytime',
    'Available on all devices',
  ];

  const faqData = [
    {
      id: 1,
      question: "The story behind Ormozy",
      answer: "Built after realizing days were disappearing without a trace. Every evening felt like a blur. Sound familiar? Most time tracking tools are built for billing or management—heavy, complex, easy to ignore. Ormozy is different. It's built for you.",
      icon: "❤️",
      iconPosition: "right" as const,
    },
    {
      id: 2,
      question: "Our philosophy",
      answer: "The 15-minute rhythm keeps you grounded without interrupting flow. You're not tracking projects or clients. You're noting what you've been doing. Over time, patterns emerge. You see where energy goes. You make better decisions.",
    },
    {
      id: 3,
      question: "The mission",
      answer: "Help people stay present, avoid overwhelm, and gain real awareness of their work habits. No friction. No guilt. Just gentle nudges that become second nature. Because everyone deserves to know where their time goes.",
      icon: "🎯",
      iconPosition: "left" as const,
    },
    {
      id: 4,
      question: "Why 15 minutes?",
      answer: "It's the sweet spot. Short enough to keep you present, long enough to get meaningful work done. Tested for months to find the perfect balance between awareness and flow. Not too intrusive. Just right.",
    },
    {
      id: 5,
      question: "What makes it different?",
      answer: "No timers to start and stop. No complex categorization. No guilt about forgetting. Just a gentle ping, a quick note, and back to work. It works because it's simple. It sticks because it's effortless.",
      icon: "⚡",
      iconPosition: "right" as const,
    },
    {
      id: 6,
      question: "Who is it for?",
      answer: "Anyone who loses track of time. Freelancers, knowledge workers, students, founders. If you've ever wondered 'where did my day go?' this is for you. Built for humans, not managers.",
    },
  ];

  return (
    <section className="py-12 md:py-20 px-4 relative overflow-hidden bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Unified Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple pricing. Clear mission. Built for you.
          </p>
        </div>

        <div className="space-y-12 max-w-6xl mx-auto">
          {/* Why Ormozy - Horizontal Bubble Layout */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-8 text-center">Why Ormozy exists</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto justify-items-center w-full">
              {faqData.map((item) => (
                <FaqAccordion 
                  key={item.id}
                  data={[item]}
                  className="p-0 w-full max-w-sm"
                  timestamp=""
                />
              ))}
            </div>
          </div>
          
          {/* Pricing Card - Wider */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-8 text-center">Simple pricing</h3>
            <div className="flex justify-center max-w-2xl mx-auto w-full">
              <PricingCard.Card className="w-full">
                <PricingCard.Header>
                  <PricingCard.Plan>
                    <PricingCard.PlanName>
                      <Clock aria-hidden="true" />
                      <span>Ormozy Pro</span>
                    </PricingCard.PlanName>
                    <PricingCard.Badge>14-day free trial</PricingCard.Badge>
                  </PricingCard.Plan>
                  <PricingCard.Price>
                    <PricingCard.MainPrice>$8</PricingCard.MainPrice>
                    <PricingCard.Period>/ month</PricingCard.Period>
                  </PricingCard.Price>
                  <Button
                    className={cn(
                      'w-full font-semibold text-white',
                      'bg-gradient-to-b from-primary to-primary/90 shadow-[0_10px_25px_rgba(59,130,246,0.3)]',
                    )}
                    onClick={() => navigate('/auth')}
                  >
                    Start Free Trial
                  </Button>
                </PricingCard.Header>
                <PricingCard.Body>
                  <PricingCard.List className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    {features.map((item) => (
                      <PricingCard.ListItem key={item}>
                        <span className="mt-0.5">
                          <CheckCircle2
                            className="h-4 w-4 text-primary"
                            aria-hidden="true"
                          />
                        </span>
                        <span>{item}</span>
                      </PricingCard.ListItem>
                    ))}
                  </PricingCard.List>
                </PricingCard.Body>
              </PricingCard.Card>
            </div>
          </div>

        </div>
      </div>

      {/* Background decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(59,130,246,0.08) 0.8px, transparent 0.8px)',
          backgroundSize: '14px 14px',
          maskImage:
            'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.8), rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 70%)',
        }}
      />
    </section>
  );
};

export default PricingAndWhy;
