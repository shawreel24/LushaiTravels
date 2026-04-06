import { appHref } from '../utils.js';

export function renderTravelTips() {
  const H = appHref;
  return `
    <!-- Hero -->
    <section style="min-height:55vh;display:flex;align-items:center;background:linear-gradient(135deg,var(--bg1),var(--emerald-900) 50%,var(--bg2));padding:120px 0 80px;position:relative;overflow:hidden">
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse 70% 50% at 50% 50%,rgba(16,185,129,0.12),transparent);pointer-events:none"></div>
      <div class="container" style="position:relative;z-index:1">
        <div class="section-label">🧭 Traveler's Guide</div>
        <h1 style="font-size:clamp(2.2rem,6vw,4rem);font-weight:900;line-height:1.1;margin-bottom:24px">
          Travel Tips for <span class="gradient-text">Mizoram</span>
        </h1>
        <p style="font-size:1.15rem;color:var(--text-muted);max-width:600px;line-height:1.8">
          Everything first-time and returning visitors need to know before heading into the beautiful, mysterious Lushai Hills.
        </p>
      </div>
    </section>

    <!-- Quick Tips Banner -->
    <section style="background:var(--emerald-900);padding:24px 0;border-top:1px solid var(--glass-border);border-bottom:1px solid var(--glass-border)">
      <div class="container">
        <div style="display:flex;flex-wrap:wrap;gap:24px;justify-content:center">
          ${['🌧️ Carry rain gear year-round','📵 Expect limited signal in remote areas','💵 Carry cash — ATMs are scarce outside Aizawl','🥾 Pack sturdy trekking shoes','🗣️ Learn a few Mizo words — locals love it!','🕊️ Sundays are quiet — most shops closed'].map(t => `
            <span style="font-size:0.88rem;color:var(--emerald-200);display:flex;align-items:center;gap:6px">${t}</span>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Best Time to Visit -->
    <section class="section">
      <div class="container">
        <div class="section-label">📅 Planning Your Trip</div>
        <h2 style="margin-bottom:40px">Best Time to Visit Mizoram</h2>
        <div class="grid-4">
          ${[
            { season: 'October – February', icon: '❄️', label: 'Best Season', color: '#10b981', desc: 'Cool, clear skies. Perfect for trekking, sightseeing, and exploring all districts. Temperatures range from 11°C to 24°C.' },
            { season: 'March – May', icon: '🌸', label: 'Good Season', color: '#f59e0b', desc: 'Lush and warm before the rains. Anthurium and cherry blossoms bloom. Slightly humid but still very pleasant.' },
            { season: 'June – September', icon: '🌧️', label: 'Monsoon', color: '#6366f1', desc: 'Heavy rainfall makes roads slippery. Waterfalls are dramatic and forests are lush green. For adventurous souls only.' },
            { season: 'Chapchar Kut (March)', icon: '🎉', label: 'Festival Season', color: '#ec4899', desc: 'Mizoram\'s biggest cultural festival. Traditional dances, food, and community celebrations across the state.' },
          ].map(s => `
            <div class="card card-body animate-in" style="border-top:3px solid ${s.color}">
              <div style="font-size:2.2rem;margin-bottom:12px">${s.icon}</div>
              <div style="font-size:0.75rem;font-weight:700;color:${s.color};text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px">${s.label}</div>
              <h4 style="margin-bottom:10px;font-size:0.95rem">${s.season}</h4>
              <p style="font-size:0.85rem;color:var(--text-muted);line-height:1.7">${s.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Getting There -->
    <section class="section" style="background:var(--bg2)">
      <div class="container">
        <div class="section-label">✈️ Getting There</div>
        <h2 style="margin-bottom:40px">How to Reach Mizoram</h2>
        <div class="grid-3">
          ${[
            { icon: '✈️', title: 'By Air', desc: 'Lengpui Airport (AJL) near Aizawl has direct flights from Kolkata, Delhi, and Imphal via IndiGo, Air India, and SpiceJet. The airport is about 32km from the city centre.' },
            { icon: '🚂', title: 'By Train', desc: 'Bairabi Railway Station (at the Assam-Mizoram border) is the closest railhead. From there, take a taxi or shared cab to Aizawl (~180km). Trains from Guwahati connect here.' },
            { icon: '🚍', title: 'By Road', desc: 'Well-connected by NH-306 from Silchar, Assam. State buses and private taxis operate regularly from Silchar, Guwahati, and Shillong. Expect scenic mountain roads.' },
          ].map(t => `
            <div class="card card-body animate-in">
              <div style="font-size:2.5rem;margin-bottom:16px">${t.icon}</div>
              <h4 style="margin-bottom:12px">${t.title}</h4>
              <p style="font-size:0.88rem;color:var(--text-muted);line-height:1.8">${t.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Inner Line Permit -->
    <section class="section" style="background:linear-gradient(135deg,rgba(245,158,11,0.08),var(--bg1))">
      <div class="container">
        <div style="max-width:780px;margin:0 auto">
          <div style="display:flex;align-items:flex-start;gap:24px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.25);border-radius:var(--radius);padding:32px">
            <div style="font-size:3rem;flex-shrink:0">📋</div>
            <div>
              <h3 style="margin-bottom:12px;color:var(--amber)">Inner Line Permit (ILP)</h3>
              <p style="color:var(--text-muted);line-height:1.8;margin-bottom:16px">
                <strong style="color:var(--text)">Indian citizens</strong> require an Inner Line Permit (ILP) to visit Mizoram. It is issued free of cost.
              </p>
              <ul style="color:var(--text-muted);line-height:2;padding-left:20px;margin-bottom:16px">
                <li>Apply online at <strong style="color:var(--text)">mizoram.gov.in</strong> or in person at Mizoram House offices in Delhi, Kolkata, Guwahati, or Silchar</li>
                <li>Valid for 15 days (extendable up to 6 months)</li>
                <li>Foreign nationals require a Protected Area Permit (PAP) — obtain from the Ministry of Home Affairs</li>
                <li>Always carry printed copies plus national ID proof</li>
              </ul>
              <a href="https://mizoram.gov.in" target="_blank" rel="noreferrer" class="btn btn-secondary btn-sm">🌐 Visit Official Site →</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Practical Tips -->
    <section class="section">
      <div class="container">
        <div class="section-label">💡 Practical Essentials</div>
        <h2 style="margin-bottom:40px">Tips for a Smooth Trip</h2>
        <div class="grid-3">
          ${[
            { icon: '💵', title: 'Money & ATMs', tips: ['Carry enough cash — many rural areas have no ATMs','SBI and Axis Bank ATMs in Aizawl are most reliable','UPI accepted at bigger hotels and restaurants','Inform your bank before travelling to avoid card blocks'] },
            { icon: '📶', title: 'Connectivity', tips: ['Airtel and Jio have the best coverage in Mizoram','BSNL works in remote areas where others fail','Download offline maps (Maps.me or Google Maps offline)','Satellite rentals available for deep jungle treks'] },
            { icon: '🍽️', title: 'Food & Drink', tips: ['Vawksa rep (smoked pork) is a must-try Mizo dish','Bai (leafy greens with soda) is a local staple','Most restaurants serve Mizo, Indian and Chinese food','Always drink boiled or bottled water outside towns'] },
            { icon: '🏨', title: 'Accommodation', tips: ['Book at least a week in advance during Oct–Feb','Homestays offer the most authentic experience','Most stays include dinner and breakfast','LushaiTrips verified stays have 24h support'] },
            { icon: '🕌', title: 'Culture & Customs', tips: ['Mizoram is predominantly Christian — dress modestly','Sundays are quiet — plan grocery shopping on Saturday','Photography in villages requires permission','Always ask before entering someone's home'] },
            { icon: '🩺', title: 'Health & Meds', tips: ['Carry basic first-aid and personal medicines','Malaria prophylaxis advised for jungle stays','Altitude sickness unlikely but stay hydrated','Nearest good hospital is at Aizawl Civil Hospital'] },
          ].map(tip => `
            <div class="card card-body animate-in">
              <div style="font-size:2.2rem;margin-bottom:14px">${tip.icon}</div>
              <h4 style="margin-bottom:14px">${tip.title}</h4>
              <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px">
                ${tip.tips.map(t => `<li style="font-size:0.85rem;color:var(--text-muted);display:flex;gap:8px;line-height:1.5"><span style="color:var(--emerald-400);flex-shrink:0">✓</span>${t}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Packing List -->
    <section class="section" style="background:var(--bg2)">
      <div class="container">
        <div class="section-label">🎒 What to Pack</div>
        <h2 style="margin-bottom:40px">The Mizoram Packing Checklist</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px">
          ${[
            { category: '👕 Clothing', items: ['Light cotton clothes (Oct–May)','Warm layers & jacket (Nov–Feb)','Waterproof rain jacket','Comfortable trekking pants','Quick-dry towel'] },
            { category: '👟 Footwear & Gear', items: ['Sturdy trekking shoes/boots','Flip-flops or sandals','Waterproof daypack','UV protection sunglasses','Trekking poles (optional)'] },
            { category: '💊 Medical & Safety', items: ['Personal medications','ORS sachets (hydration)','Insect repellent (DEET)','Hand sanitizer','Small first-aid kit'] },
            { category: '📱 Tech & Documents', items: ['Offline map downloaded','Portable charger (powerbank)','Indian ID proof','Printed ILP permit copy','Multi-plug adapter'] },
          ].map(cat => `
            <div class="card card-body">
              <div style="font-size:1rem;font-weight:700;color:var(--emerald-400);margin-bottom:14px">${cat.category}</div>
              ${cat.items.map(i => `<div style="font-size:0.85rem;color:var(--text-muted);padding:6px 0;border-bottom:1px solid var(--glass-border);display:flex;gap:8px"><span>•</span>${i}</div>`).join('')}
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section" style="background:linear-gradient(135deg,var(--emerald-900),var(--bg3))">
      <div class="container text-center">
        <h2 style="margin-bottom:16px">All Set to Go?</h2>
        <p style="margin-bottom:32px;color:var(--text-muted);max-width:480px;margin-left:auto;margin-right:auto">
          Explore Mizoram's best destinations, book your stay, hire a local guide — all in one place.
        </p>
        <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
          <a href="${H('/surprise')}" class="btn btn-amber btn-lg" data-link>🎲 Surprise Me</a>
          <a href="${H('/discover')}" class="btn btn-secondary btn-lg" data-link>Explore Destinations</a>
        </div>
      </div>
    </section>
  `;
}

export function initTravelTips() {}
