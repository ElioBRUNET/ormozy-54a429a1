import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Calendar as CalendarIcon, Clock, Activity } from "lucide-react";
import logo from "@/assets/logo.png";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, startOfDay, endOfDay } from "date-fns";
import { cn } from "@/lib/utils";

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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
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

  useEffect(() => {
    if (user) {
      fetchWorkLogs();
    }
  }, [selectedDate, user]);

  const fetchWorkLogs = async () => {
    try {
      setLoadingLogs(true);
      
      const startDate = startOfDay(selectedDate);
      const endDate = endOfDay(selectedDate);

      const { data, error } = await supabase
        .from('work_logs')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString())
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching work logs:', error);
        toast({
          title: "Error",
          description: "Failed to load work logs.",
          variant: "destructive",
        });
      } else {
        setWorkLogs(data || []);
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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const getLogsForHour = (hour: number) => {
    return workLogs.filter(log => {
      const logHour = new Date(log.created_at).getHours();
      return logHour === hour;
    });
  };

  const totalActivities = workLogs.length;
  const activeHours = new Set(workLogs.map(log => new Date(log.created_at).getHours())).size;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <img src={logo} alt="Ormozy" className="h-8" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">{user?.email}</span>
            <Button variant="ghost" size="icon" onClick={handleSignOut} title="Sign Out">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Activities</p>
                  <p className="text-4xl font-semibold text-foreground">{totalActivities}</p>
                </div>
                <div className="p-3 bg-accent/20 rounded-lg">
                  <Activity className="h-6 w-6 text-accent-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Hours</p>
                  <p className="text-4xl font-semibold text-foreground">{activeHours}</p>
                </div>
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Selected Date</p>
                  <p className="text-lg font-medium text-foreground mt-2">
                    {format(selectedDate, "MMM dd, yyyy")}
                  </p>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon" className="bg-secondary">
                      <CalendarIcon className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time Management Section */}
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-1">Time Management</h2>
              <p className="text-sm text-muted-foreground">
                {format(selectedDate, "EEEE, MMMM dd, yyyy")}
              </p>
            </div>

            {loadingLogs ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-muted-foreground">Loading activities...</div>
              </div>
            ) : (
              <div className="space-y-4">
                {hours.map((hour) => {
                  const hourLogs = getLogsForHour(hour);
                  const blocks = Array.from({ length: 4 }, (_, i) => i);
                  
                  return (
                    <div key={hour} className="flex gap-4 items-start group">
                      <div className="w-20 flex-shrink-0 pt-2">
                        <span className="text-sm font-medium text-foreground">
                          {hour === 12 ? "12 PM" : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          {hourLogs.length} {hourLogs.length === 1 ? 'log' : 'logs'}
                        </p>
                      </div>

                      <div className="flex-1 grid grid-cols-4 gap-2">
                        {blocks.map((blockIndex) => {
                          const log = hourLogs[blockIndex];
                          const isEmpty = !log;
                          
                          return (
                            <div
                              key={blockIndex}
                              className={cn(
                                "h-16 rounded-lg border-2 transition-all duration-200",
                                isEmpty
                                  ? "border-dashed border-border bg-[hsl(var(--activity-block))] hover:bg-muted/50 cursor-pointer"
                                  : "border-solid border-primary/30 bg-[hsl(var(--activity-block-filled))]/10 hover:bg-[hsl(var(--activity-block-filled))]/20 cursor-pointer"
                              )}
                              title={log ? log.content : "Empty slot"}
                            >
                              {!isEmpty && (
                                <div className="p-2 h-full flex flex-col justify-between">
                                  <p className="text-xs text-foreground line-clamp-2 font-medium">
                                    {log.content}
                                  </p>
                                  <span className="text-[10px] text-muted-foreground">
                                    {format(new Date(log.created_at), "HH:mm")}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
