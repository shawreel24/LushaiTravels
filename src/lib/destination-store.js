// ══════════════════════════════════════════════════════════════
//  src/lib/destination-store.js
//  Hybrid strategy: local data renders INSTANTLY, Supabase updates
//  silently in the background. No cold-start hangs.
// ══════════════════════════════════════════════════════════════
import { categories, destinations as localDestinations, resolveDestinationRecord } from '../data/destinations.js';
import { fetchDestinationById, fetchDestinations } from './supabase.js';

// Seed the cache immediately with local data so the first render is instant
let destinationListCache = localDestinations;
let backgroundFetchDone = false;

const SUPABASE_TIMEOUT_MS = 5000;

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)),
  ]);
}

function parseArrayField(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value !== 'string') return [];
  const trimmed = value.trim();
  if (!trimmed) return [];
  try {
    const parsed = JSON.parse(trimmed);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return trimmed.split(',').map((item) => item.trim()).filter(Boolean);
  }
}

function parseQuickFacts(value) {
  if (Array.isArray(value)) return value.filter((item) => item?.label && item?.value);
  if (typeof value !== 'string') return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item) => item?.label && item?.value) : [];
  } catch {
    return [];
  }
}

function mapDatabaseDestination(row = {}) {
  return {
    id: row.id || '',
    name: row.name || '',
    tagline: row.tagline || '',
    type: row.type || '',
    tags: parseArrayField(row.tags),
    difficulty: row.difficulty || '',
    district: row.district || '',
    lat: row.lat == null ? null : Number(row.lat),
    lng: row.lng == null ? null : Number(row.lng),
    rating: row.rating == null ? 0 : Number(row.rating),
    reviews: row.reviews == null ? 0 : Number(row.reviews),
    coverImage: row.coverImage || row.cover_image || '',
    images: parseArrayField(row.images),
    description: row.description || '',
    highlights: parseArrayField(row.highlights),
    bestTime: row.bestTime || row.best_time || '',
    nearbyAttractions: parseArrayField(row.nearbyAttractions || row.nearby_attractions),
    duration: row.duration || '',
    category: row.category || '',
    quickFacts: parseQuickFacts(row.quickFacts || row.quick_facts),
  };
}

function normalizeDestinationRecord(record) {
  return {
    ...resolveDestinationRecord(record),
    tags: parseArrayField(record.tags),
    images: parseArrayField(record.images).map(
      (image) => resolveDestinationRecord({ coverImage: image, images: [] }).coverImage
    ),
    highlights: parseArrayField(record.highlights),
    nearbyAttractions: parseArrayField(record.nearbyAttractions),
    quickFacts: parseQuickFacts(record.quickFacts),
  };
}

function mergeWithFallback(record) {
  const fallback = localDestinations.find((item) => item.id === record.id) || {};
  return normalizeDestinationRecord({
    ...fallback,
    ...record,
    tags: record.tags?.length ? record.tags : fallback.tags,
    images: record.images?.length ? record.images : fallback.images,
    highlights: record.highlights?.length ? record.highlights : fallback.highlights,
    nearbyAttractions: record.nearbyAttractions?.length ? record.nearbyAttractions : fallback.nearbyAttractions,
    quickFacts: record.quickFacts?.length ? record.quickFacts : fallback.quickFacts,
  });
}

/**
 * Returns destinations instantly (local data), then fires a background
 * Supabase refresh. Callers can pass an onUpdate callback to re-render
 * when fresh data arrives.
 */
export function loadDestinations({ onUpdate } = {}) {
  // Always return the current cache synchronously (starts as local data)
  const current = destinationListCache;

  // Fire background fetch only once
  if (!backgroundFetchDone) {
    backgroundFetchDone = true;
    withTimeout(fetchDestinations(), SUPABASE_TIMEOUT_MS)
      .then((rows) => {
        if (rows && rows.length > 0) {
          destinationListCache = rows.map((row) => mergeWithFallback(mapDatabaseDestination(row)));
          console.log(`[destinations] Supabase loaded ${rows.length} destinations`);
          if (typeof onUpdate === 'function') onUpdate(destinationListCache);
        }
      })
      .catch((err) => {
        console.warn('[destinations] Supabase fetch failed, using local data:', err?.message || err);
      });
  }

  return current;
}

/**
 * Load a single destination by ID.
 * Checks cache first, then tries Supabase with timeout, then falls back to local.
 */
export async function loadDestinationById(id) {
  // Check cache (may already have Supabase data)
  const cached = destinationListCache?.find((item) => item.id === id);
  if (cached) return cached;

  // Try Supabase with timeout
  try {
    const row = await withTimeout(fetchDestinationById(id), SUPABASE_TIMEOUT_MS);
    if (row) return mergeWithFallback(mapDatabaseDestination(row));
  } catch (error) {
    console.warn(`[destinations] ${id} Supabase fetch failed, using local:`, error?.message || error);
  }

  // Fall back to local JS data
  return localDestinations.find((item) => item.id === id) || null;
}

export function getDestinationCategories() {
  return categories;
}
