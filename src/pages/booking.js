import { stays } from '../data/stays.js';
import { guides } from '../data/services.js';
import { transport } from '../data/services.js';
import { isLoggedIn, getCurrentUser, createBooking, showToast, appHref } from '../utils.js';

// RAZORPAY CONFIG
// ⚠️ Replace 'rzp_test_YOUR_KEY_HERE' with your actual Razorpay Test Key
// Get your key at: https://dashboard.razorpay.com/app/keys
const RAZORPAY_KEY = 'rzp_test_SXRQlAUuikOAUn';
const DEMO_MODE = RAZORPAY_KEY === 'rzp_test_YOUR_KEY_HERE'; // auto-detects demo mode

export function renderBooking(id, params) {
  const checkin = params.get('checkin') || '';
  const checkout = params.get('checkout') || '';
  const guests = params.get('guests') || '1';
  const total = parseInt(params.get('total') || 2000);
  const type = params.get('type') || 'stay';
  const bookingName = params.get('name') ? decodeURIComponent(params.get('name')) : '';

  const stay = stays.find(s => s.id === id);
  const listing = stay || { name: bookingName || id, price: total, coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80', type: type };

  const nights = checkin && checkout ? Math.max(1, Math.round((new Date(checkout)-new Date(checkin))/86400000)) : 1;

  return `
    <section class="page-hero" style="padding-bottom:40px">
      <div class="container">
        <h1 style="font-size:clamp(1.5rem,3vw,2.2rem)">Complete Your Booking</h1>
        <p style="color:var(--text-muted)">You're almost there — secure your trip now.</p>
      </div>
    </section>

    <section style="padding-bottom:80px">
      <div class="container">
        <div style="display:grid;grid-template-columns:1fr 400px;gap:40px;align-items:start">
          <!-- Left: Payment form -->
          <div>
            ${!isLoggedIn() ? `
              <div style="background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);border-radius:var(--radius);padding:20px;margin-bottom:28px">
                <div style="font-weight:700;margin-bottom:6px">⚠️ Login Required</div>
                <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:12px">Please log in to complete your booking.</div>
                <a href="${appHref('/login')}" class="btn btn-primary btn-sm" data-link>Log in to Continue</a>
              </div>
            ` : ''}

            ${DEMO_MODE ? `
              <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.3);border-radius:var(--radius);padding:20px;margin-bottom:28px">
                <div style="font-weight:700;margin-bottom:6px;color:var(--emerald-400)">🔑 Razorpay Demo Mode</div>
                <div style="font-size:0.85rem;color:var(--text-muted)">Payment is running in <strong>demo mode</strong>. To enable real payments, add your Razorpay test key in <code style="background:var(--glass);padding:2px 6px;border-radius:4px">/src/pages/booking.js</code>.<br><br>Get your key at: <a href="https://dashboard.razorpay.com/app/keys" target="_blank" style="color:var(--emerald-400)">dashboard.razorpay.com/app/keys</a></div>
              </div>
            ` : ''}

            <h3 style="margin-bottom:20px">Your Information</h3>
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-input" id="pay-name" placeholder="Your full name" value="${getCurrentUser()?.fullName || getCurrentUser()?.name || ''}" />
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-input" id="pay-email" placeholder="email@example.com" value="${getCurrentUser()?.email || ''}" />
              </div>
              <div class="form-group">
                <label class="form-label">Phone</label>
                <input type="tel" class="form-input" id="pay-phone" placeholder="+91 98765 43210" value="${getCurrentUser()?.phone || ''}" />
              </div>
              <div class="form-group">
                <label class="form-label">Special Requests</label>
                <input type="text" class="form-input" id="pay-notes" placeholder="e.g. early check-in, dietary needs" />
              </div>
            </div>

            <div class="divider-h"></div>
            <h3 style="margin-bottom:16px">Payment Method</h3>
            <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:24px;margin-bottom:28px">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
                <span style="font-size:1.5rem">🔒</span>
                <div>
                  <div style="font-weight:700">Secure Payment via Razorpay</div>
                  <div style="font-size:0.85rem;color:var(--text-muted)">Your payment info is never stored on our servers</div>
                </div>
              </div>
              <div style="display:flex;gap:16px;flex-wrap:wrap">
                ${['UPI / GPay / PhonePe','Debit / Credit Card','Net Banking','Wallets'].map(m => `<div style="display:flex;align-items:center;gap:6px;font-size:0.85rem;color:var(--text-muted)"><span style="color:var(--emerald-400)">✓</span>${m}</div>`).join('')}
              </div>
            </div>

            <button class="btn btn-primary btn-lg w-full" id="pay-btn" style="justify-content:center;font-size:1.1rem" ${!isLoggedIn() ? 'disabled style="opacity:0.5;cursor:not-allowed;justify-content:center;font-size:1.1rem"' : ''}>
              ${DEMO_MODE ? '🎭 Complete Demo Booking' : `🔒 Pay ₹${total.toLocaleString()} with Razorpay`}
            </button>
            <p style="text-align:center;font-size:0.8rem;color:var(--text-muted);margin-top:10px">By booking, you agree to our Terms & Conditions and Cancellation Policy.</p>
          </div>

          <!-- Right: Summary card -->
          <div>
            <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius-lg);overflow:hidden;position:sticky;top:100px">
              <img src="${listing.coverImage}" alt="${listing.name}" style="width:100%;height:200px;object-fit:cover" />
              <div style="padding:24px">
                <div style="font-size:0.75rem;font-weight:700;color:var(--emerald-400);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px">${listing.type || 'Stay'}</div>
                <h4 style="margin-bottom:8px">${listing.name}</h4>
                ${checkin ? `
                  <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:4px">📅 ${new Date(checkin+'T00:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short'})} → ${new Date(checkout+'T00:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</div>
                  <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:16px">👥 ${guests} guest${guests>1?'s':''} · ${nights} night${nights>1?'s':''}</div>
                ` : ''}
                <div class="divider-h" style="margin:16px 0"></div>
                <div style="display:flex;justify-content:space-between;font-size:0.9rem;color:var(--text-muted);margin-bottom:8px">
                  <span>Subtotal</span><span>₹${Math.round(total/1.05).toLocaleString()}</span>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:0.9rem;color:var(--text-muted);margin-bottom:8px">
                  <span>Service fee (5%)</span><span>₹${Math.round(total - total/1.05).toLocaleString()}</span>
                </div>
                <div class="divider-h" style="margin:12px 0"></div>
                <div style="display:flex;justify-content:space-between;font-weight:800;font-size:1.1rem">
                  <span>Total</span><span class="text-emerald">₹${total.toLocaleString()}</span>
                </div>
                <div style="margin-top:12px;font-size:0.8rem;color:var(--text-muted);text-align:center">🛡 Free cancellation within 24 hrs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initBooking(id, params) {
  const total = parseInt(params.get('total') || 2000);
  const checkin = params.get('checkin') || '';
  const checkout = params.get('checkout') || '';
  const guests = params.get('guests') || '1';
  const type = params.get('type') || 'stay';
  const bookingName = params.get('name') ? decodeURIComponent(params.get('name')) : id;
  const stay = stays.find(s => s.id === id);

  document.getElementById('pay-btn')?.addEventListener('click', () => {
    if (!isLoggedIn()) { showToast('Please log in first', '', 'error'); return; }
    const name = document.getElementById('pay-name')?.value?.trim();
    const email = document.getElementById('pay-email')?.value?.trim();
    const phone = document.getElementById('pay-phone')?.value?.trim();
    if (!name || !email || !phone) { showToast('Please fill all fields', '', 'error'); return; }

    const user = getCurrentUser();
    const bookingData = {
      userId: user.id,
      listingId: id,
      listingName: stay?.name || bookingName,
      listingType: type,
      checkin, checkout, guests,
      total,
      guestName: name, guestEmail: email, guestPhone: phone,
      notes: document.getElementById('pay-notes')?.value || '',
    };

    if (DEMO_MODE) {
      // Demo: simulate payment success
      const booking = createBooking(bookingData);
      showToast('Booking Confirmed! 🎉', `Ref: ${booking.id}`);
      setTimeout(() => window.router.navigate('/booking-confirmed'), 800);
      return;
    }

    // Real Razorpay
    const options = {
      key: RAZORPAY_KEY,
      amount: total * 100, // paise
      currency: 'INR',
      name: 'LushaiTrips',
      description: stay?.name || bookingName,
      image: 'https://via.placeholder.com/100x100/065f46/ffffff?text=LT',
      prefill: { name, email, contact: phone },
      theme: { color: '#059669' },
      handler: function(response) {
        const booking = createBooking({ ...bookingData, razorpayPaymentId: response.razorpay_payment_id });
        showToast('Payment Successful! 🎉', `Ref: ${booking.id}`);
        setTimeout(() => window.router.navigate('/booking-confirmed'), 800);
      },
      modal: { ondismiss: () => showToast('Payment cancelled', '', 'error') },
    };
    try {
      const rzp = new Razorpay(options);
      rzp.open();
    } catch (e) {
      showToast('Razorpay not loaded', 'Please check your internet connection', 'error');
    }
  });
}
