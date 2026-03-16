alter table "public"."businesses" add column "country_code_phone" character varying default '+591'::character varying;

alter table "public"."businesses" add column "country_code_whatsapp" character varying default '+591'::character varying;

alter table "public"."businesses" add column "is_public" boolean not null default false;

alter table "public"."catalog_contacts" add column "country_code_phone" character varying not null default '+591'::character varying;

alter table "public"."catalogs" add column "catalog_whatsapp_country_code" character varying not null default '+591'::character varying;


