
  create table "public"."business_social_links" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "active" boolean not null default true,
    "business_id" uuid not null default gen_random_uuid(),
    "platform" character varying not null,
    "url" character varying not null,
    "sort_order" integer not null
      );


alter table "public"."business_social_links" enable row level security;


  create table "public"."businesses" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "udpated_at" timestamp with time zone not null default now(),
    "name" character varying not null,
    "slug" character varying not null,
    "description" text,
    "phone" character varying,
    "whatsapp_phone" character varying,
    "email" character varying,
    "address" character varying,
    "city" character varying,
    "country" character varying,
    "website_url" character varying,
    "active" boolean not null default true,
    "user_id" uuid not null default gen_random_uuid(),
    "avatar" text,
    "cover" text,
    "country_code_phone" character varying default '+591'::character varying,
    "country_code_whatsapp" character varying default '+591'::character varying,
    "is_public" boolean not null default false
      );


alter table "public"."businesses" enable row level security;


  create table "public"."categories" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "active" boolean not null default true,
    "name" character varying not null,
    "slug" character varying not null,
    "description" text,
    "parent_id" uuid
      );


alter table "public"."categories" enable row level security;


  create table "public"."profiles" (
    "id" uuid not null,
    "email" text not null,
    "full_name" text,
    "avatar_url" text,
    "username" text,
    "bio" text,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "role" character varying not null default 'USER'::character varying,
    "onboarding_completed" boolean not null default false,
    "help_flow_displayed" boolean not null default false,
    "plan" character varying not null default 'FREE'::character varying
      );


alter table "public"."profiles" enable row level security;


  create table "public"."site_settings" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "active" boolean not null default true,
    "business_id" uuid not null,
    "category" character varying not null default 'general'::character varying,
    "key" character varying not null,
    "value" jsonb not null default '{}'::jsonb,
    "description" text
      );


alter table "public"."site_settings" enable row level security;


  create table "public"."tags" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "active" boolean not null default true,
    "name" character varying not null,
    "slug" character varying not null
      );


alter table "public"."tags" enable row level security;

CREATE UNIQUE INDEX business_social_links_pkey ON public.business_social_links USING btree (id);

CREATE UNIQUE INDEX businesses_pkey ON public.businesses USING btree (id);

CREATE UNIQUE INDEX businesses_slug_key ON public.businesses USING btree (slug);

CREATE UNIQUE INDEX categories_pkey ON public.categories USING btree (id);

CREATE UNIQUE INDEX categories_slug_key ON public.categories USING btree (slug);

CREATE UNIQUE INDEX profiles_email_key ON public.profiles USING btree (email);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE INDEX profiles_username_idx ON public.profiles USING btree (username);

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username);

CREATE UNIQUE INDEX site_settings_business_id_key_unique ON public.site_settings USING btree (business_id, key);

CREATE UNIQUE INDEX site_settings_pkey ON public.site_settings USING btree (id);

CREATE UNIQUE INDEX tags_pkey ON public.tags USING btree (id);

CREATE UNIQUE INDEX tags_slug_key ON public.tags USING btree (slug);

alter table "public"."business_social_links" add constraint "business_social_links_pkey" PRIMARY KEY using index "business_social_links_pkey";

alter table "public"."businesses" add constraint "businesses_pkey" PRIMARY KEY using index "businesses_pkey";

alter table "public"."categories" add constraint "categories_pkey" PRIMARY KEY using index "categories_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."site_settings" add constraint "site_settings_pkey" PRIMARY KEY using index "site_settings_pkey";

alter table "public"."tags" add constraint "tags_pkey" PRIMARY KEY using index "tags_pkey";

alter table "public"."business_social_links" add constraint "business_social_links_business_id_fkey" FOREIGN KEY (business_id) REFERENCES public.businesses(id) ON DELETE CASCADE not valid;

alter table "public"."business_social_links" validate constraint "business_social_links_business_id_fkey";

alter table "public"."businesses" add constraint "businesses_slug_key" UNIQUE using index "businesses_slug_key";

