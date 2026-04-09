import { guides as fallbackGuides } from '../data/services.js';
import { fetchGuideById, fetchGuides } from '../lib/supabase.js';
import { appHref, starsHTML } from '../utils.js';

const guideCache = new Map();
const GUIDE_PLACEHOLDER = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80';
const GUIDE_FETCH_TIMEOUT_MS = 6000;
const HIDDEN_GUIDE_IDS = new Set(['guide-zova', 'guide-mary', 'guide-rema']);

function withTimeout(promise, ms, message) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(message)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

function normalizeGuide(guide) {
  const images = Array.isArray(guide.images) ? guide.images.filter(Boolean) : [];
  const coverImage =
    guide.cover_image ||
    guide.coverImage ||
    images[0] ||
    GUIDE_PLACEHOLDER;

  return {
    id: guide.id,
    name: guide.name || 'Local Guide',
    title: guide.title || 'Local Guide',
    experience: guide.experience || 'Experienced guide',
    languages: Array.isArray(guide.languages) ? guide.languages : [],
    specialties: Array.isArray(guide.specialties) ? guide.specialties : [],
    rating: Number(guide.rating || 0),
    reviews: Number(guide.reviews_count || guide.reviews || 0),
    price: Number(guide.price || 0),
    priceUnit: guide.price_unit || guide.priceUnit || 'per day',
    location: guide.location || 'Mizoram',
    phone: guide.phone || '',
    email: guide.email || '',
    coverImage,
    images: images.length ? images : [coverImage],
    bio: guide.bio || 'This guide profile will be updated soon.',
    certifications: Array.isArray(guide.certifications) ? guide.certifications : [],
    verified: guide.verified !== false,
    available: guide.available !== false,
    tags: Array.isArray(guide.tags) ? guide.tags : [],
  };
}

function isVisibleGuide(guide) {
  return !!guide?.id && !HIDDEN_GUIDE_IDS.has(guide.id);
}

function rememberGuides(list) {
  guideCache.clear();
  list.forEach(guide => guideCache.set(guide.id, guide));
  return list;
}

function getFallbackGuide(id) {
  return fallbackGuides.find(guide => isVisibleGuide(guide) && guide.id === id) || null;
}

function renderGuideCard(guide) {
  const priceSuffix = guide.priceUnit.replace(/^per\s+/i, '');
  const displayRating = guide.rating > 0 ? guide.rating.toFixed(1) : 'New';
  const displayReviews = guide.reviews || 0;

  return `
    <a href="${appHref(`/guide/${guide.id}`)}" class="card" data-link style="cursor:pointer;display:block;color:inherit;text-decoration:none">
      <div class="card-img-wrap" style="height:240px">
        <img src="${guide.coverImage}" alt="${guide.name}" loading="lazy" style="object-position:top" />
        ${guide.verified ? `<div class="card-badge" style="background:rgba(16,185,129,0.9);color:#fff">VERIFIED</div>` : ''}
        <div class="card-rating">${starsHTML(guide.rating)} <span>${displayRating} (${displayReviews})</span></div>
      </div>
      <div class="card-body">
        <h4 class="card-title">${guide.name}</h4>
        <div style="font-size:0.85rem;color:var(--emerald-400);font-weight:600;margin-bottom:6px">${guide.title}</div>
        <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px">Location: ${guide.location} &nbsp;|&nbsp; Experience: ${guide.experience}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">
          ${guide.languages.map(language => `<span class="tag" style="font-size:0.72rem">${language}</span>`).join('')}
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">
          ${guide.specialties.slice(0, 2).map(specialty => `<span class="tag">${specialty}</span>`).join('')}
        </div>
        <div class="flex-between">
          <span class="price" style="font-size:1.1rem">Rs ${guide.price.toLocaleString()}<span>/${priceSuffix}</span></span>
          <span class="btn btn-outline btn-sm">View & Book</span>
        </div>
      </div>
    </a>
  `;
}

