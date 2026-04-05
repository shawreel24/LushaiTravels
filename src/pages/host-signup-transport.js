import { signUpEmail, insertTransport } from '../lib/supabase.js';
import { refreshUserCache, showToast } from '../utils.js';

export function renderHostSignupTransport() {
  return `
    <div style="min-height:100vh;padding:100px 24px 60px;background:linear-gradient(135deg,var(--bg) 0%,var(--bg2) 50%,var(--bg3) 100%)">
      <div style="max-width:680px;margin:0 auto">
        <div style="text-align:center;margin-bottom:40px">
          <div class="auth-logo" style="font-size:2rem;margin-bottom:8px">LushaiTrips</div>
          <h2 style="margin-bottom:8px">List Your Transport</h2>
          <p style="color:var(--text-muted)">Connect travelers with reliable rides across Mizoram's mountain roads</p>
        </div>

        <div class="card card-body" style="padding:40px">
          <h3 style="margin-bottom:24px">👤 Personal Information</h3>
          <div class="grid-2">
            <div class="form-group"><label class="form-label">Full Name *</label><input type="text" class="form-input" id="t-name" placeholder="Your full name" /></div>
            <div class="form-group"><label class="form-label">Phone *</label><input type="tel" class="form-input" id="t-phone" placeholder="+91 98765 43210" /></div>
          </div>
          <div class="grid-2">
            <div class="form-group"><label class="form-label">Email *</label><input type="email" class="form-input" id="t-email" placeholder="you@example.com" /></div>
            <div class="form-group"><label class="form-label">Password *</label><input type="password" class="form-input" id="t-password" placeholder="Min 8 characters" /></div>
          </div>

          <div class="divider-h"></div>
          <h3 style="margin-bottom:24px">🚗 Business Details</h3>

          <div class="form-group"><label class="form-label">Business / Service Name *</label><input type="text" class="form-input" id="t-biz" placeholder="e.g. Raj Mizoram Travels" /></div>

          <div class="form-group">
            <label class="form-label">Service Type *</label>
            <div class="check-group">
              ${['Car & SUV Rental','Motorcycle & Bike Rental','Shared Sumo / Van','Private Van Hire','Airport Transfer','Tempo Traveller'].map(t => `<label class="chip" style="cursor:pointer;display:flex;align-items:center;gap:6px"><input type="radio" name="t-type" value="${t}" style="accent-color:var(--emerald-500)" />${t}</label>`).join('')}
            </div>
          </div>

          <div class="form-group"><label class="form-label">Base Location *</label>
            <select class="form-select" id="t-location">
              <option value="">Select district</option>
              ${['Aizawl','Lunglei','Champhai','Kolasib','Lawngtlai','Mamit','Saiha','Serchhip'].map(d => `<option>${d}</option>`).join('')}
            </select>
          </div>

          <div class="divider-h"></div>
          <h3 style="margin-bottom:16px">🚘 Your Vehicles</h3>
          <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:20px">Add details for each vehicle you offer</p>

          <div id="vehicles-container">
            ${buildVehicleRow(0)}
          </div>
          <button class="btn btn-outline btn-sm" id="add-vehicle-btn" style="margin-bottom:28px">+ Add Another Vehicle</button>

          <div class="form-group">
            <label class="form-label">Features & Services</label>
            <div class="check-group" style="flex-wrap:wrap">
              ${['Airport Pickup','AC Vehicles','Night Driving','Driver Provided','Fuel Included','All Districts','Breakdown Assistance','Child Seats','Helmets Included','Riding Gear','Route Maps','Delivery to Hotel'].map(f => `<label class="chip" style="cursor:pointer;display:flex;align-items:center;gap:6px"><input type="checkbox" name="t-feat" value="${f}" style="accent-color:var(--emerald-500)" />${f}</label>`).join('')}
            </div>
          </div>

          <div class="form-group"><label class="form-label">Description *</label><textarea class="form-textarea" id="t-desc" placeholder="Describe your service — coverage areas, experience, what makes you reliable…" style="min-height:120px"></textarea></div>

          <div class="divider-h"></div>
          <h3 style="margin-bottom:16px">📸 Vehicle Photos</h3>
          <div class="upload-zone" onclick="document.getElementById('t-photos').click()">
            <div style="font-size:2rem;margin-bottom:8px">🚗</div>
            <div style="font-weight:600;margin-bottom:4px">Upload Vehicle Photos</div>
            <div style="font-size:0.8rem;color:var(--text-dim)">Min 2 photos — exterior, interior • JPG or PNG</div>
            <input type="file" id="t-photos" multiple accept="image/*" style="display:none" />
          </div>
          <div class="upload-preview" id="t-photo-preview" style="margin-top:12px"></div>

          <div class="divider-h"></div>
          <div class="form-group">
            <label class="form-label">Driving License / RC Book * <span style="font-size:0.8rem;color:var(--text-dim)">(upload document)</span></label>
            <div class="upload-zone" onclick="document.getElementById('t-license').click()" style="padding:20px">
              <div style="font-size:1.5rem;margin-bottom:6px">📄</div>
              <div style="font-size:0.9rem;font-weight:600">Upload License / RC</div>
              <input type="file" id="t-license" accept=".jpg,.png,.pdf" style="display:none" />
            </div>
            <div id="t-license-preview" style="font-size:0.85rem;color:var(--emerald-400);margin-top:6px"></div>
          </div>

          <label class="check-item" style="margin-bottom:24px">
            <input type="checkbox" id="t-agree" />
            <label style="font-size:0.9rem">I certify all information is accurate and agree to LushaiTrips <a href="#" style="color:var(--emerald-400)">Transport Partner Terms</a></label>
          </label>

          <button class="btn btn-primary w-full" id="submit-transport-btn" style="justify-content:center;padding:16px;font-size:1rem">Submit Transport Listing 🚗</button>
        </div>
      </div>
    </div>
  `;
}

