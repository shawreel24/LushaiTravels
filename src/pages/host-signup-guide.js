import { showToast, setCurrentUser, storage } from '../utils.js';

let uploadedImages = []; // base64 previews for display only
let uploadedFiles  = []; // prepared File objects for actual upload
let pendingPhotoTasks = 0;

const LOGIN_TIMEOUT_MS = 15000;
const SIGNUP_TIMEOUT_MS = 60000;
const SAVE_TIMEOUT_MS = 60000;
const UPLOAD_TIMEOUT_MS = 30000;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY;
const RECENT_GUIDES_STORAGE_KEY = 'lt_recent_guides';

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

function getPendingPhotoCount() {
  return pendingPhotoTasks;
}

function setPhotoStatus(message, color = 'var(--text-muted)') {
  const el = document.getElementById('g-photo-status');
  if (!el) return;
  el.textContent = message;
  el.style.color = color;
}

function setSubmitStatus(message, color = 'var(--text-muted)') {
  const el = document.getElementById('g-submit-status');
  if (!el) return;
  el.textContent = message;
  el.style.color = color;
}

function setPhotoLoader(visible, message = '') {
  const wrap = document.getElementById('g-photo-loader');
  const text = document.getElementById('g-photo-loader-text');
  if (!wrap || !text) return;
  wrap.style.display = visible ? 'flex' : 'none';
  text.textContent = message;
}

function syncPhotoIndicators() {
  const pending = getPendingPhotoCount();
  const selected = getSelectedPhotoCount();

  if (pending > 0) {
    setPhotoLoader(true, `Preparing ${pending} photo(s)...`);
    setPhotoStatus(`${selected} photo(s) ready, ${pending} still preparing...`, 'var(--emerald-400)');
    return;
  }

  setPhotoLoader(false);
  setPhotoStatus(
    selected ? `${selected} photo(s) ready to upload.` : 'No photos selected yet.',
    selected ? 'var(--emerald-400)' : 'var(--text-muted)'
  );
}

function normalizeErrorMessage(err) {
  return typeof err?.message === 'string' ? err.message.toLowerCase() : '';
}

function isExistingAccountError(err) {
  const message = normalizeErrorMessage(err);
  return message.includes('already registered') || message.includes('user already registered');
}

function isMissingAccountError(err) {
  const message = normalizeErrorMessage(err);
  return message.includes('invalid login credentials') || message.includes('invalid email or password');
}

function isEmailConfirmationError(err) {
  const message = normalizeErrorMessage(err);
  return message.includes('email not confirmed') || message.includes('confirm your email');
}

function isRateLimitError(err) {
  const message = normalizeErrorMessage(err);
  return message.includes('rate limit') || message.includes('too many requests');
}

async function resendGuideConfirmationEmail(email) {
  return withTimeout(
    resendSignupConfirmation(email),
    LOGIN_TIMEOUT_MS,
    'Confirmation email resend timed out. Please try again.'
  );
}

function throwConfirmedButSessionError() {
  throw new Error(
    'Your email is confirmed but we could not sign you in automatically. ' +
    'Please log in via the Login page first, then come back and submit the guide form again.'
  );
}

function setButtonState(message, disabled = true) {
  const btn = document.getElementById('submit-guide-btn');
  if (!btn) return;
  btn.disabled = disabled;
  btn.textContent = message;
}

function getSupabaseStorageKey() {
  const hostname = new URL(SUPABASE_URL).hostname;
  const projectRef = hostname.split('.')[0];
  return `sb-${projectRef}-auth-token`;
}

function getStoredSupabaseSession() {
  try {
    return JSON.parse(localStorage.getItem(getSupabaseStorageKey()));
  } catch {
    return null;
  }
}

function storeSupabaseSession(session) {
  if (!session) return;
  localStorage.setItem(getSupabaseStorageKey(), JSON.stringify(session));
}

function cacheGuideUser(sessionOrUser) {
  const user = sessionOrUser?.user || sessionOrUser;
  if (!user) return;
  setCurrentUser({
    id: user.id,
    email: user.email || '',
    full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
    phone: user.phone || '',
    role: 'user',
  });
}

