import { getUserBookings } from '../lib/supabase.js';
import { getCurrentUser, getWishlist, logout, showToast, starsHTML, appHref } from '../utils.js';

export function renderProfile() {
  const H = appHref;
  const user = getCurrentUser();
  if (!user) return `<div class="page-hero container"><h1>Please <a href="${H('/login')}" data-link style="color:var(--emerald-400)">log in</a> to view your profile</h1></div>`;

  const displayName = user.full_name || user.fullName || user.email || 'Traveller';
  const initial = displayName.charAt(0).toUpperCase();

  return `
    <section class="page-hero" style="padding-bottom:40px">
      <div class="container">
        <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap">
          ${user.avatar_url
            ? `<img src="${user.avatar_url}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid var(--emerald-500);flex-shrink:0" />`
            : `<div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,var(--emerald-500),var(--emerald-800));display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:800;flex-shrink:0">${initial}</div>`
          }
          <div>
            <h1 style="font-size:clamp(1.5rem,3vw,2rem);margin-bottom:4px">${displayName}</h1>
            <div style="color:var(--text-muted);font-size:0.9rem">${user.email} · Member since ${new Date(user.created_at || Date.now()).getFullYear()}</div>
          </div>
          <button class="btn btn-secondary btn-sm" id="logout-btn" style="margin-left:auto">🚪 Log Out</button>
        </div>
      </div>
    </section>

    <section style="padding-bottom:80px">
      <div class="container">
        <div class="tabs" id="profile-tabs">
          <button class="tab-btn active" data-tab="bookings">📅 My Bookings</button>
          <button class="tab-btn" data-tab="wishlist">❤️ Wishlist</button>
          <button class="tab-btn" data-tab="account">👤 Account</button>
        </div>

        <!-- Bookings -->
        <div id="tab-bookings">
          <div style="text-align:center;padding:40px;color:var(--text-muted)">⏳ Loading bookings…</div>
        </div>

        <!-- Wishlist -->
        <div id="tab-wishlist" class="hidden">
          <div id="wishlist-content" style="text-align:center;padding:60px;color:var(--text-muted)">
            <div style="font-size:4rem;margin-bottom:16px">🤍</div>
            <h3 style="margin-bottom:12px">Your wishlist is empty</h3>
            <p style="margin-bottom:24px">Save stays you love while browsing</p>
            <a href="${H('/stays')}" class="btn btn-primary" data-link>Browse Stays</a>
          </div>
        </div>

        <!-- Account -->
        <div id="tab-account" class="hidden">
          <div class="card card-body" style="max-width:500px">
            <h3 style="margin-bottom:24px">Account Information</h3>
            <div class="form-group"><label class="form-label">Full Name</label><input type="text" class="form-input" value="${displayName}" readonly /></div>
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

export async function initProfile() {
  document.getElementById('logout-btn')?.addEventListener('click', async () => {
    await logout();
  });

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

  document.querySelectorAll('[data-link]').forEach(el => {
    el.removeEventListener('click', handleLink);
    el.addEventListener('click', handleLink);
  });

  // Load bookings async
  const bookingsTab = document.getElementById('tab-bookings');
  try {
    const bookings = await getUserBookings();
    if (bookingsTab) {
      // Update tab label
      document.querySelector('[data-tab="bookings"]').textContent = `📅 My Bookings (${bookings.length})`;
      bookingsTab.innerHTML = bookings.length ? bookings.map(b => `
        <div class="card card-body" style="margin-bottom:16px;display:flex;align-items:center;gap:20px;flex-wrap:wrap">
          <div style="flex:1;min-width:200px">
            <div style="font-weight:700;margin-bottom:4px">${b.listing_name}</div>
            <div style="font-size:0.85rem;color:var(--text-muted)">📅 ${b.checkin ? new Date(b.checkin+'T00:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : new Date(b.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</div>
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
          <a href="${appHref('/discover')}" class="btn btn-primary" data-link>Discover Destinations</a>
        </div>
      `;
    }
  } catch (e) {
    console.error('Failed to load bookings:', e);
    if (bookingsTab) bookingsTab.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted)">Failed to load bookings. Please refresh.</div>';
  }

  // Load wishlist (still localStorage)
  const wishlist = getWishlist();
  if (wishlist.length) {
    document.querySelector('[data-tab="wishlist"]').textContent = `❤️ Wishlist (${wishlist.length})`;
  }
}

function handleLink(e) {
  e.preventDefault();
  const href = e.currentTarget.getAttribute('href');
  if (href && href !== '#') window.router.navigate(href);
}
