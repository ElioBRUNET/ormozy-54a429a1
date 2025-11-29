import { Check, X } from 'lucide-react';

const Comparison = () => {
  const paidApps = [
    'Monthly subscription fees ($8-15)',
    'Complex setup and onboarding',
    'Limited free trial period',
    'Data locked behind paywall',
    'No export without premium',
  ];

  const ormozyBenefits = [
    'Completely free forever',
    'No credit card required',
    'Unlimited tracking and insights',
    'Export your data anytime',
    'All features included',
  ];

  return (
    <section className="py-20 md:py-28 px-4 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why pay for time tracking?
          </h2>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Paid Apps Column */}
          <div className="relative rounded-2xl p-8 bg-red-50/50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/30">
            <h3 className="text-2xl font-bold mb-6 text-red-700 dark:text-red-400">
              Paid time trackers
            </h3>
            <ul className="space-y-4">
              {paidApps.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="h-5 w-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ormozy Column */}
          <div className="relative rounded-2xl p-8 bg-green-50/50 dark:bg-green-950/20 border border-green-200/50 dark:border-green-900/30">
            <h3 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-400">
              Ormozy
            </h3>
            <ul className="space-y-4">
              {ormozyBenefits.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Message */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="h-6 w-6 fill-yellow-400 text-yellow-400"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-lg text-muted-foreground mb-2">
            I don't want to pay $8-15 every month for basic time tracking.
          </p>
          <p className="text-lg font-medium">
            Ormozy is completely free, forever. No catch.
          </p>
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

export default Comparison;