function buildSupabaseHeaders(accessToken = '') {
  const headers = {
    apikey: SUPABASE_ANON,
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return headers;
}

async function parseSupabaseJson(response) {
  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message = data?.msg || data?.message || 'Supabase request failed.';
    throw new Error(message);
  }

  return data;
}

async function signInGuideAccount(email, password) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      ...buildSupabaseHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await parseSupabaseJson(response);
  storeSupabaseSession(data);
  cacheGuideUser(data);
  return data;
}

async function signUpGuideAccount(email, password, fullName) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: 'POST',
    headers: {
      ...buildSupabaseHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      data: { full_name: fullName },
    }),
  });

  const data = await parseSupabaseJson(response);
  if (data?.access_token) {
    storeSupabaseSession(data);
    cacheGuideUser(data);
  } else if (data?.user) {
    cacheGuideUser(data.user);
  }
  return data;
}

async function uploadFileToStorageDirect(file, bucket, accessToken) {
  const ext = file.type.includes('png') ? 'png' : 'jpg';
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${bucket}/${fileName}`;
  const response = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      ...buildSupabaseHeaders(accessToken),
      'Content-Type': file.type,
      'x-upsert': 'true',
    },
    body: file,
  });

  await parseSupabaseJson(response);
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${fileName}`;
}

