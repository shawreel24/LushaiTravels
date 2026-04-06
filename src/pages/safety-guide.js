import { appHref } from '../utils.js';

export function renderSafetyGuide() {
  const H = appHref;
  return `
    <!-- Hero -->
    <section style="min-height:55vh;display:flex;align-items:center;background:linear-gradient(135deg,#0f1a16 0%,#0d2318 50%,#0f1a16 100%);padding:120px 0 80px;position:relative;overflow:hidden">
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse 70% 50% at 50% 50%,rgba(16,185,129,0.1),transparent);pointer-events:none"></div>
      <div class="container" style="position:relative;z-index:1">
        <div class="section-label">🛡️ Stay Safe Out There</div>
        <h1 style="font-size:clamp(2.2rem,6vw,4rem);font-weight:900;line-height:1.1;margin-bottom:24px">
          Mizoram <span class="gradient-text">Safety Guide</span>
        </h1>
        <p style="font-size:1.15rem;color:var(--text-muted);max-width:600px;line-height:1.8">
          Mizoram is one of India's safest states — but like any adventure destination, smart preparation ensures you have a smooth, worry-free experience.
        </p>
        <div style="display:flex;gap:20px;margin-top:36px;flex-wrap:wrap">
          <div style="background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.3);border-radius:50px;padding:10px 20px;font-size:0.88rem;color:var(--emerald-300)">
            🏆 Ranked one of India's Top 5 Safest States
          </div>
          <div style="background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.3);border-radius:50px;padding:10px 20px;font-size:0.88rem;color:var(--emerald-300)">
            💚 Low crime rate, high community spirit
          </div>
        </div>
      </div>
    </section>

    <!-- Emergency Contacts -->
    <section style="background:linear-gradient(135deg,rgba(239,68,68,0.08),var(--bg1));padding:48px 0;border-bottom:1px solid var(--glass-border)">
      <div class="container">
        <h3 style="text-align:center;margin-bottom:32px;color:var(--text)">🆘 Emergency Contacts</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;max-width:900px;margin:0 auto">
          ${[
            { icon: '🚔', label: 'Mizoram Police', num: '100' },
            { icon: '🚒', label: 'Fire Service', num: '101' },
            { icon: '🚑', label: 'Ambulance', num: '102' },
            { icon: '🏥', label: 'National Emergency', num: '112' },
            { icon: '📞', label: 'Tourist Helpline', num: '1800-345-3699' },
            { icon: '🌲', label: 'Forest Dept. (Aizawl)', num: '0389-232-5000' },
          ].map(e => `
            <div class="card card-body text-center" style="border:1px solid rgba(239,68,68,0.2)">
              <div style="font-size:2rem;margin-bottom:8px">${e.icon}</div>
              <div style="font-size:0.78rem;color:var(--text-muted);margin-bottom:6px">${e.label}</div>
              <div style="font-size:1.4rem;font-weight:900;color:#f87171">${e.num}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- General Safety -->
    <section class="section">
      <div class="container">
        <div class="section-label">🔐 General Safety</div>
        <h2 style="margin-bottom:40px">Staying Safe in Mizoram</h2>
        <div class="grid-3">
          ${[
            { icon: '👮', title: 'Law & Order', desc: 'Mizoram consistently ranks among the safest Indian states with low violent crime. The Mizoram Police are approachable and helpful to tourists. Keep local police station numbers handy when heading to remote areas.' },
            { icon: '🌃', title: 'Night Safety', desc: 'Aizawl and major towns are very safe at night. Avoid isolated mountain trails after dark. In villages, inform your host of your plans. Carry a torch/flashlight when walking unlit paths.' },
            { icon: '👰', title: 'Women Travelers', desc: 'Mizoram is one of the safest destinations for solo women travelers in India. The Mizo culture is deeply respectful. Basic precautions apply — share your itinerary with someone you trust and avoid late solo treks.' },
            { icon: '📲', title: 'Stay Connected', desc: 'Share your daily itinerary with family or friends. Save emergency contacts offline. WhatsApp location sharing is a simple but effective safety net. Check in regularly when in remote areas.' },
            { icon: '🎒', title: 'Valuables', desc: 'Petty theft is minimal but always lock your accommodation and use hotel safes for passports and cash. Don\'t display expensive cameras or jewelry on crowded market days. Keep copies of documents in cloud storage.' },
            { icon: '🚗', title: 'Road Safety', desc: 'Mountain roads can be narrow and winding. Only hire experienced local drivers. Avoid night driving on mountain roads. Roads can close due to landslides during monsoon — always check conditions before travelling.' },
          ].map(s => `
            <div class="card card-body animate-in">
              <div style="font-size:2.2rem;margin-bottom:16px">${s.icon}</div>
              <h4 style="margin-bottom:10px">${s.title}</h4>
              <p style="font-size:0.88rem;color:var(--text-muted);line-height:1.7">${s.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Health & Medical -->
    <section class="section" style="background:var(--bg2)">
      <div class="container">
        <div class="section-label">🩺 Health & Medical</div>
        <h2 style="margin-bottom:40px">Health Precautions</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start" class="safety-grid">
          <div>
            <h4 style="margin-bottom:20px;color:var(--emerald-400)">Before You Travel</h4>
            ${[
              { icon: '💉', tip: 'Consult your doctor about vaccinations — Hepatitis A, Typhoid, and Tetanus are generally recommended for travel to Northeast India.' },
              { icon: '🦟', tip: 'Malaria is present in some forested areas. Take prophylaxis if staying in jungle camps. Use DEET-based insect repellent.' },
              { icon: '📋', tip: 'Carry adequate supplies of all prescription medications. Medical stores in remote areas may not stock specific brands.' },
              { icon: '🏥', tip: 'Get travel medical insurance that covers emergency evacuation — the nearest major hospitals may be hours away from remote sites.' },
            ].map(t => `
              <div style="display:flex;gap:16px;margin-bottom:20px;align-items:flex-start">
                <div style="font-size:1.8rem;flex-shrink:0">${t.icon}</div>
                <p style="font-size:0.88rem;color:var(--text-muted);line-height:1.7;margin:0">${t.tip}</p>
              </div>
            `).join('')}
          </div>
          <div>
            <h4 style="margin-bottom:20px;color:var(--emerald-400)">While You're There</h4>
            ${[
              { icon: '💧', tip: 'Always drink boiled or bottled water. Avoid ice at small roadside eateries. Carry a water purification bottle for long treks.' },
              { icon: '🍱', tip: 'Street food is generally safe in Mizoram. Eat freshly cooked food. Avoid raw vegetables or salads unless you know the source.' },
              { icon: '☀️', tip: 'Sun exposure can be intense at higher altitudes. Use SPF 50+ sunscreen, wear a hat, and stay hydrated — especially on treks.' },
              { icon: '🌡️', tip: 'Altitude change while moving between districts can cause mild headaches or fatigue. Rest, hydrate, and acclimatize gradually.' },
            ].map(t => `
              <div style="display:flex;gap:16px;margin-bottom:20px;align-items:flex-start">
                <div style="font-size:1.8rem;flex-shrink:0">${t.icon}</div>
                <p style="font-size:0.88rem;color:var(--text-muted);line-height:1.7;margin:0">${t.tip}</p>
              </div>
            `).join('')}
          </div>
        </div>
        <div style="margin-top:32px;background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:24px">
          <h4 style="margin-bottom:12px">🏥 Key Hospitals in Mizoram</h4>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px">
            ${[
              { name: 'Aizawl Civil Hospital', loc: 'Aizawl (Main)', phone: '0389-232-1060' },
              { name: 'Zoram Medical College', loc: 'Falkawn, Aizawl', phone: '0389-232-5000' },
              { name: 'Lawngtlai District Hospital', loc: 'South Mizoram', phone: '03835-22003' },
              { name: 'Lunglei Civil Hospital', loc: 'Lunglei District', phone: '03372-322-400' },
            ].map(h => `
              <div style="font-size:0.83rem">
                <div style="font-weight:700;color:var(--text);margin-bottom:2px">${h.name}</div>
                <div style="color:var(--text-muted)">${h.loc} · ${h.phone}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- Trekking Safety -->
    <section class="section">
      <div class="container">
        <div class="section-label">🥾 Adventure Safety</div>
        <h2 style="margin-bottom:40px">Trekking & Outdoor Safety</h2>
        <div class="grid-4">
          ${[
            { icon: '🗺️', title: 'Always Carry a Map', desc: 'Download offline maps before heading into the hills. Many trails are unmarked and GPS signal can be weak in dense forest cover.' },
            { icon: '🧭', title: 'Hire Local Guides', desc: 'For any trek beyond 5km into the wilderness, hire a LushaiTrips verified local guide. They know alternate routes, weather patterns, and emergency procedures.' },
            { icon: '🌤️', title: 'Check Weather', desc: 'Mountain weather changes rapidly. Check forecasts at accuweather.com before heading out. Do not trek alone during monsoon season (June–Sept).' },
            { icon: '📣', title: 'Tell Someone', desc: 'Always inform your homestay host or a friend about your trekking plan — route, estimated return time, and who to call if you don\'t check in.' },
          ].map(t => `
            <div class="card card-body animate-in">
              <div style="font-size:2rem;margin-bottom:14px">${t.icon}</div>
              <h4 style="margin-bottom:10px;font-size:0.95rem">${t.title}</h4>
              <p style="font-size:0.83rem;color:var(--text-muted);line-height:1.7">${t.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Cultural Safety -->
    <section class="section" style="background:var(--bg2)">
      <div class="container">
        <div class="section-label">🕊️ Cultural Etiquette</div>
        <h2 style="margin-bottom:32px">Respecting Local Culture</h2>
        <div style="max-width:780px;margin:0 auto;display:flex;flex-direction:column;gap:16px">
          ${[
            { do: true, text: 'Dress modestly, especially when visiting churches or entering villages. Avoid sleeveless or revealing clothing in rural areas.' },
            { do: true, text: 'Ask permission before taking photographs of locals, their homes, or during religious events. Most Mizos are happy to pose — just ask first.' },
            { do: true, text: 'Remove your shoes before entering homes and some guesthouses — watch for cues or ask your host.' },
            { do: false, text: 'Do not consume alcohol in dry zones or offer it to locals without knowing whether they drink. Mizoram has a strong church community.' },
            { do: false, text: 'Do not make comments disrespecting Mizo culture, Christianity, or local customs. The community is close-knit and proud of their heritage.' },
            { do: false, text: 'Do not litter, pick wildflowers, or disturb wildlife in protected areas. Always carry your trash out of trekking sites.' },
          ].map(c => `
            <div style="display:flex;gap:16px;align-items:flex-start;background:var(--glass);border:1px solid var(--glass-border);border-left:3px solid ${c.do ? 'var(--emerald-500)' : '#f87171'};border-radius:var(--radius);padding:16px 20px">
              <div style="font-size:1.2rem;flex-shrink:0">${c.do ? '✅' : '❌'}</div>
              <p style="margin:0;font-size:0.9rem;color:var(--text-muted);line-height:1.7">${c.text}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section" style="background:linear-gradient(135deg,var(--emerald-900),var(--bg3))">
      <div class="container text-center">
        <h2 style="margin-bottom:16px">Have Questions About Safety?</h2>
        <p style="margin-bottom:32px;color:var(--text-muted);max-width:480px;margin-left:auto;margin-right:auto">
          Our team is from Mizoram and happy to answer any concerns about your trip — just reach out.
        </p>
        <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
          <a href="${H('/contact')}" class="btn btn-primary btn-lg" data-link>💬 Contact Us</a>
          <a href="${H('/travel-tips')}" class="btn btn-secondary btn-lg" data-link>📖 Travel Tips</a>
        </div>
      </div>
    </section>

    <style>
      @media (max-width: 768px) {
        .safety-grid { grid-template-columns: 1fr !important; }
      }
    </style>
  `;
}

export function initSafetyGuide() {}
