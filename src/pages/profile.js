import { getCurrentUser, getUserBookings, getWishlist, logout, showToast, starsHTML, appHref } from '../utils.js';
import { stays } from '../data/stays.js';

export function renderProfile() {
  const H = appHref;
  const user = getCurrentUser();
  if (!user) return `<div class="page-hero container"><h1>Please <a href="${H('/login')}" data-link style="color:var(--emerald-400)">log in</a> to view your profile</h1></div>`;
  const bookings = getUserBookings();
  const wishlist = getWishlist();
  const wishlisted = stays.filter(s => wishlist.includes(s.id));

  return `
    <section class="page-hero" style="padding-bottom:40px">
      <div class="container">
        <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap">
          <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,var(--emerald-500),var(--emerald-800));display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:800;flex-shrink:0">${user.avatar || '👤'}</div>
          <div>
            <h1 style="font-size:clamp(1.5rem,3vw,2rem);margin-bottom:4px">${user.fullName || user.name}</h1>
            <div style="color:var(--text-muted);font-size:0.9rem">${user.email} · Member since ${new Date(user.createdAt).getFullYear()}</div>
          </div>
          <button class="btn btn-secondary btn-sm" id="logout-btn" style="margin-left:auto">🚪 Log Out</button>
        </div>
      </div>
    </section>

    <section style="padding-bottom:80px">
      <div class="container">
        <div class="tabs" id="profile-tabs">
          <button class="tab-btn active" data-tab="bookings">📅 My Bookings (${bookings.length})</button>
          <button class="tab-btn" data-tab="wishlist">❤️ Wishlist (${wishlisted.length})</button>
          <button class="tab-btn" data-tab="account">👤 Account</button>
        </div>

        <!-- Bookings -->
        <div id="tab-bookings">
          ${bookings.length ? bookings.map(b => `
            <div class="card card-body" style="margin-bottom:16px;display:flex;align-items:center;gap:20px;flex-wrap:wrap">
              <div style="flex:1;min-width:200px">
                <div style="font-weight:700;margin-bottom:4px">${b.listingName}</div>
                <div style="font-size:0.85rem;color:var(--text-muted)">📅 ${b.checkin ? new Date(b.checkin+'T00:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : new Date(b.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</div>
                <div style="font-size:0.85rem;color:var(--text-muted)">Ref: <strong style="color:var(--emerald-400)">${b.id}</strong></div>
              </div>
              <div style="text-align:right">
                <div style="font-weight:700;font-size:1.1rem;color:var(--emerald-400)">₹${b.total?.toLocaleString()}</div>
                <span class="badge badge-approved">✅ Confirmed</span>
              </div>
            </div>
          `).join('') : `
            <div style="text-align:center;padding:60px;color:var(--text-muted)">
              <div style="font-size:4rem;margin-bottom:16px">🏕️</div>
              <h3 style="margin-bottom:12px">No bookings yet</h3>
              <p style="margin-bottom:24px">Start exploring Mizoram's hidden gems!</p>
              <a href="${H('/discover')}" class="btn btn-primary" data-link>Discover Destinations</a>
            </div>
          `}
        </div>

        <!-- Wishlist -->
        <div id="tab-wishlist" class="hidden">
          ${wishlisted.length ? `
            <div class="grid-3">${wishlisted.map(s => `
              <div class="card" data-href="/stay/${s.id}" style="cursor:pointer">
                <div class="card-img-wrap"><img src="${s.coverImage}" alt="${s.name}" loading="lazy" /><div class="card-rating">${starsHTML(s.rating)} ${s.rating}</div></div>
                <div class="card-body"><h4 class="card-title">${s.name}</h4><div class="price">₹${s.price.toLocaleString()}<span>/night</span></div></div>
              </div>`).join('')}
            </div>` : `
            <div style="text-align:center;padding:60px;color:var(--text-muted)">
              <div style="font-size:4rem;margin-bottom:16px">🤍</div>
              <h3 style="margin-bottom:12px">Your wishlist is empty</h3>
              <p style="margin-bottom:24px">Save stays you love while browsing</p>
              <a href="${H('/stays')}" class="btn btn-primary" data-link>Browse Stays</a>
            </div>`}
        </div>

        <!-- Account -->
        <div id="tab-account" class="hidden">
          <div class="card card-body" style="max-width:500px">
            <h3 style="margin-bottom:24px">Account Information</h3>
            <div class="form-group"><label class="form-label">Full Name</label><input type="text" class="form-input" value="${user.fullName || user.name || ''}" readonly /></div>
            <div class="form-group"><label class="form-label">Email</label><input type="email" class="form-input" value="${user.email || ''}" readonly /></div>
            <div class="form-group"><label class="form-label">Phone</label><input type="tel" class="form-input" value="${user.phone || ''}" readonly /></div>
            <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius-sm);padding:14px;font-size:0.85rem;color:var(--text-muted);margin-bottom:20px">
              💡 To update your information, please contact us at <a href="mailto:support@lushaitrips.com" style="color:var(--emerald-400)">support@lushaitrips.com</a>
            </div>
            ${user.role !== 'host' ? `
              <div class="divider-h"></div>
              <h4 style="margin-bottom:12px">Become a Host</h4>
              <p style="font-size:0.9rem;color:var(--text-muted);margin-bottom:16px">List your property, guide service, or transport on LushaiTrips.</p>
              <div style="display:flex;gap:10px;flex-wrap:wrap">
                <a href="${H('/host-signup-stay')}" class="btn btn-outline btn-sm" data-link>🏡 List Stay</a>
                <a href="${H('/host-signup-guide')}" class="btn btn-outline btn-sm" data-link>🧭 List Guide</a>
                <a href="${H('/host-signup-transport')}" class="btn btn-outline btn-sm" data-link>🚗 List Transport</a>
              </div>` : ''}
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initProfile() {
  document.getElementById('logout-btn')?.addEventListener('click', () => { logout(); });
  const tabs = document.querySelectorAll('.tab-btn[data-tab]');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('[id^="tab-"]').forEach(t => t.classList.add('hidden'));
      document.getElementById(`tab-${btn.dataset.tab}`)?.classList.remove('hidden');
    });
  });
  document.querySelectorAll('[data-href]').forEach(el => el.addEventListener('click', () => window.router.navigate(el.dataset.href)));
}
