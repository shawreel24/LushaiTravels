import { signUpEmail, insertStay } from '../lib/supabase.js';
import { refreshUserCache, showToast } from '../utils.js';

let currentStep = 1;
const totalSteps = 5;
const formData = {};
let uploadedImages = [];

const stepLabels = ['Basic Info', 'Property', 'Stay Details', 'Photos', 'Rules & Submit'];

export function renderHostSignupStay() {
  return `
    <div style="min-height:100vh;padding:100px 24px 60px;background:linear-gradient(135deg,var(--bg) 0%,var(--bg2) 50%,var(--bg3) 100%)">
      <div style="max-width:700px;margin:0 auto">
        <div style="text-align:center;margin-bottom:40px">
          <div class="auth-logo" style="font-size:2rem;margin-bottom:8px">LushaiTrips</div>
          <h2 style="margin-bottom:8px">List Your Property</h2>
          <p style="color:var(--text-muted)">Join our trusted network of Mizoram hosts</p>
        </div>

        <!-- Stepper -->
        <div class="stepper" id="stepper">${buildStepper()}</div>

        <!-- Steps -->
        <div class="card card-body" style="padding:40px" id="step-container">
          ${buildStep(1)}
        </div>

        <!-- Navigation -->
        <div style="display:flex;justify-content:space-between;margin-top:24px">
          <button class="btn btn-secondary" id="prev-btn" style="${currentStep === 1 ? 'visibility:hidden' : ''}">← Back</button>
          <div style="color:var(--text-dim);font-size:0.85rem;align-self:center">Step ${currentStep} of ${totalSteps}</div>
          <button class="btn btn-primary" id="next-btn">${currentStep === totalSteps ? '🚀 Submit Listing' : 'Next →'}</button>
        </div>
      </div>
    </div>
  `;
}

function buildStepper() {
  return Array.from({ length: totalSteps }, (_, i) => {
    const n = i + 1;
    const cls = n < currentStep ? 'done' : n === currentStep ? 'active' : '';
    return `
      <div class="step ${cls}">
        <div class="step-wrapper">
          <div class="step-circle">${n < currentStep ? '✓' : n}</div>
          <div class="step-label">${stepLabels[i]}</div>
        </div>
      </div>
      ${n < totalSteps ? '<div class="step-line"></div>' : ''}
    `;
  }).join('');
}

