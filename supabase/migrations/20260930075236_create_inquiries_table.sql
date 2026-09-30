/*
# Create inquiries table for coach portfolio contact form

1. New Tables
- `inquiries`
  - `id` (uuid, primary key, auto-generated)
  - `name` (text, not null) — the visitor's full name
  - `email` (text, not null) — the visitor's email address
  - `service` (text, not null) — which service they're interested in (e.g. "Personal Training", "Beauty Consultation")
  - `message` (text, not null) — the visitor's message/inquiry
  - `created_at` (timestamptz, defaults to now) — when the inquiry was submitted

2. Security
- Enable RLS on `inquiries`.
- This is a no-auth public contact form, so the anon key client needs INSERT access to submit inquiries.
- SELECT/UPDATE/DELETE are restricted to authenticated users only (the site owner viewing inquiries via Supabase dashboard).
- INSERT policy allows anon + authenticated with WITH CHECK (true) since any visitor can submit a contact form.

3. Notes
- No user_id column or auth integration — this is a single-tenant public contact form.
- The site owner can view submitted inquiries through the Supabase dashboard or authenticated queries.
*/

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  service text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anon + authenticated) to insert new inquiries
DROP POLICY IF EXISTS "anon_insert_inquiries" ON inquiries;
CREATE POLICY "anon_insert_inquiries"
ON inquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated users (site owner) can read inquiries
DROP POLICY IF EXISTS "auth_select_inquiries" ON inquiries;
CREATE POLICY "auth_select_inquiries"
ON inquiries FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users can update inquiries
DROP POLICY IF EXISTS "auth_update_inquiries" ON inquiries;
CREATE POLICY "auth_update_inquiries"
ON inquiries FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

-- Only authenticated users can delete inquiries
DROP POLICY IF EXISTS "auth_delete_inquiries" ON inquiries;
CREATE POLICY "auth_delete_inquiries"
ON inquiries FOR DELETE
TO authenticated
USING (true);
