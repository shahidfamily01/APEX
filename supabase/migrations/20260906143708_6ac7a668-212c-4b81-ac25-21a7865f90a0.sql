CREATE TYPE public.app_role AS ENUM ('admin','user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE TABLE public.registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  id_number text NOT NULL,
  id_type text NOT NULL DEFAULT 'cnic',
  address text NOT NULL,
  gender text NOT NULL,
  plan text,
  kind text NOT NULL DEFAULT 'membership',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.registrations TO anon, authenticated;
GRANT SELECT, DELETE ON public.registrations TO authenticated;
GRANT ALL ON public.registrations TO service_role;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a registration" ON public.registrations FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view registrations" ON public.registrations FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can delete registrations" ON public.registrations FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.member_count()
RETURNS integer LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT 120 + (SELECT count(*)::int FROM public.registrations WHERE kind = 'membership')
$$;
GRANT EXECUTE ON FUNCTION public.member_count() TO anon, authenticated;