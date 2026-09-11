CREATE SCHEMA IF NOT EXISTS private;

ALTER FUNCTION public.has_role(uuid, public.app_role) SET SCHEMA private;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;
REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.member_count() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.member_count() TO service_role;