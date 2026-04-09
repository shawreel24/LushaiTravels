// ══════════════════════════════════════════════════════════════
//  src/lib/supabase.js — Single Supabase client for LushaiTravels
// ══════════════════════════════════════════════════════════════
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON) {
  console.error('[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// ── Auth Helpers ──────────────────────────────────────────────

/** Returns the currently logged-in Supabase user (or null) */
export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

/** Returns the auth user + their profile row merged together */
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  return profile ? { ...user, ...profile } : user;
}

/** Sign up with email + password; inserts profile row afterward */
export async function signUpEmail({ email, password, fullName, phone }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
  if (error) throw error;

  // upsert profile (trigger also does it, but be safe)
  if (data.user) {
    await supabase.from('profiles').upsert({
      id: data.user.id,
      full_name: fullName,
      phone,
      role: 'user',
    });
  }
  return data;
}

/** Sign in with email + password */
export async function signInEmail({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

/** Sign in / sign up with Google OAuth */
export async function signInGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + import.meta.env.BASE_URL,
    },
  });
  if (error) throw error;
}

/** Sign out */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) console.warn('[signOut]', error.message);
}

/** Send a phone OTP via SMS. phone must be E.164 e.g. +919876543210 */
export async function sendPhoneOtp(phone) {
  const { error } = await supabase.auth.signInWithOtp({ phone });
  if (error) throw error;
}

/**
 * Verify the OTP received by SMS.
 * Creates/signs-in the user and optionally upserts a profile row.
 * @param {string} phone  - E.164 phone number
 * @param {string} token  - 6-digit OTP
 * @param {object} [profile] - optional { full_name } to store
 */
export async function verifyPhoneOtp(phone, token, profile = {}) {
  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: 'sms',
  });
  if (error) throw error;

  // Upsert profile row (creates it for new users, updates for returning)
  const user = data?.user;
  if (user) {
    await supabase.from('profiles').upsert({
      id:        user.id,
      phone:     phone,
      full_name: profile.full_name || user.user_metadata?.full_name || '',
      role:      'user',
    });
  }
  return data;
}

// ── Destinations ──────────────────────────────────────────────

export async function fetchDestinations(category = 'all') {
  let q = supabase.from('destinations').select('*').order('rating', { ascending: false });
  if (category && category !== 'all') q = q.eq('category', category);
  const { data, error } = await q;
  if (error) throw error;
  return data || [];
}

