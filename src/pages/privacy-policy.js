import { appHref } from '../utils.js';

export function renderPrivacyPolicy() {
  const H = appHref;
  const lastUpdated = 'April 6, 2026';
  return `
    <!-- Hero -->
    <section style="padding:120px 0 60px;background:linear-gradient(135deg,var(--bg1),var(--bg2));border-bottom:1px solid var(--glass-border)">
      <div class="container">
        <div class="section-label">🔒 Legal</div>
        <h1 style="font-size:clamp(2rem,5vw,3.5rem);font-weight:900;margin-bottom:16px">Privacy Policy</h1>
        <p style="color:var(--text-muted);font-size:0.95rem">Last updated: <strong style="color:var(--text)">${lastUpdated}</strong></p>
        <p style="color:var(--text-muted);max-width:580px;margin-top:12px;line-height:1.8">
          Your privacy matters to us. This policy explains what data LushaiTrips collects, how we use it, and how we protect it. We keep this plain-language — no legalese.
        </p>
      </div>
    </section>

    <!-- Table of Contents -->
    <section style="padding:32px 0;background:var(--bg2);border-bottom:1px solid var(--glass-border)">
      <div class="container">
        <div style="display:flex;flex-wrap:wrap;gap:12px">
          ${[
            'Information We Collect','How We Use Your Data','Data Sharing','Cookies','Data Security','Your Rights','Third-Party Services','Children\'s Privacy','Changes to Policy','Contact'
          ].map((t, i) => `
            <a href="#section-${i+1}" style="font-size:0.83rem;background:var(--glass);border:1px solid var(--glass-border);border-radius:50px;padding:6px 14px;color:var(--text-muted);text-decoration:none;transition:var(--transition)" onmouseover="this.style.background='var(--emerald-900)';this.style.color='var(--emerald-300)'" onmouseout="this.style.background='var(--glass)';this.style.color='var(--text-muted)'">${i + 1}. ${t}</a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="section">
      <div class="container">
        <div style="max-width:800px;margin:0 auto;display:flex;flex-direction:column;gap:48px">

          <!-- Intro box -->
          <div style="background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.2);border-radius:var(--radius);padding:24px">
            <p style="font-size:0.9rem;color:var(--text-muted);line-height:1.8;margin:0">
              <strong style="color:var(--emerald-400)">TL;DR:</strong> We collect only what's needed to run the platform. We never sell your data. You can request deletion at any time. We use Supabase for authentication and Razorpay for payments — both are industry-grade secure platforms.
            </p>
          </div>

          <!-- Sections -->
          ${[
            {
              id: 1,
              icon: '📊',
              title: 'Information We Collect',
              content: `
                <p>We collect the following types of information when you use LushaiTrips:</p>
                <h4 style="margin:20px 0 10px;font-size:1rem">📌 Information You Provide</h4>
                <ul style="color:var(--text-muted);line-height:2;padding-left:20px">
                  <li><strong style="color:var(--text)">Account Info</strong> — Name, email address, and profile picture when you sign up via email or Google OAuth.</li>
                  <li><strong style="color:var(--text)">Booking Info</strong> — Check-in dates, guest count, and contact details when making a reservation.</li>
                  <li><strong style="color:var(--text)">Host Info</strong> — Property details, pricing, photos, ID documents, and bank account information for verified hosts.</li>
                  <li><strong style="color:var(--text)">Messages & Reviews</strong> — Any messages sent through our platform or reviews you leave for hosts.</li>
                </ul>
                <h4 style="margin:20px 0 10px;font-size:1rem">📌 Information Collected Automatically</h4>
                <ul style="color:var(--text-muted);line-height:2;padding-left:20px">
                  <li><strong style="color:var(--text)">Device & Browser Data</strong> — IP address, browser type, operating system, and referring URL (via standard server logs).</li>
                  <li><strong style="color:var(--text)">Usage Data</strong> — Pages visited, time spent, clicks, and navigation patterns to improve our service.</li>
                  <li><strong style="color:var(--text)">Cookies</strong> — Session cookies for authentication; analytics cookies for understanding traffic (see Section 4).</li>
                </ul>
              `
            },
            {
              id: 2,
              icon: '⚙️',
              title: 'How We Use Your Data',
              content: `
                <p style="color:var(--text-muted);line-height:1.8;margin-bottom:16px">We use your information to:</p>
                <ul style="color:var(--text-muted);line-height:2;padding-left:20px">
                  <li>Create and manage your LushaiTrips account</li>
                  <li>Process bookings and facilitate payments via Razorpay</li>
                  <li>Connect you with hosts, guides, and transport providers</li>
                  <li>Send booking confirmations, receipts, and trip reminders by email</li>
                  <li>Let you review your experiences and help other travelers</li>
                  <li>Respond to customer support messages and enquiries</li>
                  <li>Improve platform features based on usage patterns</li>
                  <li>Detect and prevent fraud or platform abuse</li>
                  <li>Send optional newsletters and destination updates (opt-out any time)</li>
                </ul>
                <p style="color:var(--text-muted);line-height:1.8;margin-top:16px">We will never use your data for purposes beyond the above without obtaining your explicit consent first.</p>
              `
            },
            {
              id: 3,
              icon: '🤝',
              title: 'Data Sharing',
              content: `
                <p style="color:var(--text-muted);line-height:1.8;margin-bottom:16px"><strong style="color:var(--text)">We do not sell your personal data.</strong> Full stop.</p>
                <p style="color:var(--text-muted);line-height:1.8;margin-bottom:16px">We share data only in these limited circumstances:</p>
                <ul style="color:var(--text-muted);line-height:2;padding-left:20px">
                  <li><strong style="color:var(--text)">With Hosts:</strong> When you book a stay or guide, we share your name and contact number with the host to coordinate your trip.</li>
                  <li><strong style="color:var(--text)">With Razorpay:</strong> Your payment information is processed directly by Razorpay (PCI DSS Level 1 compliant). We do not store your card details.</li>
                  <li><strong style="color:var(--text)">With Supabase:</strong> Our backend database and auth provider (SOC 2 Type II certified). Your data is encrypted at rest and in transit.</li>
                  <li><strong style="color:var(--text)">Legal Requirements:</strong> We may disclose data if required by law, court order, or to protect the safety of users or the public.</li>
                </ul>
              `
            },
            {
              id: 4,
              icon: '🍪',
              title: 'Cookies',
              content: `
                <p style="color:var(--text-muted);line-height:1.8;margin-bottom:16px">We use cookies for the following purposes:</p>
                <div style="display:flex;flex-direction:column;gap:12px">
                  ${[
                    { type: 'Essential Cookies', desc: 'Required for authentication and keeping you logged in. Cannot be disabled.', required: true },
                    { type: 'Analytics Cookies', desc: 'Help us understand how visitors use the site (page views, session duration). Used only in aggregate. Can be opted out.', required: false },
                    { type: 'Preference Cookies', desc: 'Remember your settings such as preferred language or filters. Optional.', required: false },
                  ].map(c => `
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;background:var(--glass);border:1px solid var(--glass-border);border-radius:8px;padding:14px 18px;gap:16px">
                      <div>
                        <div style="font-weight:700;font-size:0.9rem;margin-bottom:4px">${c.type}</div>
                        <div style="font-size:0.83rem;color:var(--text-muted);line-height:1.6">${c.desc}</div>
                      </div>
                      <div style="flex-shrink:0;font-size:0.75rem;font-weight:700;padding:4px 10px;border-radius:50px;background:${c.required ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)'};color:${c.required ? '#f87171' : 'var(--emerald-400)'}">${c.required ? 'Required' : 'Optional'}</div>
                    </div>
                  `).join('')}
                </div>
              `
            },
            {
              id: 5,
              icon: '🔐',
              title: 'Data Security',
              content: `
                <p style="color:var(--text-muted);line-height:1.8;margin-bottom:16px">We take security seriously and implement the following measures:</p>
                <ul style="color:var(--text-muted);line-height:2;padding-left:20px">
                  <li>All data is transmitted over <strong style="color:var(--text)">HTTPS/TLS encryption</strong></li>
                  <li>Passwords are hashed using industry-standard bcrypt algorithms — we never store plaintext passwords</li>
                  <li>Supabase encrypts all data at rest using AES-256</li>
                  <li>Google OAuth login means we never handle your Google password</li>
                  <li>Payment data is handled exclusively by Razorpay — we store only transaction IDs, not card details</li>
                  <li>Access to production databases is restricted to core team members on a need-to-know basis</li>
                </ul>
                <p style="color:var(--text-muted);line-height:1.8;margin-top:16px">Despite these measures, no internet transmission can be 100% secure. If you discover a security vulnerability, please report it responsibly to <strong style="color:var(--text)">security@lushaitrips.com</strong>.</p>
              `
            },
            {
              id: 6,
              icon: '⚖️',
              title: 'Your Rights',
              content: `
                <p style="color:var(--text-muted);line-height:1.8;margin-bottom:16px">Under applicable Indian and international data protection laws, you have the right to:</p>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                  ${[
                    { icon: '👁️', right: 'Access your data', desc: 'Request a copy of all personal data we hold about you' },
                    { icon: '✏️', right: 'Correct your data', desc: 'Update inaccurate or incomplete personal information' },
                    { icon: '🗑️', right: 'Delete your data', desc: 'Request deletion of your account and associated data' },
                    { icon: '📦', right: 'Data portability', desc: 'Receive your data in a machine-readable format' },
                    { icon: '🚫', right: 'Withdraw consent', desc: 'Opt out of marketing emails or optional data processing' },
                    { icon: '📩', right: 'Lodge a complaint', desc: 'Contact us or your national data protection authority' },
                  ].map(r => `
                    <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:8px;padding:14px">
                      <div style="font-size:1.2rem;margin-bottom:6px">${r.icon}</div>
                      <div style="font-weight:700;font-size:0.88rem;margin-bottom:4px">${r.right}</div>
                      <div style="font-size:0.8rem;color:var(--text-muted);line-height:1.5">${r.desc}</div>
                    </div>
                  `).join('')}
                </div>
                <p style="color:var(--text-muted);line-height:1.8;margin-top:20px">To exercise any of these rights, email us at <strong style="color:var(--text)">privacy@lushaitrips.com</strong>. We will respond within 30 days.</p>
              `
            },
            {
              id: 7,
              icon: '🔗',
              title: 'Third-Party Services',
              content: `
                <p style="color:var(--text-muted);line-height:1.8;margin-bottom:16px">LushaiTrips uses the following trusted third-party services:</p>
                <div style="display:flex;flex-direction:column;gap:10px">
                  ${[
                    { name: 'Supabase', purpose: 'Authentication, database, and file storage', link: 'https://supabase.com/privacy' },
                    { name: 'Razorpay', purpose: 'Payment processing', link: 'https://razorpay.com/privacy/' },
                    { name: 'Google OAuth', purpose: 'Social login via Google accounts', link: 'https://policies.google.com/privacy' },
                    { name: 'Leaflet / OpenStreetMap', purpose: 'Map rendering (no personal data shared)', link: 'https://www.openstreetmap.org/privacy' },
                  ].map(s => `
                    <div style="display:flex;justify-content:space-between;align-items:center;background:var(--glass);border:1px solid var(--glass-border);border-radius:8px;padding:12px 16px;gap:12px;flex-wrap:wrap">
                      <div>
                        <div style="font-weight:700;font-size:0.9rem">${s.name}</div>
                        <div style="font-size:0.8rem;color:var(--text-muted)">${s.purpose}</div>
                      </div>
                      <a href="${s.link}" target="_blank" rel="noreferrer" style="font-size:0.78rem;color:var(--emerald-400);text-decoration:none;white-space:nowrap">Privacy Policy →</a>
                    </div>
                  `).join('')}
                </div>
              `
            },
            {
              id: 8,
              icon: '🧒',
              title: "Children's Privacy",
              content: `
                <p style="color:var(--text-muted);line-height:1.8">LushaiTrips is not intended for children under the age of <strong style="color:var(--text)">18 years</strong>. We do not knowingly collect personal information from minors. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at <strong style="color:var(--text)">privacy@lushaitrips.com</strong> and we will take immediate steps to remove the data.</p>
              `
            },
            {
              id: 9,
              icon: '📝',
              title: 'Changes to This Policy',
              content: `
                <p style="color:var(--text-muted);line-height:1.8">We may update this Privacy Policy from time to time. When we do, we will:</p>
                <ul style="color:var(--text-muted);line-height:2;padding-left:20px;margin-top:12px">
                  <li>Update the "Last Updated" date at the top of this page</li>
                  <li>Send an email notification to registered users if the changes are significant</li>
                  <li>Post a notice on the LushaiTrips homepage for 30 days if changes are material</li>
                </ul>
                <p style="color:var(--text-muted);line-height:1.8;margin-top:16px">Continued use of the platform after changes are posted constitutes acceptance of the updated policy.</p>
              `
            },
            {
              id: 10,
              icon: '📬',
              title: 'Contact',
              content: `
                <p style="color:var(--text-muted);line-height:1.8;margin-bottom:16px">For any privacy-related queries, requests, or concerns:</p>
                <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:24px">
                  <p style="font-weight:700;font-size:1rem;margin-bottom:10px">LushaiTrips — Privacy Team</p>
                  <p style="color:var(--text-muted);font-size:0.9rem;line-height:2">
                    📧 Email: <strong style="color:var(--text)">privacy@lushaitrips.com</strong><br>
                    📍 Address: Aizawl, Mizoram 796001, India<br>
                    🕐 Response time: Within 30 calendar days
                  </p>
                </div>
              `
            },
          ].map(section => `
            <div id="section-${section.id}" style="scroll-margin-top:90px">
              <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
                <div style="width:44px;height:44px;border-radius:12px;background:var(--emerald-900);border:1px solid var(--glass-border);display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">${section.icon}</div>
                <h2 style="font-size:1.4rem;margin:0">${section.id}. ${section.title}</h2>
              </div>
              <div style="padding-left:60px;color:var(--text-muted);font-size:0.9rem;line-height:1.8">
                ${section.content}
              </div>
              ${section.id < 10 ? '<div style="height:1px;background:var(--glass-border);margin-top:48px"></div>' : ''}
            </div>
          `).join('')}

        </div>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section style="padding:48px 0;background:var(--bg2);border-top:1px solid var(--glass-border)">
      <div class="container text-center">
        <p style="color:var(--text-muted);margin-bottom:20px">Questions about your privacy?</p>
        <a href="${H('/contact')}" class="btn btn-primary" data-link>📬 Contact Our Privacy Team</a>
      </div>
    </section>
  `;
}

export function initPrivacyPolicy() {}