alter table "public"."businesses" add constraint "businesses_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."businesses" validate constraint "businesses_user_id_fkey";

alter table "public"."categories" add constraint "categories_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES public.categories(id) ON DELETE SET NULL not valid;

alter table "public"."categories" validate constraint "categories_parent_id_fkey";

alter table "public"."categories" add constraint "categories_slug_key" UNIQUE using index "categories_slug_key";

alter table "public"."profiles" add constraint "profiles_email_key" UNIQUE using index "profiles_email_key";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

alter table "public"."site_settings" add constraint "site_settings_business_id_fkey" FOREIGN KEY (business_id) REFERENCES public.businesses(id) ON DELETE CASCADE not valid;

alter table "public"."site_settings" validate constraint "site_settings_business_id_fkey";

alter table "public"."site_settings" add constraint "site_settings_business_id_key_unique" UNIQUE using index "site_settings_business_id_key_unique";

alter table "public"."tags" add constraint "tags_slug_key" UNIQUE using index "tags_slug_key";

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

grant delete on table "public"."business_social_links" to "anon";

grant insert on table "public"."business_social_links" to "anon";

grant references on table "public"."business_social_links" to "anon";

grant select on table "public"."business_social_links" to "anon";

grant trigger on table "public"."business_social_links" to "anon";

grant truncate on table "public"."business_social_links" to "anon";

grant update on table "public"."business_social_links" to "anon";

grant delete on table "public"."business_social_links" to "authenticated";

grant insert on table "public"."business_social_links" to "authenticated";

grant references on table "public"."business_social_links" to "authenticated";

grant select on table "public"."business_social_links" to "authenticated";

grant trigger on table "public"."business_social_links" to "authenticated";

grant truncate on table "public"."business_social_links" to "authenticated";

grant update on table "public"."business_social_links" to "authenticated";

grant delete on table "public"."business_social_links" to "postgres";

grant insert on table "public"."business_social_links" to "postgres";

grant references on table "public"."business_social_links" to "postgres";

grant select on table "public"."business_social_links" to "postgres";

grant trigger on table "public"."business_social_links" to "postgres";

grant truncate on table "public"."business_social_links" to "postgres";

grant update on table "public"."business_social_links" to "postgres";

grant delete on table "public"."business_social_links" to "service_role";

grant insert on table "public"."business_social_links" to "service_role";

grant references on table "public"."business_social_links" to "service_role";

grant select on table "public"."business_social_links" to "service_role";

grant trigger on table "public"."business_social_links" to "service_role";

grant truncate on table "public"."business_social_links" to "service_role";

grant update on table "public"."business_social_links" to "service_role";

grant delete on table "public"."businesses" to "anon";

grant insert on table "public"."businesses" to "anon";

grant references on table "public"."businesses" to "anon";

grant select on table "public"."businesses" to "anon";

grant trigger on table "public"."businesses" to "anon";

grant truncate on table "public"."businesses" to "anon";

grant update on table "public"."businesses" to "anon";

grant delete on table "public"."businesses" to "authenticated";

grant insert on table "public"."businesses" to "authenticated";

grant references on table "public"."businesses" to "authenticated";

grant select on table "public"."businesses" to "authenticated";

grant trigger on table "public"."businesses" to "authenticated";

grant truncate on table "public"."businesses" to "authenticated";

grant update on table "public"."businesses" to "authenticated";

grant delete on table "public"."businesses" to "postgres";

grant insert on table "public"."businesses" to "postgres";

grant references on table "public"."businesses" to "postgres";

grant select on table "public"."businesses" to "postgres";

grant trigger on table "public"."businesses" to "postgres";

grant truncate on table "public"."businesses" to "postgres";

grant update on table "public"."businesses" to "postgres";

grant delete on table "public"."businesses" to "service_role";

grant insert on table "public"."businesses" to "service_role";

grant references on table "public"."businesses" to "service_role";

grant select on table "public"."businesses" to "service_role";

grant trigger on table "public"."businesses" to "service_role";

