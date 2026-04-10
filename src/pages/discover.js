import { getDestinationCategories, loadDestinations } from '../lib/destination-store.js';
import { starsHTML } from '../utils.js';

let activeCategory = 'all';
let searchQuery = '';
let destinations = [];
const DISCOVERY_EXCLUDED_IDS = new Set(['lengteng-wildlife']);

function getDiscoveryDestinations() {
  return destinations.filter(d => !DISCOVERY_EXCLUDED_IDS.has(d.id));
}

export function renderDiscover() {
  const categories = getDestinationCategories();
  return `
    <section class="page-hero">
      <div class="container">
        <div class="section-label">🗺️ All Destinations</div>
        <h1>Discover Mizoram</h1>
        <p style="max-width:600px;margin-bottom:32px">Waterfalls, mountain peaks, hidden lakes, wildlife sanctuaries and cultural heartlands — explore them all.</p>
        <div style="position:relative;max-width:500px">
          <span style="position:absolute;left:16px;top:50%;transform:translateY(-50%);color:var(--text-dim);font-size:1.1rem">🔍</span>
          <input type="text" id="discover-search" class="form-input" placeholder="Search destinations…" style="padding-left:44px;border-radius:50px" />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- Category filter chips -->
        <div class="filter-chips" id="cat-filters" style="justify-content:flex-start;margin-bottom:40px">
          ${categories.map(c => `<div class="chip ${c.id === 'all' ? 'active' : ''}" data-cat="${c.id}">${c.icon} ${c.label}</div>`).join('')}
        </div>

        <!-- Hidden Gems -->
        <div style="background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(245,158,11,0.05));border:1px solid rgba(16,185,129,0.2);border-radius:var(--radius-lg);padding:28px;margin-bottom:48px">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
            <span style="font-size:1.5rem">💎</span>
            <div>
              <div style="font-weight:700;font-size:1.1rem">Hidden Gems</div>
              <div style="font-size:0.85rem;color:var(--text-muted)">Off the beaten path — few tourists, maximum magic</div>
            </div>
          </div>
          <div class="grid-4" id="hidden-gems-grid"></div>
        </div>

        <!-- All Destinations Grid -->
        <div class="flex-between" style="margin-bottom:24px">
          <h3 id="results-count">All Destinations</h3>
        </div>
        <div class="grid-3" id="destinations-grid"></div>
      </div>
    </section>
  `;
}

export function initDiscover() {
  // Render immediately with local data (no await, no loading spinner)
  destinations = loadDestinations({
    onUpdate(freshList) {
      // Silently re-render when Supabase data arrives
      destinations = freshList;
      renderGrid();
      renderHiddenGems();
    },
  });
  renderGrid();
  renderHiddenGems();

  document.querySelectorAll('.chip[data-cat]').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip[data-cat]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.dataset.cat;
      renderGrid();
    });
  });

  document.getElementById('discover-search')?.addEventListener('input', e => {
    searchQuery = e.target.value.toLowerCase();
    renderGrid();
  });
}


function getFiltered() {
  return getDiscoveryDestinations().filter(d => {
    const matchCat = activeCategory === 'all' || d.category === activeCategory || d.tags.includes(activeCategory);
    const matchSearch = !searchQuery || d.name.toLowerCase().includes(searchQuery) || d.district.toLowerCase().includes(searchQuery) || d.type.toLowerCase().includes(searchQuery);
    return matchCat && matchSearch;
  });
}

function renderGrid() {
  const filtered = getFiltered();
  const grid = document.getElementById('destinations-grid');
  const count = document.getElementById('results-count');
  if (count) count.textContent = `${filtered.length} Destination${filtered.length !== 1 ? 's' : ''}`;
  if (!grid) return;
  if (!filtered.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-dim)">😕 No destinations found. Try a different filter.</div>`;
    return;
  }
  grid.innerHTML = filtered.map(d => destinationCard(d)).join('');
  grid.querySelectorAll('[data-href]').forEach(card => {
    card.addEventListener('click', () => window.router.navigate(card.dataset.href));
  });
}

function renderHiddenGems() {
  const gems = getDiscoveryDestinations().filter(d => d.reviews < 50);
  const grid = document.getElementById('hidden-gems-grid');
  if (!grid) return;
  grid.innerHTML = gems.slice(0, 4).map(d => `
    <div class="card" data-href="/destination/${d.id}" style="cursor:pointer">
      <div class="card-img-wrap" style="height:160px">
        <img src="${d.coverImage}" alt="${d.name}" loading="lazy" />
        <div class="card-badge">💎 HIDDEN GEM</div>
      </div>
      <div class="card-body" style="padding:14px">
        <div style="font-weight:700;font-size:0.95rem;margin-bottom:4px">${d.name}</div>
        <div style="font-size:0.8rem;color:var(--text-muted)">📍 ${d.district}</div>
      </div>
    </div>
  `).join('');
  grid.querySelectorAll('[data-href]').forEach(card => {
    card.addEventListener('click', () => window.router.navigate(card.dataset.href));
  });
}

function destinationCard(d) {
  const diffColor = { Easy: '#10b981', Moderate: '#f59e0b', Hard: '#ef4444' }[d.difficulty] || '#94a3b8';
  return `
    <div class="card destination-card animate-in" data-href="/destination/${d.id}">
      <div class="card-img-wrap">
        <img src="${d.coverImage}" alt="${d.name}" loading="lazy" />
        <div class="card-badge">${d.type.toUpperCase()}</div>
        <div class="card-rating">${starsHTML(d.rating)} <span>${d.rating} (${d.reviews})</span></div>
      </div>
      <div class="card-body">
        <h4 class="card-title">${d.name}</h4>
        <div class="card-meta" style="margin-bottom:10px">
          📍 ${d.district} &nbsp;•&nbsp; ⏱ ${d.duration} &nbsp;•&nbsp;
          <span style="color:${diffColor};font-weight:600">${d.difficulty}</span>
        </div>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${d.tagline}</p>
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:0.8rem;color:var(--text-muted)">
          <span>🌤 Best: ${d.bestTime}</span>
          <span class="btn btn-outline btn-sm">Explore →</span>
        </div>
      </div>
    </div>
  `;
}
