import { getHostListings } from '../lib/supabase.js';
import { getCurrentUser, appHref } from '../utils.js';

const HOST_LISTINGS_TIMEOUT_MS = 10000;

function withTimeout(promise, ms, message) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(message)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

function normalizeHostListing(listing, type) {
  const vehicles = Array.isArray(listing?.vehicles) ? listing.vehicles : [];
  const firstVehicle = vehicles[0] || null;
  const fallbackPrice =
    type === 'transport'
      ? Number(firstVehicle?.price || 0)
      : Number(listing?.price || 0);

  return {
    id: listing?.id,
    type,
    name: listing?.name || 'Untitled Listing',
    location: listing?.location || listing?.district || 'Mizoram',
    coverImage: listing?.cover_image || (Array.isArray(listing?.images) ? listing.images[0] : '') || '',
    price: fallbackPrice,
    priceLabel:
      type === 'transport'
        ? (firstVehicle?.price_unit || firstVehicle?.priceUnit || 'starting price')
        : type === 'guide'
          ? (listing?.price_unit || 'per day')
          : 'per night',
    status: listing?.status || 'approved',
    rating: Number(listing?.rating || 0),
  };
}

function renderListingCard(listing) {
  const statusText = listing.status === 'pending' ? 'Under Review' : 'Live';
  const statusClass = listing.status === 'pending' ? 'badge badge-pending' : 'badge badge-approved';
  const typeLabel = listing.type.charAt(0).toUpperCase() + listing.type.slice(1);
  const priceText = listing.price > 0 ? `Rs ${listing.price.toLocaleString()} ${listing.priceLabel}` : 'Price pending';
  const ratingText = listing.rating > 0 ? listing.rating.toFixed(1) : 'New';

  return `
    <div class="card card-body" style="margin-bottom:16px;display:flex;align-items:center;gap:20px;flex-wrap:wrap">
      ${listing.coverImage ? `<img src="${listing.coverImage}" alt="${listing.name}" style="width:80px;height:60px;border-radius:8px;object-fit:cover;flex-shrink:0" />` : ''}
      <div style="flex:1;min-width:220px">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:4px">
          <div style="font-weight:700">${listing.name}</div>
          <span class="tag" style="font-size:0.68rem">${typeLabel}</span>
        </div>
        <div style="font-size:0.85rem;color:var(--text-muted)">Location: ${listing.location}</div>
        <div style="font-size:0.85rem;color:var(--text-muted);margin-top:4px">${priceText} · Rating: ${ratingText}</div>
      </div>
      <span class="${statusClass}">${statusText}</span>
    </div>
  `;
}

