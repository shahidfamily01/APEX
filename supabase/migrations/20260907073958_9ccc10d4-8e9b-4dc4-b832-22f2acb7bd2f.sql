CREATE OR REPLACE FUNCTION public.member_count()
RETURNS integer LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT 1000 + (SELECT count(*)::int FROM public.registrations WHERE kind = 'membership')
$$;
ALTER TABLE public.registrations ALTER COLUMN id_number DROP NOT NULL;