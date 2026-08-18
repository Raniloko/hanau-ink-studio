CREATE POLICY "Anyone can upload tattoo reference photos"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'tattoo-references');

CREATE POLICY "Admins can view tattoo reference photos"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'tattoo-references' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete tattoo reference photos"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'tattoo-references' AND public.has_role(auth.uid(), 'admin'));