import { fetchGuides } from '../lib/supabase.js';
import { starsHTML, appHref } from '../utils.js';

export function renderGuides() {
  const H = appHref;
  return `
    <section class="page-hero">
      <div class="container">
        <div class="section-label">👨‍🏫 Expert Local Guides</div>
        <h1>Hire a Guide</h1>
        <p style="max-width:600px;margin-bottom:32px">Every guide is certified, locally born, and passionately knowledgeable about Mizoram's terrain, culture, and wildlife.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="grid-3" id="guides-grid">
          <div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted)">⏳ Loading guides…</div>
        </div>
        <div style="margin-top:60px;background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(245,158,11,0.05));border:1px solid rgba(16,185,129,0.2);border-radius:var(--radius-xl);padding:48px;text-align:center">
          <div style="font-size:2.5rem;margin-bottom:16px">🧭</div>
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

  try {
    // 10-second timeout so the spinner never hangs forever
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out. Please check your connection.')), 10000)
    );
    const guides = await Promise.race([fetchGuides(), timeout]);

    if (!guides.length) {
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted)"><div style="font-size:3rem;margin-bottom:16px">🧭</div><p>No guides are available right now.<br>Check back soon or <a href="/host-signup-guide" data-link style="color:var(--emerald-400)">register as a guide</a>.</p></div>';
      wireLinks && wireLinks();
      return;
    }

    grid.innerHTML = guides.map(g => `
      <div class="card" data-href="/guide/${g.id}" style="cursor:pointer">
        <div class="card-img-wrap" style="height:240px">
          <img src="${g.cover_image}" alt="${g.name}" loading="lazy" style="object-position:top" />
          ${g.verified ? `<div class="card-badge" style="background:rgba(16,185,129,0.9);color:#fff">✅ VERIFIED</div>` : ''}
          <div class="card-rating">${starsHTML(g.rating)} <span>${g.rating} (${g.reviews_count})</span></div>
        </div>
        <div class="card-body">
          <h4 class="card-title">${g.name}</h4>
          <div style="font-size:0.85rem;color:var(--emerald-400);font-weight:600;margin-bottom:6px">${g.title}</div>
          <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px">📍 ${g.location} &nbsp;•&nbsp; 🗓 ${g.experience}</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">
            ${(g.languages||[]).map(l => `<span class="tag" style="font-size:0.72rem">🗣 ${l}</span>`).join('')}
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">
            ${(g.specialties||[]).slice(0,2).map(s => `<span class="tag">${s}</span>`).join('')}
          </div>
          <div class="flex-between">
            <span class="price" style="font-size:1.1rem">₹${g.price?.toLocaleString()}<span>/${g.price_unit?.split(' ')[1] || 'day'}</span></span>
            <span class="btn btn-outline btn-sm">View &amp; Book</span>
          </div>
        </div>
      </div>
    `).join('');
    grid.querySelectorAll('[data-href]').forEach(el =>
      el.addEventListener('click', () => window.router.navigate(el.dataset.href))
    );
  } catch (e) {
    console.error('Error loading guides:', e);
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted)">
      <div style="font-size:2.5rem;margin-bottom:12px">⚠️</div>
      <p style="margin-bottom:16px">${e.message || 'Failed to load guides. Please try again.'}</p>
      <button class="btn btn-outline btn-sm" onclick="window.router.navigate('/guides')">Retry</button>
    </div>`;
  }
}

export async function renderGuideDetail(id) {
  // We return a loading placeholder; the real content is injected by initGuideDetail
  return `<div id="guide-detail-root" style="padding-top:76px"><div class="container" style="margin-top:24px;text-align:center;padding:60px;color:var(--text-muted)">⏳ Loading guide…</div></div>`;
}

