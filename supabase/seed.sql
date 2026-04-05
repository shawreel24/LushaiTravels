-- ═══════════════════════════════════════════════════════════════
--  LushaiTravels — RESET + SEED (All-in-one)
--  This drops existing listing tables and recreates them correctly,
--  then inserts all seed data.
--  Safe to run multiple times.
-- ═══════════════════════════════════════════════════════════════

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Drop old tables (cascade to remove dependent policies) ────
DROP TABLE IF EXISTS reviews   CASCADE;
DROP TABLE IF EXISTS bookings  CASCADE;
DROP TABLE IF EXISTS transport CASCADE;
DROP TABLE IF EXISTS guides    CASCADE;
DROP TABLE IF EXISTS stays     CASCADE;
DROP TABLE IF EXISTS destinations CASCADE;
-- NOTE: We do NOT drop profiles or auth triggers

-- ══════════════════════════════════════════════
--  TABLE: destinations
-- ══════════════════════════════════════════════
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
CREATE POLICY "stays: host manage own"      ON stays FOR ALL   USING (auth.uid() = host_id);

-- ══════════════════════════════════════════════
--  TABLE: guides
-- ══════════════════════════════════════════════
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
CREATE POLICY "guides: host manage own"      ON guides FOR ALL   USING (auth.uid() = host_id);

-- ══════════════════════════════════════════════
--  TABLE: transport
-- ══════════════════════════════════════════════
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
CREATE POLICY "transport: host manage own"      ON transport FOR ALL   USING (auth.uid() = host_id);

-- ══════════════════════════════════════════════
--  TABLE: bookings
-- ══════════════════════════════════════════════
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

-- ══════════════════════════════════════════════
--  TABLE: reviews
-- ══════════════════════════════════════════════
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
--  SEED DATA
-- ════════════════════════════════════════════════════════════════

-- ── Destinations ─────────────────────────────────────────────
INSERT INTO destinations (id, name, tagline, type, tags, difficulty, district, lat, lng, rating, reviews, cover_image, images, description, highlights, best_time, nearby_attractions, duration, category) VALUES

('vantawng-falls','Vantawng Falls','India''s tallest waterfall in Mizoram','waterfall',
 '{"adventure","nature","waterfall"}','Moderate','Serchhip',23.0932,92.7534,4.8,124,
 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
 '{"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80","https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80","https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=800&q=80"}',
 'Vantawng Falls, plunging 750 feet into a deep gorge, is the tallest waterfall in Mizoram and one of the most spectacular in Northeast India.',
 '{"750-ft plunge pool","Jungle trek","Wildlife sightings","Photography paradise"}',
 'October – March','{"Serchhip town","Tuirial River","Local bamboo villages"}','1-2 days','adventure'),

('phawngpui-peak','Phawngpui Peak','Blue Mountain — the highest point in Mizoram','mountain',
 '{"adventure","trekking","scenic"}','Hard','Lawngtlai',22.4869,93.0248,4.9,87,
 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
 '{"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80","https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80","https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&q=80"}',
 'Standing at 2,157 metres, Phawngpui (Blue Mountain) is the highest peak in Mizoram, offering breathtaking panoramic views of Myanmar.',
 '{"Sunrise panoramas","Rare orchid species","Wildlife viewing","Cloud sea views"}',
 'November – February','{"Phawngpui National Park","Sangau border outpost"}','2-3 days','adventure'),

('tam-dil-lake','Tam Dil Lake','Mirror-still lake in a pine-forested valley','lake',
 '{"relaxation","nature","lake"}','Easy','Saitual',23.6177,92.8894,4.6,93,
 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
 '{"https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80","https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=800&q=80","https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80"}',
 'Tam Dil Lake is a serene natural lake nested among tall pine trees, perfect for boating or simply relaxing in nature.',
 '{"Boating","Picnic spots","Pine forest walks","Photography"}',
 'Year-round (best Sep – Mar)','{"Saitual town","Kelkang","Aizawl (85 km)"}','1 day','relaxation'),

