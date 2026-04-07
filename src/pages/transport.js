import { fetchTransport } from '../lib/supabase.js';
import { starsHTML, appHref } from '../utils.js';

export function renderTransport() {
  const H = appHref;
  return `
    <section class="page-hero">
      <div class="container">
        <div class="section-label">🚗 Get Around Mizoram</div>
        <h1>Book Transport</h1>
        <p style="max-width:600px;margin-bottom:32px">From airport pickups to multi-day SUV hire and Royal Enfield adventures — we've got every journey covered.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="grid-3" id="transport-grid">
          <div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted)">⏳ Loading transport…</div>
        </div>
        <div style="margin-top:60px;background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(245,158,11,0.05));border:1px solid rgba(16,185,129,0.2);border-radius:var(--radius-xl);padding:48px;text-align:center">
          <div style="font-size:2.5rem;margin-bottom:16px">🚌</div>
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

  try {
    // 10-second timeout so the spinner never hangs forever
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out. Please check your connection.')), 10000)
    );
    const transport = await Promise.race([fetchTransport(), timeout]);

    if (!transport.length) {
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted)"><div style="font-size:3rem;margin-bottom:16px">🚌</div><p>No transport options are available right now.<br>Check back soon or <a href="/host-signup-transport" data-link style="color:var(--emerald-400)">list your vehicle</a>.</p></div>';
      return;
    }

    grid.innerHTML = transport.map(t => `
      <div class="card" data-href="/transport/${t.id}" style="cursor:pointer">
        <div class="card-img-wrap">
          <img src="${t.cover_image}" alt="${t.name}" loading="lazy" />
          <div class="card-badge">${t.type?.toUpperCase()}</div>
          <div class="card-rating">${starsHTML(t.rating)} <span>${t.rating} (${t.reviews_count})</span></div>
        </div>
        <div class="card-body">
          <h4 class="card-title">${t.name}</h4>
          <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px">👤 ${t.owner_name} &nbsp;•&nbsp; 📍 ${t.location}</div>
          <div style="margin-bottom:14px">
            ${(t.vehicles||[]).slice(0,2).map(v => `
              <div style="display:flex;justify-content:space-between;font-size:0.85rem;padding:6px 0;border-bottom:1px solid var(--glass-border)">
                <span style="color:var(--text-muted)">🚗 ${v.name}</span>
                <span style="color:var(--emerald-400);font-weight:600">₹${v.price?.toLocaleString()}</span>
              </div>
            `).join('')}
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">
            ${(t.features||[]).slice(0,3).map(f => `<span class="tag" style="font-size:0.72rem">${f}</span>`).join('')}
          </div>
          <span class="btn btn-outline btn-sm w-full" style="justify-content:center">View &amp; Book</span>
        </div>
      </div>
    `).join('');
    grid.querySelectorAll('[data-href]').forEach(el =>
      el.addEventListener('click', () => window.router.navigate(el.dataset.href))
    );
  } catch (e) {
    console.error('Error loading transport:', e);
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted)">
      <div style="font-size:2.5rem;margin-bottom:12px">⚠️</div>
      <p style="margin-bottom:16px">${e.message || 'Failed to load transport. Please try again.'}</p>
      <button class="btn btn-outline btn-sm" onclick="window.router.navigate('/transport')">Retry</button>
    </div>`;
  }
}

export function renderTransportDetail(id) {
  return `<div id="transport-detail-root" style="padding-top:76px"><div class="container" style="margin-top:24px;text-align:center;padding:60px;color:var(--text-muted)">⏳ Loading…</div></div>`;
}

