import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="py-20 md:py-28 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-semibold mb-6">
          Start understanding your day
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-10">
          Join the people who've discovered the power of simple, consistent time awareness
        </p>
        <Button size="lg" className="px-8">
          Begin Your Free Trial
        </Button>
      </div>
    </section>
  );
};

export default FinalCTA;
