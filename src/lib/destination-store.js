import { categories, destinations as fallbackDestinations, resolveDestinationRecord } from '../data/destinations.js';
import { fetchDestinationById, fetchDestinations } from './supabase.js';

let destinationListCache = null;
let destinationListPromise = null;

function parseArrayField(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value !== 'string') return [];

  const trimmed = value.trim();
  if (!trimmed) return [];

  try {
    const parsed = JSON.parse(trimmed);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return trimmed
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
}

function parseQuickFacts(value) {
  if (Array.isArray(value)) {
    return value.filter((item) => item?.label && item?.value);
  }
  if (typeof value !== 'string') return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((item) => item?.label && item?.value)
      : [];
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
    images: parseArrayField(record.images).map((image) => resolveDestinationRecord({ coverImage: image, images: [] }).coverImage),
    highlights: parseArrayField(record.highlights),
    nearbyAttractions: parseArrayField(record.nearbyAttractions),
    quickFacts: parseQuickFacts(record.quickFacts),
  };
}

function mergeWithFallback(record) {
  const fallback = fallbackDestinations.find((item) => item.id === record.id) || {};
  const normalized = normalizeDestinationRecord({
    ...fallback,
    ...record,
    tags: record.tags?.length ? record.tags : fallback.tags,
    images: record.images?.length ? record.images : fallback.images,
    highlights: record.highlights?.length ? record.highlights : fallback.highlights,
    nearbyAttractions: record.nearbyAttractions?.length ? record.nearbyAttractions : fallback.nearbyAttractions,
    quickFacts: record.quickFacts?.length ? record.quickFacts : fallback.quickFacts,
  });

  return normalized;
}

async function fetchDatabaseDestinations() {
  const rows = await fetchDestinations();
  return rows.map((row) => mergeWithFallback(mapDatabaseDestination(row)));
}

export async function loadDestinations({ force = false } = {}) {
  if (!force && destinationListCache) return destinationListCache;
  if (!force && destinationListPromise) return destinationListPromise;

  destinationListPromise = (async () => {
    try {
      const rows = await fetchDatabaseDestinations();
      destinationListCache = rows.length ? rows : fallbackDestinations;
    } catch (error) {
      console.warn('[destinations] falling back to local data:', error?.message || error);
      destinationListCache = fallbackDestinations;
    } finally {
      destinationListPromise = null;
    }

    return destinationListCache;
  })();

  return destinationListPromise;
}

export async function loadDestinationById(id) {
  const cached = destinationListCache?.find((item) => item.id === id);
  if (cached) return cached;

  try {
    const row = await fetchDestinationById(id);
    if (row) return mergeWithFallback(mapDatabaseDestination(row));
  } catch (error) {
    console.warn(`[destinations] destination ${id} fallback:`, error?.message || error);
  }

  const list = await loadDestinations();
  return list.find((item) => item.id === id) || null;
}

export function getDestinationCategories() {
  return categories;
}