export async function initTransportDetail(id) {
  const { fetchTransportById } = await import('../lib/supabase.js');
  const root = document.getElementById('transport-detail-root');

  try {
    const t = await fetchTransportById(id);
    if (!t || !root) return;

    root.innerHTML = `
      <div class="container" style="margin-top:24px">
        <div class="detail-layout">
          <div>
            <div style="margin-bottom:24px">
              <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;margin-bottom:12px">
                <h1 style="font-size:clamp(1.5rem,3vw,2rem)">${t.name}</h1>
                ${t.verified ? `<span style="color:var(--emerald-400);font-size:0.85rem">✅ Verified Provider</span>` : ''}
              </div>
              <div style="display:flex;gap:4px;align-items:center;margin-bottom:8px">${starsHTML(t.rating)} <strong>${t.rating}</strong> <span style="color:var(--text-muted)">(${t.reviews_count} reviews)</span></div>
              <div style="font-size:0.9rem;color:var(--text-muted)">📍 ${t.location} &nbsp;•&nbsp; 👤 ${t.owner_name}</div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:28px;border-radius:var(--radius);overflow:hidden">
              ${(t.images||[]).map((img,i) => `<img src="${img}" alt="${t.name}" style="width:100%;height:${i===0?'260px':'180px'};object-fit:cover;${i===0?'grid-column:1/3;':''}" loading="lazy" />`).join('')}
            </div>
            <h3 style="margin-bottom:12px">About this Service</h3>
            <p style="margin-bottom:28px">${t.description}</p>
            <h3 style="margin-bottom:16px">🚗 Available Vehicles</h3>
            <div style="margin-bottom:32px">
              ${(t.vehicles||[]).map(v => `
                <div class="card card-body" style="margin-bottom:12px;padding:20px">
                  <div class="flex-between">
                    <div>
                      <div style="font-weight:700;margin-bottom:4px">${v.name}</div>
                      <div style="font-size:0.85rem;color:var(--text-muted)">👥 Up to ${v.capacity} passengers</div>
                    </div>
                    <div style="text-align:right">
                      <div class="price" style="font-size:1.1rem">₹${v.price?.toLocaleString()}</div>
                      <div style="font-size:0.8rem;color:var(--text-muted)">${v.priceUnit}</div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
            <h3 style="margin-bottom:16px">✨ Features</h3>
            <div class="amenities-grid">
              ${(t.features||[]).map(f => `<div class="amenity-item"><span class="amenity-icon">✅</span><span class="amenity-label">${f}</span></div>`).join('')}
            </div>
          </div>
          <div>
            <div class="booking-widget">
              <div style="font-family:var(--font-head);font-size:1.1rem;font-weight:700;margin-bottom:4px">Book Transport</div>
              <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:20px">Select vehicle and dates</div>
              <div class="form-group">
                <label class="form-label">Vehicle</label>
                <select class="form-select" id="vehicle-select">
                  ${(t.vehicles||[]).map(v => `<option value="${v.price}">${v.name} — ₹${v.price?.toLocaleString()} ${v.priceUnit}</option>`).join('')}
                </select>
              </div>
              <div class="form-group"><label class="form-label">Pickup Date</label><input type="date" class="form-input" id="pickup-date" /></div>
              <div class="form-group"><label class="form-label">Drop-off Date</label><input type="date" class="form-input" id="dropoff-date" /></div>
              <div class="form-group"><label class="form-label">Pickup Location</label><input type="text" class="form-input" id="pickup-loc" placeholder="e.g. Aizawl Airport" /></div>
              <div id="transport-total" style="background:var(--glass);border-radius:var(--radius-sm);padding:14px;margin-bottom:16px;font-size:0.9rem;color:var(--text-muted)">Select vehicle and dates to see total</div>
              <button class="btn btn-primary w-full" id="book-transport-btn" style="justify-content:center;padding:16px;margin-bottom:12px">Book Now →</button>
              <p style="text-align:center;font-size:0.8rem;color:var(--text-muted)">🔒 Razorpay Secured</p>
              <div class="divider-h"></div>
              <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:6px">📞 ${t.phone}</div>
              <div style="font-size:0.85rem;color:var(--text-muted)">📧 ${t.email}</div>
            </div>
          </div>
        </div>
      </div>
    `;

    // wire date logic
    const today = new Date(); const tom = new Date(today); tom.setDate(tom.getDate() + 1);
    const toISO = d => d.toISOString().split('T')[0];
    document.getElementById('pickup-date').value  = toISO(today);
    document.getElementById('dropoff-date').value = toISO(tom);

    const updateTotal = () => {
      const price = parseInt(document.getElementById('vehicle-select')?.value || 0);
      const p = new Date(document.getElementById('pickup-date')?.value);
      const d = new Date(document.getElementById('dropoff-date')?.value);
      const days = Math.max(1, Math.round((d - p) / 86400000));
      const total = price * days;
      const el = document.getElementById('transport-total');
      if (el) el.innerHTML = `<div class="flex-between"><span>₹${price.toLocaleString()} × ${days} day${days>1?'s':''}</span><strong style="color:var(--text)">₹${total.toLocaleString()}</strong></div>`;
      return total;
    };
    updateTotal();
    ['vehicle-select','pickup-date','dropoff-date'].forEach(elId =>
      document.getElementById(elId)?.addEventListener('change', updateTotal)
    );
    document.getElementById('book-transport-btn')?.addEventListener('click', () => {
      const total = updateTotal();
      window.router.navigate(`/book/${id}?total=${total}&type=transport&name=${encodeURIComponent(t.name)}`);
    });

  } catch (e) {
    console.error('Transport detail error:', e);
    if (root) root.innerHTML = `<div class="container" style="margin-top:80px"><h1>Not found</h1></div>`;
  }
}
