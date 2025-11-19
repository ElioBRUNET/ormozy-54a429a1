import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Generate hours from 6am to 8pm
  const hours = Array.from({ length: 15 }, (_, i) => i + 6);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-foreground">Ormozy Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Today's Schedule</h2>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-US", { 
              weekday: "long", 
              year: "numeric", 
              month: "long", 
              day: "numeric" 
            })}
          </p>
        </div>

        <ScrollArea className="h-[calc(100vh-250px)] rounded-lg border border-border">
          <div className="p-4 space-y-4">
            {hours.map((hour) => (
              <div key={hour} className="flex gap-4">
                {/* Time Label */}
                <div className="w-20 flex-shrink-0 pt-2">
                  <span className="text-sm font-medium text-foreground">
                    {hour === 12 ? "12:00 PM" : hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                  </span>
                </div>

                {/* Activity Blocks */}
                <div className="flex-1 grid grid-cols-4 gap-2">
                  {[0, 1, 2, 3].map((block) => (
                    <div
                      key={block}
                      className="h-16 rounded-md border-2 border-dashed border-border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer flex items-center justify-center"
                    >
                      <span className="text-xs text-muted-foreground">
                        {block === 0 && ":00"}
                        {block === 1 && ":15"}
                        {block === 2 && ":30"}
                        {block === 3 && ":45"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default Dashboard;
