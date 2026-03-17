set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'ADMIN'
  );
$function$
;

grant delete on table "public"."business_social_links" to "postgres";

grant insert on table "public"."business_social_links" to "postgres";

grant references on table "public"."business_social_links" to "postgres";

grant select on table "public"."business_social_links" to "postgres";

grant trigger on table "public"."business_social_links" to "postgres";

grant truncate on table "public"."business_social_links" to "postgres";

grant update on table "public"."business_social_links" to "postgres";

grant delete on table "public"."businesses" to "postgres";

grant insert on table "public"."businesses" to "postgres";

grant references on table "public"."businesses" to "postgres";

grant select on table "public"."businesses" to "postgres";

grant trigger on table "public"."businesses" to "postgres";

grant truncate on table "public"."businesses" to "postgres";

grant update on table "public"."businesses" to "postgres";

grant delete on table "public"."categories" to "postgres";

grant insert on table "public"."categories" to "postgres";

grant references on table "public"."categories" to "postgres";

grant select on table "public"."categories" to "postgres";

grant trigger on table "public"."categories" to "postgres";

grant truncate on table "public"."categories" to "postgres";

grant update on table "public"."categories" to "postgres";

grant delete on table "public"."profiles" to "postgres";

grant insert on table "public"."profiles" to "postgres";

grant references on table "public"."profiles" to "postgres";

grant select on table "public"."profiles" to "postgres";

grant trigger on table "public"."profiles" to "postgres";

grant truncate on table "public"."profiles" to "postgres";

grant update on table "public"."profiles" to "postgres";

grant delete on table "public"."site_settings" to "postgres";

grant insert on table "public"."site_settings" to "postgres";

grant references on table "public"."site_settings" to "postgres";

grant select on table "public"."site_settings" to "postgres";

grant trigger on table "public"."site_settings" to "postgres";

grant truncate on table "public"."site_settings" to "postgres";

grant update on table "public"."site_settings" to "postgres";

grant delete on table "public"."tags" to "postgres";

grant insert on table "public"."tags" to "postgres";

grant references on table "public"."tags" to "postgres";

grant select on table "public"."tags" to "postgres";

grant trigger on table "public"."tags" to "postgres";

grant truncate on table "public"."tags" to "postgres";

grant update on table "public"."tags" to "postgres";


