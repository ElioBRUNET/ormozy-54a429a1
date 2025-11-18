import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-4">
          Start understanding your day
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Join the people who've discovered the power of simple, consistent time awareness
        </p>
        <Button size="lg">
          Begin Your Free Trial
        </Button>
      </div>
    </section>
  );
};

export default FinalCTA;
