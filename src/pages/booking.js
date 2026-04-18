import { stays } from '../data/stays.js';
import { guides } from '../data/services.js';
import { transport } from '../data/services.js';
import { isLoggedIn, getCurrentUser, createBooking, showToast, appHref } from '../utils.js';
import { supabase } from '../lib/supabase.js';

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
          <!-- Left: Booking form -->
          <div>
            ${!isLoggedIn() ? `
              <div style="background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);border-radius:var(--radius);padding:20px;margin-bottom:28px">
                <div style="font-weight:700;margin-bottom:6px">⚠️ Login Required</div>
                <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:12px">Please log in to complete your booking.</div>
                <a href="${appHref('/login')}" class="btn btn-primary btn-sm" data-link>Log in to Continue</a>
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
            <div class="divider-h"></div>
            <h3 style="margin-bottom:16px">Payment</h3>
            <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:24px;margin-bottom:28px;position:relative;overflow:hidden">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
                <span style="font-size:1.5rem">🛡️</span>
                <div>
                  <div style="font-weight:700">100% Secure Checkout</div>
                  <div style="font-size:0.85rem;color:var(--text-muted)">Powered by Razorpay. Your payment information is encrypted and safe.</div>
                </div>
              </div>
              <div style="display:flex;gap:16px;flex-wrap:wrap">
                ${['UPI (GPay, PhonePe)','Credit/Debit Card','Net Banking','Wallets'].map(m => `<div style="display:flex;align-items:center;gap:6px;font-size:0.85rem;color:var(--text-muted)"><span style="color:var(--emerald-400)">✓</span>${m}</div>`).join('')}
              </div>
              <div style="position:absolute;top:20px;right:20px;opacity:0.3;filter:grayscale(1)">
                <svg viewBox="0 0 100 24" width="70" height="18" fill="currentColor"><path d="M22.43 14.28L25.26 2h-4.3l-2.07 9.87h-5.2l2.06-9.87H11.5L9.44 11.87h-4.2L6.15 7.42H2l2.58 11.66h4.3l1.1-4.8h4.2l-1.01 4.8h4.34l1.37-6.52h5.18l-1.37 6.52h4.3l2.84-13.5zM33.4 12.35c.78.38 1.4.92 1.83 1.62.44.7.66 1.48.66 2.37 0 1.2-.3 2.22-.9 3.06-.6.84-1.42 1.46-2.46 1.87-1.04.4-2.22.6-3.53.6H23.5l3.22-15.3h5.6c1.17 0 2.2.14 3.08.43.88.29 1.57.73 2.06 1.34.5.6.74 1.37.74 2.3 0 1.05-.33 1.95-1.01 2.7-.68.74-1.6 1.25-2.79 1.5zm-3.23-2.92c0-.52-.16-.92-.48-1.2-.32-.28-.78-.42-1.37-.42h-3.32l-.93 4.41h2.52c.86 0 1.5-.16 1.93-.47.43-.3.65-.8.65-1.5v-.82zm-4.7 9h3.76c1.15 0 2-.2 2.53-.61.54-.4.8-1 .8-1.78 0-.48-.12-.88-.35-1.2-.24-.31-.6-.53-1.1-.64-.5-.12-1.15-.17-1.96-.17h-2.12L25.47 18.42h-.01z "/></svg>
              </div>
            </div>

            <button class="btn btn-primary btn-lg w-full" id="pay-btn" style="justify-content:center;font-size:1.1rem" ${!isLoggedIn() ? 'disabled style="opacity:0.5;cursor:not-allowed;justify-content:center;font-size:1.1rem"' : ''}>
              Pay ₹${total.toLocaleString()} securely with Razorpay
            </button>
            <p style="text-align:center;font-size:0.8rem;color:var(--text-muted);margin-top:10px">By booking, you agree to our Terms &amp; Conditions and Cancellation Policy.</p>
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

  const btn = document.getElementById('pay-btn');
  btn?.addEventListener('click', async () => {
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

    try {
      const originalText = btn.innerHTML;
      btn.innerHTML = '🔒 Processing...';
      btn.disabled = true;
      btn.style.opacity = '0.7';

      // 1. Call our secure Edge Function to create a Razorpay Order
      const sessionData = await supabase.auth.getSession();
      const token = sessionData.data?.session?.access_token;
      
      if (!token) {
        throw new Error('Session expired. Please log out and log in again.');
      }

      // We use the Anon Key for the edge function to avoid "Unsupported JWT algorithm ES256" error
      // from the Supabase API Gateway, as this function doesn't require strict RLS identity.
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-razorpay-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({ amount: total })
      });

      let orderData;
      try {
        orderData = await response.json();
      } catch(e) {
        throw new Error('Failed to parse server response');
      }

      if (!response.ok || orderData.error) {
        throw new Error(orderData.error || orderData.message || 'Failed to initialize payment');
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY, // Public Key ID
        amount: orderData.amount, // in paise
        currency: orderData.currency,
        name: "LushaiTrips",
        description: `Booking for ${bookingData.listingName}`,
        order_id: orderData.id,
        prefill: {
          name: name,
          email: email,
          contact: phone
        },
        theme: {
          color: "#34d399" // emerald-400
        },
        handler: async function (response) {
          try {
            // Payment successful, attach payment ID to booking
            bookingData.paymentId = response.razorpay_payment_id;
            
            const booking = await createBooking(bookingData);
            showToast('Booking Confirmed! 🎉', `Ref: ${booking.id}`);
            setTimeout(() => window.router.navigate('/booking-confirmed'), 800);
          } catch (err) {
            console.error('Booking save error:', err);
            showToast('Payment successful, but failed to save booking', err.message, 'error');
          }
        },
        modal: {
          ondismiss: function() {
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.opacity = '1';
            showToast('Payment cancelled', '', 'error');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        showToast('Payment Failed', response.error.description, 'error');
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.opacity = '1';
      });
      rzp.open();
      
    } catch (error) {
      console.error('Payment init error:', error);
      showToast('Payment Error', error.message, 'error');
      btn.innerHTML = 'Pay ₹' + total.toLocaleString() + ' securely with Razorpay';
      btn.disabled = false;
      btn.style.opacity = '1';
    }
  });
}