grant truncate on table "public"."businesses" to "service_role";

grant update on table "public"."businesses" to "service_role";

grant delete on table "public"."categories" to "anon";

grant insert on table "public"."categories" to "anon";

grant references on table "public"."categories" to "anon";

grant select on table "public"."categories" to "anon";

grant trigger on table "public"."categories" to "anon";

grant truncate on table "public"."categories" to "anon";

grant update on table "public"."categories" to "anon";

grant delete on table "public"."categories" to "authenticated";

grant insert on table "public"."categories" to "authenticated";

grant references on table "public"."categories" to "authenticated";

grant select on table "public"."categories" to "authenticated";

grant trigger on table "public"."categories" to "authenticated";

grant truncate on table "public"."categories" to "authenticated";

grant update on table "public"."categories" to "authenticated";

grant delete on table "public"."categories" to "postgres";

grant insert on table "public"."categories" to "postgres";

grant references on table "public"."categories" to "postgres";

grant select on table "public"."categories" to "postgres";

grant trigger on table "public"."categories" to "postgres";

grant truncate on table "public"."categories" to "postgres";

grant update on table "public"."categories" to "postgres";

grant delete on table "public"."categories" to "service_role";

grant insert on table "public"."categories" to "service_role";

grant references on table "public"."categories" to "service_role";

grant select on table "public"."categories" to "service_role";

grant trigger on table "public"."categories" to "service_role";

grant truncate on table "public"."categories" to "service_role";

grant update on table "public"."categories" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "postgres";

grant insert on table "public"."profiles" to "postgres";

grant references on table "public"."profiles" to "postgres";

grant select on table "public"."profiles" to "postgres";

grant trigger on table "public"."profiles" to "postgres";

grant truncate on table "public"."profiles" to "postgres";

grant update on table "public"."profiles" to "postgres";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."site_settings" to "anon";

grant insert on table "public"."site_settings" to "anon";

grant references on table "public"."site_settings" to "anon";

grant select on table "public"."site_settings" to "anon";

grant trigger on table "public"."site_settings" to "anon";

grant truncate on table "public"."site_settings" to "anon";

grant update on table "public"."site_settings" to "anon";

grant delete on table "public"."site_settings" to "authenticated";

grant insert on table "public"."site_settings" to "authenticated";

grant references on table "public"."site_settings" to "authenticated";

grant select on table "public"."site_settings" to "authenticated";

grant trigger on table "public"."site_settings" to "authenticated";

grant truncate on table "public"."site_settings" to "authenticated";

grant update on table "public"."site_settings" to "authenticated";

grant delete on table "public"."site_settings" to "postgres";

grant insert on table "public"."site_settings" to "postgres";

grant references on table "public"."site_settings" to "postgres";

grant select on table "public"."site_settings" to "postgres";

grant trigger on table "public"."site_settings" to "postgres";

grant truncate on table "public"."site_settings" to "postgres";

grant update on table "public"."site_settings" to "postgres";

grant delete on table "public"."site_settings" to "service_role";

grant insert on table "public"."site_settings" to "service_role";

grant references on table "public"."site_settings" to "service_role";

grant select on table "public"."site_settings" to "service_role";

grant trigger on table "public"."site_settings" to "service_role";

grant truncate on table "public"."site_settings" to "service_role";

grant update on table "public"."site_settings" to "service_role";

grant delete on table "public"."tags" to "anon";

grant insert on table "public"."tags" to "anon";

grant references on table "public"."tags" to "anon";

grant select on table "public"."tags" to "anon";

grant trigger on table "public"."tags" to "anon";

grant truncate on table "public"."tags" to "anon";

grant update on table "public"."tags" to "anon";

grant delete on table "public"."tags" to "authenticated";

grant insert on table "public"."tags" to "authenticated";

grant references on table "public"."tags" to "authenticated";

grant select on table "public"."tags" to "authenticated";

grant trigger on table "public"."tags" to "authenticated";

grant truncate on table "public"."tags" to "authenticated";

