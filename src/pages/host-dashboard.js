import { getHostListings } from '../lib/supabase.js';
import { getCurrentUser, showToast, appHref } from '../utils.js';

export function renderHostDashboard() {
  const H = appHref;
  const user = getCurrentUser();
  if (!user) return `<div class="page-hero container"><h1>Please <a href="${H('/login')}" data-link style="color:var(--emerald-400)">log in</a></h1></div>`;

  const displayName = user.full_name || user.email || 'Host';

  return `
    <section class="page-hero" style="padding-bottom:40px">
      <div class="container">
        <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap">
          ${user.avatar_url
            ? `<img src="${user.avatar_url}" style="width:72px;height:72px;border-radius:50%;object-fit:cover;border:3px solid var(--emerald-500)" />`
            : `<div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,var(--emerald-500),var(--emerald-800));display:flex;align-items:center;justify-content:center;font-size:1.8rem;font-weight:800">${displayName.charAt(0).toUpperCase()}</div>`
          }
          <div>
            <h1 style="font-size:clamp(1.5rem,3vw,2rem);margin-bottom:4px">Host Dashboard</h1>
            <div style="color:var(--text-muted)">Welcome back, ${displayName} · <span class="badge badge-approved">✅ Active Host</span></div>
          </div>
        </div>
      </div>
    </section>

    <section style="padding-bottom:80px">
      <div class="container">
        <!-- Stats -->
        <div class="grid-4" style="margin-bottom:40px" id="stats-grid">
          <div class="card card-body text-center"><div style="font-size:2rem;margin-bottom:8px">🏠</div><div style="font-family:var(--font-head);font-size:1.8rem;font-weight:800;color:var(--text);margin-bottom:4px" id="stat-listings">—</div><div style="font-size:0.85rem;color:var(--text-muted)">Active Listings</div></div>
          <div class="card card-body text-center"><div style="font-size:2rem;margin-bottom:8px">📅</div><div style="font-family:var(--font-head);font-size:1.8rem;font-weight:800;color:var(--text);margin-bottom:4px" id="stat-bookings">—</div><div style="font-size:0.85rem;color:var(--text-muted)">Total Bookings</div></div>
          <div class="card card-body text-center"><div style="font-size:2rem;margin-bottom:8px">💰</div><div style="font-family:var(--font-head);font-size:1.8rem;font-weight:800;color:var(--text);margin-bottom:4px" id="stat-earnings">—</div><div style="font-size:0.85rem;color:var(--text-muted)">Total Earnings</div></div>
          <div class="card card-body text-center"><div style="font-size:2rem;margin-bottom:8px">⭐</div><div style="font-family:var(--font-head);font-size:1.8rem;font-weight:800;color:var(--text);margin-bottom:4px">4.8</div><div style="font-size:0.85rem;color:var(--text-muted)">Avg Rating</div></div>
        </div>

        <div class="tabs" id="host-tabs">
          <button class="tab-btn active" data-tab="listings">🏠 Listings</button>
          <button class="tab-btn" data-tab="add">+ Add New</button>
        </div>

        <!-- Listings tab -->
        <div id="tab-listings">
          <div style="text-align:center;padding:40px;color:var(--text-muted)">⏳ Loading listings…</div>
        </div>

        <!-- Add listing tab -->
        <div id="tab-add" class="hidden">
          <div class="grid-3">
            ${[
              { icon:'🏡', title:'Add Stay', desc:'List a homestay, hotel, lodge, or camping site', href:'/host-signup-stay' },
              { icon:'🧭', title:'Register as Guide', desc:'Offer trekking, wildlife, or cultural tour services', href:'/host-signup-guide' },
              { icon:'🚗', title:'List Transport', desc:'Cars, bikes, SUVs, shared Sumo or vans', href:'/host-signup-transport' },
            ].map(item => `
              <a href="${H(item.href)}" class="card card-body text-center" data-link style="cursor:pointer">
                <div style="font-size:3rem;margin-bottom:16px">${item.icon}</div>
                <h4 style="margin-bottom:8px">${item.title}</h4>
                <p style="font-size:0.9rem;margin-bottom:20px">${item.desc}</p>
                <span class="btn btn-primary btn-sm" style="margin:0 auto">Get Started →</span>
              </a>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

export async function initHostDashboard() {
  // Tab switching
  const tabs = document.querySelectorAll('.tab-btn[data-tab]');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('[id^="tab-"]').forEach(t => t.classList.add('hidden'));
      document.getElementById(`tab-${btn.dataset.tab}`)?.classList.remove('hidden');
    });
  });

  // Load listings from Supabase
  const listingsTab = document.getElementById('tab-listings');
  try {
    const { stays, guides, transport } = await getHostListings();
    const allListings = [...stays, ...guides, ...transport];

    // Update stats
    const el = id => document.getElementById(id);
    if (el('stat-listings')) el('stat-listings').textContent = allListings.length;
    if (el('stat-bookings')) el('stat-bookings').textContent = '—';
    if (el('stat-earnings')) el('stat-earnings').textContent = '—';

    if (listingsTab) {
      listingsTab.innerHTML = allListings.length ? allListings.map(l => `
        <div class="card card-body" style="margin-bottom:16px;display:flex;align-items:center;gap:20px;flex-wrap:wrap">
          ${l.cover_image ? `<img src="${l.cover_image}" style="width:80px;height:60px;border-radius:8px;object-fit:cover;flex-shrink:0" />` : ''}
          <div style="flex:1;min-width:200px">
            <div style="font-weight:700;margin-bottom:4px">${l.name}</div>
            <div style="font-size:0.85rem;color:var(--text-muted)">📍 ${l.location || l.district || '—'}</div>
            <div style="font-size:0.85rem;color:var(--text-muted);margin-top:4px">₹${l.price?.toLocaleString() || '—'}/night · ⭐ ${l.rating || 'New'}</div>
          </div>
          <span class="badge badge-approved">✅ Live</span>
        </div>
      `).join('') : `
        <div style="text-align:center;padding:60px;color:var(--text-muted)">
          <div style="font-size:4rem;margin-bottom:16px">🏠</div>
          <h3 style="margin-bottom:12px">No listings yet</h3>
          <p style="margin-bottom:24px">Add your first property, guide service, or transport.</p>
        </div>
      `;
    }
  } catch (e) {
    console.error('Host dashboard error:', e);
    if (listingsTab) listingsTab.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted)">Failed to load listings.</div>';
  }
}
