import { insertGuide, uploadFileToStorage } from '../lib/supabase.js';
import { refreshUserCache, showToast } from '../utils.js';

let uploadedImages = []; // base64 previews for display only
let uploadedFiles  = []; // original File objects for actual upload

const SESSION_TIMEOUT_MS = 30000;
const SIGNUP_TIMEOUT_MS = 60000;
const SAVE_TIMEOUT_MS = 60000;
const UPLOAD_TIMEOUT_MS = 30000;

function withTimeout(promise, ms, message) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(message)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

function isTimeoutError(err) {
  return typeof err?.message === 'string' && err.message.toLowerCase().includes('timed out');
}

function getSelectedPhotoCount() {
  return uploadedFiles.filter(Boolean).length;
}

function setPhotoStatus(message, color = 'var(--text-muted)') {
  const el = document.getElementById('g-photo-status');
  if (!el) return;
  el.textContent = message;
  el.style.color = color;
}

export function renderHostSignupGuide() {
  return `
    <div style="min-height:100vh;padding:100px 24px 60px;background:linear-gradient(135deg,var(--bg) 0%,var(--bg2) 50%,var(--bg3) 100%)">
      <div style="max-width:680px;margin:0 auto">
        <div style="text-align:center;margin-bottom:40px">
          <div class="auth-logo" style="font-size:2rem;margin-bottom:8px">LushaiTrips</div>
          <h2 style="margin-bottom:8px">Register as a Guide</h2>
          <p style="color:var(--text-muted)">Share your knowledge of Mizoram's trails, culture, and wildlife</p>
        </div>

        <div class="card card-body" style="padding:40px">
          <h3 style="margin-bottom:24px">👤 Personal Information</h3>
          <div class="grid-2">
            <div class="form-group"><label class="form-label">Full Name *</label><input type="text" class="form-input" id="g-name" placeholder="Your full name" /></div>
            <div class="form-group"><label class="form-label">Phone *</label><input type="tel" class="form-input" id="g-phone" placeholder="+91 98765 43210" /></div>
          </div>
          <div class="grid-2">
            <div class="form-group"><label class="form-label">Email *</label><input type="email" class="form-input" id="g-email" placeholder="you@example.com" /></div>
            <div class="form-group"><label class="form-label">Password *</label><input type="password" class="form-input" id="g-password" placeholder="Min 8 characters" /></div>
          </div>

          <div class="divider-h"></div>
          <h3 style="margin-bottom:24px">🧭 Guide Details</h3>

          <div class="form-group"><label class="form-label">Professional Title *</label><input type="text" class="form-input" id="g-title" placeholder="e.g. Expert Trekking &amp; Wildlife Guide" /></div>

          <div class="form-group">
            <label class="form-label">Years of Experience *</label>
            <select class="form-select" id="g-exp">
              <option value="">Select experience</option>
              ${['1 year','2 years','3 years','4 years','5 years','6 years','7 years','8 years','9 years','10+ years'].map(y => `<option>${y}</option>`).join('')}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Languages Spoken *</label>
            <div class="check-group">
              ${['English','Mizo','Hindi','Bengali','Assamese','Manipuri'].map(l => `<label class="chip" style="cursor:pointer;display:flex;align-items:center;gap:6px"><input type="checkbox" name="g-lang" value="${l}" style="accent-color:var(--emerald-500)" />${l}</label>`).join('')}
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Specialties * <span style="font-size:0.8rem;color:var(--text-dim)">(select all that apply)</span></label>
            <div class="check-group" style="flex-wrap:wrap">
              ${['Trekking','Bird Watching','Wildlife Spotting','Photography Tours','Village Walks','Cultural Tours','River Kayaking','Night Trekking','Jungle Camping','Cycling Tours','Heritage Walks','Botanical Walks'].map(s => `<label class="chip" style="cursor:pointer;display:flex;align-items:center;gap:6px"><input type="checkbox" name="g-spec" value="${s}" style="accent-color:var(--emerald-500)" />${s}</label>`).join('')}
            </div>
          </div>

          <div class="form-group"><label class="form-label">Your Base Location *</label>
            <select class="form-select" id="g-location">
              <option value="">Select district</option>
              ${['Aizawl','Lunglei','Champhai','Kolasib','Lawngtlai','Mamit','Saiha','Serchhip','Saitual','Hnahthial','Khawzawl'].map(d => `<option>${d}</option>`).join('')}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Price per Day (₹) *</label>
            <input type="number" class="form-input" id="g-price" min="500" placeholder="e.g. 1500" />
            <span class="form-hint">Recommended: ₹1,000–₹2,500/day for Mizoram guides</span>
          </div>

          <div class="form-group"><label class="form-label">Bio / About You *</label><textarea class="form-textarea" id="g-bio" placeholder="Tell travelers about yourself — your experience, passion, and what makes you a unique guide…" style="min-height:140px"></textarea></div>

          <div class="form-group">
            <label class="form-label">Certifications <span style="font-size:0.8rem;color:var(--text-dim)">(one per line)</span></label>
            <textarea class="form-textarea" id="g-certs" placeholder="e.g. Ministry of Tourism Certified&#10;First Aid Certified&#10;Wildlife Institute of India" style="min-height:80px"></textarea>
          </div>

          <div class="divider-h"></div>
          <h3 style="margin-bottom:16px">📸 Profile &amp; Gallery Photos <span style="font-size:0.85rem;font-weight:400;color:var(--text-dim)">(optional)</span></h3>
          <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:16px">Upload a profile photo and photos from your trips (you can also add these later)</p>
          <div class="upload-zone" onclick="document.getElementById('g-photos').click()">
            <div style="font-size:2rem;margin-bottom:8px">📷</div>
            <div style="font-weight:600;margin-bottom:4px">Upload Photos</div>
            <div style="font-size:0.8rem;color:var(--text-dim)">First photo = profile photo • JPG or PNG</div>
            <input type="file" id="g-photos" multiple accept="image/*" style="display:none" />
          </div>
          <div id="g-photo-status" class="form-hint" style="margin-top:10px">No photos selected yet.</div>
          <div class="upload-preview" id="g-photo-preview" style="margin-top:12px"></div>

          <label class="check-item" style="margin-bottom:24px;margin-top:16px">
            <input type="checkbox" id="g-agree" />
            <label style="font-size:0.9rem">I certify all information is accurate and agree to LushaiTrips <a href="#" style="color:var(--emerald-400)">Guide Terms</a></label>
          </label>

          <button class="btn btn-primary w-full" id="submit-guide-btn" style="justify-content:center;padding:16px;font-size:1rem">Submit Guide Application 🧭</button>
        </div>
      </div>
    </div>
  `;
}

