-- Add DELETE policy for profiles table to allow users to delete their own profiles
CREATE POLICY "Users can delete their own profile"
ON public.profiles
FOR DELETE
USING (auth.uid() = user_id);

-- Add input validation and sanitization to handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  clean_name text;
BEGIN
  -- Validate and sanitize display_name with length limit
  clean_name := COALESCE(
    TRIM(SUBSTRING(NEW.raw_user_meta_data->>'display_name', 1, 100)),
    'User'
  );
  
  -- Ensure name is not empty after trimming
  IF clean_name = '' THEN
    clean_name := 'User';
  END IF;
  
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, clean_name);
  
  RETURN NEW;
END;
$$;

-- Add CHECK constraint on profiles table for display_name validation
ALTER TABLE public.profiles 
ADD CONSTRAINT display_name_length 
CHECK (LENGTH(display_name) <= 100 AND LENGTH(display_name) > 0);