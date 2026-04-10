-- ═══════════════════════════════════════════════════════════════
--  MIGRATION: Add quick_facts column + upsert all 12 destinations
--  Run this on a LIVE DB — does NOT drop any tables.
--  Safe to run multiple times.
-- ═══════════════════════════════════════════════════════════════

-- 1. Add quick_facts column if it doesn't exist yet
ALTER TABLE destinations
  ADD COLUMN IF NOT EXISTS quick_facts JSONB DEFAULT '[]';

-- 2. Upsert all 12 destinations (INSERT … ON CONFLICT DO UPDATE)
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
