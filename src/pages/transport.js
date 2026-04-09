import { transport as fallbackTransport } from '../data/services.js';
import { fetchTransport, fetchTransportById } from '../lib/supabase.js';
import { starsHTML, appHref } from '../utils.js';

const transportCache = new Map();
const TRANSPORT_PLACEHOLDER = 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80';
const TRANSPORT_FETCH_TIMEOUT_MS = 6000;

function withTimeout(promise, ms, message) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(message)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

function normalizeVehicle(vehicle) {
  return {
    name: vehicle?.name || 'Vehicle',
    capacity: Number(vehicle?.capacity || 1),
    price: Number(vehicle?.price || 0),
    priceUnit: vehicle?.price_unit || vehicle?.priceUnit || 'per day',
  };
}

function normalizeTransport(item) {
  const images = Array.isArray(item?.images) ? item.images.filter(Boolean) : [];
  const coverImage =
    item?.cover_image ||
    item?.coverImage ||
    images[0] ||
    TRANSPORT_PLACEHOLDER;

  const vehicles = Array.isArray(item?.vehicles)
    ? item.vehicles.map(normalizeVehicle).filter(vehicle => vehicle.name)
    : [];

  return {
    id: item?.id,
    name: item?.name || 'Transport Service',
    owner: item?.owner_name || item?.owner || 'Transport Partner',
    type: item?.type || 'Transport',
    vehicles,
    rating: Number(item?.rating || 0),
    reviews: Number(item?.reviews_count || item?.reviews || 0),
    phone: item?.phone || '',
    email: item?.email || '',
    location: item?.location || 'Mizoram',
    coverImage,
    images: images.length ? images : [coverImage],
    description: item?.description || 'Transport details will be added soon.',
    features: Array.isArray(item?.features) ? item.features : [],
    verified: item?.verified !== false,
    available: item?.available !== false,
  };
}

function rememberTransport(list) {
  transportCache.clear();
  list.forEach(item => transportCache.set(item.id, item));
  return list;
}

function getFallbackTransport(id) {
  return fallbackTransport.find(item => item.id === id) || null;
}

function renderTransportCard(item) {
  const displayRating = item.rating > 0 ? item.rating.toFixed(1) : 'New';
  const displayReviews = item.reviews || 0;

  return `
    <a href="${appHref(`/transport/${item.id}`)}" class="card" data-link style="cursor:pointer;display:block;color:inherit;text-decoration:none">
      <div class="card-img-wrap">
        <img src="${item.coverImage}" alt="${item.name}" loading="lazy" />
        <div class="card-badge">${item.type.toUpperCase()}</div>
        <div class="card-rating">${starsHTML(item.rating)} <span>${displayRating} (${displayReviews})</span></div>
      </div>
      <div class="card-body">
        <h4 class="card-title">${item.name}</h4>
        <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px">Owner: ${item.owner} &nbsp;|&nbsp; Location: ${item.location}</div>
        <div style="margin-bottom:14px">
          ${item.vehicles.slice(0, 2).map(vehicle => `
            <div style="display:flex;justify-content:space-between;font-size:0.85rem;padding:6px 0;border-bottom:1px solid var(--glass-border)">
              <span style="color:var(--text-muted)">${vehicle.name}</span>
              <span style="color:var(--emerald-400);font-weight:600">Rs ${vehicle.price.toLocaleString()}</span>
            </div>
          `).join('')}
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">
          ${item.features.slice(0, 3).map(feature => `<span class="tag" style="font-size:0.72rem">${feature}</span>`).join('')}
        </div>
        <span class="btn btn-outline btn-sm w-full" style="justify-content:center">View & Book</span>
      </div>
    </a>
  `;
}

