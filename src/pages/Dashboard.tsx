import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Calendar as CalendarIcon, Clock, Activity, Flame, Bug } from "lucide-react";
import logo from "@/assets/logo.webp";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { format, startOfDay, endOfDay, differenceInDays } from "date-fns";
import { cn } from "@/lib/utils";

type WorkLog = {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

type UserStreak = {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string | null;
  created_at: string;
  updated_at: string;
};

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [workLogs, setWorkLogs] = useState<WorkLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [streak, setStreak] = useState<UserStreak | null>(null);
  const [bugReport, setBugReport] = useState("");
  const [bugDialogOpen, setBugDialogOpen] = useState(false);
  const [sendingBug, setSendingBug] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth", { replace: true });
      } else {
        setUser(session.user);
        setLoading(false);
        fetchWorkLogs();
        fetchStreak();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Dashboard auth state changed:', event);
      
      if (event === 'SIGNED_OUT' || !session) {
        // Clear state and redirect to auth
        setUser(null);
        setWorkLogs([]);
        setStreak(null);
        navigate("/auth", { replace: true });
      } else if (session) {
        setUser(session.user);
        fetchWorkLogs();
        fetchStreak();
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

  const fetchStreak = async () => {
    try {
      const { data, error } = await supabase
        .from('user_streaks')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching streak:', error);
      } else {
        setStreak(data);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      // Always clear local session so the web dashboard closes reliably
      const { error } = await supabase.auth.signOut({ scope: "local" });
      if (error) {
        console.warn("Sign out error (continuing):", error.message);
      }
    } finally {
      setUser(null);
      setWorkLogs([]);
      setStreak(null);
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate("/auth", { replace: true });
    }
  };

  const handleBugReport = async () => {
    const trimmedMessage = bugReport.trim();
    if (!trimmedMessage) {
      toast({
        title: "Error",
        description: "Please describe the bug before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (trimmedMessage.length > 2000) {
      toast({
        title: "Error",
        description: "Bug report must be less than 2000 characters.",
        variant: "destructive",
      });
      return;
    }

    setSendingBug(true);
    try {
      const response = await fetch("https://hook.eu2.make.com/hjnwz9if7sc87o1b5sqz1kdht4zke71c", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmedMessage,
          userEmail: user?.email || "unknown",
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast({
          title: "Bug reported",
          description: "Thank you for your feedback!",
        });
        setBugReport("");
        setBugDialogOpen(false);
      } else {
        throw new Error("Failed to send bug report");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send bug report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSendingBug(false);
    }
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
  
  // Calculate streak status
  const getStreakStatus = () => {
    if (!streak?.last_activity_date) return { status: 'none', daysSince: 0 };
    
    const lastActivity = new Date(streak.last_activity_date);
    const today = new Date();
    const daysSince = differenceInDays(today, lastActivity);
    
    if (daysSince === 0) return { status: 'active', daysSince: 0 };
    if (daysSince === 1) return { status: 'warning', daysSince: 1 };
    return { status: 'expired', daysSince };
  };
  
  const streakStatus = getStreakStatus();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <img src={logo} alt="Ormozy" className="h-8" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:block">{user?.email}</span>
            <Dialog open={bugDialogOpen} onOpenChange={setBugDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Bug className="h-4 w-4" />
                  <span className="hidden sm:inline">Report Bug</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Report a Bug</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <Textarea
                    placeholder="Describe the bug you encountered..."
                    value={bugReport}
                    onChange={(e) => setBugReport(e.target.value)}
                    className="min-h-[120px]"
                    maxLength={2000}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {bugReport.length}/2000 characters
                  </p>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleBugReport} disabled={sendingBug}>
                    {sendingBug ? "Sending..." : "Submit"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="icon" onClick={handleSignOut} title="Sign Out">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Streak</p>
                  <div className="flex items-center gap-2">
                    <p className="text-4xl font-semibold text-foreground">
                      {streak?.current_streak || 0}
                    </p>
                    {streakStatus.status === 'warning' && (
                      <span className="text-xs text-yellow-500 font-medium">⚠️ Log today!</span>
                    )}
                  </div>
                  {streak && streak.longest_streak > (streak.current_streak || 0) && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Best: {streak.longest_streak} days
                    </p>
                  )}
                </div>
                <div 
                  className={cn(
                    "p-3 rounded-lg transition-all duration-300",
                    streakStatus.status === 'warning' 
                      ? "bg-yellow-500/20 animate-pulse" 
                      : "bg-orange-500/20"
                  )}
                >
                  <Flame className={cn(
                    "h-6 w-6",
                    streakStatus.status === 'warning' 
                      ? "text-yellow-500" 
                      : "text-orange-500"
                  )} />
                </div>
              </div>
            </CardContent>
          </Card>

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
