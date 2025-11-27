import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type WorkLog = {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [workLogs, setWorkLogs] = useState<WorkLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(true);
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
        fetchWorkLogs();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchWorkLogs();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchWorkLogs = async () => {
    try {
      setLoadingLogs(true);
      
      // RLS policies automatically filter by user_id = auth.uid()
      const { data, error } = await supabase
        .from('work_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching work logs:', error);
        toast({
          title: "Error",
          description: "Failed to load work logs.",
          variant: "destructive",
        });
      } else {
        setWorkLogs(data || []);
        console.log('Fetched work logs:', data);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoadingLogs(false);
    }
  };

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
            <Button variant="ghost" size="icon" onClick={handleSignOut} title="Sign Out">
              <LogOut />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Work Logs Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Your Work Logs</h2>
              <p className="text-sm text-muted-foreground">
                Track and review your activity logs
              </p>
            </div>

            {loadingLogs ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            ) : workLogs.length === 0 ? (
              <div className="rounded-lg border border-border p-8 text-center">
                <p className="text-muted-foreground">No work logs yet. Start tracking your activities!</p>
              </div>
            ) : (
              <ScrollArea className="h-[calc(100vh-250px)]">
                <div className="space-y-3 pr-4">
                  {workLogs.map((log) => (
                    <div
                      key={log.id}
                      className="rounded-lg border border-border bg-card p-4 hover:bg-accent/5 transition-colors"
                    >
                      <p className="text-sm text-foreground mb-2">{log.content}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>
                          {new Date(log.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span>
                          {new Date(log.created_at).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>

          {/* Schedule Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Today's Schedule</h2>
              <p className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString("en-US", { 
                  weekday: "long", 
                  month: "short", 
                  day: "numeric" 
                })}
              </p>
            </div>

            <ScrollArea className="h-[calc(100vh-250px)] rounded-lg border border-border">
              <div className="p-4 space-y-4">
                {hours.map((hour) => (
                  <div key={hour} className="flex gap-4">
                    {/* Time Label */}
                    <div className="w-16 flex-shrink-0 pt-2">
                      <span className="text-xs font-medium text-foreground">
                        {hour === 12 ? "12PM" : hour > 12 ? `${hour - 12}PM` : `${hour}AM`}
                      </span>
                    </div>

                    {/* Activity Block */}
                    <div className="flex-1">
                      <div
                        className="h-12 rounded-md border-2 border-dashed border-border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
