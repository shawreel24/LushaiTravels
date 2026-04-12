import { stays } from '../data/stays.js';
import { getReviews, addReview, starsHTML, calcAvgRating, isLoggedIn, getCurrentUser, showToast, isWishlisted, toggleWishlist } from '../utils.js';

export function renderStayDetail(id) {
  return `<div id="stay-detail-container" style="padding-top:76px;min-height:80vh;display:flex;align-items:center;justify-content:center"><div class="spinner" style="font-size:1.5rem">Loading...</div></div>`;
}

export async function initStayDetail(id) {
  const container = document.getElementById('stay-detail-container');
  
  let stay = stays.find(s => s.id === id);
  
  if (!stay) { 
    try {
      const { fetchStayById, supabase } = await import('../lib/supabase.js');
      const liveStay = await fetchStayById(id);
      
      let hostProfile = null;
      if (liveStay.host_id) {
        const { data } = await supabase.from('profiles').select('*').eq('id', liveStay.host_id).single();
        hostProfile = data;
      }
      const hostName = hostProfile?.full_name || 'Host';
      
      stay = {
        ...liveStay,
        maxGuests: liveStay.max_guests,
        checkIn: liveStay.check_in,
        checkOut: liveStay.check_out,
        topRated: liveStay.top_rated,
        rating: liveStay.rating || 4.5,
        reviews: liveStay.reviews_count || liveStay.reviews || 0,
        lat: liveStay.lat || 23.7271,
        lng: liveStay.lng || 92.7176,
        coverImage: liveStay.cover_image,
        images: liveStay.images?.length ? liveStay.images : [liveStay.cover_image || 'https://via.placeholder.com/800'],
        host: {
          name: hostName,
          full_name: hostName,
          phone: hostProfile?.phone || '+91 00000 00000',
          avatar: hostName.charAt(0).toUpperCase(),
          since: new Date(liveStay.created_at || new Date()).getFullYear()
        }
      };
    } catch (e) {
      console.warn("Could not load live stay:", e);
      container.innerHTML = `<div class="page-hero container"><h1>Stay not found</h1></div>`; 
      return; 
    }
  }

  const reviews = getReviews(id);
  const avg = calcAvgRating(reviews);

  container.innerHTML = `
    <!-- Gallery -->
    <div class="container" style="margin-top:20px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
        <div>
          <h1 style="font-size:clamp(1.5rem,3vw,2.2rem);margin-bottom:6px">${stay.name}</h1>
          <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;font-size:0.9rem;color:var(--text-muted)">
            ${starsHTML(avg > 0 ? avg : stay.rating)} <strong style="color:var(--text)">${avg > 0 ? avg : stay.rating}</strong>
            <span>(${reviews.length || stay.reviews} reviews)</span> •
            <span>📍 ${stay.location}</span> •
            ${stay.verified ? `<span style="color:var(--emerald-400)">✅ Verified</span>` : ''}
            ${stay.topRated ? `<span class="top-rated-badge">🔥 Top Rated</span>` : ''}
          </div>
        </div>
        <div style="display:flex;gap:10px">
          <button id="wishlist-btn" style="background:var(--glass);border:1px solid var(--glass-border);border-radius:50px;padding:8px 16px;color:var(--text);cursor:pointer;font-size:0.9rem">${isWishlisted(id) ? '❤️ Saved' : '🤍 Save'}</button>
        </div>
      </div>

      <!-- Photo Gallery -->
      <div class="gallery" style="margin-bottom:0">
        <div class="gallery-main" onclick="openStayLightbox(0)"><img src="${stay.images[0]}" alt="${stay.name}" /></div>
        ${stay.images.slice(1, 3).map((img, i) => `<div class="gallery-thumb" onclick="openStayLightbox(${i + 1})"><img src="${img}" alt="${stay.name}" /></div>`).join('')}
        ${stay.images[3] ? `<div class="gallery-thumb gallery-more" data-more="📷 All photos" onclick="openStayLightbox(3)"><img src="${stay.images[3]}" alt="more" /></div>` : ''}
      </div>
      <div style="margin-bottom:4px;margin-top:6px">
        <span style="font-size:0.75rem;color:var(--emerald-400);background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);padding:3px 10px;border-radius:50px">📸 Real Photos Verified</span>
      </div>
    </div>

    <div class="container">
      <div class="detail-layout">
        <!-- LEFT -->
        <div>
          <!-- Host Info -->
          <div style="display:flex;align-items:center;gap:16px;padding:24px 0;border-bottom:1px solid var(--glass-border);margin-bottom:28px">
            <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--emerald-600),var(--emerald-800));display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.3rem;flex-shrink:0">${stay.host.avatar || 'H'}</div>
            <div>
              <div style="font-weight:700;font-size:1rem">${stay.type} hosted by ${stay.host.name || stay.host.full_name || 'Host'}</div>
              <div style="font-size:0.85rem;color:var(--text-muted)">Hosting since ${stay.host.since || new Date().getFullYear()} · ${stay.rooms} room${stay.rooms > 1 ? 's' : ''} · Up to ${stay.maxGuests} guests</div>
            </div>
          </div>

          <h3 style="margin-bottom:12px">About this place</h3>
          <p style="margin-bottom:28px">${stay.description}</p>

          <h3 style="margin-bottom:16px">🛎 Amenities</h3>
          <div class="amenities-grid" style="margin-bottom:32px">
            ${(stay.amenities || []).map(a => {
              const icons = { WiFi:'📶', Parking:'🅿️', 'Home-cooked Food':'🍛', 'Breakfast Included':'🥐', 'Hot Water':'🚿', 'Valley View':'🌄', Bonfire:'🔥', 'Waterfall View':'💦', 'Guide Service':'🧭', 'Tents Provided':'⛺', Campfire:'🔥', 'Meals Included':'🍽️', 'Mountain Guide':'🧗', Stargazing:'🔭', 'Trekking Gear':'🎒', 'Organic Farm':'🌱', 'Fruit Picking':'🍊', Kayaking:'🚣', AC:'❄️', Restaurant:'🍴', 'Sunrise View':'🌅', Lakefront:'💧' };
              return `<div class="amenity-item"><span class="amenity-icon">${icons[a] || '✓'}</span><span class="amenity-label">${a}</span></div>`;
            }).join('')}
          </div>

          ${buildRoomTypesSection(stay)}

          <h3 style="margin-bottom:16px">📅 Availability & Rules</h3>
          <div class="grid-2" style="margin-bottom:32px">
            <div class="card card-body">
              <div style="font-weight:700;margin-bottom:12px">Check-in / Check-out</div>
              <div style="color:var(--text-muted);font-size:0.9rem">Check-in: <strong style="color:var(--text)">${stay.checkIn || '14:00'}</strong></div>
              <div style="color:var(--text-muted);font-size:0.9rem;margin-top:6px">Check-out: <strong style="color:var(--text)">${stay.checkOut || '11:00'}</strong></div>
            </div>
            <div class="card card-body">
              <div style="font-weight:700;margin-bottom:12px">House Rules</div>
              <ul style="list-style:none;font-size:0.85rem;color:var(--text-muted)">
                ${(stay.rules || []).map(r => `<li style="margin-bottom:4px">• ${r}</li>`).join('')}
              </ul>
            </div>
          </div>

          <h3 style="margin-bottom:16px">📍 Location</h3>
          <div id="stay-map" class="map-container" style="margin-bottom:32px"></div>
          <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:8px">📍 ${stay.location}</p>
          <div style="margin-bottom:32px">
            ${(stay.nearbyAttractions || []).map(n => `<div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:4px">→ ${n}</div>`).join('')}
          </div>

          <!-- Reviews -->
          <div class="divider-h"></div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
            <h3>${avg > 0 ? `⭐ ${avg} · ` : `⭐ ${stay.rating} · `}${reviews.length || stay.reviews} Reviews</h3>
            <button class="btn btn-outline btn-sm" id="write-review-btn">✍️ Write a Review</button>
          </div>
          <div id="reviews-list">
            ${reviews.length ? reviews.map(r => reviewCard(r)).join('') : sampleReviews(stay)}
          </div>
          <div id="review-form" class="hidden" style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:28px;margin-top:24px">
            <h4 style="margin-bottom:20px">Share Your Experience</h4>
            <div class="form-group">
              <label class="form-label">Rating</label>
              <div class="star-input">${[5,4,3,2,1].map(n => `<input type="radio" name="rating" id="r${n}" value="${n}"><label for="r${n}">★</label>`).join('')}</div>
            </div>
            <div class="form-group">
              <label class="form-label">Your Review</label>
              <textarea class="form-textarea" id="review-text" placeholder="Tell others about your experience…"></textarea>
            </div>
            <button class="btn btn-primary" id="submit-review-btn">Submit Review</button>
          </div>
        </div>

        <!-- RIGHT: Booking Widget -->
        <div>
          <div class="booking-widget">
            <div class="booking-price" id="booking-price-block">
              <span class="price" style="font-size:1.6rem" id="booking-price-display">₹${stay.price.toLocaleString()}</span>
              <span style="color:var(--text-muted)">/night</span>
              <div id="booking-room-label" style="font-size:0.8rem;color:var(--emerald-400);margin-top:2px"></div>
              <div style="display:flex;gap:4px;margin-top:6px">${starsHTML(avg > 0 ? avg : stay.rating)} <span style="font-size:0.85rem;color:var(--text-muted)">${reviews.length || stay.reviews} reviews</span></div>
            </div>
            <div class="booking-dates">
              <div class="booking-date-field"><label>CHECK-IN</label><input type="date" id="checkin-date" /></div>
              <div class="booking-date-field"><label>CHECK-OUT</label><input type="date" id="checkout-date" /></div>
            </div>
            <div class="form-group">
              <label class="form-label" style="font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em">Guests</label>
              <select class="form-select" id="guests-count">
                ${Array.from({ length: stay.maxGuests || 2 }, (_, i) => `<option value="${i+1}">${i+1} guest${i > 0 ? 's' : ''}</option>`).join('')}
              </select>
            </div>
            <div id="price-breakdown" style="margin-bottom:16px"></div>
            <button class="btn btn-primary w-full" id="reserve-btn" style="justify-content:center;font-size:1rem;padding:16px">Reserve & Pay →</button>
            <p style="text-align:center;font-size:0.8rem;color:var(--text-muted);margin-top:12px">🔒 Secure booking · You won't be charged yet</p>

            <div class="divider-h"></div>
            <div style="font-weight:700;margin-bottom:12px">Contact Host</div>
            <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:6px">📞 ${stay.host.phone || '+91 00000 00000'}</div>
            <div style="font-size:0.85rem;color:var(--text-muted)">💬 Usually replies within 2 hours</div>
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
  container.style.display = 'block';

  // Date defaults
  const today = new Date(); const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
  const toISO = d => d.toISOString().split('T')[0];
  const checkinEl = document.getElementById('checkin-date');
  const checkoutEl = document.getElementById('checkout-date');
  if (checkinEl) checkinEl.value = toISO(today);
  if (checkoutEl) checkoutEl.value = toISO(tomorrow);



  // Book now — mutable selected price so room selection can update it
  let selectedPrice = stay.price;

  const updatePriceDisplay = () => {
    document.getElementById('booking-price-display').textContent = `₹${selectedPrice.toLocaleString()}`;
  };

  const updatePrice = () => {
    const ci = new Date(checkinEl?.value); const co = new Date(checkoutEl?.value);
    const nights = Math.max(1, Math.round((co - ci) / 86400000));
    const total = nights * selectedPrice;
    const breakdown = document.getElementById('price-breakdown');
    if (breakdown) breakdown.innerHTML = `
      <div style="display:flex;justify-content:space-between;font-size:0.9rem;color:var(--text-muted);margin-bottom:6px">
        <span>₹${selectedPrice.toLocaleString()} × ${nights} night${nights > 1 ? 's' : ''}</span><span>₹${(nights * selectedPrice).toLocaleString()}</span>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:0.9rem;color:var(--text-muted);margin-bottom:6px">
        <span>Service fee</span><span>₹${Math.round(total * 0.05).toLocaleString()}</span>
      </div>
      <div style="height:1px;background:var(--glass-border);margin:10px 0"></div>
      <div style="display:flex;justify-content:space-between;font-weight:700">
        <span>Total</span><span>₹${Math.round(total * 1.05).toLocaleString()}</span>
      </div>
    `;
  };
  updatePrice();
  checkinEl?.addEventListener('change', updatePrice);
  checkoutEl?.addEventListener('change', updatePrice);

  // Room type selection — updates widget price
  document.getElementById('room-types-list')?.addEventListener('click', e => {
    const btn = e.target.closest('[data-select-room]');
    if (!btn) return;
    const roomPrice = parseInt(btn.dataset.roomPrice) || stay.price;
    const roomName  = btn.dataset.roomName || '';
    selectedPrice = roomPrice;
    updatePriceDisplay();
    updatePrice();
    // Visual feedback
    document.querySelectorAll('[data-select-room]').forEach(b => b.classList.remove('btn-primary'));
    btn.classList.add('btn-primary');
    btn.textContent = '✓ Selected';
    const label = document.getElementById('booking-room-label');
    if (label) label.textContent = `Room: ${roomName}`;
    showToast(`${roomName} selected`, `₹${roomPrice.toLocaleString()}/night`);
  });

  document.getElementById('reserve-btn')?.addEventListener('click', () => {
    const ci = checkinEl?.value; const co = checkoutEl?.value; const guests = document.getElementById('guests-count')?.value;
    if (!ci || !co) { showToast('Please select dates', '', 'error'); return; }
    const nights = Math.max(1, Math.round((new Date(co) - new Date(ci)) / 86400000));
    const total = Math.round(nights * selectedPrice * 1.05);
    window.router.navigate(`/book/${id}?checkin=${ci}&checkout=${co}&guests=${guests}&total=${total}`);
  });

  // Lightbox (property photos)
  let currentIdx = 0;
  window.openStayLightbox = (idx) => {
    currentIdx = idx;
    document.getElementById('lb-img').src = stay.images[currentIdx];
    document.getElementById('lightbox').classList.add('open');
  };

  // Lightbox (room photos)
  window.openRoomLightbox = (roomIdx, photoIdx) => {
    const rooms = stay.room_types || stay.roomTypes || [];
    const imgs = (rooms[roomIdx]?.images || []).filter(Boolean);
    if (!imgs.length) return;
    currentIdx = 0; // not using property currentIdx for room photos
    document.getElementById('lb-img').src = imgs[photoIdx] || imgs[0];
    document.getElementById('lightbox').classList.add('open');
  };

  document.getElementById('lb-close')?.addEventListener('click', () => document.getElementById('lightbox').classList.remove('open'));
  document.getElementById('lb-prev')?.addEventListener('click', () => { currentIdx = (currentIdx - 1 + stay.images.length) % stay.images.length; document.getElementById('lb-img').src = stay.images[currentIdx]; });
  document.getElementById('lb-next')?.addEventListener('click', () => { currentIdx = (currentIdx + 1) % stay.images.length; document.getElementById('lb-img').src = stay.images[currentIdx]; });

  // Wishlist
  document.getElementById('wishlist-btn')?.addEventListener('click', () => {
    const btn = document.getElementById('wishlist-btn');
    const saved = toggleWishlist(id);
    btn.textContent = saved ? '❤️ Saved' : '🤍 Save';
    showToast(saved ? 'Added to Wishlist!' : 'Removed from Wishlist');
  });

  // Map
  setTimeout(() => {
    const mapEl = document.getElementById('stay-map');
    if (!mapEl || mapEl._leaflet_id) return;
    const map = L.map('stay-map').setView([stay.lat, stay.lng], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map);
    L.marker([stay.lat, stay.lng]).addTo(map).bindPopup(`<b>${stay.name}</b>`).openPopup();
  }, 100);

  // Review
  document.getElementById('write-review-btn')?.addEventListener('click', () => {
    if (!isLoggedIn()) { showToast('Login required', 'Please log in to write a review', 'error'); return; }
    document.getElementById('review-form').classList.toggle('hidden');
  });
  document.getElementById('submit-review-btn')?.addEventListener('click', () => {
    const rating = parseInt(document.querySelector('input[name="rating"]:checked')?.value || 0);
    const text = document.getElementById('review-text')?.value?.trim();
    if (!rating || !text) { showToast('Please fill all fields', '', 'error'); return; }
    const user = getCurrentUser();
    addReview({ listingId: id, rating, text, userName: user.fullName || user.name, userAvatar: user.avatar });
    showToast('Review submitted! ⭐');
    document.getElementById('review-form').classList.add('hidden');
    document.getElementById('reviews-list').innerHTML = getReviews(id).map(r => reviewCard(r)).join('');
  });
}

