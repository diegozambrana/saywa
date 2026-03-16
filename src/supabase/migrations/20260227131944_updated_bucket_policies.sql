
  create policy "Give anon users access to JPG images in folder 1twvzjd_0"
  on "storage"."objects"
  as permissive
  for select
  to public
using (((bucket_id = 'profile'::text) AND (storage.extension(name) = 'jpg'::text) AND (lower((storage.foldername(name))[1]) = 'public'::text) AND (auth.role() = 'anon'::text)));



  create policy "Give anon users access to JPG images in folder 1twvzjd_1"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check (((bucket_id = 'profile'::text) AND (storage.extension(name) = 'jpg'::text) AND (lower((storage.foldername(name))[1]) = 'public'::text) AND (auth.role() = 'anon'::text)));



  create policy "Give anon users access to JPG images in folder 1twvzjd_2"
  on "storage"."objects"
  as permissive
  for update
  to public
using (((bucket_id = 'profile'::text) AND (storage.extension(name) = 'jpg'::text) AND (lower((storage.foldername(name))[1]) = 'public'::text) AND (auth.role() = 'anon'::text)));



  create policy "Give anon users access to JPG images in folder 1twvzjd_3"
  on "storage"."objects"
  as permissive
  for delete
  to public
using (((bucket_id = 'profile'::text) AND (storage.extension(name) = 'jpg'::text) AND (lower((storage.foldername(name))[1]) = 'public'::text) AND (auth.role() = 'anon'::text)));