export async function initGuideDetail(id) {
  const { fetchGuideById } = await import('../lib/supabase.js');
  const root = document.getElementById('guide-detail-root');

  try {
    const g = await fetchGuideById(id);
    if (!g || !root) return;

    root.innerHTML = `
      <div class="container" style="margin-top:24px">
        <div class="detail-layout">
          <div>
            <div style="display:flex;gap:24px;align-items:flex-start;margin-bottom:28px;flex-wrap:wrap">
              <img src="${g.cover_image}" alt="${g.name}" style="width:120px;height:120px;border-radius:50%;object-fit:cover;object-position:top;border:3px solid var(--emerald-500);flex-shrink:0" />
              <div>
                <h1 style="font-size:clamp(1.5rem,3vw,2rem);margin-bottom:4px">${g.name}</h1>
                <div style="color:var(--emerald-400);font-weight:600;margin-bottom:8px">${g.title}</div>
                <div style="display:flex;gap:4px;align-items:center;margin-bottom:8px">${starsHTML(g.rating)} <strong>${g.rating}</strong> <span style="color:var(--text-muted)">(${g.reviews_count} reviews)</span></div>
                <div style="font-size:0.9rem;color:var(--text-muted)">📍 ${g.location} &nbsp;•&nbsp; 🗓 ${g.experience} experience</div>
              </div>
            </div>
            <div class="divider-h"></div>
            <h3 style="margin-bottom:12px">About ${g.name}</h3>
            <p style="margin-bottom:24px">${g.bio}</p>
            <h3 style="margin-bottom:16px">🎯 Specialties</h3>
            <div class="amenities-grid" style="margin-bottom:28px">
              ${(g.specialties||[]).map(s => `<div class="amenity-item"><span class="amenity-icon">🏔</span><span class="amenity-label">${s}</span></div>`).join('')}
            </div>
            <h3 style="margin-bottom:16px">🗣 Languages</h3>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:28px">
              ${(g.languages||[]).map(l => `<span class="tag">${l}</span>`).join('')}
            </div>
            <h3 style="margin-bottom:16px">📜 Certifications</h3>
            <div style="margin-bottom:32px">
              ${(g.certifications||[]).map(c => `<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--glass-border)"><span style="color:var(--emerald-400)">✅</span><span style="font-size:0.9rem;color:var(--text-muted)">${c}</span></div>`).join('')}
            </div>
            <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:24px">
              <h4 style="margin-bottom:16px">📸 Gallery</h4>
              <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
                ${(g.images||[]).slice(1).map((img,i) => `<img src="${img}" alt="${g.name} ${i+2}" style="width:100%;height:130px;object-fit:cover;border-radius:var(--radius-sm)" />`).join('')}
              </div>
            </div>
          </div>
          <div>
            <div class="booking-widget">
              <div class="booking-price"><span class="price" style="font-size:1.6rem">₹${g.price?.toLocaleString()}</span><span style="color:var(--text-muted)">/${g.price_unit}</span></div>
              <div class="form-group mt-16"><label class="form-label">Select Date</label><input type="date" class="form-input" id="guide-date" /></div>
              <div class="form-group"><label class="form-label">Trip Type</label>
                <select class="form-select" id="guide-trip">
                  ${(g.specialties||[]).map(s => `<option>${s}</option>`).join('')}
                </select>
              </div>
              <div class="form-group"><label class="form-label">Group Size</label>
                <select class="form-select" id="guide-group">
                  ${[1,2,3,4,5,6].map(n => `<option value="${n}">${n} person${n>1?'s':''}</option>`).join('')}
                </select>
              </div>
              <button class="btn btn-primary w-full" id="book-guide-btn" style="justify-content:center;padding:16px;margin-bottom:12px">Book Guide →</button>
              <p style="text-align:center;font-size:0.8rem;color:var(--text-muted)">🔒 Secured by Razorpay</p>
              <div class="divider-h"></div>
              <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:6px">📞 ${g.phone}</div>
              <div style="font-size:0.85rem;color:var(--text-muted)">📧 ${g.email}</div>
            </div>
          </div>
        </div>
      </div>
    `;

    // wire booking button
    const today = new Date().toISOString().split('T')[0];
    const dateEl = document.getElementById('guide-date');
    if (dateEl) dateEl.value = today;
    document.getElementById('book-guide-btn')?.addEventListener('click', () => {
      const date = document.getElementById('guide-date')?.value;
      window.router.navigate(`/book/guide-${id}?date=${date}&total=${g.price}&type=guide&name=${encodeURIComponent(g.name)}`);
    });

  } catch (e) {
    console.error('Guide detail error:', e);
    if (root) root.innerHTML = `<div class="container" style="margin-top:80px"><h1>Guide not found</h1></div>`;
  }
}
