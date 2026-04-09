import { destinations, categories } from '../data/destinations.js';
import { starsHTML, appHref } from '../utils.js';

const HOME_EXCLUDED_IDS = new Set(['lengteng-wildlife']);

export function renderHome() {
  const H = appHref;
  const featured = destinations.filter(d => !HOME_EXCLUDED_IDS.has(d.id)).slice(0, 6);
  return `
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-pattern"></div>
      <div class="hero-glow"></div>
      <div class="hero-glow2"></div>
      <div class="container hero-content" style="padding-top:100px">
        <div class="hero-badge">🌿 Mizoram #1 Discovery Platform</div>
        <h1 class="hero-title">Explore <span class="gradient-text">Mizoram's</span><br>Hidden Gems</h1>
        <p class="hero-subtitle">Don't know where to go? Let the app decide. Discover waterfalls, mountain peaks, and secret lakes across the Lushai Hills.</p>
        <div class="hero-actions">
          <a href="${H('/surprise')}" class="btn btn-amber btn-lg" data-link>🎲 Surprise Me</a>
          <a href="${H('/discover')}" class="btn btn-secondary btn-lg" data-link>Explore Destinations</a>
        </div>
        <div class="hero-stats">
          <div class="stat-item"><div class="stat-num">50+</div><div class="stat-label">Destinations</div></div>
          <div class="stat-item"><div class="stat-num">200+</div><div class="stat-label">Happy Travelers</div></div>
          <div class="stat-item"><div class="stat-num">15+</div><div class="stat-label">Verified Hosts</div></div>
          <div class="stat-item"><div class="stat-num">4.8★</div><div class="stat-label">Avg Rating</div></div>
        </div>
      </div>
      <div style="position:absolute;bottom:30px;left:50%;transform:translateX(-50%);animation:float 2s ease-in-out infinite;color:var(--text-muted);font-size:1.5rem">↓</div>
    </section>

    <!-- Surprise Strip -->
    <section class="surprise-section section-sm">
      <div class="container text-center">
        <div class="section-label">✨ Our Unique Feature</div>
        <h2 style="margin-bottom:12px">Don't Plan. Just Go.</h2>
        <p style="max-width:500px;margin:0 auto 32px">One tap — get a destination, itinerary, and stay suggestion instantly.</p>
        <a href="${H('/surprise')}" class="btn btn-primary btn-lg" data-link>🎲 Try Surprise Me</a>
      </div>
    </section>

    <!-- Featured Destinations -->
    <section class="section">
      <div class="container">
        <div class="section-label">🗺️ Top Picks</div>
        <div class="flex-between" style="margin-bottom:40px;flex-wrap:wrap;gap:16px">
          <h2 class="section-title" style="margin:0">Featured Destinations</h2>
          <a href="${H('/discover')}" class="btn btn-outline" data-link>View All →</a>
        </div>
        <div class="grid-3">
          ${featured.map(d => `
            <div class="card destination-card animate-in" data-href="/destination/${d.id}">
              <div class="card-img-wrap">
                <img src="${d.coverImage}" alt="${d.name}" loading="lazy" />
                <div class="card-badge">${d.type.toUpperCase()}</div>
                <div class="card-rating">${starsHTML(d.rating)} <span>${d.rating}</span></div>
              </div>
              <div class="card-body">
                <h4 class="card-title">${d.name}</h4>
                <div class="card-meta" style="margin-bottom:10px">📍 ${d.district} &nbsp;•&nbsp; ⏱ ${d.duration}</div>
                <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${d.tagline}</p>
                <div style="display:flex;gap:6px;flex-wrap:wrap">
                  ${d.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="section" style="background:var(--bg2)">
      <div class="container text-center">
        <div class="section-label">🚀 Simple Process</div>
        <h2 style="margin-bottom:48px">How LushaiTrips Works</h2>
        <div class="grid-3">
          ${[
            { icon:'🎲', step:'1', title:'Discover or Surprise', desc:'Browse 50+ destinations or hit Surprise Me and let us pick the perfect trip for you.' },
            { icon:'📅', step:'2', title:'Book Your Stay', desc:'Choose from verified homestays, lodges, and campsites. Book guides and transport in one place.' },
            { icon:'🌄', step:'3', title:'Explore Mizoram', desc:'Show up, follow your itinerary, and experience Northeast India\'s best-kept secret.' },
          ].map(s => `
            <div class="card card-body text-center animate-in">
              <div style="font-size:3rem;margin-bottom:16px">${s.icon}</div>
              <div style="width:32px;height:32px;background:var(--emerald-700);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.85rem;margin:0 auto 16px">${s.step}</div>
              <h4 style="margin-bottom:10px">${s.title}</h4>
              <p style="font-size:0.9rem">${s.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Top Stays Preview -->
    <section class="section">
      <div class="container">
        <div class="section-label">🏡 Top Rated</div>
        <div class="flex-between" style="margin-bottom:40px;flex-wrap:wrap;gap:16px">
          <h2 style="margin:0">Loved by Travelers</h2>
          <a href="${H('/stays')}" class="btn btn-outline" data-link>All Stays →</a>
        </div>
        <div class="grid-3" id="home-stays-grid"></div>
      </div>
    </section>

    <!-- Services Strip -->
    <section class="section" style="background:var(--bg2)">
      <div class="container">
        <h2 class="text-center" style="margin-bottom:40px">Everything You Need</h2>
        <div class="grid-4">
          ${[
            { icon:'🏡', title:'Homestays', desc:'Authentic Mizo homes', href:'/stays' },
            { icon:'👨‍🏫', title:'Local Guides', desc:'Expert local experts', href:'/guides' },
            { icon:'🚗', title:'Transport', desc:'Cars, bikes & more', href:'/transport' },
            { icon:'⭐', title:'Reviews', desc:'Real verified stays', href:'/stays' },
          ].map(s => `
            <a href="${H(s.href)}" class="card card-body text-center" data-link style="cursor:pointer">
              <div style="font-size:2.5rem;margin-bottom:12px">${s.icon}</div>
              <h4 style="margin-bottom:6px">${s.title}</h4>
              <p style="font-size:0.85rem">${s.desc}</p>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CTA Banner -->
    <section class="section" style="background:linear-gradient(135deg,var(--emerald-900),var(--bg3))">
      <div class="container text-center">
        <h2 style="margin-bottom:16px">Have a Stay or Service to List?</h2>
        <p style="margin-bottom:32px;max-width:500px;margin-left:auto;margin-right:auto">Join our curated network of Mizoram hosts. List your homestay, guide service, or transport.</p>
        <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
          <a href="${H('/host-signup-stay')}" class="btn btn-primary btn-lg" data-link>🏡 List Your Stay</a>
          <a href="${H('/host-signup-guide')}" class="btn btn-secondary btn-lg" data-link>👨‍🏫 Become a Guide</a>
          <a href="${H('/host-signup-transport')}" class="btn btn-secondary btn-lg" data-link>🚗 List Transport</a>
        </div>
      </div>
    </section>
  `;
}

export function initHome() {
  // Clickable cards
  document.querySelectorAll('[data-href]').forEach(card => {
    card.addEventListener('click', () => window.router.navigate(card.dataset.href));
  });

  // Load stays preview
  import('../data/stays.js').then(({ stays }) => {
    const grid = document.getElementById('home-stays-grid');
    if (!grid) return;
    grid.innerHTML = stays.slice(0, 3).map(s => `
      <div class="card stay-card animate-in" data-href="/stay/${s.id}">
        <div class="card-img-wrap">
          <img src="${s.coverImage}" alt="${s.name}" loading="lazy" />
          <div class="card-badge">${s.type.toUpperCase()}</div>
          ${s.topRated ? '<div style="position:absolute;top:12px;right:12px;background:rgba(245,158,11,0.9);padding:3px 10px;border-radius:50px;font-size:0.72rem;font-weight:700;color:#000">🔥 TOP RATED</div>' : ''}
          <div class="card-rating">${starsHTML(s.rating)} <span>${s.rating}</span></div>
        </div>
        <div class="card-body">
          <h4 class="card-title">${s.name}</h4>
          <div class="card-meta" style="margin-bottom:8px">📍 ${s.location}</div>
          <div class="flex-between">
            <span class="price">₹${s.price.toLocaleString()}<span>/night</span></span>
            <span style="font-size:0.8rem;color:var(--text-muted)">👥 up to ${s.maxGuests}</span>
          </div>
        </div>
      </div>
    `).join('');
    document.querySelectorAll('.stay-card[data-href]').forEach(card => {
      card.addEventListener('click', () => window.router.navigate(card.dataset.href));
    });
  });
}