function renderGuideDetailContent(guide) {
  const gallery = guide.images.slice(1);

  return `
    <div style="padding-top:76px">
      <div class="container" style="margin-top:24px">
        <div class="detail-layout">
          <div>
            <div style="display:flex;gap:24px;align-items:flex-start;margin-bottom:28px;flex-wrap:wrap">
              <img src="${guide.coverImage}" alt="${guide.name}" style="width:120px;height:120px;border-radius:50%;object-fit:cover;object-position:top;border:3px solid var(--emerald-500);flex-shrink:0" />
              <div>
                <h1 style="font-size:clamp(1.5rem,3vw,2rem);margin-bottom:4px">${guide.name}</h1>
                <div style="color:var(--emerald-400);font-weight:600;margin-bottom:8px">${guide.title}</div>
                <div style="display:flex;gap:4px;align-items:center;margin-bottom:8px">${starsHTML(guide.rating)} <strong>${guide.rating > 0 ? guide.rating.toFixed(1) : 'New'}</strong> <span style="color:var(--text-muted)">(${guide.reviews} reviews)</span></div>
                <div style="font-size:0.9rem;color:var(--text-muted)">Location: ${guide.location} &nbsp;|&nbsp; Experience: ${guide.experience}</div>
              </div>
            </div>
            <div class="divider-h"></div>
            <h3 style="margin-bottom:12px">About ${guide.name}</h3>
            <p style="margin-bottom:24px">${guide.bio}</p>
            <h3 style="margin-bottom:16px">Specialties</h3>
            <div class="amenities-grid" style="margin-bottom:28px">
              ${guide.specialties.map(specialty => `<div class="amenity-item"><span class="amenity-icon">+</span><span class="amenity-label">${specialty}</span></div>`).join('')}
            </div>
            <h3 style="margin-bottom:16px">Languages</h3>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:28px">
              ${guide.languages.map(language => `<span class="tag">${language}</span>`).join('')}
            </div>
            <h3 style="margin-bottom:16px">Certifications</h3>
            <div style="margin-bottom:32px">
              ${guide.certifications.length
                ? guide.certifications.map(certification => `<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--glass-border)"><span style="color:var(--emerald-400)">OK</span><span style="font-size:0.9rem;color:var(--text-muted)">${certification}</span></div>`).join('')
                : `<div style="font-size:0.9rem;color:var(--text-muted)">No certifications listed yet.</div>`}
            </div>
            <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:24px">
              <h4 style="margin-bottom:16px">Gallery</h4>
              ${gallery.length
                ? `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">${gallery.map((img, index) => `<img src="${img}" alt="${guide.name} ${index + 2}" style="width:100%;height:130px;object-fit:cover;border-radius:var(--radius-sm)" />`).join('')}</div>`
                : `<div style="font-size:0.9rem;color:var(--text-muted)">Photos will appear here after the guide uploads them.</div>`}
            </div>
          </div>
          <div>
            <div class="booking-widget">
              <div class="booking-price"><span class="price" style="font-size:1.6rem">Rs ${guide.price.toLocaleString()}</span><span style="color:var(--text-muted)">/${guide.priceUnit}</span></div>
              <div class="form-group mt-16"><label class="form-label">Select Date</label><input type="date" class="form-input" id="guide-date" /></div>
              <div class="form-group"><label class="form-label">Trip Type</label>
                <select class="form-select" id="guide-trip">
                  ${guide.specialties.map(specialty => `<option>${specialty}</option>`).join('')}
                </select>
              </div>
              <div class="form-group"><label class="form-label">Group Size</label>
                <select class="form-select" id="guide-group">
                  ${[1, 2, 3, 4, 5, 6].map(size => `<option value="${size}">${size} person${size > 1 ? 's' : ''}</option>`).join('')}
                </select>
              </div>
              <button class="btn btn-primary w-full" id="book-guide-btn" style="justify-content:center;padding:16px;margin-bottom:12px">Book Guide</button>
              <p style="text-align:center;font-size:0.8rem;color:var(--text-muted)">Secured by Razorpay</p>
              <div class="divider-h"></div>
              <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:6px">Phone: ${guide.phone || 'Available after booking'}</div>
              <div style="font-size:0.85rem;color:var(--text-muted)">Email: ${guide.email || 'Available after booking'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function attachGuideCardLinks(grid) {
  grid.querySelectorAll('[data-link]').forEach(el => {
    if (el.dataset.guideBound === 'true') return;
    el.dataset.guideBound = 'true';
    el.addEventListener('click', event => {
      event.preventDefault();
      window.router.navigate(el.getAttribute('href'));
    });
  });
}

export function renderGuides() {
  const H = appHref;
  const previewGuides = fallbackGuides.filter(isVisibleGuide).map(normalizeGuide);
  return `
    <section class="page-hero">
      <div class="container">
        <div class="section-label">Expert Local Guides</div>
        <h1>Hire a Guide</h1>
        <p style="max-width:600px;margin-bottom:32px">Every guide is certified, locally born, and passionately knowledgeable about Mizoram's terrain, culture, and wildlife.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="grid-3" id="guides-grid">
          ${previewGuides.map(renderGuideCard).join('')}
        </div>
        <div style="margin-top:60px;background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(245,158,11,0.05));border:1px solid rgba(16,185,129,0.2);border-radius:var(--radius-xl);padding:48px;text-align:center">
          <div style="font-size:2.5rem;margin-bottom:16px">Guide</div>
          <h2 style="margin-bottom:12px">Are You a Local Expert?</h2>
          <p style="max-width:480px;margin:0 auto 28px">Join LushaiTrips as a certified guide. Share your knowledge of Mizoram's hidden trails, wildlife, and culture.</p>
          <a href="${H('/host-signup-guide')}" class="btn btn-primary btn-lg" data-link>Register as a Guide</a>
        </div>
      </div>
    </section>
  `;
}

export async function initGuides() {
  const grid = document.getElementById('guides-grid');
  if (!grid) return;

  let normalizedGuides = [];
  try {
    const rows = await withTimeout(
      fetchGuides(),
      GUIDE_FETCH_TIMEOUT_MS,
      'Guide list request timed out.'
    );
    normalizedGuides = rememberGuides(rows.filter(isVisibleGuide).map(normalizeGuide));
  } catch (error) {
    console.warn('[guides] falling back to static data:', error.message);
  }

  if (!normalizedGuides.length) {
    normalizedGuides = rememberGuides(fallbackGuides.filter(isVisibleGuide).map(normalizeGuide));
  }

  if (!normalizedGuides.length) {
    grid.innerHTML = `<div class="page-loader" style="grid-column:1/-1"><div style="color:var(--text-muted)">No guides available yet.</div></div>`;
    return;
  }

  grid.innerHTML = normalizedGuides.map(renderGuideCard).join('');
  attachGuideCardLinks(grid);
}

export function renderGuideDetail(id) {
  return `
    <div id="guide-detail-root" data-guide-id="${id}" style="padding-top:76px">
      <div class="page-loader">
        <div class="loading-spinner"></div>
        <div style="color:var(--text-muted)">Loading guide profile...</div>
      </div>
    </div>
  `;
}

export async function initGuideDetail(id) {
  const root = document.getElementById('guide-detail-root');
  if (!root) return;

  let guide = null;

  try {
    const row = await withTimeout(
      fetchGuideById(id),
      GUIDE_FETCH_TIMEOUT_MS,
      'Guide profile request timed out.'
    );
    if (isVisibleGuide(row)) guide = normalizeGuide(row);
  } catch (error) {
    console.warn('[guide-detail] falling back to static data:', error.message);
  }

  if (!guide) {
    const fallback = getFallbackGuide(id);
    if (fallback) guide = normalizeGuide(fallback);
  }

  if (!guide) {
    root.innerHTML = `<div class="page-hero container"><h1>Guide not found</h1></div>`;
    return;
  }

  guideCache.set(guide.id, guide);
  root.outerHTML = renderGuideDetailContent(guide);

  const today = new Date().toISOString().split('T')[0];
  const dateEl = document.getElementById('guide-date');
  if (dateEl) dateEl.value = today;

  document.getElementById('book-guide-btn')?.addEventListener('click', () => {
    const date = document.getElementById('guide-date')?.value;
    const total = guide.price;
    window.router.navigate(`/book/guide-${guide.id}?date=${date}&total=${total}&type=guide&name=${encodeURIComponent(guide.name)}`);
  });
}