('reiek-tlang','Reiek Tlang','Rolling hills with traditional Mizo heritage village','hill',
 '{"culture","nature","relaxation"}','Easy','Mamit',23.7152,92.5694,4.5,78,
 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
 '{"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80","https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80","https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=800&q=80"}',
 'Reiek Tlang is a picturesque hill retreat just 30 km from Aizawl, home to a reconstructed traditional Mizo village and breathtaking hillside views.',
 '{"Traditional Mizo village","Hiking trails","Sunrise views","Cultural exhibits"}',
 'October – April','{"Aizawl","Hmuifang","Durtlang Hills"}','1 day','culture'),

('palak-dil','Palak Dil Lake','Mizoram''s largest natural lake, ringed by jungle','lake',
 '{"nature","wildlife","relaxation"}','Easy','Saiha',22.1627,92.9261,4.7,56,
 'https://images.unsplash.com/photo-1503264116251-35a269479413?w=800&q=80',
 '{"https://images.unsplash.com/photo-1503264116251-35a269479413?w=800&q=80","https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80","https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=800&q=80"}',
 'Palak Dil, Mizoram''s largest natural lake, lies near the Myanmar border surrounded by dense subtropical forest.',
 '{"Bird watching","Boat rides","Wildlife","Remote wilderness"}',
 'November – February','{"Saiha town","Phawngpui (nearby)"}','2 days','relaxation'),

('champhai','Champhai Valley','The fruit bowl of Mizoram with stunning valley views','valley',
 '{"nature","culture","relaxation"}','Easy','Champhai',23.4692,93.3224,4.6,102,
 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
 '{"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80","https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80","https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&q=80"}',
 'Champhai is known as the "Rice Bowl of Mizoram" and sits at the gateway to Myanmar.',
 '{"Valley views","Fruit orchards","Museum","Myanmar border"}',
 'October – March','{"Rih Dil Lake (Myanmar)","Murlen National Park","Tamdil"}','2-3 days','relaxation'),

('murlen-national-park','Murlen National Park','One of Northeast India''s finest biodiversity hotspots','wildlife',
 '{"wildlife","adventure","nature"}','Moderate','Champhai',23.6500,93.3500,4.8,43,
 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
 '{"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80","https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80","https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=800&q=80"}',
 'Murlen National Park spans over 100 sq km of pristine forest, home to leopards, clouded leopards, gibbons, and over 150 bird species.',
 '{"Leopard habitat","Hornbill spotting","Jungle camping","Bird watching"}',
 'November – April','{"Champhai","Phawngpui Peak"}','2-3 days','adventure'),

('aizawl-city','Aizawl City','The hilltop capital — where Mizoram''s heart beats','city',
 '{"culture","food","relaxation"}','Easy','Aizawl',23.7271,92.7176,4.5,211,
 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
 '{"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80","https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80","https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80"}',
 'Aizawl, perched dramatically on ridges at 1,132 m elevation, is one of India''s most unique capital cities.',
 '{"Bara Bazar","Mizo cuisine","State Museum","Durtlang Hills"}',
 'Year-round','{"Reiek Tlang","Hmuifang","Tam Dil Lake"}','2-3 days','culture')

ON CONFLICT (id) DO NOTHING;

-- ── Stays ─────────────────────────────────────────────────────
INSERT INTO stays (id, name, type, location, lat, lng, price, max_guests, rooms, rating, reviews_count, cover_image, images, amenities, description, about, nearby_attractions, check_in, check_out, rules, top_rated, verified, tags, status) VALUES

