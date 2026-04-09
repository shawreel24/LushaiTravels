import { showToast, setCurrentUser } from '../utils.js';

let uploadedImages = [];
let uploadedFiles = [];
let pendingPhotoTasks = 0;
let vehicleCount = 1;

const LOGIN_TIMEOUT_MS = 15000;
const SIGNUP_TIMEOUT_MS = 60000;
const SAVE_TIMEOUT_MS = 60000;
const UPLOAD_TIMEOUT_MS = 30000;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY;

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
  const el = document.getElementById('t-photo-status');
  if (!el) return;
  el.textContent = message;
  el.style.color = color;
}

function setSubmitStatus(message, color = 'var(--text-muted)') {
  const el = document.getElementById('t-submit-status');
  if (!el) return;
  el.textContent = message;
  el.style.color = color;
}

function setPhotoLoader(visible, message = '') {
  const wrap = document.getElementById('t-photo-loader');
  const text = document.getElementById('t-photo-loader-text');
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

function setButtonState(message, disabled = true) {
  const btn = document.getElementById('submit-transport-btn');
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

function cacheTransportUser(sessionOrUser) {
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

async function signInTransportAccount(email, password) {
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
  cacheTransportUser(data);
  return data;
}

async function signUpTransportAccount(email, password, fullName) {
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
    cacheTransportUser(data);
  } else if (data?.user) {
    cacheTransportUser(data.user);
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

async function insertTransportDirect(data, accessToken) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/transport`, {
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

async function findExistingTransportSubmission(email, phone) {
  const query = new URLSearchParams({
    select: '*',
    email: `eq.${email}`,
    phone: `eq.${phone}`,
    order: 'created_at.desc',
    limit: '1',
  });
  const response = await fetch(`${SUPABASE_URL}/rest/v1/transport?${query.toString()}`, {
    headers: buildSupabaseHeaders(),
  });
  const data = await parseSupabaseJson(response);
  return Array.isArray(data) ? data[0] || null : null;
}

async function ensureTransportSession({ name, email, password, phone }) {
  const storedSession = getStoredSupabaseSession();
  if (storedSession?.access_token && storedSession?.user?.email?.toLowerCase() === email.toLowerCase()) {
    setSubmitStatus('Using your active session...', 'var(--emerald-400)');
    setButtonState('Using active session...');
    cacheTransportUser(storedSession);
    return {
      userId: storedSession.user.id,
      accessToken: storedSession.access_token,
    };
  }

  setSubmitStatus('Signing you in...', 'var(--emerald-400)');
  setButtonState('Signing in...');

  try {
    const loginData = await withTimeout(
      signInTransportAccount(email, password),
      LOGIN_TIMEOUT_MS,
      'Login timed out. Please try again.'
    );
    if (loginData?.user?.id && loginData?.access_token) {
      return {
        userId: loginData.user.id,
        accessToken: loginData.access_token,
      };
    }
  } catch (loginError) {
    if (isEmailConfirmationError(loginError)) {
      throw new Error('This account exists but is not confirmed yet. Check your email, then log in and submit the transport form again.');
    }
    if (!isMissingAccountError(loginError)) {
      throw loginError;
    }
  }

  setSubmitStatus('Creating your transport account...', 'var(--emerald-400)');
  setButtonState('Creating account...');

  try {
    const signupData = await withTimeout(
      signUpTransportAccount(email, password, name),
      SIGNUP_TIMEOUT_MS,
      'Sign-up timed out. Please try again in a moment.'
    );

    if (signupData?.user?.id && signupData?.access_token) {
      return {
        userId: signupData.user.id,
        accessToken: signupData.access_token,
      };
    }

    setSubmitStatus('Finishing sign-in...', 'var(--emerald-400)');
    setButtonState('Finishing sign-in...');

    const loginAfterSignup = await withTimeout(
      signInTransportAccount(email, password),
      LOGIN_TIMEOUT_MS,
      'Login timed out. Please try again.'
    );

    if (loginAfterSignup?.user?.id && loginAfterSignup?.access_token) {
      return {
        userId: loginAfterSignup.user.id,
        accessToken: loginAfterSignup.access_token,
      };
    }
  } catch (signupError) {
    if (isExistingAccountError(signupError)) {
      setSubmitStatus('Account already exists. Signing you in...', 'var(--emerald-400)');
      setButtonState('Signing you in...');
      const existingLogin = await withTimeout(
        signInTransportAccount(email, password),
        LOGIN_TIMEOUT_MS,
        'Login timed out. Please try again.'
      );
      if (existingLogin?.user?.id && existingLogin?.access_token) {
        return {
          userId: existingLogin.user.id,
          accessToken: existingLogin.access_token,
        };
      }
    }

    if (isRateLimitError(signupError)) {
      throw new Error('Too many signup emails were requested. Please wait a few minutes, or log in first and then submit the transport form.');
    }

    if (isEmailConfirmationError(signupError)) {
      throw new Error('Your account needs email confirmation before transport registration can continue. Confirm the email, log in, then submit again.');
    }

    throw signupError;
  }

  throw new Error('We could not create an active transport account session. Please log in again and retry.');
}

function canvasToJpegFile(canvas, originalName = 'transport-photo.jpg') {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (!blob) {
        reject(new Error('Could not prepare the selected image.'));
        return;
      }

      const safeBase = originalName.replace(/\.[^.]+$/, '').replace(/[^a-z0-9-_]+/gi, '-').toLowerCase() || 'transport-photo';
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
  wrap.innerHTML = `<img src="${preview}" alt="upload" />${index === 0 ? '<div style="position:absolute;bottom:4px;left:4px;background:rgba(16,185,129,0.9);color:#fff;font-size:0.65rem;padding:2px 6px;border-radius:4px;font-weight:700">COVER</div>' : ''}<button class="remove-img">x</button>`;
}

function buildVehicleRow(idx) {
  return `
    <div class="card card-body" data-vehicle-row style="padding:20px;margin-bottom:16px;${idx > 0 ? 'position:relative' : ''}">
      ${idx > 0 ? '<button class="remove-img" type="button" data-remove-vehicle style="position:absolute;top:12px;right:12px;width:24px;height:24px">x</button>' : ''}
      <div style="font-weight:700;margin-bottom:16px;font-size:0.9rem;color:var(--emerald-400)">Vehicle ${idx + 1}</div>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Vehicle Name *</label><input type="text" class="form-input" data-vehicle-field="name" placeholder="e.g. Toyota Innova Crysta" /></div>
        <div class="form-group"><label class="form-label">Passenger Capacity *</label><input type="number" class="form-input" data-vehicle-field="capacity" min="1" max="30" placeholder="e.g. 7" /></div>
      </div>
      <div class="grid-2">
        <div class="form-group"><label class="form-label">Price (INR) *</label><input type="number" class="form-input" data-vehicle-field="price" placeholder="e.g. 3500" /></div>
        <div class="form-group"><label class="form-label">Price Unit</label>
          <select class="form-select" data-vehicle-field="price_unit"><option>per day (fuel incl.)</option><option>per day (fuel extra)</option><option>per km</option><option>per seat per route</option></select>
        </div>
      </div>
    </div>
  `;
}

function readVehicleRow(row) {
  const name = row.querySelector('[data-vehicle-field="name"]')?.value?.trim() || '';
  const capacity = row.querySelector('[data-vehicle-field="capacity"]')?.value || '';
  const price = row.querySelector('[data-vehicle-field="price"]')?.value || '';
  const priceUnit = row.querySelector('[data-vehicle-field="price_unit"]')?.value || 'per day (fuel incl.)';

  return {
    name,
    capacity,
    price,
    priceUnit,
  };
}

function collectVehicles() {
  const rows = [...document.querySelectorAll('[data-vehicle-row]')];
  const vehicles = [];

  for (const row of rows) {
    const vehicle = readVehicleRow(row);
    const hasAnyValue = Boolean(vehicle.name || vehicle.capacity || vehicle.price);

    if (!hasAnyValue) {
      continue;
    }

    if (!vehicle.name || !vehicle.capacity || !vehicle.price) {
      throw new Error('Please complete each vehicle entry or remove the incomplete row.');
    }

    vehicles.push({
      name: vehicle.name,
      capacity: parseInt(vehicle.capacity, 10),
      price: parseInt(vehicle.price, 10),
      price_unit: vehicle.priceUnit,
    });
  }

  if (!vehicles.length) {
    throw new Error('Please add at least one vehicle with its pricing details.');
  }

  return vehicles;
}

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
          <h3 style="margin-bottom:24px">Personal Information</h3>
          <div class="grid-2">
            <div class="form-group"><label class="form-label">Full Name *</label><input type="text" class="form-input" id="t-name" placeholder="Your full name" /></div>
            <div class="form-group"><label class="form-label">Phone *</label><input type="tel" class="form-input" id="t-phone" placeholder="+91 98765 43210" /></div>
          </div>
          <div class="grid-2">
            <div class="form-group"><label class="form-label">Email *</label><input type="email" class="form-input" id="t-email" placeholder="you@example.com" /></div>
            <div class="form-group"><label class="form-label">Password *</label><input type="password" class="form-input" id="t-password" placeholder="Min 8 characters" /></div>
          </div>

          <div class="divider-h"></div>
          <h3 style="margin-bottom:24px">Business Details</h3>

          <div class="form-group"><label class="form-label">Business / Service Name *</label><input type="text" class="form-input" id="t-biz" placeholder="e.g. Raj Mizoram Travels" /></div>

          <div class="form-group">
            <label class="form-label">Service Type *</label>
            <div class="check-group">
              ${['Car & SUV Rental', 'Motorcycle & Bike Rental', 'Shared Sumo / Van', 'Private Van Hire', 'Airport Transfer', 'Tempo Traveller'].map(type => `<label class="chip" style="cursor:pointer;display:flex;align-items:center;gap:6px"><input type="radio" name="t-type" value="${type}" style="accent-color:var(--emerald-500)" />${type}</label>`).join('')}
            </div>
          </div>

          <div class="form-group"><label class="form-label">Base Location *</label>
            <select class="form-select" id="t-location">
              <option value="">Select district</option>
              ${['Aizawl', 'Lunglei', 'Champhai', 'Kolasib', 'Lawngtlai', 'Mamit', 'Saiha', 'Serchhip'].map(district => `<option>${district}</option>`).join('')}
            </select>
          </div>

          <div class="divider-h"></div>
          <h3 style="margin-bottom:16px">Your Vehicles</h3>
          <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:20px">Add details for each vehicle you offer</p>

          <div id="vehicles-container">
            ${buildVehicleRow(0)}
          </div>
          <button class="btn btn-outline btn-sm" id="add-vehicle-btn" type="button" style="margin-bottom:28px">+ Add Another Vehicle</button>

          <div class="form-group">
            <label class="form-label">Features & Services</label>
            <div class="check-group" style="flex-wrap:wrap">
              ${['Airport Pickup', 'AC Vehicles', 'Night Driving', 'Driver Provided', 'Fuel Included', 'All Districts', 'Breakdown Assistance', 'Child Seats', 'Helmets Included', 'Riding Gear', 'Route Maps', 'Delivery to Hotel'].map(feature => `<label class="chip" style="cursor:pointer;display:flex;align-items:center;gap:6px"><input type="checkbox" name="t-feat" value="${feature}" style="accent-color:var(--emerald-500)" />${feature}</label>`).join('')}
            </div>
          </div>

          <div class="form-group"><label class="form-label">Description *</label><textarea class="form-textarea" id="t-desc" placeholder="Describe your service - coverage areas, experience, and what makes you reliable." style="min-height:120px"></textarea></div>

          <div class="divider-h"></div>
          <h3 style="margin-bottom:16px">Vehicle Photos</h3>
          <div class="upload-zone" onclick="document.getElementById('t-photos').click()">
            <div style="font-size:2rem;margin-bottom:8px">CAR</div>
            <div style="font-weight:600;margin-bottom:4px">Upload Vehicle Photos</div>
            <div style="font-size:0.8rem;color:var(--text-dim)">Min 2 photos - exterior and interior - JPG or PNG</div>
            <input type="file" id="t-photos" multiple accept="image/*" style="display:none" />
          </div>
          <div id="t-photo-loader" style="display:none;align-items:center;gap:12px;margin-top:12px;padding:12px 14px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.18);border-radius:12px">
            <div class="loading-spinner" style="width:22px;height:22px;border-width:2px;margin:0"></div>
            <div id="t-photo-loader-text" style="font-size:0.85rem;color:var(--emerald-300)">Preparing photos...</div>
          </div>
          <div id="t-photo-status" class="form-hint" style="margin-top:10px">No photos selected yet.</div>
          <div class="upload-preview" id="t-photo-preview" style="margin-top:12px"></div>

          <div class="divider-h"></div>
          <div class="form-group">
            <label class="form-label">Driving License / RC Book * <span style="font-size:0.8rem;color:var(--text-dim)">(upload document)</span></label>
            <div class="upload-zone" onclick="document.getElementById('t-license').click()" style="padding:20px">
              <div style="font-size:1.5rem;margin-bottom:6px">DOC</div>
              <div style="font-size:0.9rem;font-weight:600">Upload License / RC</div>
              <input type="file" id="t-license" accept=".jpg,.png,.pdf" style="display:none" />
            </div>
            <div id="t-license-preview" style="font-size:0.85rem;color:var(--emerald-400);margin-top:6px"></div>
          </div>

          <label class="check-item" style="margin-bottom:24px">
            <input type="checkbox" id="t-agree" />
            <label style="font-size:0.9rem">I certify all information is accurate and agree to LushaiTrips <a href="#" style="color:var(--emerald-400)">Transport Partner Terms</a></label>
          </label>

          <button class="btn btn-primary w-full" id="submit-transport-btn" style="justify-content:center;padding:16px;font-size:1rem">Submit Transport Listing</button>
          <div id="t-submit-status" class="form-hint" style="margin-top:12px;text-align:center">Ready to submit your transport listing.</div>
        </div>
      </div>
    </div>
  `;
}

export function initHostSignupTransport() {
  uploadedImages = [];
  uploadedFiles = [];
  pendingPhotoTasks = 0;
  vehicleCount = 1;

  setPhotoLoader(false);
  syncPhotoIndicators();
  setSubmitStatus('Ready to submit your transport listing.');

  document.getElementById('add-vehicle-btn')?.addEventListener('click', () => {
    vehicleCount += 1;
    const container = document.getElementById('vehicles-container');
    container?.insertAdjacentHTML('beforeend', buildVehicleRow(vehicleCount - 1));
  });

  document.getElementById('vehicles-container')?.addEventListener('click', event => {
    const button = event.target.closest('[data-remove-vehicle]');
    if (!button) return;
    button.closest('[data-vehicle-row]')?.remove();
  });

  document.getElementById('t-photos')?.addEventListener('change', async event => {
    const incomingFiles = [...event.target.files];
    if (!incomingFiles.length) return;

    const previewRoot = document.getElementById('t-photo-preview');
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

  document.getElementById('t-license')?.addEventListener('change', event => {
    if (event.target.files[0]) {
      document.getElementById('t-license-preview').textContent = `Selected: ${event.target.files[0].name}`;
    }
  });

  document.getElementById('submit-transport-btn')?.addEventListener('click', async () => {
    const name = document.getElementById('t-name')?.value?.trim();
    const email = document.getElementById('t-email')?.value?.trim();
    const phone = document.getElementById('t-phone')?.value?.trim();
    const password = document.getElementById('t-password')?.value;
    const businessName = document.getElementById('t-biz')?.value?.trim();
    const type = document.querySelector('input[name="t-type"]:checked')?.value;
    const location = document.getElementById('t-location')?.value;
    const description = document.getElementById('t-desc')?.value?.trim();
    const features = [...document.querySelectorAll('input[name="t-feat"]:checked')].map(el => el.value);
    const agree = document.getElementById('t-agree')?.checked;

    let vehicles = [];
    let currentStage = 'starting';

    if (!name || !email || !phone || !password || !businessName || !type || !location || !description) {
      showToast('Please fill all required fields', '', 'error');
      return;
    }

    try {
      vehicles = collectVehicles();
    } catch (error) {
      showToast(error.message, '', 'error');
      return;
    }

    if (!agree) {
      showToast('Please agree to the Transport Partner Terms', '', 'error');
      return;
    }

    if (getPendingPhotoCount() > 0) {
      showToast('Please wait for photos to finish preparing.', '', 'error');
      return;
    }

    setButtonState('Submitting...');
    setSubmitStatus('Starting transport registration...', 'var(--emerald-400)');

    try {
      currentStage = 'auth';
      const auth = await ensureTransportSession({ name, email, password, phone });

      setSubmitStatus('Loading your account...', 'var(--emerald-400)');
      cacheTransportUser({ user: { id: auth.userId, email, user_metadata: { full_name: name }, phone } });

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
            uploadFileToStorageDirect(file, 'transport-images', auth.accessToken).catch(error => {
              console.warn('[Transport] image upload failed (skipping):', error.message);
              return null;
            }),
            new Promise(resolve => setTimeout(() => {
              console.warn('[Transport] upload timeout, skipping image');
              resolve(null);
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

      currentStage = 'save';
      setButtonState('Saving listing...');
      setSubmitStatus('Saving your transport listing...', 'var(--emerald-400)');

      await withTimeout(
        insertTransportDirect({
          host_id: auth.userId,
          name: businessName,
          owner_name: name,
          type,
          location,
          description,
          features,
          images: imageUrls,
          cover_image: imageUrls[0] || '',
          phone,
          email,
          vehicles,
          verified: true,
          available: true,
          status: 'approved',
        }, auth.accessToken),
        SAVE_TIMEOUT_MS,
        'Saving transport listing timed out. Please retry.'
      );

      setSubmitStatus('Transport listing created successfully.', 'var(--emerald-400)');
      showToast('Transport listing live!', 'Your listing is now visible to travellers.');
      setTimeout(() => window.router.navigate('/host-dashboard'), 800);
    } catch (error) {
      console.error('[Transport Signup] ERROR:', error);
      setPhotoLoader(false);

      if (isTimeoutError(error)) {
        try {
          const existingTransport = currentStage === 'save'
            ? await findExistingTransportSubmission(email, phone)
            : null;
          if (existingTransport) {
            setSubmitStatus('Transport listing saved successfully.', 'var(--emerald-400)');
            showToast('Transport listing submitted', 'Your listing was saved. Redirecting to dashboard.');
            setTimeout(() => window.router.navigate('/host-dashboard'), 800);
            return;
          }
        } catch (checkError) {
          console.warn('[Transport Signup] timeout verification failed:', checkError?.message || checkError);
        }

        const timeoutMessage =
          currentStage === 'auth'
            ? 'Account setup took too long. If this email already has an account, log in first and then submit the transport form.'
            : currentStage === 'upload'
              ? 'Photo upload took too long. Try fewer or smaller photos, then submit again.'
              : currentStage === 'save'
                ? 'Saving your transport listing took too long. Please retry in a moment.'
                : 'The request took too long. Please retry in a moment.';

        setSubmitStatus(timeoutMessage, '#f87171');
      } else {
        setSubmitStatus(error.message || 'Transport registration failed.', '#f87171');
      }

      showToast(error.message || 'Submission failed. Please try again.', '', 'error');
      setButtonState('Submit Transport Listing', false);
    }
  });
}
