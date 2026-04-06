// ── Supabase helpers (imported at top as required by ES modules) ──
import {
  getCurrentUser as _getUser,
  signOut        as _signOut,
  getWishlist    as _getWishlist,
  toggleWishlist as _toggleWishlist,
  isWishlisted   as _isWishlisted,
  getLastBooking as _getLastBooking,
  fetchReviews   as _getReviews,
  addReview      as _addReview,
} from './lib/supabase.js';

// ── Base URL ──────────────────────────────────────────────────
export function appHref(appPath) {
  const path = appPath.startsWith('/') ? appPath : `/${appPath}`;
  if (path === '/') return import.meta.env.BASE_URL;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}

export function getRoutePathname(fullPathname) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (!base) return fullPathname || '/';
  if (fullPathname === base || fullPathname === `${base}/`) return '/';
  if (fullPathname.startsWith(`${base}/`)) return fullPathname.slice(base.length) || '/';
  return fullPathname || '/';
}

// ── Auth — thin wrappers over Supabase ───────────────────────
// getCurrentUser() reads from localStorage cache (sync) so pages
// don't need to await. Cache is populated by refreshUserCache().
export function getCurrentUser() {
  try {
    const raw = localStorage.getItem('sb_cached_user');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function isLoggedIn() { return !!getCurrentUser(); }
export function isHost()     { return getCurrentUser()?.role === 'host'; }

export async function logout() {
  try {
    await _signOut();
  } catch (e) {
    console.warn('[logout] Supabase signOut error (ignored):', e.message);
  }
  // Clear ALL possible session storage keys
  localStorage.removeItem('sb_cached_user');
  // Clear any Supabase auth tokens that may remain
  Object.keys(localStorage)
    .filter(k => k.startsWith('sb-') || k.startsWith('supabase.'))
    .forEach(k => localStorage.removeItem(k));
  // Use location.replace so the browser fully reloads the page,
  // which guarantees a clean state (no stale navbar, no race conditions).
  const homeUrl = import.meta.env.BASE_URL || '/';
  window.location.replace(homeUrl);
}

// Populates the localStorage cache from a live Supabase session.
// Called on boot and after login/signup.
export async function refreshUserCache() {
  try {
    const user = await _getUser();
    if (user) {
      localStorage.setItem('sb_cached_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sb_cached_user');
    }
    return user;
  } catch (e) {
    console.warn('[refreshUserCache]', e.message);
    return null;
  }
}

// ── Wishlist (localStorage, no auth required) ─────────────────
export function getWishlist()        { return _getWishlist(); }
export function toggleWishlist(id)   { return _toggleWishlist(id); }
export function isWishlisted(id)     { return _isWishlisted(id); }

// ── Bookings ──────────────────────────────────────────────────
export function getLastBooking() { return _getLastBooking(); }

// ── Reviews ───────────────────────────────────────────────────
// stay-detail.js and destination-detail.js call these synchronously
// but they are async — pages that call them must await
export async function getReviews(listingId) { return _getReviews(listingId); }
export async function addReview(data) {
  // Adapt old signature { listingId, rating, text, userName } to new Supabase shape
  return _addReview({
    listingId:   data.listingId,
    listingType: data.listingType || 'stay',
    rating:      data.rating,
    comment:     data.text || data.comment,
  });
}

// ── registerHost — stub for host-signup-guide & transport ─────
// Those pages still import this; the actual Supabase call happens inside them
export function registerHost() {
  throw new Error('registerHost is deprecated. Use Supabase auth + insertStay/insertGuide/insertTransport instead.');
}

// ── Toast ─────────────────────────────────────────────────────
export function showToast(title, msg = '', type = 'success') {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.className = `toast ${type}`;
  t.innerHTML = `<div class="toast-title">${type === 'success' ? '✅' : '❌'} ${title}</div>${msg ? `<div class="toast-msg">${msg}</div>` : ''}`;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4000);
}

// ── Stars HTML ────────────────────────────────────────────────
export function starsHTML(rating) {
  return Array.from({ length: 5 }, (_, i) =>
    `<span style="color:${i < Math.round(rating) ? '#fbbf24' : '#334155'};font-size:0.9rem">★</span>`
  ).join('');
}

// ── Average Rating ────────────────────────────────────────────
export function calcAvgRating(reviews) {
  if (!reviews.length) return 0;
  return (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
}

// ── Scroll to top ─────────────────────────────────────────────
export function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