('bamboo-haven','Bamboo Haven Homestay','Homestay','Reiek Village, Mamit District',23.7152,92.5694,1800,4,2,4.9,47,
 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80',
 '{"https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80","https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&q=80","https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80"}',
 '{"WiFi","Parking","Home-cooked Food","Hot Water","Valley View","Bonfire"}',
 'Nestled in traditional Mizo style on the slopes of Reiek Hill, Bamboo Haven offers an intimate, authentic experience.',
 'Liana and her family offer warm Mizo hospitality in their traditional home.',
 '{"Reiek Heritage Village (5 min)","Hmuifang (45 min)","Aizawl (35 km)"}',
 '14:00','11:00',
 '{"No smoking inside","Quiet hours after 10 PM","No outside food","Pets on request"}',
 true,true,'{"hidden-gem","budget-friendly"}','approved'),

('champhai-farmstay','Champhai Valley Farmstay','Homestay','Champhai, Champhai District',23.4692,93.3224,1500,4,2,4.6,54,
 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
 '{"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80","https://images.unsplash.com/photo-1474978528675-4a50a4508dc4?w=800&q=80","https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80"}',
 '{"Organic Farm","Home-cooked Food","Fruit Picking","Valley View","Parking","Hot Water"}',
 'Experience life on a working Mizo farm in the fruit bowl of Champhai.',
 'Mimi''s family has farmed this land for 3 generations. She loves sharing Mizo culture through food.',
 '{"Myanmar border viewpoint","Champhai museum","Murlen National Park (2 hrs)"}',
 '14:00','11:00',
 '{"Farm work is optional but encouraged","Organic produce only","Early breakfast at 7 AM"}',
 false,true,'{"farm-experience","budget-friendly"}','approved'),

('tamdil-lakehouse','Tam Dil Lakehouse','Hotel','Tam Dil, Saitul District',23.6177,92.8894,3200,2,1,4.9,89,
 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
 '{"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80","https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80","https://images.unsplash.com/photo-1602343168117-bb8ded4c97a2?w=800&q=80"}',
 '{"Lakefront Room","Kayaking","WiFi","AC","Restaurant","Hot Water","Parking","Sunrise View"}',
 'Perched right on the edge of the mirror-calm Tam Dil Lake, this boutique lakehouse offers Mizoram''s most romantic stay.',
 'Robert built this lakehouse himself, inspired by Scandinavian architecture and Mizo craftsmanship.',
 '{"Tam Dil Lake (on property)","Tam Dil sanctuary","Saitul (30 min)"}',
 '15:00','11:00',
 '{"Adults only","No loud parties","Checkout strictly at 11 AM"}',
 true,true,'{"romantic","lakefront","premium"}','approved')

ON CONFLICT (id) DO NOTHING;

-- ── Guides ────────────────────────────────────────────────────
INSERT INTO guides (id, name, title, experience, languages, specialties, rating, reviews_count, price, price_unit, location, phone, email, cover_image, images, bio, certifications, verified, available, tags, status) VALUES

('guide-zova','Zova Lalchhuanawma','Expert Trekking & Wildlife Guide','10 years',
 '{"English","Mizo","Hindi"}',
 '{"Phawngpui Trek","Wildlife Spotting","Bird Watching","Photography Tours"}',
 4.9,88,1500,'per day','Aizawl (covers all districts)',
 '+91 98765 11111','zova.guide@lushaitrips.com',
 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
 '{"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80","https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80","https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80"}',
 'Born and raised in the highlands of Mizoram, Zova has led over 300 trekking expeditions across the Lushai Hills.',
 '{"First Aid Certified","Wildlife Institute of India","Ministry of Tourism Certified"}',
 true,true,'{"trekking","wildlife","birding"}','approved'),

