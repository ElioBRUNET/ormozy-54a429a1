import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Rocket, Clock } from "lucide-react";

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start understanding your day
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the people who've discovered the power of simple, consistent time awareness.
            </p>
            <Button size="lg" className="px-10" onClick={() => navigate('/auth')}>
              Begin Your Free Trial <Clock className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground mt-6">
              No credit card required • Free forever plan available
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FinalCTA;