function renderTransportDetailContent(item) {
  return `
    <div style="padding-top:76px">
      <div class="container" style="margin-top:24px">
        <div class="detail-layout">
          <div>
            <div style="margin-bottom:24px">
              <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;margin-bottom:12px">
                <h1 style="font-size:clamp(1.5rem,3vw,2rem)">${item.name}</h1>
                ${item.verified ? `<span style="color:var(--emerald-400);font-size:0.85rem">Verified Provider</span>` : ''}
              </div>
              <div style="display:flex;gap:4px;align-items:center;margin-bottom:8px">${starsHTML(item.rating)} <strong>${item.rating > 0 ? item.rating.toFixed(1) : 'New'}</strong> <span style="color:var(--text-muted)">(${item.reviews} reviews)</span></div>
              <div style="font-size:0.9rem;color:var(--text-muted)">Location: ${item.location} &nbsp;|&nbsp; Owner: ${item.owner}</div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:28px;border-radius:var(--radius);overflow:hidden">
              ${item.images.map((img, index) => `<img src="${img}" alt="${item.name}" style="width:100%;height:180px;object-fit:cover;${index === 0 ? 'grid-column:1/3;height:260px' : ''}" loading="lazy" />`).join('')}
            </div>

            <h3 style="margin-bottom:12px">About this Service</h3>
            <p style="margin-bottom:28px">${item.description}</p>

            <h3 style="margin-bottom:16px">Available Vehicles</h3>
            <div style="margin-bottom:32px">
              ${item.vehicles.length
                ? item.vehicles.map(vehicle => `
                  <div class="card card-body" style="margin-bottom:12px;padding:20px">
                    <div class="flex-between">
                      <div>
                        <div style="font-weight:700;margin-bottom:4px">${vehicle.name}</div>
                        <div style="font-size:0.85rem;color:var(--text-muted)">Up to ${vehicle.capacity} passengers</div>
                      </div>
                      <div style="text-align:right">
                        <div class="price" style="font-size:1.1rem">Rs ${vehicle.price.toLocaleString()}</div>
                        <div style="font-size:0.8rem;color:var(--text-muted)">${vehicle.priceUnit}</div>
                      </div>
                    </div>
                  </div>
                `).join('')
                : `<div style="font-size:0.9rem;color:var(--text-muted)">Vehicle details will appear here shortly.</div>`}
            </div>

            <h3 style="margin-bottom:16px">Features</h3>
            <div class="amenities-grid">
              ${item.features.map(feature => `<div class="amenity-item"><span class="amenity-icon">OK</span><span class="amenity-label">${feature}</span></div>`).join('')}
            </div>
          </div>
          <div>
            <div class="booking-widget">
              <div style="font-family:var(--font-head);font-size:1.1rem;font-weight:700;margin-bottom:4px">Book Transport</div>
              <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:20px">Select vehicle and dates</div>
              <div class="form-group">
                <label class="form-label">Vehicle</label>
                <select class="form-select" id="vehicle-select">
                  ${item.vehicles.map(vehicle => `<option value="${vehicle.price}">${vehicle.name} - Rs ${vehicle.price.toLocaleString()} ${vehicle.priceUnit}</option>`).join('')}
                </select>
              </div>
              <div class="form-group"><label class="form-label">Pickup Date</label><input type="date" class="form-input" id="pickup-date" /></div>
              <div class="form-group"><label class="form-label">Drop-off Date</label><input type="date" class="form-input" id="dropoff-date" /></div>
              <div class="form-group"><label class="form-label">Pickup Location</label><input type="text" class="form-input" id="pickup-loc" placeholder="e.g. Aizawl Airport" /></div>
              <div id="transport-total" style="background:var(--glass);border-radius:var(--radius-sm);padding:14px;margin-bottom:16px;font-size:0.9rem;color:var(--text-muted)">Select vehicle and dates to see total</div>
              <button class="btn btn-primary w-full" id="book-transport-btn" style="justify-content:center;padding:16px;margin-bottom:12px">Book Now -></button>
              <p style="text-align:center;font-size:0.8rem;color:var(--text-muted)">Secured by Razorpay</p>
              <div class="divider-h"></div>
              <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:6px">Phone: ${item.phone || 'Available after booking'}</div>
              <div style="font-size:0.85rem;color:var(--text-muted)">Email: ${item.email || 'Available after booking'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function attachTransportCardLinks(grid) {
  grid.querySelectorAll('[data-link]').forEach(el => {
    if (el.dataset.transportBound === 'true') return;
    el.dataset.transportBound = 'true';
    el.addEventListener('click', event => {
      event.preventDefault();
      window.router.navigate(el.getAttribute('href'));
    });
  });
}

export function renderTransport() {
  const H = appHref;
  const previewTransport = fallbackTransport.map(normalizeTransport);
  return `
    <section class="page-hero">
      <div class="container">
        <div class="section-label">Get Around Mizoram</div>
        <h1>Book Transport</h1>
        <p style="max-width:600px;margin-bottom:32px">From airport pickups to multi-day SUV hire and Royal Enfield adventures - we've got every journey covered.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="grid-3" id="transport-grid">
          ${previewTransport.map(renderTransportCard).join('')}
        </div>
        <div style="margin-top:60px;background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(245,158,11,0.05));border:1px solid rgba(16,185,129,0.2);border-radius:var(--radius-xl);padding:48px;text-align:center">
          <div style="font-size:2.5rem;margin-bottom:16px">Transport</div>
          <h2 style="margin-bottom:12px">Have a Vehicle to List?</h2>
          <p style="max-width:480px;margin:0 auto 28px">Join our transport network and earn by connecting travellers with reliable rides across Mizoram.</p>
          <a href="${H('/host-signup-transport')}" class="btn btn-primary btn-lg" data-link>List Your Transport</a>
        </div>
      </div>
    </section>
  `;
}

export async function initTransport() {
  const grid = document.getElementById('transport-grid');
  if (!grid) return;

  let normalizedTransport = [];
  try {
    const rows = await withTimeout(
      fetchTransport(),
      TRANSPORT_FETCH_TIMEOUT_MS,
      'Transport list request timed out.'
    );
    normalizedTransport = rememberTransport(rows.map(normalizeTransport));
  } catch (error) {
    console.warn('[transport] falling back to static data:', error.message);
  }

  if (!normalizedTransport.length) {
    normalizedTransport = rememberTransport(fallbackTransport.map(normalizeTransport));
  }

  if (!normalizedTransport.length) {
    grid.innerHTML = `<div class="page-loader" style="grid-column:1/-1"><div style="color:var(--text-muted)">No transport listings available yet.</div></div>`;
    return;
  }

  grid.innerHTML = normalizedTransport.map(renderTransportCard).join('');
  attachTransportCardLinks(grid);
}

export function renderTransportDetail(id) {
  return `
    <div id="transport-detail-root" data-transport-id="${id}" style="padding-top:76px">
      <div class="page-loader">
        <div class="loading-spinner"></div>
        <div style="color:var(--text-muted)">Loading transport details...</div>
      </div>
    </div>
  `;
}

export async function initTransportDetail(id) {
  const root = document.getElementById('transport-detail-root');
  if (!root) return;

  let item = transportCache.get(id) || null;

  if (!item) {
    try {
      const row = await withTimeout(
        fetchTransportById(id),
        TRANSPORT_FETCH_TIMEOUT_MS,
        'Transport profile request timed out.'
      );
      item = normalizeTransport(row);
    } catch (error) {
      console.warn('[transport-detail] falling back to static data:', error.message);
    }
  }

  if (!item) {
    const fallback = getFallbackTransport(id);
    if (fallback) item = normalizeTransport(fallback);
  }

  if (!item) {
    root.innerHTML = `<div class="page-hero container"><h1>Transport listing not found</h1></div>`;
    return;
  }

  transportCache.set(item.id, item);
  root.outerHTML = renderTransportDetailContent(item);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const toISO = date => date.toISOString().split('T')[0];

  document.getElementById('pickup-date').value = toISO(today);
  document.getElementById('dropoff-date').value = toISO(tomorrow);

  const updateTotal = () => {
    const price = parseInt(document.getElementById('vehicle-select')?.value || 0, 10);
    const pickup = new Date(document.getElementById('pickup-date')?.value);
    const dropoff = new Date(document.getElementById('dropoff-date')?.value);
    const days = Math.max(1, Math.round((dropoff - pickup) / 86400000));
    const total = price * days;
    const el = document.getElementById('transport-total');
    if (el) {
      el.innerHTML = `<div class="flex-between"><span>Rs ${price.toLocaleString()} x ${days} day${days > 1 ? 's' : ''}</span><strong style="color:var(--text)">Rs ${total.toLocaleString()}</strong></div>`;
    }
    return total;
  };

  updateTotal();
  ['vehicle-select', 'pickup-date', 'dropoff-date'].forEach(fieldId => {
    document.getElementById(fieldId)?.addEventListener('change', updateTotal);
  });

  document.getElementById('book-transport-btn')?.addEventListener('click', () => {
    const total = updateTotal();
    window.router.navigate(`/book/${id}?total=${total}&type=transport&name=${encodeURIComponent(item.name)}`);
  });
}
