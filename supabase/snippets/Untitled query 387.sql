ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "categories_select_public" ON public.categories
  FOR SELECT USING (true);
CREATE POLICY "categories_insert_admin" ON public.categories
  FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "categories_update_admin" ON public.categories
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "categories_delete_admin" ON public.categories
  FOR DELETE USING (public.is_admin());

-- Tags
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tags_select_public" ON public.tags
  FOR SELECT USING (true);
CREATE POLICY "tags_insert_admin" ON public.tags
  FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "tags_update_admin" ON public.tags
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "tags_delete_admin" ON public.tags
  FOR DELETE USING (public.is_admin());