async function insertGuideDirect(data, accessToken) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/guides`, {
    method: 'POST',
    headers: {
      ...buildSupabaseHeaders(accessToken),
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(data),
  });

  const rows = await parseSupabaseJson(response);
  return Array.isArray(rows) ? rows[0] : rows;
}

function cacheRecentGuideSubmission(guide) {
  if (!guide?.id) return;
  const existing = storage.get(RECENT_GUIDES_STORAGE_KEY);
  const recentGuides = Array.isArray(existing) ? existing : [];
  const deduped = [guide, ...recentGuides.filter(item => item?.id !== guide.id)];
  storage.set(RECENT_GUIDES_STORAGE_KEY, deduped.slice(0, 8));
}

function canvasToJpegFile(canvas, originalName = 'guide-photo.jpg') {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (!blob) {
        reject(new Error('Could not prepare the selected image.'));
        return;
      }

      const safeBase = originalName.replace(/\.[^.]+$/, '').replace(/[^a-z0-9-_]+/gi, '-').toLowerCase() || 'guide-photo';
      resolve(new File([blob], `${safeBase}.jpg`, { type: 'image/jpeg' }));
    }, 'image/jpeg', 0.78);
  });
}

async function prepareImageForUpload(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
    reader.onload = event => {
      const img = new Image();
      img.onerror = () => reject(new Error(`Could not process ${file.name}.`));
      img.onload = async () => {
        try {
          const canvas = document.createElement('canvas');
          let { width, height } = img;
          const maxSize = 800;

          if (width > height && width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          } else if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }

          canvas.width = Math.max(1, Math.round(width));
          canvas.height = Math.max(1, Math.round(height));
          canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);

          const preview = canvas.toDataURL('image/jpeg', 0.72);
          const preparedFile = await canvasToJpegFile(canvas, file.name);
          resolve({ preview, preparedFile });
        } catch (error) {
          reject(error);
        }
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  });
}

function createPendingPhotoCard(fileName) {
  const wrap = document.createElement('div');
  wrap.className = 'upload-img-wrap';
  wrap.style.background = 'rgba(255,255,255,0.03)';
  wrap.style.border = '1px solid var(--glass-border)';
  wrap.style.display = 'flex';
  wrap.style.flexDirection = 'column';
  wrap.style.alignItems = 'center';
  wrap.style.justifyContent = 'center';
  wrap.style.padding = '8px';
  wrap.innerHTML = `
    <div class="loading-spinner" style="width:24px;height:24px;border-width:2px;margin-bottom:8px"></div>
    <div style="font-size:0.68rem;color:var(--text-muted);text-align:center;line-height:1.35">${fileName}</div>
  `;
  return wrap;
}

function renderPreparedPhotoCard(wrap, preview, index) {
  wrap.style.background = '';
  wrap.style.border = '';
  wrap.style.display = '';
  wrap.style.flexDirection = '';
  wrap.style.alignItems = '';
  wrap.style.justifyContent = '';
  wrap.style.padding = '';
  wrap.innerHTML = `<img src="${preview}" alt="upload" />${index === 0 ? '<div style="position:absolute;bottom:4px;left:4px;background:rgba(16,185,129,0.9);color:#fff;font-size:0.65rem;padding:2px 6px;border-radius:4px;font-weight:700">PROFILE</div>' : ''}<button class="remove-img">x</button>`;
}

async function findExistingGuideSubmission(email, phone) {
  const query = new URLSearchParams({
    select: '*',
    email: `eq.${email}`,
    phone: `eq.${phone}`,
    order: 'created_at.desc',
    limit: '1',
  });
  const response = await fetch(`${SUPABASE_URL}/rest/v1/guides?${query.toString()}`, {
    headers: buildSupabaseHeaders(),
  });
  const data = await parseSupabaseJson(response);
  return Array.isArray(data) ? data[0] || null : null;
}

async function ensureGuideSession({ name, email, password, phone }) {
  // ── 1. Check for an existing active session (any user) ────────
  const storedSession = getStoredSupabaseSession();
  if (storedSession?.access_token) {
    const sessionEmail = storedSession?.user?.email?.toLowerCase();
    if (sessionEmail === email.toLowerCase()) {
      // Perfect match — use it directly
      setSubmitStatus('Using your active session...', 'var(--emerald-400)');
      setButtonState('Using active session...');
      cacheGuideUser(storedSession);
      return { userId: storedSession.user.id, accessToken: storedSession.access_token };
    } else if (sessionEmail) {
      // Logged in as a different user — still use that session
      // (they may have changed the email field vs what they logged in as)
      setSubmitStatus('Using your active session...', 'var(--emerald-400)');
      setButtonState('Using active session...');
      cacheGuideUser(storedSession);
      return { userId: storedSession.user.id, accessToken: storedSession.access_token };
    }
  }

  // ── 2. Try sign-in with provided credentials ──────────────────
  setSubmitStatus('Signing you in...', 'var(--emerald-400)');
  setButtonState('Signing in...');

  try {
    const loginData = await withTimeout(
      signInGuideAccount(email, password),
      LOGIN_TIMEOUT_MS,
      'Login timed out. Please try again.'
    );
    if (loginData?.user?.id && loginData?.access_token) {
      return { userId: loginData.user.id, accessToken: loginData.access_token };
    }
  } catch (loginError) {
    if (isEmailConfirmationError(loginError)) {
      // User has confirmed their email but session is missing.
      // Direct them to log in via the main login page — don't resend email.
      throwConfirmedButSessionError();
    }
    if (!isMissingAccountError(loginError)) {
      throw loginError;
    }
  }

  // ── 3. No existing account — create one ───────────────────────
  setSubmitStatus('Creating your guide account...', 'var(--emerald-400)');
  setButtonState('Creating account...');

  try {
    const signupData = await withTimeout(
      signUpGuideAccount(email, password, name),
      SIGNUP_TIMEOUT_MS,
      'Sign-up timed out. Please try again in a moment.'
    );

    if (signupData?.user?.id && signupData?.access_token) {
      return { userId: signupData.user.id, accessToken: signupData.access_token };
    }

    // Signup returned a user but no token (email confirmation required)
    setSubmitStatus('Finishing sign-in...', 'var(--emerald-400)');
    setButtonState('Finishing sign-in...');

    const loginAfterSignup = await withTimeout(
      signInGuideAccount(email, password),
      LOGIN_TIMEOUT_MS,
      'Login timed out. Please try again.'
    );

    if (loginAfterSignup?.user?.id && loginAfterSignup?.access_token) {
      return { userId: loginAfterSignup.user.id, accessToken: loginAfterSignup.access_token };
    }
  } catch (signupError) {
    if (isExistingAccountError(signupError)) {
      // Account exists but login failed — likely email/password mismatch
      setSubmitStatus('Account already exists. Signing you in...', 'var(--emerald-400)');
      setButtonState('Signing you in...');
      try {
        const existingLogin = await withTimeout(
          signInGuideAccount(email, password),
          LOGIN_TIMEOUT_MS,
          'Login timed out. Please try again.'
        );
        if (existingLogin?.user?.id && existingLogin?.access_token) {
          return { userId: existingLogin.user.id, accessToken: existingLogin.access_token };
        }
      } catch (existingLoginError) {
        if (isEmailConfirmationError(existingLoginError)) {
          throwConfirmedButSessionError();
        }
        throw existingLoginError;
      }
    }

    if (isRateLimitError(signupError)) {
      throw new Error('Too many signup requests. Please wait a few minutes, or log in first then submit the guide form.');
    }

    if (isEmailConfirmationError(signupError)) {
      throwConfirmedButSessionError();
    }

    throw signupError;
  }

  throw new Error('Could not establish a guide account session. Please log in via the Login page first, then submit the guide form.');
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
          <div id="g-photo-loader" style="display:none;align-items:center;gap:12px;margin-top:12px;padding:12px 14px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.18);border-radius:12px">
            <div class="loading-spinner" style="width:22px;height:22px;border-width:2px;margin:0"></div>
            <div id="g-photo-loader-text" style="font-size:0.85rem;color:var(--emerald-300)">Preparing photos...</div>
          </div>
          <div id="g-photo-status" class="form-hint" style="margin-top:10px">No photos selected yet.</div>
          <div class="upload-preview" id="g-photo-preview" style="margin-top:12px"></div>

          <label class="check-item" style="margin-bottom:24px;margin-top:16px">
            <input type="checkbox" id="g-agree" />
            <label style="font-size:0.9rem">I certify all information is accurate and agree to LushaiTrips <a href="#" style="color:var(--emerald-400)">Guide Terms</a></label>
          </label>

          <button class="btn btn-primary w-full" id="submit-guide-btn" style="justify-content:center;padding:16px;font-size:1rem">Submit Guide Application 🧭</button>
          <div id="g-submit-status" class="form-hint" style="margin-top:12px;text-align:center">Ready to submit your guide profile.</div>
        </div>
      </div>
    </div>
  `;
}