let vehicleCount = 1;
function buildVehicleRow(idx) {
  return `
    <div class="card card-body" style="padding:20px;margin-bottom:16px;${idx > 0 ? 'position:relative' : ''}">
      ${idx > 0 ? `<button class="remove-img" style="position:absolute;top:12px;right:12px;width:24px;height:24px" onclick="this.parentElement.remove()">✕</button>` : ''}
      <div style="font-weight:700;margin-bottom:16px;font-size:0.9rem;color:var(--emerald-400)">Vehicle ${idx + 1}</div>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Vehicle Name *</label><input type="text" class="form-input" placeholder="e.g. Toyota Innova Crysta" /></div>
        <div class="form-group"><label class="form-label">Passenger Capacity *</label><input type="number" class="form-input" min="1" max="30" placeholder="e.g. 7" /></div>
      </div>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Price (₹) *</label><input type="number" class="form-input" placeholder="e.g. 3500" /></div>
        <div class="form-group"><label class="form-label">Price Unit</label>
          <select class="form-select"><option>per day (fuel incl.)</option><option>per day (fuel extra)</option><option>per km</option><option>per seat per route</option></select>
        </div>
      </div>
    </div>
  `;
}

export function initHostSignupTransport() {
  let uploadedImages = [];
  document.getElementById('add-vehicle-btn')?.addEventListener('click', () => {
    vehicleCount++;
    const container = document.getElementById('vehicles-container');
    container.insertAdjacentHTML('beforeend', buildVehicleRow(vehicleCount - 1));
  });
  document.getElementById('t-photos')?.addEventListener('change', e => {
    [...e.target.files].forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        uploadedImages.push(ev.target.result);
        const wrap = document.createElement('div'); wrap.className = 'upload-img-wrap';
        wrap.innerHTML = `<img src="${ev.target.result}" alt="v" /><button class="remove-img">✕</button>`;
        document.getElementById('t-photo-preview')?.appendChild(wrap);
        wrap.querySelector('.remove-img')?.addEventListener('click', () => { uploadedImages.splice(uploadedImages.indexOf(ev.target.result),1); wrap.remove(); });
      };
      reader.readAsDataURL(file);
    });
  });
  document.getElementById('t-license')?.addEventListener('change', e => {
    if (e.target.files[0]) document.getElementById('t-license-preview').textContent = '✅ ' + e.target.files[0].name;
  });
  document.getElementById('submit-transport-btn')?.addEventListener('click', async () => {
    const name = document.getElementById('t-name')?.value?.trim();
    const email = document.getElementById('t-email')?.value?.trim();
    const phone = document.getElementById('t-phone')?.value?.trim();
    const password = document.getElementById('t-password')?.value;
    const biz = document.getElementById('t-biz')?.value?.trim();
    const type = document.querySelector('input[name="t-type"]:checked')?.value;
    const location = document.getElementById('t-location')?.value;
    const desc = document.getElementById('t-desc')?.value?.trim();
    const features = [...document.querySelectorAll('input[name="t-feat"]:checked')].map(el => el.value);
    if (!name||!email||!phone||!password||!biz||!type||!location||!desc) { showToast('Please fill all required fields','','error'); return; }
    if (!document.getElementById('t-agree')?.checked) { showToast('Please agree to Terms','','error'); return; }
    const btn = document.getElementById('submit-transport-btn');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Submitting…'; }
    try {
      // Create account only if not already logged in
      const { supabase } = await import('../lib/supabase.js');
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        await signUpEmail({ email, password, fullName: name, phone });
      }
      await refreshUserCache();
      await insertTransport({
        name: biz,
        owner_name: name,
        type, location,
        description: desc,
        features,
        images: uploadedImages,
        cover_image: uploadedImages[0] || '',
        phone, email,
        vehicles: [],
        verified: true, available: true,
      });
      showToast('Transport listing live! 🎉', 'Your listing is now visible to travellers.');
      setTimeout(() => window.router.navigate('/host-dashboard'), 800);
    } catch(e) {
      showToast(e.message || 'Submission failed','','error');
      if (btn) { btn.disabled = false; btn.textContent = 'Submit Transport Listing 🚗'; }
    }
  });
}