function buildStep(step) {
  switch (step) {
    case 1: return `
      <h3 style="margin-bottom:24px">👤 Step 1: Basic Information</h3>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Your Full Name *</label><input type="text" class="form-input" id="h-name" placeholder="E.g. Liana Hnamte" value="${formData.name||''}" /></div>
        <div class="form-group"><label class="form-label">Phone Number *</label><input type="tel" class="form-input" id="h-phone" placeholder="+91 98765 43210" value="${formData.phone||''}" /></div>
      </div>
      <div class="form-group"><label class="form-label">Email Address *</label><input type="email" class="form-input" id="h-email" placeholder="you@example.com" value="${formData.email||''}" /></div>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Password *</label><input type="password" class="form-input" id="h-password" placeholder="Min 8 characters" /></div>
        <div class="form-group"><label class="form-label">Confirm Password *</label><input type="password" class="form-input" id="h-confirm" placeholder="Repeat password" /></div>
      </div>
      </div>`;

    case 2: return `
      <h3 style="margin-bottom:24px">🏠 Step 2: Property Information</h3>
      <div class="form-group"><label class="form-label">Property Name *</label><input type="text" class="form-input" id="h-prop-name" placeholder="E.g. Bamboo Haven Homestay" value="${formData.propName||''}" /></div>
      <div class="form-group">
        <label class="form-label">Property Type *</label>
        <div class="check-group" id="prop-type-group">
          ${['Homestay','Hotel','Camping','Lodge','Farmstay','Guesthouse'].map(t => `
            <label class="chip" style="cursor:pointer;display:flex;align-items:center;gap:8px">
              <input type="radio" name="prop-type" value="${t}" ${formData.propType===t?'checked':''} style="accent-color:var(--emerald-500)" />
              ${t}
            </label>
          `).join('')}
        </div>
      </div>
      <div class="form-group"><label class="form-label">Full Address *</label><textarea class="form-textarea" id="h-address" placeholder="Village, District, PIN code" style="min-height:80px">${formData.address||''}</textarea></div>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">District *</label>
          <select class="form-select" id="h-district">
            <option value="">Select District</option>
            ${['Aizawl','Lunglei','Champhai','Kolasib','Lawngtlai','Mamit','Saiha','Serchhip','Saitual','Hnahthial','Khawzawl'].map(d => `<option ${formData.district===d?'selected':''}>${d}</option>`).join('')}
          </select>
        </div>
        <div class="form-group"><label class="form-label">Google Maps Link <span style="font-size:0.8rem;color:var(--text-dim)">(optional)</span></label><input type="url" class="form-input" id="h-maps" placeholder="https://maps.google.com/..." value="${formData.mapsLink||''}" /></div>
      </div>`;

    case 3: return `
      <h3 style="margin-bottom:24px">🛏️ Step 3: Stay Details</h3>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Number of Rooms *</label><input type="number" class="form-input" id="h-rooms" min="1" max="50" placeholder="e.g. 3" value="${formData.rooms||''}" /></div>
        <div class="form-group"><label class="form-label">Max Guests *</label><input type="number" class="form-input" id="h-guests" min="1" max="50" placeholder="e.g. 6" value="${formData.maxGuests||''}" /></div>
      </div>
      <div class="form-group">
        <label class="form-label">Price per Night (₹) *</label>
        <input type="number" class="form-input" id="h-price" min="500" placeholder="e.g. 2000" value="${formData.price||''}" />
        <span class="form-hint">Platform takes 10% commission. You receive 90%.</span>
      </div>
      <div class="form-group">
        <label class="form-label">Amenities</label>
        <div class="check-group" style="flex-wrap:wrap">
          ${['WiFi','Parking','Home-cooked Food','Breakfast Included','Hot Water','Valley View','Bonfire','AC','Private Bathroom','Kitchen Access','Laundry','Waterfall View','Farm Access','Stargazing'].map(a => `
            <label class="check-item">
              <input type="checkbox" name="amenity" value="${a}" ${(formData.amenities||[]).includes(a)?'checked':''} />
              <label>${a}</label>
            </label>
          `).join('')}
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">About Your Place *</label>
        <textarea class="form-textarea" id="h-description" placeholder="Describe what makes your place special — views, atmosphere, what guests will love…" style="min-height:140px">${formData.description||''}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Nearby Attractions</label>
        <input type="text" class="form-input" id="h-nearby" placeholder="e.g. Vantawng Falls (2 km), Thenzawl market" value="${formData.nearby||''}" />
      </div>`;

    case 4: return `
      <h3 style="margin-bottom:8px">📸 Step 4: Photos</h3>
      <p style="color:var(--text-muted);margin-bottom:24px;font-size:0.9rem">High-quality photos get 3× more bookings. Minimum 3 photos required. First photo will be your cover image.</p>
      <div class="upload-zone" id="photo-upload-zone" onclick="document.getElementById('photo-input').click()">
        <div style="font-size:2.5rem;margin-bottom:12px">📷</div>
        <div style="font-weight:700;margin-bottom:6px">Upload Property Photos</div>
        <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:8px">JPG or PNG • Max 5MB each • Minimum 3 required</div>
        <div style="font-size:0.8rem;color:var(--emerald-400)">💡 Include: exterior, bedroom, bathroom, view, dining area</div>
        <input type="file" id="photo-input" multiple accept="image/*" style="display:none" />
      </div>
      <div class="upload-preview" id="photo-preview" style="margin-top:16px"></div>
      <div id="photo-count" style="margin-top:10px;font-size:0.85rem;color:var(--text-muted)">${uploadedImages.length > 0 ? uploadedImages.length + ' photo(s) uploaded' : 'No photos uploaded yet'}</div>`;

    case 5: return `
      <h3 style="margin-bottom:24px">📜 Step 5: Rules & Submission</h3>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Check-in Time *</label><input type="time" class="form-input" id="h-checkin" value="${formData.checkIn||'14:00'}" /></div>
        <div class="form-group"><label class="form-label">Check-out Time *</label><input type="time" class="form-input" id="h-checkout" value="${formData.checkOut||'11:00'}" /></div>
      </div>
      <div class="form-group">
        <label class="form-label">House Rules</label>
        <textarea class="form-textarea" id="h-rules" placeholder="e.g. No smoking inside&#10;Quiet hours after 10 PM&#10;No outside guests after 9 PM&#10;Pets on request" style="min-height:120px">${formData.rules||''}</textarea>
        <span class="form-hint">One rule per line</span>
      </div>
      <div class="form-group">
        <label class="form-label">Cancellation Policy</label>
        <select class="form-select" id="h-cancel">
          <option value="flexible" ${formData.cancellation==='flexible'?'selected':''}>Flexible — Full refund 24 hours before</option>
          <option value="moderate" ${formData.cancellation==='moderate'?'selected':''}>Moderate — Full refund 5 days before</option>
          <option value="strict" ${formData.cancellation==='strict'?'selected':''}>Strict — 50% refund up to 1 week before</option>
        </select>
      </div>
      <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:var(--radius);padding:24px;margin-bottom:20px">
        <div style="font-weight:700;margin-bottom:12px">✅ What happens after submission?</div>
        ${['Our team reviews your listing within 24–48 hours','We verify your ID and property photos','Once approved, your listing goes live on LushaiTrips','You receive 90% of every booking directly to your account'].map(s => `<div style="display:flex;gap:10px;margin-bottom:8px;font-size:0.9rem;color:var(--text-muted)"><span style="color:var(--emerald-400)">→</span>${s}</div>`).join('')}
      </div>
      <label class="check-item" style="margin-bottom:20px">
        <input type="checkbox" id="h-agree" />
        <label style="font-size:0.9rem">I agree to LushaiTrips <a href="#" style="color:var(--emerald-400)">Host Terms & Conditions</a> and confirm all information is accurate.</label>
      </label>`;
  }
}