export function initHostSignupGuide() {
  uploadedImages = [];
  uploadedFiles  = [];
  setPhotoStatus('No photos selected yet.');

  // ── Photo picker ─────────────────────────────────────────────
  document.getElementById('g-photos')?.addEventListener('change', e => {
    const incomingFiles = [...e.target.files];
    if (!incomingFiles.length) return;

    setPhotoStatus(`Preparing ${incomingFiles.length} photo(s)...`, 'var(--emerald-400)');
    incomingFiles.forEach(file => {
      const idx = uploadedFiles.length;
      uploadedFiles.push(file);

      const reader = new FileReader();
      reader.onload = ev => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let { width, height } = img;
          const MAX = 800;
          if (width > height && width > MAX) { height *= MAX / width; width = MAX; }
          else if (height > MAX)             { width  *= MAX / height; height = MAX; }
          canvas.width = width; canvas.height = height;
          canvas.getContext('2d').drawImage(img, 0, 0, width, height);
          const preview = canvas.toDataURL('image/jpeg', 0.7);
          uploadedImages[idx] = preview;

          const wrap = document.createElement('div');
          wrap.className = 'upload-img-wrap';
          wrap.innerHTML = `<img src="${preview}" alt="upload" />${idx === 0 ? '<div style="position:absolute;bottom:4px;left:4px;background:rgba(16,185,129,0.9);color:#fff;font-size:0.65rem;padding:2px 6px;border-radius:4px;font-weight:700">PROFILE</div>' : ''}<button class="remove-img">✕</button>`;
          document.getElementById('g-photo-preview')?.appendChild(wrap);
          wrap.querySelector('.remove-img')?.addEventListener('click', () => {
            uploadedImages.splice(idx, 1, null);
            uploadedFiles.splice(idx, 1, null);
            wrap.remove();
            const remaining = getSelectedPhotoCount();
            setPhotoStatus(
              remaining ? `${remaining} photo(s) selected.` : 'No photos selected yet.',
              remaining ? 'var(--emerald-400)' : 'var(--text-muted)'
            );
          });

          const selected = getSelectedPhotoCount();
          setPhotoStatus(`${selected} photo(s) selected.`, 'var(--emerald-400)');
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });
  });

  // ── Submit ────────────────────────────────────────────────────
  document.getElementById('submit-guide-btn')?.addEventListener('click', async () => {
    const name       = document.getElementById('g-name')?.value?.trim();
    const email      = document.getElementById('g-email')?.value?.trim();
    const phone      = document.getElementById('g-phone')?.value?.trim();
    const password   = document.getElementById('g-password')?.value;
    const title      = document.getElementById('g-title')?.value?.trim();
    const bio        = document.getElementById('g-bio')?.value?.trim();
    const price      = document.getElementById('g-price')?.value;
    const location   = document.getElementById('g-location')?.value;
    const experience = document.getElementById('g-exp')?.value;
    const languages  = [...document.querySelectorAll('input[name="g-lang"]:checked')].map(el => el.value);
    const specialties = [...document.querySelectorAll('input[name="g-spec"]:checked')].map(el => el.value);
    const certs      = document.getElementById('g-certs')?.value?.split('\n').filter(Boolean);
    const agree      = document.getElementById('g-agree')?.checked;

    if (!name || !email || !phone || !password || !title || !bio || !price || !location || !experience || !languages.length || !specialties.length) {
      showToast('Please fill all required fields', '', 'error'); return;
    }
    if (!agree) { showToast('Please agree to the Guide Terms', '', 'error'); return; }

    const btn = document.getElementById('submit-guide-btn');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Submitting…'; }

    try {
      const { supabase } = await import('../lib/supabase.js');

      // ── 1. Auth ───────────────────────────────────────────────
      const { data: { session } } = await withTimeout(
        supabase.auth.getSession(),
        SESSION_TIMEOUT_MS,
        'Session check timed out. Please retry.'
      );
      console.log('[Guide] session check:', session ? 'logged in' : 'no session');

      if (!session) {
        console.log('[Guide] attempting signUp...');
        const { data, error } = await withTimeout(
          supabase.auth.signUp({
            email, password, options: { data: { full_name: name } },
          }),
          SIGNUP_TIMEOUT_MS,
          'Sign-up timed out. Please try again in a moment.'
        );
        if (error) {
          console.error('[Guide] signUp error:', error);
          throw error;
        }
        console.log('[Guide] signUp response:', data);

        const { data: fresh } = await withTimeout(
          supabase.auth.getSession(),
          SESSION_TIMEOUT_MS,
          'Session refresh timed out. Please log in and retry.'
        );
        console.log('[Guide] post-signup session:', fresh.session ? 'exists' : 'null');

        if (!fresh.session) {
          throw new Error('Account created — please check your email to confirm your account, then log in and re-submit.');
        }
        if (data.user) {
          await supabase.from('profiles').upsert({ id: data.user.id, full_name: name, phone, role: 'user' });
        }
      }

      await refreshUserCache();

      // ── 2. Upload images (best-effort, never blocks submit) ───
      const validFiles = uploadedFiles.filter(Boolean);
      let imageUrls = [];

      if (validFiles.length > 0) {
        if (btn) btn.textContent = '📤 Uploading photos…';
        setPhotoStatus(`Uploading ${validFiles.length} photo(s)...`, 'var(--emerald-400)');
        console.log('[Guide] uploading', validFiles.length, 'images...');

        // Each image gets 15s before we skip it
        const uploadOne = (file) => Promise.race([
          uploadFileToStorage(file, 'guide-images').catch(err => {
            console.warn('[Guide] image upload failed (skipping):', err.message);
            return null;
          }),
          new Promise(res => setTimeout(() => { console.warn('[Guide] upload timeout, skipping image'); res(null); }, UPLOAD_TIMEOUT_MS)),
        ]);

        const results = await Promise.all(validFiles.map(uploadOne));
        imageUrls = results.filter(Boolean);
        console.log('[Guide] uploaded imageUrls:', imageUrls);
        setPhotoStatus(
          imageUrls.length === validFiles.length
            ? `${imageUrls.length} photo(s) uploaded successfully.`
            : `${imageUrls.length} of ${validFiles.length} photo(s) uploaded.`,
          imageUrls.length ? 'var(--emerald-400)' : 'var(--text-muted)'
        );
      }

      if (btn) btn.textContent = '💾 Saving profile…';

      // ── 3. Insert guide row ───────────────────────────────────
      console.log('[Guide] inserting guide row...');
      await withTimeout(
        insertGuide({
          name, title, experience, languages, specialties,
          price: parseInt(price), location, bio,
          certifications: certs,
          images:      imageUrls,
          cover_image: imageUrls[0] || '',
          phone, email,
          verified: true, available: true,
        }),
        SAVE_TIMEOUT_MS,
        'Saving guide profile timed out. Please retry.'
      );
      console.log('[Guide] success!');

      showToast('Guide application live! 🎉', 'Your profile is now visible to travellers.');
      setTimeout(() => window.router.navigate('/host-dashboard'), 800);

    } catch (e) {
      console.error('[Guide Signup] ERROR:', e);
      if (isTimeoutError(e)) {
        try {
          const { supabase } = await import('../lib/supabase.js');
          const { data: existing } = await supabase
            .from('guides')
            .select('id')
            .eq('email', email)
            .eq('phone', phone)
            .limit(1);
          if (existing?.length) {
            showToast('Guide application submitted', 'Your profile was saved. Redirecting to dashboard.');
            setTimeout(() => window.router.navigate('/host-dashboard'), 800);
            return;
          }
        } catch (checkErr) {
          console.warn('[Guide Signup] timeout verification failed:', checkErr?.message || checkErr);
        }
      }
      showToast(e.message || 'Submission failed. Please try again.', '', 'error');
      if (btn) { btn.disabled = false; btn.textContent = 'Submit Guide Application 🧭'; }
    }
  });
}