export function initHostSignupGuide() {
  uploadedImages = [];
  uploadedFiles  = [];
  pendingPhotoTasks = 0;
  setPhotoLoader(false);
  syncPhotoIndicators();
  setSubmitStatus('Ready to submit your guide profile.');

  // ── Photo picker ─────────────────────────────────────────────
  document.getElementById('g-photos')?.addEventListener('change', async e => {
    const incomingFiles = [...e.target.files];
    if (!incomingFiles.length) return;

    const previewRoot = document.getElementById('g-photo-preview');
    pendingPhotoTasks += incomingFiles.length;
    syncPhotoIndicators();

    incomingFiles.forEach(async file => {
      const idx = uploadedFiles.length;
      uploadedFiles.push(null);
      uploadedImages[idx] = null;

      const wrap = createPendingPhotoCard(file.name);
      previewRoot?.appendChild(wrap);

      try {
        const { preview, preparedFile } = await prepareImageForUpload(file);
        uploadedImages[idx] = preview;
        uploadedFiles[idx] = preparedFile;

        renderPreparedPhotoCard(wrap, preview, idx);
        wrap.querySelector('.remove-img')?.addEventListener('click', () => {
          uploadedImages[idx] = null;
          uploadedFiles[idx] = null;
          wrap.remove();
          syncPhotoIndicators();
        });
      } catch (error) {
        uploadedImages[idx] = null;
        uploadedFiles[idx] = null;
        wrap.remove();
        showToast(error.message || `Could not prepare ${file.name}.`, '', 'error');
      } finally {
        pendingPhotoTasks = Math.max(0, pendingPhotoTasks - 1);
        syncPhotoIndicators();
      }
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

    let currentStage = 'starting';

    if (!name || !email || !phone || !password || !title || !bio || !price || !location || !experience || !languages.length || !specialties.length) {
      showToast('Please fill all required fields', '', 'error'); return;
    }
    if (!agree) { showToast('Please agree to the Guide Terms', '', 'error'); return; }
    if (getPendingPhotoCount() > 0) {
      showToast('Please wait for photos to finish preparing.', '', 'error');
      return;
    }

    setButtonState('Submitting...');
    setSubmitStatus('Starting guide registration...', 'var(--emerald-400)');

    try {
      currentStage = 'auth';
      const auth = await ensureGuideSession({ name, email, password, phone });

      setSubmitStatus('Loading your account...', 'var(--emerald-400)');
      cacheGuideUser({ user: { id: auth.userId, email, user_metadata: { full_name: name }, phone } });

      // ── 2. Upload images (best-effort, never blocks submit) ───
      const validFiles = uploadedFiles.filter(Boolean);
      let imageUrls = [];

      if (validFiles.length > 0) {
        currentStage = 'upload';
        setButtonState('Uploading photos...');
        setSubmitStatus(`Uploading ${validFiles.length} photo(s)...`, 'var(--emerald-400)');
        setPhotoLoader(true, `Uploading 1 of ${validFiles.length} photo(s)...`);

        for (const [index, file] of validFiles.entries()) {
          setPhotoLoader(true, `Uploading ${index + 1} of ${validFiles.length} photo(s)...`);
          const result = await Promise.race([
            uploadFileToStorageDirect(file, 'guide-images', auth.accessToken).catch(err => {
              console.warn('[Guide] image upload failed (skipping):', err.message);
              return null;
            }),
            new Promise(res => setTimeout(() => {
              console.warn('[Guide] upload timeout, skipping image');
              res(null);
            }, UPLOAD_TIMEOUT_MS)),
          ]);

          if (result) imageUrls.push(result);
        }

        setPhotoLoader(false);
        setPhotoStatus(
          imageUrls.length === validFiles.length
            ? `${imageUrls.length} photo(s) uploaded successfully.`
            : `${imageUrls.length} of ${validFiles.length} photo(s) uploaded.`,
          imageUrls.length ? 'var(--emerald-400)' : 'var(--text-muted)'
        );
      }

      setButtonState('Saving profile...');
      setSubmitStatus('Saving your guide profile...', 'var(--emerald-400)');

      // ── 3. Insert guide row ───────────────────────────────────
      currentStage = 'save';
      const savedGuide = await withTimeout(
        insertGuideDirect({
          host_id: auth.userId,
          name, title, experience, languages, specialties,
          price: parseInt(price), location, bio,
          certifications: certs,
          images:      imageUrls,
          cover_image: imageUrls[0] || '',
          phone, email,
          verified: true, available: true,
          status: 'approved',
        }, auth.accessToken),
        SAVE_TIMEOUT_MS,
        'Saving guide profile timed out. Please retry.'
      );
      cacheRecentGuideSubmission(savedGuide);

      setSubmitStatus('Guide profile created successfully.', 'var(--emerald-400)');
      showToast('Guide application live! 🎉', 'Your profile is now visible to travellers.');
      setTimeout(() => window.router.navigate('/host-dashboard'), 800);

    } catch (e) {
      console.error('[Guide Signup] ERROR:', e);
      setPhotoLoader(false);
      if (isTimeoutError(e)) {
        try {
          const existingGuide = currentStage === 'save'
            ? await findExistingGuideSubmission(email, phone)
            : null;
          if (existingGuide) {
            cacheRecentGuideSubmission(existingGuide);
            setSubmitStatus('Guide profile saved successfully.', 'var(--emerald-400)');
            showToast('Guide application submitted', 'Your profile was saved. Redirecting to dashboard.');
            setTimeout(() => window.router.navigate('/host-dashboard'), 800);
            return;
          }
        } catch (checkErr) {
          console.warn('[Guide Signup] timeout verification failed:', checkErr?.message || checkErr);
        }

        const timeoutMessage =
          currentStage === 'auth'
            ? 'Account setup took too long. If this email already has an account, log in first and then submit the guide form.'
            : currentStage === 'upload'
              ? 'Photo upload took too long. Try fewer or smaller photos, then submit again.'
              : currentStage === 'save'
                ? 'Saving your guide profile took too long. Please retry in a moment.'
                : 'The request took too long. Please retry in a moment.';

        setSubmitStatus(timeoutMessage, '#f87171');
      } else {
        setSubmitStatus(e.message || 'Guide registration failed.', '#f87171');
      }
      showToast(e.message || 'Submission failed. Please try again.', '', 'error');
      setButtonState('Submit Guide Application 🧭', false);
    }
  });
}
