import { loadDestinationById } from '../lib/destination-store.js';
import { stays } from '../data/stays.js';
import { getReviews, addReview, starsHTML, calcAvgRating, isLoggedIn, getCurrentUser, showToast, isWishlisted, toggleWishlist, appHref } from '../utils.js';

export async function renderDestinationDetail(id) {
  const H = appHref;
  const dest = await loadDestinationById(id);
  if (!dest) return `<div class="page-hero container"><h1>Destination not found</h1></div>`;

  const nearbyStays = stays.filter((s) => s.location.toLowerCase().includes(dest.district.toLowerCase())).slice(0, 2);
  const reviews = getReviews(`dest-${id}`);
  const avg = calcAvgRating(reviews);

  return `
    <!-- Gallery Hero -->
    <div style="padding-top:76px">
      <div class="gallery container" style="margin-top:20px">
        <div class="gallery-main" onclick="openLightbox(0,'${id}')">
          <img src="${dest.images[0]}" alt="${dest.name}" />
        </div>
        ${dest.images.slice(1, 3).map((img, i) => `
          <div class="gallery-thumb" onclick="openLightbox(${i + 1},'${id}')">
            <img src="${img}" alt="${dest.name} ${i + 2}" />
          </div>
        `).join('')}
        ${dest.images[3] ? `
          <div class="gallery-thumb gallery-more" data-more="📷 View all" onclick="openLightbox(3,'${id}')">
            <img src="${dest.images[3]}" alt="more" />
          </div>` : ''}
      </div>
    </div>

    <div class="container">
      <div class="detail-layout">
        <div>
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:8px">
            <h1 style="font-size:clamp(1.8rem,4vw,2.8rem)">${dest.name}</h1>
            <button id="wishlist-btn" style="background:var(--glass);border:1px solid var(--glass-border);border-radius:50%;width:46px;height:46px;font-size:1.3rem;cursor:pointer;flex-shrink:0;transition:var(--transition)">${isWishlisted(`dest-${id}`) ? '❤️' : '🤍'}</button>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin-bottom:20px">
            <div style="display:flex;gap:4px;align-items:center">${starsHTML(dest.rating)} <strong>${dest.rating}</strong> <span style="color:var(--text-muted)">(${dest.reviews} reviews)</span></div>
            <span style="color:var(--text-dim)">•</span>
            <span>📍 ${dest.district} District</span>
            <span style="color:var(--text-dim)">•</span>
            <span>⏱ ${dest.duration}</span>
            <span style="color:var(--text-dim)">•</span>
            <span style="color:${{ Easy: '#10b981', Moderate: '#f59e0b', Hard: '#ef4444' }[dest.difficulty]}">● ${dest.difficulty}</span>
          </div>

          <div class="divider-h"></div>
          <h3 style="margin-bottom:12px">About this Place</h3>
          <p style="margin-bottom:24px">${dest.description}</p>

          ${dest.quickFacts?.length ? `
            <h3 style="margin-bottom:16px">Quick Facts</h3>
            <div class="grid-2" style="margin-bottom:32px">
              ${dest.quickFacts.map((fact) => `
                <div class="card card-body">
                  <div style="font-size:0.8rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-dim);margin-bottom:6px">${fact.label}</div>
                  <div style="font-weight:700;font-size:1.05rem">${fact.value}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <h3 style="margin-bottom:16px">✨ Highlights</h3>
          <div class="amenities-grid" style="margin-bottom:32px">
            ${dest.highlights.map((h) => `<div class="amenity-item"><span class="amenity-icon">✅</span><span class="amenity-label">${h}</span></div>`).join('')}
          </div>

          <div class="grid-2" style="margin-bottom:32px">
            <div class="card card-body">
              <div style="font-size:1.5rem;margin-bottom:8px">🌤</div>
              <div style="font-weight:700;margin-bottom:4px">Best Time to Visit</div>
              <div style="color:var(--text-muted)">${dest.bestTime}</div>
            </div>
            <div class="card card-body">
              <div style="font-size:1.5rem;margin-bottom:8px">🗺️</div>
              <div style="font-weight:700;margin-bottom:4px">Nearby Attractions</div>
              <ul style="list-style:none;color:var(--text-muted);font-size:0.9rem">${dest.nearbyAttractions.map((n) => `<li>• ${n}</li>`).join('')}</ul>
            </div>
          </div>

          <h3 style="margin-bottom:16px">📍 Location</h3>
          <div id="dest-map" class="map-container" style="margin-bottom:32px"></div>

          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:32px">
            ${dest.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
          </div>

          <div class="divider-h"></div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
            <h3>${avg > 0 ? `⭐ ${avg} · ` : ''}${reviews.length} Review${reviews.length !== 1 ? 's' : ''}</h3>
            <button class="btn btn-outline btn-sm" id="write-review-btn">✍️ Write a Review</button>
          </div>

          <div id="reviews-list">
            ${reviews.length ? reviews.map((r) => reviewCard(r)).join('') : `<p style="color:var(--text-muted)">No reviews yet. Be the first!</p>`}
          </div>

          <div id="review-form" class="hidden" style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:28px;margin-top:24px">
            <h4 style="margin-bottom:20px">Share Your Experience</h4>
            <div class="form-group">
              <label class="form-label">Rating</label>
              <div class="star-input" id="star-input">
                ${[5, 4, 3, 2, 1].map((n) => `<input type="radio" name="rating" id="r${n}" value="${n}"><label for="r${n}">★</label>`).join('')}
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Your Review</label>
              <textarea class="form-textarea" id="review-text" placeholder="Tell others about your experience..."></textarea>
            </div>
            <button class="btn btn-primary" id="submit-review-btn">Submit Review</button>
          </div>

          ${nearbyStays.length ? `
            <div class="divider-h"></div>
            <h3 style="margin-bottom:24px">🏡 Stays Near ${dest.name}</h3>
            <div class="grid-2">
              ${nearbyStays.map((s) => `
                <div class="card" data-href="/stay/${s.id}" style="cursor:pointer">
                  <div class="card-img-wrap" style="height:160px"><img src="${s.coverImage}" alt="${s.name}" loading="lazy" /></div>
                  <div class="card-body">
                    <div style="font-weight:700">${s.name}</div>
                    <div style="display:flex;justify-content:space-between;margin-top:8px">
                      <span class="price" style="font-size:1rem">₹${s.price.toLocaleString()}<span>/night</span></span>
                      <span>${starsHTML(s.rating)} ${s.rating}</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <div>
          <div class="booking-widget">
            <div style="font-family:var(--font-head);font-size:1.1rem;font-weight:700;margin-bottom:12px">🌄 Plan a Trip Here</div>
            <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:20px">Find stays, guides, and transport for ${dest.name}.</div>
            <a href="${H('/stays')}" class="btn btn-primary w-full" data-link style="justify-content:center;margin-bottom:12px">🏡 Browse Stays</a>
            <a href="${H('/guides')}" class="btn btn-secondary w-full" data-link style="justify-content:center;margin-bottom:12px">🧑‍🏫 Hire a Guide</a>
            <a href="${H('/transport')}" class="btn btn-secondary w-full" data-link style="justify-content:center;margin-bottom:20px">🚗 Book Transport</a>
            <a href="${H('/surprise')}" class="btn btn-amber w-full" data-link style="justify-content:center">🎲 Surprise Me</a>
            <div class="divider-h"></div>
            <div style="font-size:0.85rem;color:var(--text-muted);text-align:center">🔒 Secure booking</div>
          </div>
        </div>
      </div>
    </div>

    <div class="lightbox" id="lightbox">
      <button class="lightbox-close" id="lb-close">✕</button>
      <button class="lightbox-prev" id="lb-prev">‹</button>
      <img id="lb-img" src="" alt="Gallery" />
      <button class="lightbox-next" id="lb-next">›</button>
    </div>
  `;
}

export async function initDestinationDetail(id) {
  const dest = await loadDestinationById(id);
  if (!dest) return;

  setTimeout(() => {
    const mapEl = document.getElementById('dest-map');
    if (!mapEl || mapEl._leaflet_id) return;
    const map = L.map('dest-map').setView([dest.lat, dest.lng], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map);
    L.marker([dest.lat, dest.lng]).addTo(map).bindPopup(`<b>${dest.name}</b><br>${dest.district} District`).openPopup();
  }, 100);

  const imgs = dest.images;
  let currentIdx = 0;
  window.openLightbox = (idx) => {
    currentIdx = idx;
    document.getElementById('lb-img').src = imgs[currentIdx];
    document.getElementById('lightbox').classList.add('open');
  };
  document.getElementById('lb-close')?.addEventListener('click', () => document.getElementById('lightbox').classList.remove('open'));
  document.getElementById('lb-prev')?.addEventListener('click', () => {
    currentIdx = (currentIdx - 1 + imgs.length) % imgs.length;
    document.getElementById('lb-img').src = imgs[currentIdx];
  });
  document.getElementById('lb-next')?.addEventListener('click', () => {
    currentIdx = (currentIdx + 1) % imgs.length;
    document.getElementById('lb-img').src = imgs[currentIdx];
  });

  document.getElementById('wishlist-btn')?.addEventListener('click', () => {
    const btn = document.getElementById('wishlist-btn');
    const wishlisted = toggleWishlist(`dest-${id}`);
    btn.textContent = wishlisted ? '❤️' : '🤍';
    showToast(wishlisted ? 'Added to Wishlist' : 'Removed from Wishlist');
  });

  document.getElementById('write-review-btn')?.addEventListener('click', () => {
    if (!isLoggedIn()) {
      showToast('Login required', 'Please log in to write a review', 'error');
      return;
    }
    document.getElementById('review-form').classList.toggle('hidden');
  });

  document.getElementById('submit-review-btn')?.addEventListener('click', () => {
    const rating = parseInt(document.querySelector('input[name="rating"]:checked')?.value || 0, 10);
    const text = document.getElementById('review-text')?.value?.trim();
    if (!rating) {
      showToast('Please select a rating', '', 'error');
      return;
    }
    if (!text) {
      showToast('Please write your review', '', 'error');
      return;
    }
    const user = getCurrentUser();
    addReview({ listingId: `dest-${id}`, rating, text, userName: user.fullName || user.name, userAvatar: user.avatar });
    showToast('Review submitted! ⭐');
    document.getElementById('review-form').classList.add('hidden');
    const nextReviews = getReviews(`dest-${id}`);
    document.getElementById('reviews-list').innerHTML = nextReviews.map((r) => reviewCard(r)).join('');
  });

  document.querySelectorAll('[data-href]').forEach((el) => {
    el.addEventListener('click', () => window.router.navigate(el.dataset.href));
  });
}

function reviewCard(r) {
  return `
    <div class="review-card">
      <div class="review-header">
        <div class="review-avatar">${r.userAvatar || r.userName?.charAt(0) || '?'}</div>
        <div class="review-meta">
          <div class="review-name">${r.userName}</div>
          <div class="review-date">${new Date(r.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</div>
        </div>
        <div style="margin-left:auto">${starsHTML(r.rating)}</div>
      </div>
      <p class="review-text">${r.text}</p>
      <span class="verified-badge">✅ Verified Visit</span>
    </div>
  `;
}
