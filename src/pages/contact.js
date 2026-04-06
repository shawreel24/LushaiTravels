import { appHref } from '../utils.js';

export function renderContact() {
  return `
    <!-- Hero -->
    <section style="min-height:50vh;display:flex;align-items:center;background:linear-gradient(135deg,var(--bg1),var(--emerald-900) 50%,var(--bg2));padding:120px 0 80px;position:relative;overflow:hidden">
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse 70% 50% at 50% 50%,rgba(16,185,129,0.12),transparent);pointer-events:none"></div>
      <div class="container" style="position:relative;z-index:1;text-align:center">
        <div class="section-label">📬 We'd Love to Hear From You</div>
        <h1 style="font-size:clamp(2.2rem,6vw,4rem);font-weight:900;line-height:1.1;margin-bottom:24px">
          Contact <span class="gradient-text">LushaiTrips</span>
        </h1>
        <p style="font-size:1.15rem;color:var(--text-muted);max-width:560px;margin:0 auto;line-height:1.8">
          Got questions, feedback, or partnership ideas? We're a small team and we actually read every message — reach out and we'll get back to you fast.
        </p>
      </div>
    </section>

    <!-- Contact Methods -->
    <section class="section">
      <div class="container">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start" class="contact-split">

          <!-- Info -->
          <div>
            <div class="section-label">📡 Reach Us</div>
            <h2 style="margin-bottom:32px">Get In Touch</h2>
            <div style="display:flex;flex-direction:column;gap:24px">
              ${[
                { icon: '📧', title: 'Email', detail: 'hello@lushaitrips.com', sub: 'We reply within 24 hours on weekdays', href: 'mailto:hello@lushaitrips.com' },
                { icon: '📱', title: 'WhatsApp', detail: '+91 98620 XXXXX', sub: 'Quickest way to reach us for travel queries', href: '#' },
                { icon: '📍', title: 'Office', detail: 'Aizawl, Mizoram 796001, India', sub: 'Walk-in visits by appointment only', href: '#' },
                { icon: '🕐', title: 'Support Hours', detail: 'Mon–Sat: 9am – 7pm IST', sub: 'Sundays: Limited — we observe the Sabbath 🙏', href: null },
              ].map(c => `
                <div style="display:flex;gap:20px;align-items:flex-start">
                  <div style="width:48px;height:48px;border-radius:12px;background:var(--emerald-900);border:1px solid var(--glass-border);display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0">${c.icon}</div>
                  <div>
                    <div style="font-size:0.78rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px">${c.title}</div>
                    ${c.href && c.href !== '#'
                      ? `<a href="${c.href}" style="font-weight:700;font-size:1rem;color:var(--emerald-400);text-decoration:none">${c.detail}</a>`
                      : `<div style="font-weight:700;font-size:1rem;color:var(--text)">${c.detail}</div>`}
                    <div style="font-size:0.83rem;color:var(--text-muted);margin-top:2px">${c.sub}</div>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Social -->
            <div style="margin-top:40px">
              <div style="font-size:0.78rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:16px">Follow Us</div>
              <div style="display:flex;gap:12px">
                ${[
                  { icon: '📘', label: 'Facebook', href: '#' },
                  { icon: '📸', label: 'Instagram', href: '#' },
                  { icon: '🐦', label: 'Twitter / X', href: '#' },
                  { icon: '▶️', label: 'YouTube', href: '#' },
                ].map(s => `
                  <a href="${s.href}" title="${s.label}" style="width:44px;height:44px;background:var(--glass);border:1px solid var(--glass-border);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;transition:var(--transition)" onmouseover="this.style.background='var(--emerald-800)';this.style.borderColor='var(--emerald-600)'" onmouseout="this.style.background='var(--glass)';this.style.borderColor='var(--glass-border)'">${s.icon}</a>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Form -->
          <div>
            <div class="card card-body" style="padding:40px">
              <h3 style="margin-bottom:8px">Send Us a Message</h3>
              <p style="font-size:0.88rem;color:var(--text-muted);margin-bottom:28px">We'll reply to your email within one business day.</p>
              <form id="contact-form" style="display:flex;flex-direction:column;gap:18px">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
                  <div>
                    <label style="font-size:0.82rem;font-weight:600;color:var(--text-muted);display:block;margin-bottom:6px">First Name *</label>
                    <input id="contact-first" type="text" required placeholder="Lalremruata" style="width:100%;background:var(--glass);border:1px solid var(--glass-border);border-radius:8px;padding:10px 14px;color:var(--text);font-size:0.9rem;outline:none;box-sizing:border-box" />
                  </div>
                  <div>
                    <label style="font-size:0.82rem;font-weight:600;color:var(--text-muted);display:block;margin-bottom:6px">Last Name</label>
                    <input id="contact-last" type="text" placeholder="Pachuau" style="width:100%;background:var(--glass);border:1px solid var(--glass-border);border-radius:8px;padding:10px 14px;color:var(--text);font-size:0.9rem;outline:none;box-sizing:border-box" />
                  </div>
                </div>
                <div>
                  <label style="font-size:0.82rem;font-weight:600;color:var(--text-muted);display:block;margin-bottom:6px">Email Address *</label>
                  <input id="contact-email" type="email" required placeholder="you@example.com" style="width:100%;background:var(--glass);border:1px solid var(--glass-border);border-radius:8px;padding:10px 14px;color:var(--text);font-size:0.9rem;outline:none;box-sizing:border-box" />
                </div>
                <div>
                  <label style="font-size:0.82rem;font-weight:600;color:var(--text-muted);display:block;margin-bottom:6px">Subject</label>
                  <select id="contact-subject" style="width:100%;background:var(--bg2);border:1px solid var(--glass-border);border-radius:8px;padding:10px 14px;color:var(--text);font-size:0.9rem;outline:none;box-sizing:border-box">
                    <option value="">Select a topic…</option>
                    <option value="booking">Booking Help</option>
                    <option value="hosting">Become a Host</option>
                    <option value="refund">Refund / Cancellation</option>
                    <option value="safety">Safety Concern</option>
                    <option value="partnership">Partnership / Press</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label style="font-size:0.82rem;font-weight:600;color:var(--text-muted);display:block;margin-bottom:6px">Your Message *</label>
                  <textarea id="contact-message" required rows="5" placeholder="Tell us how we can help…" style="width:100%;background:var(--glass);border:1px solid var(--glass-border);border-radius:8px;padding:10px 14px;color:var(--text);font-size:0.9rem;outline:none;resize:vertical;font-family:inherit;box-sizing:border-box"></textarea>
                </div>
                <button type="submit" id="contact-submit" class="btn btn-primary" style="width:100%;justify-content:center">
                  📨 Send Message
                </button>
                <div id="contact-success" style="display:none;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:8px;padding:14px;text-align:center;font-size:0.9rem;color:var(--emerald-400)">
                  ✅ Message sent! We'll get back to you within 24 hours.
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section" style="background:var(--bg2)">
      <div class="container">
        <div class="section-label text-center">❓ Common Questions</div>
        <h2 class="text-center" style="margin-bottom:40px">Frequently Asked Questions</h2>
        <div style="max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:12px" id="faq-list">
          ${[
            { q: 'How do I book a stay on LushaiTrips?', a: 'Browse stays on our platform, click the listing you like, choose your dates and number of guests, and complete the booking form. You\'ll receive a confirmation email and the host\'s contact details.' },
            { q: 'Can I cancel my booking?', a: 'Yes. Our standard cancellation policy allows free cancellation up to 72 hours before check-in. After that, a 50% cancellation charge applies. Each host may also have additional policies listed on their page.' },
            { q: 'I\'m a host — how do I list my property?', a: 'Click "Become a Host" in the navigation, choose your listing type (stay, guide, or transport), fill out the details, and our team will review and approve your listing within 2 business days.' },
            { q: 'Is LushaiTrips safe for solo women travelers?', a: 'Mizoram is one of the safest states in India for solo women travelers. All our hosts are verified, and we include safety tips and emergency contact information in every booking confirmation.' },
            { q: 'What payment methods do you accept?', a: 'We accept all major UPI apps (PhonePe, GPay, Paytm), debit/credit cards, and net banking via Razorpay. International cards (Visa, Mastercard) are also accepted.' },
            { q: 'Do I need an Inner Line Permit?', a: 'Yes — Indian citizens must obtain a free ILP before visiting Mizoram. You can apply at mizoram.gov.in or at Mizoram House offices in major cities. Foreign nationals need a Protected Area Permit from the MHA.' },
          ].map((faq, i) => `
            <div class="faq-item" style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);overflow:hidden">
              <button class="faq-toggle" data-idx="${i}" style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:18px 22px;background:none;border:none;color:var(--text);font-size:0.95rem;font-weight:600;cursor:pointer;text-align:left;gap:12px">
                <span>${faq.q}</span>
                <span class="faq-arrow" style="font-size:1rem;flex-shrink:0;transition:transform 0.25s">▼</span>
              </button>
              <div class="faq-body" style="display:none;padding:0 22px 18px;font-size:0.88rem;color:var(--text-muted);line-height:1.8">${faq.a}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <style>
      @media (max-width: 768px) {
        .contact-split { grid-template-columns: 1fr !important; }
      }
    </style>
  `;
}

export function initContact() {
  // Form submission
  document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('contact-submit');
    btn.disabled = true;
    btn.textContent = '⏳ Sending…';
    setTimeout(() => {
      document.getElementById('contact-success').style.display = 'block';
      document.getElementById('contact-form').reset();
      btn.disabled = false;
      btn.textContent = '📨 Send Message';
    }, 1200);
  });

  // FAQ accordion
  document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const body = btn.nextElementSibling;
      const arrow = btn.querySelector('.faq-arrow');
      const isOpen = body.style.display === 'block';
      // Close all
      document.querySelectorAll('.faq-body').forEach(b => b.style.display = 'none');
      document.querySelectorAll('.faq-arrow').forEach(a => a.style.transform = '');
      // Toggle
      if (!isOpen) {
        body.style.display = 'block';
        arrow.style.transform = 'rotate(180deg)';
      }
    });
  });

  // Input focus effects
  document.querySelectorAll('#contact-form input, #contact-form textarea, #contact-form select').forEach(el => {
    el.addEventListener('focus', () => el.style.borderColor = 'var(--emerald-500)');
    el.addEventListener('blur', () => el.style.borderColor = 'var(--glass-border)');
  });
}