function collectStep(step) {
  switch (step) {
    case 1:
      formData.name = document.getElementById('h-name')?.value?.trim();
      formData.email = document.getElementById('h-email')?.value?.trim();
      formData.phone = document.getElementById('h-phone')?.value?.trim();
      formData.password = document.getElementById('h-password')?.value;
      const confirm = document.getElementById('h-confirm')?.value;
      if (!formData.name || !formData.email || !formData.phone || !formData.password) { showToast('Please fill all required fields', '', 'error'); return false; }
      if (formData.password !== confirm) { showToast('Passwords do not match', '', 'error'); return false; }
      if (formData.password.length < 8) { showToast('Password must be 8+ characters', '', 'error'); return false; }
      return true;
    case 2:
      formData.propName = document.getElementById('h-prop-name')?.value?.trim();
      formData.propType = document.querySelector('input[name="prop-type"]:checked')?.value;
      formData.address = document.getElementById('h-address')?.value?.trim();
      formData.district = document.getElementById('h-district')?.value;
      formData.mapsLink = document.getElementById('h-maps')?.value?.trim();
      if (!formData.propName || !formData.propType || !formData.address || !formData.district) { showToast('Please fill all required fields', '', 'error'); return false; }
      return true;
    case 3:
      formData.rooms = document.getElementById('h-rooms')?.value;
      formData.maxGuests = document.getElementById('h-guests')?.value;
      formData.price = document.getElementById('h-price')?.value;
      formData.amenities = [...document.querySelectorAll('input[name="amenity"]:checked')].map(el => el.value);
      formData.description = document.getElementById('h-description')?.value?.trim();
      formData.nearby = document.getElementById('h-nearby')?.value?.trim();
      if (!formData.rooms || !formData.maxGuests || !formData.price || !formData.description) { showToast('Please fill all required fields', '', 'error'); return false; }
      return true;
    case 4:
      if (uploadedImages.length < 3) { showToast('Please upload at least 3 photos', '', 'error'); return false; }
      formData.images = uploadedImages;
      return true;
    case 5:
      formData.checkIn = document.getElementById('h-checkin')?.value;
      formData.checkOut = document.getElementById('h-checkout')?.value;
      formData.rules = document.getElementById('h-rules')?.value?.trim();
      formData.cancellation = document.getElementById('h-cancel')?.value;
      if (!document.getElementById('h-agree')?.checked) { showToast('Please agree to Terms & Conditions', '', 'error'); return false; }
      return true;
  }
}