grant update on table "public"."tags" to "authenticated";

grant delete on table "public"."tags" to "postgres";

grant insert on table "public"."tags" to "postgres";

grant references on table "public"."tags" to "postgres";

grant select on table "public"."tags" to "postgres";

grant trigger on table "public"."tags" to "postgres";

grant truncate on table "public"."tags" to "postgres";

grant update on table "public"."tags" to "postgres";

grant delete on table "public"."tags" to "service_role";

grant insert on table "public"."tags" to "service_role";

grant references on table "public"."tags" to "service_role";

grant select on table "public"."tags" to "service_role";

grant trigger on table "public"."tags" to "service_role";

grant truncate on table "public"."tags" to "service_role";

grant update on table "public"."tags" to "service_role";


  create policy "business_social_links_delete_admin"
  on "public"."business_social_links"
  as permissive
  for delete
  to public
using (public.is_admin());



  create policy "business_social_links_insert_admin"
  on "public"."business_social_links"
  as permissive
  for insert
  to public
with check (public.is_admin());



  create policy "business_social_links_select_public"
  on "public"."business_social_links"
  as permissive
  for select
  to public
using (true);



  create policy "business_social_links_update_admin"
  on "public"."business_social_links"
  as permissive
  for update
  to public
using (public.is_admin())
with check (public.is_admin());



  create policy "businesses_delete_admin"
  on "public"."businesses"
  as permissive
  for delete
  to public
using (public.is_admin());



  create policy "businesses_insert_admin"
  on "public"."businesses"
  as permissive
  for insert
  to public
with check (public.is_admin());



  create policy "businesses_select_public"
  on "public"."businesses"
  as permissive
  for select
  to public
using (true);



  create policy "businesses_update_admin"
  on "public"."businesses"
  as permissive
  for update
  to public
using (public.is_admin())
with check (public.is_admin());



  create policy "categories_delete_admin"
  on "public"."categories"
  as permissive
  for delete
  to public
using (public.is_admin());



  create policy "categories_insert_admin"
  on "public"."categories"
  as permissive
  for insert
  to public
with check (public.is_admin());



  create policy "categories_select_public"
  on "public"."categories"
  as permissive
  for select
  to public
using (true);



  create policy "categories_update_admin"
  on "public"."categories"
  as permissive
  for update
  to public
using (public.is_admin())
with check (public.is_admin());



  create policy "profiles_delete_admin"
  on "public"."profiles"
  as permissive
  for delete
  to public
using (public.is_admin());



  create policy "profiles_insert_admin"
  on "public"."profiles"
  as permissive
  for insert
  to public
with check (public.is_admin());



  create policy "profiles_select_public"
  on "public"."profiles"
  as permissive
  for select
  to public
using (true);



  create policy "profiles_update_admin"
  on "public"."profiles"
  as permissive
  for update
  to public
using (public.is_admin())
with check (public.is_admin());



  create policy "site_settings_delete_admin"
  on "public"."site_settings"
  as permissive
  for delete
  to public
using (public.is_admin());



  create policy "site_settings_insert_admin"
  on "public"."site_settings"
  as permissive
  for insert
  to public
with check (public.is_admin());



  create policy "site_settings_select_public"
  on "public"."site_settings"
  as permissive
  for select
  to public
using (true);



  create policy "site_settings_update_admin"
  on "public"."site_settings"
  as permissive
  for update
  to public
using (public.is_admin())
with check (public.is_admin());



  create policy "tags_delete_admin"
  on "public"."tags"
  as permissive
  for delete
  to public
using (public.is_admin());



  create policy "tags_insert_admin"
  on "public"."tags"
  as permissive
  for insert
  to public
with check (public.is_admin());



  create policy "tags_select_public"
  on "public"."tags"
  as permissive
  for select
  to public
using (true);



  create policy "tags_update_admin"
  on "public"."tags"
  as permissive
  for update
  to public
using (public.is_admin())
with check (public.is_admin());


CREATE TRIGGER on_profile_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