('guide-mary','Mary Vanlalruati','Cultural & Heritage Tour Guide','7 years',
 '{"English","Mizo","Hindi","Bengali"}',
 '{"Aizawl City Tours","Mizo Culture","Traditional Weaving","Village Walks"}',
 4.8,62,1200,'per day','Aizawl',
 '+91 87654 22222','mary.guide@lushaitrips.com',
 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',
 '{"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80","https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80","https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80"}',
 'Mary holds a Master''s degree in Mizo history and has been sharing her culture with visitors for 7 years.',
 '{"Ministry of Tourism Certified","Heritage Interpreter (INTACH)"}',
 true,true,'{"culture","heritage","city-tour"}','approved'),

('guide-rema','Rema Chhakchhuak','Adventure Sports & River Guide','5 years',
 '{"English","Mizo"}',
 '{"River Kayaking","Rappelling","Jungle Camping","Night Trekking"}',
 4.7,41,1800,'per day','Serchhip / South Mizoram',
 '+91 76543 33333','rema.guide@lushaitrips.com',
 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
 '{"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80","https://images.unsplash.com/photo-1503264116251-35a269479413?w=800&q=80","https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80"}',
 'Rema is the go-to guide for adrenaline seekers in Mizoram.',
 '{"Swift Water Rescue Certified","Wilderness First Aid","Adventure Tourism Certified"}',
 true,true,'{"adventure","kayaking","camping"}','approved')

ON CONFLICT (id) DO NOTHING;

-- ── Transport ─────────────────────────────────────────────────
INSERT INTO transport (id, name, owner_name, type, vehicles, rating, reviews_count, phone, email, location, cover_image, images, description, features, verified, available, status) VALUES

('transport-raj','Raj Mizoram Travels','Rajesh Chhakchhuak','Car & SUV Rental',
 '[{"name":"Toyota Innova Crysta","capacity":7,"price":3500,"priceUnit":"per day (fuel incl.)"},{"name":"Maruti Ertiga","capacity":7,"price":2500,"priceUnit":"per day (fuel incl.)"},{"name":"Mahindra Bolero","capacity":9,"price":3000,"priceUnit":"per day (fuel incl.)"}]',
 4.8,76,'+91 98765 44444','raj.travels@lushaitrips.com','Aizawl (airport pickup available)',
 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
 '{"https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80","https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80","https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?w=800&q=80"}',
 'Raj Mizoram Travels offers reliable, comfortable transport across Mizoram''s mountain roads.',
 '{"Airport Pickup","AC Vehicles","Experienced Drivers","Night Driving","All Districts"}',
 true,true,'approved'),

('transport-zara','Zara Mountain Bikes','Zaramsanga Colney','Motorcycle & Bike Rental',
 '[{"name":"Royal Enfield Himalayan","capacity":2,"price":1800,"priceUnit":"per day"},{"name":"Honda CB350","capacity":2,"price":1400,"priceUnit":"per day"},{"name":"Mountain Bicycle","capacity":1,"price":400,"priceUnit":"per day"}]',
 4.6,38,'+91 87654 55555','zara.bikes@lushaitrips.com','Aizawl',
 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
 '{"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80","https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80","https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&q=80"}',
 'Explore Mizoram the way it was meant to be explored — on two wheels.',
 '{"Helmets Included","Riding Gear","Route Maps","Breakdown Assistance","Delivery to Hotel"}',
 true,true,'approved'),

('transport-lal','Lal Shared Sumo Service','Lalbiakzuala','Shared Sumo / Van',
 '[{"name":"Tata Sumo (Shared)","capacity":10,"price":350,"priceUnit":"per seat per route"},{"name":"Force Traveller Van","capacity":16,"price":4500,"priceUnit":"per day (private)"}]',
 4.4,55,'+91 76543 66666','lal.sumo@lushaitrips.com','Aizawl (all major routes)',
 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80',
 '{"https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80","https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?w=800&q=80","https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80"}',
 'Budget-friendly shared Sumo services connect all major towns and tourist spots.',
 '{"Budget Friendly","All Major Routes","Daily Departures","Group Discounts","Private Option"}',
 true,true,'approved')

ON CONFLICT (id) DO NOTHING;
