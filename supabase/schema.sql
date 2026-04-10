-- ═══════════════════════════════════════════════════════════════
--  LushaiTravels — Supabase Database Schema
--  Paste this entire file into the Supabase SQL Editor and click Run
-- ═══════════════════════════════════════════════════════════════

-- ── Enable UUID extension ─────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ══════════════════════════════════════════════
--  TABLE: profiles
--  Extended info for every auth user
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT,
  phone       TEXT,
  avatar_url  TEXT,
  role        TEXT DEFAULT 'user' CHECK (role IN ('user','host','admin')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles: own read"   ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles: own update" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles: insert own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- ── Auto-create profile on signup ─────────────────────────────
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url',
    'user'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ══════════════════════════════════════════════
--  TABLE: destinations
--  Travel destinations (was hard-coded JS data)
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS destinations (
  id                 TEXT PRIMARY KEY,
  name               TEXT NOT NULL,
  tagline            TEXT,
  type               TEXT,
  tags               TEXT[],
  difficulty         TEXT,
  district           TEXT,
  lat                DOUBLE PRECISION,
  lng                DOUBLE PRECISION,
  rating             NUMERIC(3,1) DEFAULT 4.5,
  reviews            INT DEFAULT 0,
  cover_image        TEXT,
  images             TEXT[],
  description        TEXT,
  highlights         TEXT[],
  best_time          TEXT,
  nearby_attractions TEXT[],
  duration           TEXT,
  category           TEXT,
  quick_facts        JSONB DEFAULT '[]',
  created_at         TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "destinations: public read" ON destinations FOR SELECT USING (true);
CREATE POLICY "destinations: admin write" ON destinations FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ══════════════════════════════════════════════
--  TABLE: stays
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS stays (
  id               TEXT PRIMARY KEY DEFAULT ('stay-' || gen_random_uuid()::text),
  host_id          UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name             TEXT NOT NULL,
  type             TEXT DEFAULT 'Homestay' CHECK (type IN ('Homestay','Hotel','Lodge','Camping')),
  location         TEXT,
  district         TEXT,
  lat              DOUBLE PRECISION,
  lng              DOUBLE PRECISION,
  price            INT NOT NULL,
  max_guests       INT DEFAULT 4,
  rooms            INT DEFAULT 1,
  rating           NUMERIC(3,1) DEFAULT 0,
  reviews_count    INT DEFAULT 0,
  cover_image      TEXT,
  images           TEXT[],
  amenities        TEXT[],
  description      TEXT,
  about            TEXT,
  nearby_attractions TEXT[],
  check_in         TEXT DEFAULT '14:00',
  check_out        TEXT DEFAULT '11:00',
  rules            TEXT[],
  top_rated        BOOLEAN DEFAULT false,
  verified         BOOLEAN DEFAULT true,
  tags             TEXT[],
  status           TEXT DEFAULT 'approved' CHECK (status IN ('pending','approved','rejected')),
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE stays ENABLE ROW LEVEL SECURITY;
CREATE POLICY "stays: public read approved"    ON stays FOR SELECT USING (status = 'approved');
CREATE POLICY "stays: host manage own"         ON stays FOR ALL USING (auth.uid() = host_id);

-- ══════════════════════════════════════════════
--  TABLE: guides
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS guides (
  id            TEXT PRIMARY KEY DEFAULT ('guide-' || gen_random_uuid()::text),
  host_id       UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name          TEXT NOT NULL,
  title         TEXT,
  experience    TEXT,
  languages     TEXT[],
  specialties   TEXT[],
  rating        NUMERIC(3,1) DEFAULT 0,
  reviews_count INT DEFAULT 0,
  price         INT NOT NULL,
  price_unit    TEXT DEFAULT 'per day',
  location      TEXT,
  phone         TEXT,
  email         TEXT,
  cover_image   TEXT,
  images        TEXT[],
  bio           TEXT,
  certifications TEXT[],
  verified      BOOLEAN DEFAULT true,
  available     BOOLEAN DEFAULT true,
  tags          TEXT[],
  status        TEXT DEFAULT 'approved' CHECK (status IN ('pending','approved','rejected')),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE guides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "guides: public read approved" ON guides FOR SELECT USING (status = 'approved');
CREATE POLICY "guides: host manage own"      ON guides FOR ALL USING (auth.uid() = host_id);

-- ══════════════════════════════════════════════
--  TABLE: transport
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS transport (
  id            TEXT PRIMARY KEY DEFAULT ('transport-' || gen_random_uuid()::text),
  host_id       UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name          TEXT NOT NULL,
  owner_name    TEXT,
  type          TEXT,
  vehicles      JSONB DEFAULT '[]',
  rating        NUMERIC(3,1) DEFAULT 0,
  reviews_count INT DEFAULT 0,
  phone         TEXT,
  email         TEXT,
  location      TEXT,
  cover_image   TEXT,
  images        TEXT[],
  description   TEXT,
  features      TEXT[],
  verified      BOOLEAN DEFAULT true,
  available     BOOLEAN DEFAULT true,
  status        TEXT DEFAULT 'approved' CHECK (status IN ('pending','approved','rejected')),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE transport ENABLE ROW LEVEL SECURITY;
CREATE POLICY "transport: public read approved" ON transport FOR SELECT USING (status = 'approved');
CREATE POLICY "transport: host manage own"      ON transport FOR ALL USING (auth.uid() = host_id);

-- ══════════════════════════════════════════════
--  TABLE: bookings
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS bookings (
  id                  TEXT PRIMARY KEY DEFAULT ('LT-' || upper(substring(gen_random_uuid()::text, 1, 8))),
  user_id             UUID REFERENCES profiles(id) ON DELETE SET NULL,
  listing_id          TEXT NOT NULL,
  listing_name        TEXT,
  listing_type        TEXT CHECK (listing_type IN ('stay','guide','transport')),
  checkin             DATE,
  checkout            DATE,
  guests              INT DEFAULT 1,
  total               INT NOT NULL,
  guest_name          TEXT,
  guest_email         TEXT,
  guest_phone         TEXT,
  notes               TEXT,
  payment_id          TEXT,
  status              TEXT DEFAULT 'confirmed' CHECK (status IN ('pending','confirmed','cancelled')),
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "bookings: own read"   ON bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "bookings: own insert" ON bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "bookings: own update" ON bookings FOR UPDATE USING (auth.uid() = user_id);

-- ══════════════════════════════════════════════
--  TABLE: reviews
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS reviews (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES profiles(id) ON DELETE SET NULL,
  listing_id  TEXT NOT NULL,
  listing_type TEXT,
  rating      INT CHECK (rating BETWEEN 1 AND 5),
  comment     TEXT,
  reviewer_name TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reviews: public read"  ON reviews FOR SELECT USING (true);
CREATE POLICY "reviews: auth insert"  ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reviews: own delete"   ON reviews FOR DELETE USING (auth.uid() = user_id);
