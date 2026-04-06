import { appHref } from '../utils.js';

export function renderAbout() {
  const H = appHref;
  return `
    <!-- Hero -->
    <section style="min-height:60vh;display:flex;align-items:center;background:linear-gradient(135deg,var(--bg1) 0%,var(--emerald-900) 60%,var(--bg2) 100%);padding:120px 0 80px;position:relative;overflow:hidden">
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 60% 40%,rgba(16,185,129,0.13),transparent);pointer-events:none"></div>
      <div class="container" style="position:relative;z-index:1">
        <div class="section-label">🌿 Our Story</div>
        <h1 style="font-size:clamp(2.4rem,6vw,4rem);font-weight:900;line-height:1.1;margin-bottom:24px">
          About <span class="gradient-text">LushaiTrips</span>
        </h1>
        <p style="font-size:1.2rem;color:var(--text-muted);max-width:620px;line-height:1.8">
          Born in the misty hills of Mizoram, LushaiTrips is a homegrown platform built for curious travelers who dare to go beyond the beaten path — and for the local communities who call these hills home.
        </p>
        <div style="display:flex;gap:16px;margin-top:40px;flex-wrap:wrap">
          <a href="${H('/discover')}" class="btn btn-primary btn-lg" data-link>🗺️ Explore Destinations</a>
          <a href="${H('/contact')}" class="btn btn-secondary btn-lg" data-link>💬 Get In Touch</a>
        </div>
      </div>
    </section>

    <!-- Mission -->
    <section class="section">
      <div class="container">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center" class="about-split">
          <div>
            <div class="section-label">🎯 Our Mission</div>
            <h2 style="margin-bottom:20px">Putting Mizoram<br>On The Map</h2>
            <p style="color:var(--text-muted);line-height:1.9;margin-bottom:18px">
              Mizoram has always been one of India's best-kept secrets — lush forests, serene lakes, misty mountain peaks and the warmest people you'll ever meet. Yet it has long been overlooked by mainstream travel platforms.
            </p>
            <p style="color:var(--text-muted);line-height:1.9;margin-bottom:18px">
              We started LushaiTrips to change that. Our mission is simple: connect adventurous travelers with the authentic experiences, local hosts, and hidden gems of the Lushai Hills — all in one place.
            </p>
            <p style="color:var(--text-muted);line-height:1.9">
              Every booking you make directly supports a local homestay owner, a village guide, or a Mizo family running their own small business. <strong style="color:var(--text)">That's travel with purpose.</strong>
            </p>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
            ${[
              { num: '50+', label: 'Hidden Destinations' },
              { num: '200+', label: 'Happy Travelers' },
              { num: '15+', label: 'Verified Local Hosts' },
              { num: '4.8★', label: 'Average Rating' },
            ].map(s => `
              <div class="card card-body text-center" style="padding:32px 20px">
                <div style="font-size:2rem;font-weight:900;color:var(--emerald-400);margin-bottom:8px">${s.num}</div>
                <div style="font-size:0.85rem;color:var(--text-muted)">${s.label}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section" style="background:var(--bg2)">
      <div class="container">
        <div class="section-label text-center">💚 What We Stand For</div>
        <h2 class="text-center" style="margin-bottom:48px">Our Core Values</h2>
        <div class="grid-3">
          ${[
            { icon: '🌱', title: 'Community First', desc: 'We partner only with local hosts, guides, and service providers — ensuring every rupee you spend stays in the community.' },
            { icon: '🔒', title: 'Trust & Safety', desc: 'Every listing on LushaiTrips is manually verified. We vet hosts, review feedback, and maintain quality standards you can rely on.' },
            { icon: '🗺️', title: 'Authentic Experiences', desc: 'No cookie-cutter tours. We curate raw, real Mizoram — from hidden waterfalls to dawn treks with village elders.' },
            { icon: '📱', title: 'Simple & Accessible', desc: 'Planning a trip shouldn\'t be complicated. We built a platform that works for first-time visitors and seasoned adventurers alike.' },
            { icon: '♻️', title: 'Responsible Tourism', desc: 'We promote eco-conscious travel practices, low-impact activities, and respect for Mizoram\'s fragile ecosystems.' },
            { icon: '💛', title: 'Made in Mizoram', desc: 'We are not a distant startup — we are your neighbours. Our team lives and breathes these hills, roads, and seasons.' },
          ].map(v => `
            <div class="card card-body animate-in">
              <div style="font-size:2.5rem;margin-bottom:16px">${v.icon}</div>
              <h4 style="margin-bottom:10px">${v.title}</h4>
              <p style="font-size:0.9rem;color:var(--text-muted);line-height:1.7">${v.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="section">
      <div class="container">
        <div class="section-label text-center">👥 The Team</div>
        <h2 class="text-center" style="margin-bottom:16px">People Behind LushaiTrips</h2>
        <p class="text-center" style="color:var(--text-muted);max-width:520px;margin:0 auto 48px;line-height:1.8">
          A small, passionate team of Mizoram natives, tech enthusiasts, and travel obsessives who believe the Northeast deserves the spotlight.
        </p>
        <div class="grid-3">
          ${[
            { emoji: '🧑‍💻', name: 'Isak Roluahpuia', role: 'Founder & Developer', desc: 'A Mizo developer who built LushaiTrips from the ground up — because he got lost trying to find a homestay in Phawngpui and decided to fix that.' },
            { emoji: '🏔️', name: 'Zosangliana', role: 'Head of Destinations', desc: 'A trekking enthusiast who has mapped every trail in the Lushai Hills. He personally scouts and verifies every destination on the platform.' },
            { emoji: '📸', name: 'Lalmuanpuii', role: 'Content & Photography', desc: 'A visual storyteller capturing Mizoram\'s beauty one frame at a time — her shots are what make you instantly book a trip.' },
          ].map(t => `
            <div class="card card-body text-center animate-in">
              <div style="font-size:4rem;margin-bottom:16px">${t.emoji}</div>
              <h4 style="margin-bottom:4px">${t.name}</h4>
              <div style="font-size:0.8rem;color:var(--emerald-400);font-weight:600;margin-bottom:14px;text-transform:uppercase;letter-spacing:0.05em">${t.role}</div>
              <p style="font-size:0.88rem;color:var(--text-muted);line-height:1.7">${t.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section" style="background:linear-gradient(135deg,var(--emerald-900),var(--bg3))">
      <div class="container text-center">
        <h2 style="margin-bottom:16px">Ready to Explore Mizoram?</h2>
        <p style="margin-bottom:32px;max-width:500px;margin-left:auto;margin-right:auto;color:var(--text-muted)">
          Let's get you planning your next great adventure in the Lushai Hills.
        </p>
        <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
          <a href="${H('/surprise')}" class="btn btn-amber btn-lg" data-link>🎲 Surprise Me</a>
          <a href="${H('/discover')}" class="btn btn-secondary btn-lg" data-link>Explore Destinations</a>
        </div>
      </div>
    </section>

    <style>
      @media (max-width: 768px) {
        .about-split { grid-template-columns: 1fr !important; gap: 40px !important; }
      }
    </style>
  `;
}

export function initAbout() {}