export function renderHostDashboard() {
  const H = appHref;
  const user = getCurrentUser();
  if (!user) return `<div class="page-hero container"><h1>Please <a href="${H('/login')}" data-link style="color:var(--emerald-400)">log in</a></h1></div>`;

  const displayName = user.full_name || user.name || user.email || 'Host';
  const avatarText = (displayName || 'H').charAt(0).toUpperCase();

  return `
    <section class="page-hero" style="padding-bottom:40px">
      <div class="container">
        <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap">
          ${user.avatar_url
            ? `<img src="${user.avatar_url}" alt="${displayName}" style="width:72px;height:72px;border-radius:50%;object-fit:cover;border:3px solid var(--emerald-500)" />`
            : `<div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,var(--emerald-500),var(--emerald-800));display:flex;align-items:center;justify-content:center;font-size:1.8rem;font-weight:800">${avatarText}</div>`}
          <div>
            <h1 style="font-size:clamp(1.5rem,3vw,2rem);margin-bottom:4px">Host Dashboard</h1>
            <div style="color:var(--text-muted)">Welcome back, ${displayName} · <span class="badge badge-approved">Active Host</span></div>
          </div>
        </div>
      </div>
    </section>

    <section style="padding-bottom:80px">
      <div class="container">
        <div class="grid-4" style="margin-bottom:40px">
          <div class="card card-body text-center"><div style="font-size:2rem;margin-bottom:8px">🏠</div><div style="font-family:var(--font-head);font-size:1.8rem;font-weight:800;color:var(--text);margin-bottom:4px" id="stat-listings">—</div><div style="font-size:0.85rem;color:var(--text-muted)">Active Listings</div></div>
          <div class="card card-body text-center"><div style="font-size:2rem;margin-bottom:8px">📅</div><div style="font-family:var(--font-head);font-size:1.8rem;font-weight:800;color:var(--text);margin-bottom:4px" id="stat-bookings">0</div><div style="font-size:0.85rem;color:var(--text-muted)">Total Bookings</div></div>
          <div class="card card-body text-center"><div style="font-size:2rem;margin-bottom:8px">💰</div><div style="font-family:var(--font-head);font-size:1.8rem;font-weight:800;color:var(--text);margin-bottom:4px" id="stat-earnings">—</div><div style="font-size:0.85rem;color:var(--text-muted)">Total Earnings</div></div>
          <div class="card card-body text-center"><div style="font-size:2rem;margin-bottom:8px">⭐</div><div style="font-family:var(--font-head);font-size:1.8rem;font-weight:800;color:var(--text);margin-bottom:4px">4.8</div><div style="font-size:0.85rem;color:var(--text-muted)">Avg Rating</div></div>
        </div>

        <div class="tabs" id="host-tabs">
          <button class="tab-btn active" data-tab="listings">🏠 Listings</button>
          <button class="tab-btn" data-tab="add">+ Add New</button>
        </div>

        <div id="tab-listings">
          <div style="text-align:center;padding:40px;color:var(--text-muted)">Loading listings...</div>
        </div>

        <div id="tab-add" class="hidden">
          <div class="grid-3">
            ${[
              { icon: '🏡', title: 'Add Stay', desc: 'List a homestay, hotel, lodge, or camping site', href: '/host-signup-stay' },
              { icon: '🧭', title: 'Register as Guide', desc: 'Offer trekking, wildlife, or cultural tour services', href: '/host-signup-guide' },
              { icon: '🚗', title: 'List Transport', desc: 'Cars, bikes, SUVs, shared Sumo or vans', href: '/host-signup-transport' },
            ].map(item => `
              <a href="${H(item.href)}" class="card card-body text-center" data-link style="cursor:pointer">
                <div style="font-size:3rem;margin-bottom:16px">${item.icon}</div>
                <h4 style="margin-bottom:8px">${item.title}</h4>
                <p style="font-size:0.9rem;margin-bottom:20px">${item.desc}</p>
                <span class="btn btn-primary btn-sm" style="margin:0 auto">Get Started -></span>
              </a>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

export async function initHostDashboard() {
  const tabs = document.querySelectorAll('.tab-btn[data-tab]');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(tab => tab.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('[id^="tab-"]').forEach(panel => panel.classList.add('hidden'));
      document.getElementById(`tab-${btn.dataset.tab}`)?.classList.remove('hidden');
    });
  });

  const user = getCurrentUser();
  const listingsTab = document.getElementById('tab-listings');
  if (!listingsTab || !user?.id) return;

  try {
    const { stays, guides, transport } = await withTimeout(
      getHostListings(user.id),
      HOST_LISTINGS_TIMEOUT_MS,
      'Loading your listings timed out.'
    );

    const allListings = [
      ...stays.map(item => normalizeHostListing(item, 'stay')),
      ...guides.map(item => normalizeHostListing(item, 'guide')),
      ...transport.map(item => normalizeHostListing(item, 'transport')),
    ];

    const listingsStat = document.getElementById('stat-listings');
    const earningsStat = document.getElementById('stat-earnings');
    if (listingsStat) listingsStat.textContent = allListings.length.toString();
    if (earningsStat) earningsStat.textContent = 'Rs 0';

    listingsTab.innerHTML = allListings.length
      ? allListings.map(renderListingCard).join('')
      : `
        <div style="text-align:center;padding:60px;color:var(--text-muted)">
          <div style="font-size:4rem;margin-bottom:16px">🏠</div>
          <h3 style="margin-bottom:12px">No listings yet</h3>
          <p style="margin-bottom:24px">Your stay, guide, or transport listing will appear here once it is saved.</p>
        </div>
      `;
  } catch (error) {
    console.error('Host dashboard error:', error);
    listingsTab.innerHTML = `
      <div style="text-align:center;padding:40px;color:var(--text-muted)">
        <div style="font-size:1rem;margin-bottom:8px">Could not load listings.</div>
        <div style="font-size:0.85rem">${error.message || 'Please refresh and try again.'}</div>
      </div>
    `;
  }
}
