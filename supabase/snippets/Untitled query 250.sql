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

create table public.profiles (
  id uuid not null,
  email text not null,
  full_name text null,
  avatar_url text null,
  username text null,
  bio text null,
  created_at timestamp with time zone not null default timezone ('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone ('utc'::text, now()),
  role character varying not null default 'USER'::character varying,
  onboarding_completed boolean not null default false,
  help_flow_displayed boolean not null default false,
  plan character varying not null default 'FREE'::character varying,
  constraint profiles_pkey primary key (id),
  constraint profiles_email_key unique (email),
  constraint profiles_username_key unique (username),
  constraint profiles_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists profiles_username_idx on public.profiles using btree (username) TABLESPACE pg_default;

create trigger on_profile_updated BEFORE
update on profiles for EACH row
execute FUNCTION handle_updated_at ();