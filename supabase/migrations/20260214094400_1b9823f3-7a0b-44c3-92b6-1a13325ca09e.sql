
-- Table for admin-managed stream URLs linked to matches
CREATE TABLE public.match_streams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id text NOT NULL,
  match_label text NOT NULL DEFAULT '',
  stream_url text NOT NULL,
  stream_source text NOT NULL DEFAULT 'مصدر خارجي',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.match_streams ENABLE ROW LEVEL SECURITY;

-- Anyone can read active streams
CREATE POLICY "Anyone can read active streams"
ON public.match_streams FOR SELECT
USING (is_active = true);

-- Only admins can insert
CREATE POLICY "Admins can insert streams"
ON public.match_streams FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update
CREATE POLICY "Admins can update streams"
ON public.match_streams FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete
CREATE POLICY "Admins can delete streams"
ON public.match_streams FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_match_streams_updated_at
BEFORE UPDATE ON public.match_streams
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
