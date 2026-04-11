import { createClient } from '@supabase/supabase-js';
import { destinationsContent } from './src/data/destinations-content.js';

const SUPABASE_URL = 'https://icgjldvgvtesoehtoinf.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljZ2psZHZndnRlc29laHRvaW5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNTIxNDgsImV4cCI6MjA5MDYyODE0OH0.tQ3p31mZMMS9dUw_bCYEF1q2svVo1QXRsX7DyKRfAxE';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

async function run() {
  const destination = destinationsContent.find(d => d.id === 'paithar-tlang');
  if (!destination) {
    console.log("Could not find Paithar Tlang in local destinations array");
    return;
  }
  
  // Create row matching Supabase camel/snake cases handling. We'll use snake_case for DB columns.
  const row = {
    id: destination.id,
    name: destination.name,
    tagline: destination.tagline,
    type: destination.type,
    tags: destination.tags,
    difficulty: destination.difficulty,
    district: destination.district,
    lat: destination.lat,
    lng: destination.lng,
    rating: destination.rating,
    reviews: destination.reviews,
    cover_image: destination.coverImage,
    images: destination.images,
    description: destination.description,
    highlights: destination.highlights,
    best_time: destination.bestTime,
    nearby_attractions: destination.nearbyAttractions,
    duration: destination.duration,
    category: destination.category,
    quick_facts: JSON.stringify(destination.quickFacts), // Keep this stringified because it's an array of objects which implies jsonb, but earlier it said malformed array literal so maybe arrays are fine. Let's see. Wait, quick_facts is JSON in the store.
  };

  const { data, error } = await supabase.from('destinations').upsert([row]).select();
  if (error) {
    console.error("Error inserting:", error);
  } else {
    console.log("Successfully inserted to Supabase!");
  }
}

run();