function goToStep(step) {
  currentStep = step;
  document.getElementById('stepper').innerHTML = buildStepper();
  document.getElementById('step-container').innerHTML = buildStep(step);
  document.getElementById('prev-btn').style.visibility = step === 1 ? 'hidden' : 'visible';
  document.getElementById('next-btn').textContent = step === totalSteps ? '🚀 Submit Listing' : 'Next →';
  bindStepEvents(step);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function bindStepEvents(step) {
  if (step === 4) {
    document.getElementById('photo-input')?.addEventListener('change', e => {
      const files = [...e.target.files];
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = ev => {
          uploadedImages.push(ev.target.result);
          const preview = document.getElementById('photo-preview');
          const count = document.getElementById('photo-count');
          const wrap = document.createElement('div');
          wrap.className = 'upload-img-wrap';
          const idx = uploadedImages.length - 1;
          wrap.innerHTML = `<img src="${ev.target.result}" alt="upload" />${idx === 0 ? '<div style="position:absolute;bottom:4px;left:4px;background:rgba(16,185,129,0.9);color:#fff;font-size:0.65rem;padding:2px 6px;border-radius:4px;font-weight:700">COVER</div>' : ''}<button class="remove-img" data-idx="${idx}">✕</button>`;
          preview?.appendChild(wrap);
          if (count) count.textContent = uploadedImages.length + ' photo(s) uploaded';
          wrap.querySelector('.remove-img')?.addEventListener('click', ev => {
            uploadedImages.splice(idx, 1);
            wrap.remove();
            if (count) count.textContent = uploadedImages.length + ' photo(s) uploaded';
          });
        };
        reader.readAsDataURL(file);
      });
    });
  }
}

export function initHostSignupStay() {
  uploadedImages = [];
  bindStepEvents(1);

  document.getElementById('next-btn')?.addEventListener('click', () => {
    if (!collectStep(currentStep)) return;
    if (currentStep === totalSteps) {
      submitListing();
    } else {
      goToStep(currentStep + 1);
      // Re-attach listeners after DOM update
      document.getElementById('next-btn')?.addEventListener('click', () => {});
      document.getElementById('prev-btn')?.addEventListener('click', () => {});
      initHostSignupStay();
    }
  });

  document.getElementById('prev-btn')?.addEventListener('click', () => {
    if (currentStep > 1) goToStep(currentStep - 1);
  });
}

async function submitListing() {
  const nextBtn = document.getElementById('next-btn');
  if (nextBtn) { nextBtn.disabled = true; nextBtn.textContent = '⏳ Submitting…'; }
  try {
    // 1. Sign up the host account (or sign in if already exists)
    await signUpEmail({ email: formData.email, password: formData.password, fullName: formData.name, phone: formData.phone });
    await refreshUserCache();

    // 2. Insert the stay listing
    await insertStay({
      name:        formData.propName,
      type:        formData.propType,
      location:    formData.address,
      district:    formData.district,
      price:       parseInt(formData.price),
      rooms:       parseInt(formData.rooms),
      max_guests:  parseInt(formData.maxGuests),
      amenities:   formData.amenities || [],
      description: formData.description,
      images:      formData.images || [],
      cover_image: formData.images?.[0] || '',
      check_in:    formData.checkIn,
      check_out:   formData.checkOut,
      rules:       formData.rules?.split('\n').filter(Boolean) || [],
      verified:    true,
      top_rated:   false,
    });

    currentStep = 1;
    uploadedImages = [];
    showToast('Listing live! 🎉', 'Your stay is now visible to travellers.');
    setTimeout(() => window.router.navigate('/host-dashboard'), 800);
  } catch (e) {
    showToast(e.message || 'Submission failed', '', 'error');
    if (nextBtn) { nextBtn.disabled = false; nextBtn.textContent = '🚀 Submit Listing'; }
  }
}
