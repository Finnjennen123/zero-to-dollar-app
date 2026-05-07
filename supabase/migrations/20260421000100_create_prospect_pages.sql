CREATE TABLE IF NOT EXISTS public.prospect_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token text UNIQUE NOT NULL,
  data jsonb NOT NULL,
  created_by uuid REFERENCES auth.users(id),
  claimed_at timestamptz,
  claimed_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.prospect_pages ENABLE ROW LEVEL SECURITY;

-- Policies
-- 1. Anyone can view a prospect page by token
DROP POLICY IF EXISTS "Anyone can view prospect pages by token" ON public.prospect_pages;
CREATE POLICY "Anyone can view prospect pages by token" ON public.prospect_pages
  FOR SELECT USING (true);

-- 2. Authenticated users can create prospect pages
DROP POLICY IF EXISTS "Authenticated users can create prospect pages" ON public.prospect_pages;
CREATE POLICY "Authenticated users can create prospect pages" ON public.prospect_pages
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- 3. Users can manage their own prospect pages
DROP POLICY IF EXISTS "Users can manage their own prospect pages" ON public.prospect_pages;
CREATE POLICY "Users can manage their own prospect pages" ON public.prospect_pages
  FOR ALL USING (auth.uid() = created_by);
