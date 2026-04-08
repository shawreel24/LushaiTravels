// ── Base URL (Vite: '/' in dev, '/LushaiTravels/' on GitHub Pages) ─
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

// ── Storage helpers ──────────────────────────────────────────────
export const storage = {
  get: (key) => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } },
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  remove: (key) => localStorage.removeItem(key),
};

// ── Auth ─────────────────────────────────────────────────────────
export function getCurrentUser() { return storage.get('lt_user'); }
export function setCurrentUser(user) { storage.set('lt_user', user); }
export function logout() { storage.remove('lt_user'); window.router.navigate('/'); }
export function isLoggedIn() { return !!getCurrentUser(); }
export function isHost() { const u = getCurrentUser(); return u?.role === 'host'; }

export function registerUser(data) {
  const users = storage.get('lt_users') || [];
  if (users.find(u => u.email === data.email)) throw new Error('Email already registered');
  const user = { ...data, id: Date.now(), role: 'user', createdAt: new Date().toISOString(), avatar: data.fullName?.charAt(0).toUpperCase() };
  users.push(user);
  storage.set('lt_users', users);
  setCurrentUser(user);
  return user;
}

export function registerHost(data) {
  const users = storage.get('lt_users') || [];
  if (users.find(u => u.email === data.email)) throw new Error('Email already registered');
  const user = { ...data, id: Date.now(), role: 'host', status: 'pending', createdAt: new Date().toISOString(), avatar: data.name?.charAt(0).toUpperCase() };
  users.push(user);
  storage.set('lt_users', users);
  const listings = storage.get('lt_listings') || [];
  listings.push({ ...data.listing, hostId: user.id, status: 'pending', id: `listing-${Date.now()}` });
  storage.set('lt_listings', listings);
  setCurrentUser(user);
  return user;
}

export function loginUser(email, password) {
  const users = storage.get('lt_users') || [];
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid email or password');
  setCurrentUser(user);
  return user;
}

// Keep local cache in sync with Supabase auth/profile state.
export async function refreshUserCache() {
  try {
    const { getCurrentUser: getSupabaseCurrentUser } = await import('./lib/supabase.js');
    const user = await getSupabaseCurrentUser();
    if (user) setCurrentUser(user);
    else storage.remove('lt_user');
    return user;
  } catch (e) {
    console.warn('[refreshUserCache]', e.message);
    return null;
  }
}

// ── Reviews ──────────────────────────────────────────────────────
export function getReviews(listingId) {
  const all = storage.get('lt_reviews') || [];
  return all.filter(r => r.listingId === listingId);
}

export function addReview(review) {
  const all = storage.get('lt_reviews') || [];
  const newReview = { ...review, id: Date.now(), createdAt: new Date().toISOString() };
  all.unshift(newReview);
  storage.set('lt_reviews', all);
  return newReview;
}

// ── Bookings ─────────────────────────────────────────────────────
export function createBooking(booking) {
  const bookings = storage.get('lt_bookings') || [];
  const newBooking = { ...booking, id: `LT-${Date.now()}`, status: 'confirmed', createdAt: new Date().toISOString() };
  bookings.unshift(newBooking);
  storage.set('lt_bookings', bookings);
  storage.set('lt_last_booking', newBooking);
  return newBooking;
}

export function getUserBookings() {
  const user = getCurrentUser();
  if (!user) return [];
  const all = storage.get('lt_bookings') || [];
  return all.filter(b => b.userId === user.id);
}

export function getLastBooking() { return storage.get('lt_last_booking'); }

// ── Wishlist ─────────────────────────────────────────────────────
export function getWishlist() { return storage.get('lt_wishlist') || []; }
export function toggleWishlist(id) {
  const list = getWishlist();
  const idx = list.indexOf(id);
  if (idx === -1) list.push(id); else list.splice(idx, 1);
  storage.set('lt_wishlist', list);
  return list.includes(id);
}
export function isWishlisted(id) { return getWishlist().includes(id); }

// ── Toast ────────────────────────────────────────────────────────
export function showToast(title, msg = '', type = 'success') {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.className = `toast ${type}`;
  t.innerHTML = `<div class="toast-title">${type === 'success' ? '✅' : '❌'} ${title}</div>${msg ? `<div class="toast-msg">${msg}</div>` : ''}`;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4000);
}

// ── Stars HTML ───────────────────────────────────────────────────
export function starsHTML(rating) {
  return Array.from({ length: 5 }, (_, i) => `<span style="color:${i < Math.round(rating) ? '#fbbf24' : '#334155'};font-size:0.9rem">★</span>`).join('');
}

// ── Average Rating ───────────────────────────────────────────────
export function calcAvgRating(reviews) {
  if (!reviews.length) return 0;
  return (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
}

// ── Scroll to top ────────────────────────────────────────────────
export function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
