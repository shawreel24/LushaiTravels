import { fetchStays } from '../lib/supabase.js';
import { starsHTML } from '../utils.js';
import { seedStays } from '../data/stays.js';

export function renderStays() {
  return `
    <section class="page-hero">
      <div class="container">
        <div class="section-label">🏡 Where to Stay</div>
        <h1>Stays in Mizoram</h1>
        <p style="max-width:600px;margin-bottom:32px">Handpicked homestays, lodges, and camps. Every host is verified and every experience is authentic.</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          ${['All','Homestay','Hotel','Lodge','Camping'].map((t,i) => `<div class="chip ${i===0?'active':''}" data-type="${t.toLowerCase()}">${t}</div>`).join('')}
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div id="stays-grid" class="grid-3">
          <div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted)">⏳ Loading stays…</div>
        </div>
      </div>
    </section>
  `;
}

export async function initStays() {
  let activeType = 'all';
  let allStays = seedStays; // start with seed data

  const grid = document.getElementById('stays-grid');

  const renderGrid = (stays) => {
    if (!grid) return;
    const filtered = activeType === 'all'
      ? stays
      : stays.filter(s => s.type?.toLowerCase() === activeType);
    grid.innerHTML = filtered.length
      ? filtered.map(stayCard).join('')
      : '<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted)">No stays found.</div>';
    grid.querySelectorAll('[data-href]').forEach(el =>
      el.addEventListener('click', () => window.router.navigate(el.dataset.href))
    );
  };

  // ① Render seed data INSTANTLY — no spinner
  renderGrid(allStays);

  // ② Wire filter chips
  document.querySelectorAll('.chip[data-type]').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip[data-type]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeType = chip.dataset.type;
      renderGrid(allStays);
    });
  });

  // ③ Silently fetch live Supabase data in background
  try {
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), 8000)
    );
    const liveStays = await Promise.race([fetchStays(), timeout]);
    if (liveStays && liveStays.length) {
      allStays = liveStays;
      renderGrid(allStays);
    }
  } catch (e) {
    // Seed data already shown — silent failure is fine
    console.warn('[stays] Live fetch failed, showing seed data:', e.message);
  }
}

function stayCard(s) {
  return `
    <div class="card stay-card" data-href="/stay/${s.id}">
      <div class="card-img-wrap">
        <img src="${s.cover_image}" alt="${s.name}" loading="lazy" />
        <div class="card-badge">${s.type?.toUpperCase()}</div>
        ${s.top_rated ? `<div style="position:absolute;top:12px;right:12px;background:rgba(245,158,11,0.9);backdrop-filter:blur(8px);padding:4px 10px;border-radius:50px;font-size:0.72rem;font-weight:700;color:#000">🔥 TOP RATED</div>` : ''}
        <div class="card-rating">${starsHTML(s.rating)} <span>${s.rating} (${s.reviews_count})</span></div>
      </div>
      <div class="card-body">
        <h4 class="card-title">${s.name}</h4>
        <div class="card-meta" style="margin-bottom:8px">📍 ${s.location}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">
          ${(s.amenities || []).slice(0, 3).map(a => `<span class="tag" style="font-size:0.72rem">${a}</span>`).join('')}
          ${(s.amenities || []).length > 3 ? `<span class="tag" style="font-size:0.72rem">+${s.amenities.length - 3} more</span>` : ''}
        </div>
        <div class="flex-between">
          <span class="price">₹${s.price?.toLocaleString()}<span>/night</span></span>
          <span style="font-size:0.8rem;color:var(--text-muted)">👥 Max ${s.max_guests}</span>
        </div>
      </div>
    </div>
  `;
}
