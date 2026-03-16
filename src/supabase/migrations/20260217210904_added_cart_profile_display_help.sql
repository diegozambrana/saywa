alter table "public"."catalogs" add column "display_custom_price" boolean not null default true;

alter table "public"."catalogs" add column "display_product_description" boolean not null default true;

alter table "public"."catalogs" add column "theme" jsonb not null default '{}'::jsonb;


