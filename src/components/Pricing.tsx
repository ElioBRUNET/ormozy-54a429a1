import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import * as PricingCard from '@/components/ui/pricing-card';
import { CheckCircle2, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();

  const features = [
    '15-minute interval notifications',
    'Quick logging interface',
    'Daily and weekly summaries',
    'Work pattern insights',
    'Export your data anytime',
    'Available on all devices',
  ];

  return (
    <section className="py-20 md:py-28 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple pricing</h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            One plan. Everything included.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="flex justify-center">
          <PricingCard.Card>
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
              <PricingCard.List>
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

export default Pricing;
