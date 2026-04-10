-- ═══════════════════════════════════════════════════════════════
--  LushaiTravels — RESET + SEED (All-in-one)
--  Drops all listing tables and recreates them, then inserts seed data.
--  Safe to run multiple times. All 12 destinations are included.
-- ═══════════════════════════════════════════════════════════════

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Drop old tables (does NOT touch profiles/auth) ────────────
DROP TABLE IF EXISTS reviews   CASCADE;
DROP TABLE IF EXISTS bookings  CASCADE;
DROP TABLE IF EXISTS transport CASCADE;
DROP TABLE IF EXISTS guides    CASCADE;
DROP TABLE IF EXISTS stays     CASCADE;
DROP TABLE IF EXISTS destinations CASCADE;

-- ═══════════════════════════════════════════════
--  TABLE: destinations
-- ═══════════════════════════════════════════════
CREATE TABLE destinations (
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

-- ═══════════════════════════════════════════════
--  TABLE: stays
-- ═══════════════════════════════════════════════
CREATE TABLE stays (
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
CREATE POLICY "stays: public read approved" ON stays FOR SELECT USING (status = 'approved');
CREATE POLICY "stays: host manage own"      ON stays FOR ALL USING (auth.uid() = host_id);

-- ═══════════════════════════════════════════════
--  TABLE: guides
-- ═══════════════════════════════════════════════
CREATE TABLE guides (
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

-- ═══════════════════════════════════════════════
--  TABLE: transport
-- ═══════════════════════════════════════════════
CREATE TABLE transport (
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

-- ═══════════════════════════════════════════════
--  TABLE: bookings
-- ═══════════════════════════════════════════════
CREATE TABLE bookings (
  id           TEXT PRIMARY KEY DEFAULT ('LT-' || upper(substring(gen_random_uuid()::text, 1, 8))),
  user_id      UUID REFERENCES profiles(id) ON DELETE SET NULL,
  listing_id   TEXT NOT NULL,
  listing_name TEXT,
  listing_type TEXT CHECK (listing_type IN ('stay','guide','transport')),
  checkin      DATE,
  checkout     DATE,
  guests       INT DEFAULT 1,
  total        INT NOT NULL,
  guest_name   TEXT,
  guest_email  TEXT,
  guest_phone  TEXT,
  notes        TEXT,
  payment_id   TEXT,
  status       TEXT DEFAULT 'confirmed' CHECK (status IN ('pending','confirmed','cancelled')),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "bookings: own read"   ON bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "bookings: own insert" ON bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "bookings: own update" ON bookings FOR UPDATE USING (auth.uid() = user_id);

-- ═══════════════════════════════════════════════
--  TABLE: reviews
-- ═══════════════════════════════════════════════
CREATE TABLE reviews (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID REFERENCES profiles(id) ON DELETE SET NULL,
  listing_id    TEXT NOT NULL,
  listing_type  TEXT,
  rating        INT CHECK (rating BETWEEN 1 AND 5),
  comment       TEXT,
  reviewer_name TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reviews: public read" ON reviews FOR SELECT USING (true);
CREATE POLICY "reviews: auth insert" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reviews: own delete"  ON reviews FOR DELETE USING (auth.uid() = user_id);


-- ════════════════════════════════════════════════════════════════
--  SEED: Destinations — all 12, mirrors destinations-content.js
--  ON CONFLICT DO UPDATE ensures edits in Supabase are idempotent.
-- ════════════════════════════════════════════════════════════════
INSERT INTO destinations (
  id, name, tagline, type, tags, difficulty, district,
  lat, lng, rating, reviews,
  cover_image, images, description, highlights,
  best_time, nearby_attractions, duration, category, quick_facts
) VALUES

(
  'vantawng-falls', 'Vantawng Falls', 'India''s tallest waterfall in Mizoram', 'waterfall',
  ARRAY['adventure','nature','waterfall'], 'Moderate', 'Serchhip',
  23.0932, 92.7534, 4.8, 124,
  '/images/2018080738-1024x576.jpg',
  ARRAY['/images/2018080738-1024x576.jpg','/images/2019072384.jpg','/images/View-of-Vantawng-Waterfall-Cover-Photo-840x425.jpg'],
  'Vantawng Falls, plunging 750 feet into a deep gorge, is the tallest waterfall in Mizoram and one of the most spectacular in Northeast India. Surrounded by lush subtropical forests and mist, this is a must-visit for nature lovers and adventure seekers alike.',
  ARRAY['750-ft plunge pool','Jungle trek','Wildlife sightings','Photography paradise'],
  'October – March', ARRAY['Serchhip town','Tuirial River','Local bamboo villages'],
  '1-2 days', 'adventure', '[]'::jsonb
),

(
  'phawngpui-peak', 'Phawngpui Peak', 'Blue Mountain — the highest point in Mizoram', 'mountain',
  ARRAY['adventure','trekking','scenic'], 'Hard', 'Lawngtlai',
  22.4869, 93.0248, 4.9, 87,
  '/images/Website-Blog-Image-Size-26.jpg',
  ARRAY['/images/Website-Blog-Image-Size-26.jpg','/images/Website-Blog-Image-Size-29.jpg','/images/Website-Feature-Image-Size-10.jpg'],
  'Standing at 2,157 metres, Phawngpui (Blue Mountain) is the highest peak in Mizoram, offering breathtaking panoramic views of Myanmar across rolling blue-hazed ridges. The national park here protects rare orchids, Himalayan black bears, and hollock gibbons.',
  ARRAY['Sunrise panoramas','Rare orchid species','Wildlife viewing','Cloud sea views'],
  'November – February', ARRAY['Phawngpui National Park','Sangau border outpost'],
  '2-3 days', 'adventure', '[]'::jsonb
),

(
  'tam-dil-lake', 'Tam Dil Lake', 'Mirror-still lake in a pine-forested valley', 'lake',
  ARRAY['relaxation','nature','lake'], 'Easy', 'Saitual',
  23.6177, 92.8894, 4.6, 93,
  '/images/tamdil-lake-mizoram.jpeg',
  ARRAY['/images/tamdil-lake-mizoram.jpeg','/images/2019072338-1024x576.jpg','/images/2019072384-1-olw9h396o5jhwh510ctk9bwfep94no9o510c4tj0ju.jpg'],
  'Tam Dil Lake is a serene natural lake nested among tall pine trees, perfect for a peaceful picnic, boating, or simply relaxing in nature. The calm waters reflect the surrounding hills like a mirror at dawn, making it a favourite for photographers.',
  ARRAY['Boating','Picnic spots','Pine forest walks','Photography'],
  'Year-round (best Sep – Mar)', ARRAY['Saitual town','Kelkang','Aizawl (85 km)'],
  '1 day', 'relaxation', '[]'::jsonb
),

(
  'reiek-tlang', 'Reiek Tlang', 'Rolling hills with traditional Mizo heritage village', 'hill',
  ARRAY['culture','nature','relaxation'], 'Easy', 'Mamit',
  23.7152, 92.5694, 4.5, 78,
  '/images/caption.jpg',
  ARRAY['/images/caption.jpg','/images/caption%20(1).jpg','/images/reiek-tlang-view-point-ailawng-mammit-tourist-attraction-XPHYubeNTg.jpg'],
  'Reiek Tlang is a picturesque hill retreat just 30 km from Aizawl, home to a reconstructed traditional Mizo village, walking trails, and breathtaking hillside views. Sunrise here is particularly magical with layers of hills fading into the horizon.',
  ARRAY['Traditional Mizo village','Hiking trails','Sunrise views','Cultural exhibits'],
  'October – April', ARRAY['Aizawl','Hmuifang','Durtlang Hills'],
  '1 day', 'culture', '[]'::jsonb
),

(
  'palak-dil', 'Palak Dil Lake', 'Mizoram''s largest natural lake, ringed by jungle', 'lake',
  ARRAY['nature','wildlife','relaxation'], 'Easy', 'Saiha',
  22.1627, 92.9261, 4.7, 56,
  '/images/626bdb1307952_Palak%20lake.jpg',
  ARRAY['/images/626bdb1307952_Palak%20lake.jpg','/images/626bdb1b5a442_PALAK%20lake%202.jpg','/images/palak-lake-aizawl-mizoram-1-attr-hero.jpeg'],
  'Palak Dil, Mizoram''s largest natural lake, lies in the remote Saiha district near the Myanmar border. The lake is surrounded by dense subtropical forest and is a prime migratory bird watching destination. The silence here is extraordinary.',
  ARRAY['Bird watching','Boat rides','Wildlife','Remote wilderness'],
  'November – February', ARRAY['Saiha town','Phawngpui (nearby)'],
  '2 days', 'relaxation', '[]'::jsonb
),

(
  'champhai', 'Champhai Valley', 'The fruit bowl of Mizoram with stunning valley views', 'valley',
  ARRAY['nature','culture','relaxation'], 'Easy', 'Champhai',
  23.4692, 93.3224, 4.6, 102,
  '/images/Paddy-fields-at-Champhai-Mizoram.webp',
  ARRAY['/images/Paddy-fields-at-Champhai-Mizoram.webp','/images/House-in-a-paddy-field-in-Champhai.webp','/images/1694632131_sweeping_meadows_at_champhai.jpg.webp','/images/6054f244a637b2d8c9a63aa0c66b7056_1000x1000.jpg','/images/62addaa694e9f_Champhai%20Zawl.jpg'],
  'Champhai is known as the "Rice Bowl of Mizoram" and sits at the gateway to Myanmar. The valley is dotted with fruit orchards, paddy fields, and dramatic ridgeline sunsets. Its border town character adds a unique cultural flavour.',
  ARRAY['Valley views','Fruit orchards','Museum','Myanmar border'],
  'October – March', ARRAY['Rih Dil Lake (Myanmar)','Murlen National Park','Tamdil'],
  '2-3 days', 'relaxation', '[]'::jsonb
),

(
  'murlen-national-park', 'Murlen National Park', 'One of Northeast India''s finest biodiversity hotspots', 'wildlife',
  ARRAY['wildlife','adventure','nature'], 'Moderate', 'Champhai',
  23.6500, 93.3500, 4.8, 43,
  '/images/1557675360_murlen-national-park.jpg',
  ARRAY['/images/murlen-national-park-murlen-champhai-national-parks-egyj5j72xi.avif','/images/murlen-national-park-murlen-champhai-national-parks-3zntx71lgy.avif','/images/Website-Blog-Image-Size-23.jpg','/images/Website-Blog-Image-Size-24.jpg','/images/1557675360_murlen-national-park.jpg'],
  'Murlen National Park, spanning over 100 sq km of pristine forest, is home to leopards, clouded leopards, gibbons, hornbills, and over 150 bird species. Trekking through its silent, ancient forests is a transformative experience.',
  ARRAY['Leopard habitat','Hornbill spotting','Jungle camping','Bird watching'],
  'November – April', ARRAY['Champhai','Phawngpui Peak'],
  '2-3 days', 'adventure', '[]'::jsonb
),

(
  'hmuifang', 'Hmuifang Hill', 'Cloud-kissed hill with Aizawl valley panoramas', 'hill',
  ARRAY['relaxation','nature','scenic'], 'Easy', 'Aizawl',
  23.5000, 92.7900, 4.4, 67,
  'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80',
  ARRAY['https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80','https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80','https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&q=80'],
  'Just 54 km from Aizawl, Hmuifang is a hill station known as "Mizoram''s Shimla." The hilltop resort offers stunning views of the surrounding valleys and the Tlawng River below. Pine forests, cool mountain air, and misty mornings make it ideal for relaxation.',
  ARRAY['Valley panoramas','Pine forest','Cool climate','Birding'],
  'October – March', ARRAY['Aizawl','Reiek Tlang','Durtlang'],
  '1 day', 'relaxation', '[]'::jsonb
),

(
  'lunglei', 'Lunglei Hills', 'The "Bridge of the Rocks" — Mizoram''s southern capital', 'hill',
  ARRAY['culture','nature','relaxation'], 'Easy', 'Lunglei',
  22.8917, 92.7349, 4.3, 58,
  'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&q=80',
  ARRAY['https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&q=80','https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80','https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80'],
  'Lunglei, the second largest city in Mizoram, sits dramatically on a ridge above verdant valleys. The name means "bridge of rocks." Explore local bazaars, colonial-era churches, and the sweeping viewpoints overlooking the Tlawng river basin.',
  ARRAY['Rock viewpoints','Local markets','Heritage churches','Valley walks'],
  'October – April', ARRAY['Saikuti Beach','Khawbung','Vantawng Falls (3 hrs)'],
  '1-2 days', 'culture', '[]'::jsonb
),

(
  'aizawl-city', 'Aizawl City', 'The hilltop capital — where Mizoram''s heart beats', 'city',
  ARRAY['culture','food','relaxation'], 'Easy', 'Aizawl',
  23.7271, 92.7176, 4.5, 211,
  'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  ARRAY['https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80','https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80','https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80'],
  'Aizawl, perched dramatically on ridges at 1,132 m elevation, is one of India''s most unique capital cities. Explore the old market (Bara Bazar), taste Mizo cuisine, visit the state museum, and experience the warmth of Mizo hospitality.',
  ARRAY['Bara Bazar','Mizo cuisine','State Museum','Durtlang Hills'],
  'Year-round', ARRAY['Reiek Tlang','Hmuifang','Tam Dil Lake'],
  '2-3 days', 'culture', '[]'::jsonb
),

(
  'tuipui-river', 'Tuipui River', 'Pristine river valley for kayaking and fishing', 'river',
  ARRAY['adventure','nature','water'], 'Moderate', 'Saiha',
  22.0500, 92.9000, 4.4, 32,
  'https://images.unsplash.com/photo-1503264116251-35a269479413?w=800&q=80',
  ARRAY['https://images.unsplash.com/photo-1503264116251-35a269479413?w=800&q=80','https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80','https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=800&q=80'],
  'The Tuipui River flows through the remotest district of Mizoram, creating stunning gorges, crystal-clear pools, and beaches. This is one of the best spots in Northeast India for river kayaking, fishing, and wild camping.',
  ARRAY['Kayaking','Fishing','Wild camping','Gorge walks'],
  'November – March', ARRAY['Saiha','Palak Dil Lake','Phawngpui'],
  '2-3 days', 'adventure', '[]'::jsonb
),

(
  'castle-of-bawinu-beino', 'Castle of Bawinu/Beino', 'Mizoram''s hidden grand canyon carved by the Kolodyne River', 'canyon',
  ARRAY['sightseeing','adventure','wildlife','nature watching','vacation'], 'Hard', 'Saiha',
  22.3101, 92.8232, 0, 0,
  '/images/626bcef048b4e_Beino-Caslte-(1).jpg',
  ARRAY['/images/626bcef048b4e_Beino-Caslte-(1).jpg','/images/124.jpg','/images/cover.jpg','/images/hg5yhb.jpg'],
  'Castle of Bawinu or Beino is a lesser-explored geological wonder on the Kolodyne (Kaladan or Chhimpuitui) River, often called the Grand Canyon of Mizoram. Towering rock formations rise dramatically beside crystal-clear water, creating a striking landscape for boat journeys, hiking, photography, and wildlife watching.',
  ARRAY['Grand canyon-like rock formations','Motorboat journey on the Kolodyne','Wildlife and bird watching','Spectacular reflections and photography'],
  'February - May', ARRAY['Lomasu','Saphaw','Lungdar','Tuidang'],
  '1-2 days', 'adventure',
  '[{"label":"Altitude","value":"54 mts"},{"label":"From Aizawl","value":"325 kms"},{"label":"Nearest Tourist Lodge","value":"81.4 kms"},{"label":"Walking Distance","value":"20 minutes away"},{"label":"Weather Forecast","value":"23 C, Clouds"}]'::jsonb
)

ON CONFLICT (id) DO UPDATE SET
  name               = EXCLUDED.name,
  tagline            = EXCLUDED.tagline,
  type               = EXCLUDED.type,
  tags               = EXCLUDED.tags,
  difficulty         = EXCLUDED.difficulty,
  district           = EXCLUDED.district,
  lat                = EXCLUDED.lat,
  lng                = EXCLUDED.lng,
  rating             = EXCLUDED.rating,
  reviews            = EXCLUDED.reviews,
  cover_image        = EXCLUDED.cover_image,
  images             = EXCLUDED.images,
  description        = EXCLUDED.description,
  highlights         = EXCLUDED.highlights,
  best_time          = EXCLUDED.best_time,
  nearby_attractions = EXCLUDED.nearby_attractions,
  duration           = EXCLUDED.duration,
  category           = EXCLUDED.category,
  quick_facts        = EXCLUDED.quick_facts;


-- ════════════════════════════════════════════════════════════════
--  SEED: Stays
-- ════════════════════════════════════════════════════════════════
INSERT INTO stays (
  id, name, type, location, lat, lng,
  price, max_guests, rooms, rating, reviews_count,
  cover_image, images, amenities, description, about,
  nearby_attractions, check_in, check_out, rules,
  top_rated, verified, tags, status
) VALUES

(
  'bamboo-haven', 'Bamboo Haven Homestay', 'Homestay', 'Reiek Village, Mamit District',
  23.7152, 92.5694, 1800, 4, 2, 4.9, 47,
  'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80',
  ARRAY['https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80','https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&q=80','https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80'],
  ARRAY['WiFi','Parking','Home-cooked Food','Hot Water','Valley View','Bonfire'],
  'Nestled in traditional Mizo style on the slopes of Reiek Hill, Bamboo Haven offers an intimate, authentic experience.',
  'Liana and her family offer warm Mizo hospitality in their traditional home.',
  ARRAY['Reiek Heritage Village (5 min)','Hmuifang (45 min)','Aizawl (35 km)'],
  '14:00', '11:00',
  ARRAY['No smoking inside','Quiet hours after 10 PM','No outside food','Pets on request'],
  true, true, ARRAY['hidden-gem','budget-friendly'], 'approved'
),

(
  'champhai-farmstay', 'Champhai Valley Farmstay', 'Homestay', 'Champhai, Champhai District',
  23.4692, 93.3224, 1500, 4, 2, 4.6, 54,
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
  ARRAY['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80','https://images.unsplash.com/photo-1474978528675-4a50a4508dc4?w=800&q=80','https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80'],
  ARRAY['Organic Farm','Home-cooked Food','Fruit Picking','Valley View','Parking','Hot Water'],
  'Experience life on a working Mizo farm in the fruit bowl of Champhai.',
  'Mimi''s family has farmed this land for 3 generations. She loves sharing Mizo culture through food.',
  ARRAY['Myanmar border viewpoint','Champhai museum','Murlen National Park (2 hrs)'],
  '14:00', '11:00',
  ARRAY['Farm work is optional but encouraged','Organic produce only','Early breakfast at 7 AM'],
  false, true, ARRAY['farm-experience','budget-friendly'], 'approved'
),

(
  'tamdil-lakehouse', 'Tam Dil Lakehouse', 'Hotel', 'Tam Dil, Saitul District',
  23.6177, 92.8894, 3200, 2, 1, 4.9, 89,
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
  ARRAY['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80','https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80','https://images.unsplash.com/photo-1602343168117-bb8ded4c97a2?w=800&q=80'],
  ARRAY['Lakefront Room','Kayaking','WiFi','AC','Restaurant','Hot Water','Parking','Sunrise View'],
  'Perched right on the edge of the mirror-calm Tam Dil Lake, this boutique lakehouse offers Mizoram''s most romantic stay.',
  'Robert built this lakehouse himself, inspired by Scandinavian architecture and Mizo craftsmanship.',
  ARRAY['Tam Dil Lake (on property)','Tam Dil sanctuary','Saitul (30 min)'],
  '15:00', '11:00',
  ARRAY['Adults only','No loud parties','Checkout strictly at 11 AM'],
  true, true, ARRAY['romantic','lakefront','premium'], 'approved'
)

ON CONFLICT (id) DO NOTHING;


-- ════════════════════════════════════════════════════════════════
--  SEED: Guides
-- ════════════════════════════════════════════════════════════════
INSERT INTO guides (
  id, name, title, experience, languages, specialties,
  rating, reviews_count, price, price_unit, location,
  phone, email, cover_image, images, bio, certifications,
  verified, available, tags, status
) VALUES

(
  'guide-zova', 'Zova Lalchhuanawma', 'Expert Trekking & Wildlife Guide', '10 years',
  ARRAY['English','Mizo','Hindi'],
  ARRAY['Phawngpui Trek','Wildlife Spotting','Bird Watching','Photography Tours'],
  4.9, 88, 1500, 'per day', 'Aizawl (covers all districts)',
  '+91 98765 11111', 'zova.guide@lushaitrips.com',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
  ARRAY['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80','https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80','https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80'],
  'Born and raised in the highlands of Mizoram, Zova has led over 300 trekking expeditions across the Lushai Hills.',
  ARRAY['First Aid Certified','Wildlife Institute of India','Ministry of Tourism Certified'],
  true, true, ARRAY['trekking','wildlife','birding'], 'approved'
),

(
  'guide-mary', 'Mary Vanlalruati', 'Cultural & Heritage Tour Guide', '7 years',
  ARRAY['English','Mizo','Hindi','Bengali'],
  ARRAY['Aizawl City Tours','Mizo Culture','Traditional Weaving','Village Walks'],
  4.8, 62, 1200, 'per day', 'Aizawl',
  '+91 87654 22222', 'mary.guide@lushaitrips.com',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',
  ARRAY['https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80','https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80','https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80'],
  'Mary holds a Master''s degree in Mizo history and has been sharing her culture with visitors for 7 years.',
  ARRAY['Ministry of Tourism Certified','Heritage Interpreter (INTACH)'],
  true, true, ARRAY['culture','heritage','city-tour'], 'approved'
),

(
  'guide-rema', 'Rema Chhakchhuak', 'Adventure Sports & River Guide', '5 years',
  ARRAY['English','Mizo'],
  ARRAY['River Kayaking','Rappelling','Jungle Camping','Night Trekking'],
  4.7, 41, 1800, 'per day', 'Serchhip / South Mizoram',
  '+91 76543 33333', 'rema.guide@lushaitrips.com',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
  ARRAY['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80','https://images.unsplash.com/photo-1503264116251-35a269479413?w=800&q=80','https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80'],
  'Rema is the go-to guide for adrenaline seekers in Mizoram.',
  ARRAY['Swift Water Rescue Certified','Wilderness First Aid','Adventure Tourism Certified'],
  true, true, ARRAY['adventure','kayaking','camping'], 'approved'
)

ON CONFLICT (id) DO NOTHING;


-- ════════════════════════════════════════════════════════════════
--  SEED: Transport
-- ════════════════════════════════════════════════════════════════
INSERT INTO transport (
  id, name, owner_name, type, vehicles,
  rating, reviews_count, phone, email, location,
  cover_image, images, description, features,
  verified, available, status
) VALUES

(
  'transport-zara', 'Zara Mountain Bikes', 'Zaramsanga Colney', 'Motorcycle & Bike Rental',
  '[{"name":"Royal Enfield Himalayan","capacity":2,"price":1800,"priceUnit":"per day"},{"name":"Honda CB350","capacity":2,"price":1400,"priceUnit":"per day"},{"name":"Mountain Bicycle","capacity":1,"price":400,"priceUnit":"per day"}]'::jsonb,
  4.6, 38, '+91 87654 55555', 'zara.bikes@lushaitrips.com', 'Aizawl',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80','https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80','https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&q=80'],
  'Explore Mizoram the way it was meant to be explored — on two wheels.',
  ARRAY['Helmets Included','Riding Gear','Route Maps','Breakdown Assistance','Delivery to Hotel'],
  true, true, 'approved'
),

(
  'transport-lal', 'Lal Shared Sumo Service', 'Lalbiakzuala', 'Shared Sumo / Van',
  '[{"name":"Tata Sumo (Shared)","capacity":10,"price":350,"priceUnit":"per seat per route"},{"name":"Force Traveller Van","capacity":16,"price":4500,"priceUnit":"per day (private)"}]'::jsonb,
  4.4, 55, '+91 76543 66666', 'lal.sumo@lushaitrips.com', 'Aizawl (all major routes)',
  'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80',
  ARRAY['https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80','https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?w=800&q=80','https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80'],
  'Budget-friendly shared Sumo services connect all major towns and tourist spots.',
  ARRAY['Budget Friendly','All Major Routes','Daily Departures','Group Discounts','Private Option'],
  true, true, 'approved'
)

ON CONFLICT (id) DO NOTHING;