export async function fetchDestinationById(id) {
  const { data, error } = await supabase.from('destinations').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

// ── Stays ─────────────────────────────────────────────────────

export async function fetchStays(type = 'all') {
  let q = supabase.from('stays').select('*').eq('status', 'approved').order('top_rated', { ascending: false });
  if (type && type !== 'all') q = q.ilike('type', type);
  const { data, error } = await q;
  if (error) throw error;
  return data || [];
}

export async function fetchStayById(id) {
  const { data, error } = await supabase.from('stays').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

// ── Guides ────────────────────────────────────────────────────

export async function fetchGuides() {
  const { data, error } = await supabase.from('guides').select('*').eq('status', 'approved').order('rating', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function fetchGuideById(id) {
  const { data, error } = await supabase.from('guides').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

// ── Transport ─────────────────────────────────────────────────

export async function fetchTransport() {
  const { data, error } = await supabase.from('transport').select('*').eq('status', 'approved').order('rating', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function fetchTransportById(id) {
  const { data, error } = await supabase.from('transport').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

// ── Bookings ──────────────────────────────────────────────────

export async function createBooking(booking) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('You must be logged in to book');
  const row = {
    user_id:       user.id,
    listing_id:    booking.listingId,
    listing_name:  booking.listingName,
    listing_type:  booking.listingType,
    checkin:       booking.checkin || null,
    checkout:      booking.checkout || null,
    guests:        parseInt(booking.guests) || 1,
    total:         booking.total,
    guest_name:    booking.guestName,
    guest_email:   booking.guestEmail,
    guest_phone:   booking.guestPhone,
    notes:         booking.notes || '',
    payment_id:    booking.razorpayPaymentId || null,
    status:        'confirmed',
  };
  const { data, error } = await supabase.from('bookings').insert(row).select().single();
  if (error) throw error;
  // store last booking for confirmation page
  localStorage.setItem('lt_last_booking', JSON.stringify(data));
  return data;
}

export async function getUserBookings() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data, error } = await supabase.from('bookings').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export function getLastBooking() {
  try { return JSON.parse(localStorage.getItem('lt_last_booking')); } catch { return null; }
}

// ── Host Listings ─────────────────────────────────────────────

export async function insertStay(data) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not logged in');
  const { data: row, error } = await supabase.from('stays').insert({ ...data, host_id: user.id, status: 'approved' }).select().single();
  if (error) throw error;
  return row;
}

export async function insertGuide(data) {
  const hostId = data?.host_id || null;
  const payload = { ...data };
  delete payload.host_id;

  const effectiveHostId = hostId || (await supabase.auth.getUser()).data?.user?.id || null;
  if (!effectiveHostId) throw new Error('Not logged in');

  const { data: row, error } = await supabase.from('guides').insert({ ...payload, host_id: effectiveHostId, status: 'approved' }).select().single();
  if (error) throw error;
  return row;
}

export async function insertTransport(data) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not logged in');
  const { data: row, error } = await supabase.from('transport').insert({ ...data, host_id: user.id, status: 'approved' }).select().single();
  if (error) throw error;
  return row;
}

/**
 * Uploads a File or Blob directly to Supabase Storage and returns the public URL.
 * Throws on failure — do NOT silently fall back to base64 (causes DB payload overflow).
 * @param {File|Blob} file  - the file to upload
 * @param {string} bucket   - storage bucket name
 * @returns {Promise<string>} public URL
 */
export async function uploadFileToStorage(file, bucket = 'guide-images') {
  const ext = file.type.includes('png') ? 'png' : 'jpg';
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, { contentType: file.type, upsert: true });

  if (error) throw new Error(`Image upload failed: ${error.message}`);

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
  return urlData.publicUrl;
}

/** @deprecated — use uploadFileToStorage instead */
export async function uploadImageToStorage(dataUrl, bucket = 'guide-images') {
  try {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return uploadFileToStorage(blob, bucket);
  } catch (e) {
    throw new Error(`Image upload failed: ${e.message}`);
  }
}

export async function getHostListings(hostId = null) {
  const effectiveHostId = hostId || (await supabase.auth.getUser()).data?.user?.id || null;
  if (!effectiveHostId) return { stays: [], guides: [], transport: [] };
  const [s, g, t] = await Promise.all([
    supabase.from('stays').select('*').eq('host_id', effectiveHostId),
    supabase.from('guides').select('*').eq('host_id', effectiveHostId),
    supabase.from('transport').select('*').eq('host_id', effectiveHostId),
  ]);
  if (s.error) throw s.error;
  if (g.error) throw g.error;
  if (t.error) throw t.error;
  return { stays: s.data || [], guides: g.data || [], transport: t.data || [] };
}

// ── Reviews ───────────────────────────────────────────────────

export async function fetchReviews(listingId) {
  const { data, error } = await supabase.from('reviews').select('*').eq('listing_id', listingId).order('created_at', { ascending: false });
  if (error) return [];
  return data || [];
}

export async function addReview({ listingId, listingType, rating, comment }) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Login required');
  const profile = await getCurrentUser();
  const { data, error } = await supabase.from('reviews').insert({
    user_id: user.id,
    listing_id: listingId,
    listing_type: listingType,
    rating,
    comment,
    reviewer_name: profile?.full_name || 'Guest',
  }).select().single();
  if (error) throw error;
  return data;
}

// ── Wishlist (local, no auth required) ───────────────────────

export function getWishlist() {
  try { return JSON.parse(localStorage.getItem('lt_wishlist')) || []; } catch { return []; }
}
export function toggleWishlist(id) {
  const list = getWishlist();
  const idx = list.indexOf(id);
  if (idx === -1) list.push(id); else list.splice(idx, 1);
  localStorage.setItem('lt_wishlist', JSON.stringify(list));
  return list.includes(id);
}
export function isWishlisted(id) { return getWishlist().includes(id); }