function buildRoomTypesSection(stay) {
  const rooms = stay.room_types || stay.roomTypes || [];
  if (!rooms.length) return '';

  const cards = rooms.map((room, idx) => {
    const imgs = (room.images || []).filter(Boolean);
    const thumbs = imgs.slice(0, 3).map((src, i) => `
      <img src="${src}" alt="${room.name}" onclick="openRoomLightbox(${idx},${i})"
        style="width:72px;height:72px;object-fit:cover;border-radius:8px;border:1px solid var(--glass-border);cursor:pointer" />
    `).join('');
    return `
      <div class="card card-body" style="margin-bottom:14px;padding:20px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px">
          <div>
            <div style="font-weight:700;font-size:1.05rem;margin-bottom:4px">${room.name || 'Room'}</div>
            <div style="font-size:0.85rem;color:var(--text-muted)">
              ${room.count ? `${room.count} room${room.count > 1 ? 's' : ''}` : ''}
              ${room.max_guests ? ` · Up to ${room.max_guests} guest${room.max_guests > 1 ? 's' : ''}` : ''}
            </div>
          </div>
          <div style="text-align:right">
            <div style="font-size:1.3rem;font-weight:800;color:var(--emerald-400)">₹${(room.price||0).toLocaleString()}</div>
            <div style="font-size:0.8rem;color:var(--text-muted)">/night</div>
          </div>
        </div>
        ${thumbs ? `<div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">${thumbs}</div>` : ''}
        <button type="button" class="btn btn-outline btn-sm" data-select-room="${idx}"
          data-room-price="${room.price||0}" data-room-name="${room.name||'Room'}"
          style="margin-top:14px">Select this room →</button>
      </div>
    `;
  }).join('');

  return `
    <h3 style="margin-bottom:16px">🛏️ Room Types</h3>
    <div id="room-types-list" style="margin-bottom:32px">${cards}</div>
  `;
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
      <span class="verified-badge">✅ Verified Guest</span>
    </div>
  `;
}

function sampleReviews(stay) {
  const samples = [
    { userName:'Priya Sharma', userAvatar:'P', rating:5, text:'Absolutely magical experience! The host was so welcoming and the views were breathtaking. Will definitely come back.', createdAt:'2026-01-15T00:00:00Z' },
    { userName:'Rahul Das', userAvatar:'R', rating:4, text:'Beautiful location and authentic Mizo food. A bit remote but that\'s the charm! Highly recommended for nature lovers.', createdAt:'2026-02-20T00:00:00Z' },
  ];
  return samples.map(r => reviewCard(r)).join('');
}
