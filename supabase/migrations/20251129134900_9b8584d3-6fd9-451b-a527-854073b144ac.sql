-- Create user_streaks table
CREATE TABLE public.user_streaks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own streak"
ON public.user_streaks
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own streak"
ON public.user_streaks
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own streak"
ON public.user_streaks
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create function to update streak when work log is inserted
CREATE OR REPLACE FUNCTION public.update_user_streak()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  log_date DATE;
  streak_record RECORD;
  days_diff INTEGER;
BEGIN
  -- Get the date of the work log
  log_date := DATE(NEW.created_at);
  
  -- Get or create streak record for this user
  SELECT * INTO streak_record
  FROM public.user_streaks
  WHERE user_id = NEW.user_id;
  
  IF NOT FOUND THEN
    -- Create new streak record
    INSERT INTO public.user_streaks (user_id, current_streak, longest_streak, last_activity_date)
    VALUES (NEW.user_id, 1, 1, log_date);
  ELSE
    -- Only update if this is a new day
    IF streak_record.last_activity_date IS NULL OR log_date > streak_record.last_activity_date THEN
      -- Calculate days difference
      IF streak_record.last_activity_date IS NOT NULL THEN
        days_diff := log_date - streak_record.last_activity_date;
      ELSE
        days_diff := 0;
      END IF;
      
      -- Update streak based on days difference
      IF days_diff <= 1 THEN
        -- Consecutive day or same day, increment streak
        UPDATE public.user_streaks
        SET 
          current_streak = streak_record.current_streak + 1,
          longest_streak = GREATEST(streak_record.longest_streak, streak_record.current_streak + 1),
          last_activity_date = log_date,
          updated_at = now()
        WHERE user_id = NEW.user_id;
      ELSE
        -- Gap of 2+ days, reset streak
        UPDATE public.user_streaks
        SET 
          current_streak = 1,
          last_activity_date = log_date,
          updated_at = now()
        WHERE user_id = NEW.user_id;
      END IF;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for automatic streak updates
CREATE TRIGGER update_streak_on_work_log
AFTER INSERT ON public.work_logs
FOR EACH ROW
EXECUTE FUNCTION public.update_user_streak();

-- Add trigger for updated_at on user_streaks
CREATE TRIGGER update_user_streaks_updated_at
BEFORE UPDATE ON public.user_streaks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();