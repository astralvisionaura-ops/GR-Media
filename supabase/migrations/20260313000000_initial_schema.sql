-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Admins allowlist
CREATE TABLE public.admins (
  id         uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin reads admin table" ON public.admins
  FOR SELECT USING (auth.uid() IN (SELECT id FROM public.admins));

-- Client profiles
CREATE TABLE public.client_profiles (
  id           uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text        NOT NULL,
  email        text        NOT NULL UNIQUE,
  phone        text,
  notes        text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  deleted_at   timestamptz
);
ALTER TABLE public.client_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "client reads own profile"   ON public.client_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "client updates own profile" ON public.client_profiles FOR UPDATE USING (auth.uid() = id AND deleted_at IS NULL);
CREATE POLICY "admin reads all profiles"   ON public.client_profiles FOR SELECT USING (auth.uid() IN (SELECT id FROM public.admins));
CREATE POLICY "admin updates all profiles" ON public.client_profiles FOR UPDATE USING (auth.uid() IN (SELECT id FROM public.admins));
CREATE INDEX idx_client_profiles_email      ON public.client_profiles (email);
CREATE INDEX idx_client_profiles_deleted_at ON public.client_profiles (deleted_at);

-- Auto-create client_profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.client_profiles (id, display_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)), NEW.email);
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Galleries
CREATE TABLE public.galleries (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_user_id   uuid NOT NULL REFERENCES public.client_profiles(id) ON DELETE CASCADE,
  name             text NOT NULL,
  description      text,
  cover_image_path text,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),
  deleted_at       timestamptz
);
ALTER TABLE public.galleries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "client views own galleries" ON public.galleries FOR SELECT USING (auth.uid() = client_user_id AND deleted_at IS NULL);
CREATE POLICY "admin views all galleries"  ON public.galleries FOR SELECT USING (auth.uid() IN (SELECT id FROM public.admins));
CREATE POLICY "admin creates galleries"    ON public.galleries FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM public.admins));
CREATE POLICY "admin updates galleries"    ON public.galleries FOR UPDATE USING (auth.uid() IN (SELECT id FROM public.admins));
CREATE INDEX idx_galleries_client_user_id ON public.galleries (client_user_id);
CREATE INDEX idx_galleries_deleted_at     ON public.galleries (deleted_at);

-- Gallery images
CREATE TABLE public.gallery_images (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id    uuid    NOT NULL REFERENCES public.galleries(id) ON DELETE CASCADE,
  storage_path  text    NOT NULL,
  thumb_path    text    NOT NULL,
  filename      text    NOT NULL,
  width         integer NOT NULL,
  height        integer NOT NULL,
  filesize_bytes bigint NOT NULL,
  sort_order    integer NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now(),
  deleted_at    timestamptz
);
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "client views images in own galleries" ON public.gallery_images FOR SELECT
  USING (auth.uid() = (SELECT client_user_id FROM public.galleries WHERE id = gallery_id));
CREATE POLICY "admin views all images"   ON public.gallery_images FOR SELECT USING (auth.uid() IN (SELECT id FROM public.admins));
CREATE POLICY "admin uploads images"     ON public.gallery_images FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM public.admins));
CREATE POLICY "admin updates images"     ON public.gallery_images FOR UPDATE USING (auth.uid() IN (SELECT id FROM public.admins));
CREATE INDEX idx_gallery_images_gallery_id ON public.gallery_images (gallery_id);
CREATE INDEX idx_gallery_images_sort       ON public.gallery_images (gallery_id, sort_order);

-- Document type enum
CREATE TYPE document_type AS ENUM ('invoice', 'contract', 'other');

-- Documents
CREATE TABLE public.documents (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_user_id uuid          NOT NULL REFERENCES public.client_profiles(id) ON DELETE CASCADE,
  name           text          NOT NULL,
  type           document_type NOT NULL,
  storage_path   text          NOT NULL,
  filename       text          NOT NULL,
  filesize_bytes bigint        NOT NULL,
  created_at     timestamptz   NOT NULL DEFAULT now(),
  deleted_at     timestamptz
);
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "client views own documents" ON public.documents FOR SELECT USING (auth.uid() = client_user_id AND deleted_at IS NULL);
CREATE POLICY "admin views all documents"  ON public.documents FOR SELECT USING (auth.uid() IN (SELECT id FROM public.admins));
CREATE POLICY "admin creates documents"    ON public.documents FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM public.admins));
CREATE POLICY "admin updates documents"    ON public.documents FOR UPDATE USING (auth.uid() IN (SELECT id FROM public.admins));
CREATE INDEX idx_documents_client_user_id ON public.documents (client_user_id);
CREATE INDEX idx_documents_type           ON public.documents (client_user_id, type);

-- Blog post meta (optional mirror for fast listing)
CREATE TABLE public.blog_post_meta (
  slug           text PRIMARY KEY,
  title          text    NOT NULL,
  excerpt        text    NOT NULL,
  cover_image_url text,
  tags           text[]  NOT NULL DEFAULT '{}',
  published_at   date    NOT NULL,
  draft          boolean NOT NULL DEFAULT FALSE,
  created_at     timestamptz NOT NULL DEFAULT now()
);
-- RLS disabled — public read, no personal data
CREATE INDEX idx_blog_post_meta_published_at ON public.blog_post_meta (published_at DESC);
CREATE INDEX idx_blog_post_meta_draft        ON public.blog_post_meta (draft);

-- Contact submissions (optional audit log)
CREATE TABLE public.contact_submissions (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text        NOT NULL,
  email        text        NOT NULL,
  message      text        NOT NULL,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  ip_hash      text,
  deleted_at   timestamptz
);
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin reads submissions"  ON public.contact_submissions FOR SELECT USING (auth.uid() IN (SELECT id FROM public.admins));
CREATE POLICY "admin deletes submissions" ON public.contact_submissions FOR DELETE USING (auth.uid() IN (SELECT id FROM public.admins));
CREATE INDEX idx_contact_submissions_submitted_at ON public.contact_submissions (submitted_at DESC);
