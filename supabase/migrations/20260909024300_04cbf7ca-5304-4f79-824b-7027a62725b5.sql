CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_name text NOT NULL CHECK (char_length(reviewer_name) BETWEEN 2 AND 80),
  rating smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text text NOT NULL CHECK (char_length(review_text) BETWEEN 10 AND 800),
  approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.reviews TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read approved reviews"
ON public.reviews FOR SELECT TO anon, authenticated
USING (approved = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can submit reviews for approval"
ON public.reviews FOR INSERT TO anon, authenticated
WITH CHECK (approved = false);

CREATE POLICY "Admins can update reviews"
ON public.reviews FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete reviews"
ON public.reviews FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON public.reviews
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();