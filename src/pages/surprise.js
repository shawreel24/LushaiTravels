import { loadDestinations } from '../lib/destination-store.js';
import { itineraries } from '../data/itineraries.js';
import { stays } from '../data/stays.js';

const SURPRISE_EXCLUDED_IDS = new Set(['lengteng-wildlife']);
const filters = [
  { id: 'all', label: '✨ Any Vibe', icon: '🎲' },
  { id: 'adventure', label: '🧗 Adventure' },
  { id: 'relaxation', label: '🌿 Relaxation' },
  { id: 'culture', label: '🏛️ Culture' },
  { id: 'wildlife', label: '🦅 Wildlife' },
  { id: 'budget', label: '💰 Budget' },
];

let activeFilter = 'all';
let isRolling = false;
let destinations = [];

function getSurpriseDestinations() {
  return destinations.filter(d => !SURPRISE_EXCLUDED_IDS.has(d.id));
}

export function renderSurprise() {
  return `
    <section class="page-hero text-center">
      <div class="container">
        <div class="hero-badge" style="justify-content:center">🎲 Our Signature Feature</div>
        <h1>Surprise Me</h1>
        <p class="hero-subtitle" style="margin:0 auto">Don't know where to go? Let LushaiTrips pick your perfect Mizoram adventure — destination, itinerary, and stay included.</p>
      </div>
    </section>

    <section class="section">
      <div class="container text-center">
        <p style="font-size:0.9rem;color:var(--text-muted);margin-bottom:20px">Filter by vibe (optional)</p>
        <div class="filter-chips" id="surprise-filters">
          ${filters.map(f => `<div class="chip ${f.id === 'all' ? 'active' : ''}" data-filter="${f.id}">${f.label}</div>`).join('')}
        </div>

        <button class="dice-btn" id="dice-btn" title="Surprise Me!">🎲</button>
        <p style="color:var(--text-muted);margin-top:-16px;margin-bottom:32px">Tap the dice to discover</p>

        <!-- Rolling animation -->
        <div id="rolling" class="hidden">
          <div class="loading-spinner"></div>
          <p style="margin-top:16px;color:var(--text-muted);animation:pulse-glow 1s infinite">Finding your perfect trip…</p>
        </div>

        <!-- Result -->
        <div class="surprise-result" id="surprise-result">
          <div class="result-card" id="result-card"></div>
          <div style="display:flex;gap:12px;justify-content:center;margin-top:24px">
            <button class="btn btn-secondary" id="reroll-btn">🎲 Try Another</button>
            <button class="btn btn-primary" id="book-result-btn">Book This Trip →</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export async function initSurprise() {
  destinations = await loadDestinations();
  document.querySelectorAll('.chip[data-filter]').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip[data-filter]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.dataset.filter;
    });
  });

  document.getElementById('dice-btn')?.addEventListener('click', roll);
  document.getElementById('reroll-btn')?.addEventListener('click', roll);
}

function roll() {
  if (isRolling) return;
  isRolling = true;

  const rolling = document.getElementById('rolling');
  const result = document.getElementById('surprise-result');
  const btn = document.getElementById('dice-btn');

  result.classList.remove('show');
  rolling.classList.remove('hidden');
  btn.style.animation = 'spin 0.5s linear infinite';

  setTimeout(() => {
    rolling.classList.add('hidden');
    btn.style.animation = 'float 3s ease-in-out infinite';

    const availableDestinations = getSurpriseDestinations();
    const pool = activeFilter === 'all'
      ? availableDestinations
      : availableDestinations.filter(d => d.category === activeFilter || d.tags.includes(activeFilter));

    const dest = pool[Math.floor(Math.random() * pool.length)] || availableDestinations[0] || destinations[0];
    const itin = itineraries.find(i => i.destinationId === dest.id) || itineraries[Math.floor(Math.random() * itineraries.length)];
    const stay = stays.find(s => s.id === itin?.stayId) || stays[Math.floor(Math.random() * stays.length)];

    document.getElementById('result-card').innerHTML = buildResult(dest, itin, stay);
    result.classList.add('show');

    document.getElementById('book-result-btn')?.addEventListener('click', () => {
      window.router.navigate(`/stay/${stay.id}`);
    });
    document.getElementById('view-dest-btn')?.addEventListener('click', () => {
      window.router.navigate(`/destination/${dest.id}`);
    });

    isRolling = false;
  }, 1800);
}

function buildResult(dest, itin, stay) {
  return `
    <img src="${dest.coverImage}" alt="${dest.name}" class="result-img" />
    <div class="result-body text-left">
      <div class="duration-badge">📅 ${itin?.days || 1}-Day Trip • ${dest.district} District</div>
      <h2 style="margin-bottom:8px">${itin?.title || dest.name + ' Adventure'}</h2>
      <p style="margin-bottom:20px">${dest.description.slice(0, 160)}…</p>

      <h4 style="margin-bottom:12px">📍 Your Itinerary</h4>
      <ul class="itinerary-list">
        ${(itin?.plan || []).flatMap(day =>
          day.activities.slice(0, 3).map(a => `<li><span class="day-badge">Day ${day.day}</span> ${a}</li>`)
        ).slice(0, 6).join('')}
      </ul>

      ${stay ? `
        <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:20px;margin-top:24px">
          <div style="font-size:0.8rem;font-weight:700;color:var(--emerald-400);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px">🏡 Suggested Stay</div>
          <div style="display:flex;align-items:center;gap:14px">
            <img src="${stay.coverImage}" style="width:72px;height:72px;border-radius:12px;object-fit:cover" />
            <div>
              <div style="font-weight:700;margin-bottom:4px">${stay.name}</div>
              <div style="font-size:0.85rem;color:var(--text-muted)">${stay.type} • ${stay.location}</div>
              <div style="color:var(--emerald-400);font-weight:700;margin-top:4px">₹${stay.price.toLocaleString()}/night</div>
            </div>
          </div>
        </div>
      ` : ''}

      <div style="display:flex;gap:12px;margin-top:20px;flex-wrap:wrap">
        ${dest.highlights.map(h => `<span class="tag">✓ ${h}</span>`).join('')}
      </div>
      <button class="btn btn-outline mt-16" id="view-dest-btn">View Destination Details</button>
    </div>
  `;
}
