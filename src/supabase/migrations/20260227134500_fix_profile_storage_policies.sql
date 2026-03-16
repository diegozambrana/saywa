drop policy if exists "Give anon users access to JPG images in folder 1twvzjd_0"
on "storage"."objects";

drop policy if exists "Give anon users access to JPG images in folder 1twvzjd_1"
on "storage"."objects";

drop policy if exists "Give anon users access to JPG images in folder 1twvzjd_2"
on "storage"."objects";

drop policy if exists "Give anon users access to JPG images in folder 1twvzjd_3"
on "storage"."objects";

create policy "profile_images_public_read"
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'profile'::text));

create policy "profile_images_owner_insert"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (
  (bucket_id = 'profile'::text)
  and ((storage.foldername(name))[1] = (auth.uid())::text)
);

create policy "profile_images_owner_update"
on "storage"."objects"
as permissive
for update
to authenticated
using (
  (bucket_id = 'profile'::text)
  and ((storage.foldername(name))[1] = (auth.uid())::text)
);

create policy "profile_images_owner_delete"
on "storage"."objects"
as permissive
for delete
to authenticated
using (
  (bucket_id = 'profile'::text)
  and ((storage.foldername(name))[1] = (auth.uid())::text)
);
