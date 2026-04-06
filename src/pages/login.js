import { sendPhoneOtp, verifyPhoneOtp, signInEmail, signInGoogle } from '../lib/supabase.js';
import { refreshUserCache, showToast, appHref } from '../utils.js';

export function renderLogin() {
  return `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-logo">LushaiTrips</div>
        <h2 class="auth-title">Welcome back</h2>
        <p class="auth-sub">Log in to manage your bookings and trips</p>

        <!-- ── Social Buttons ── -->
        <button class="social-btn" id="google-btn">
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
          Continue with Google
        </button>
        <button class="social-btn" id="phone-otp-toggle-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
          Continue with Phone OTP
        </button>

        <!-- ── Phone OTP Panel (hidden by default) ── -->
        <div id="phone-otp-panel" style="display:none;margin-bottom:8px">
          <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:20px;margin-top:4px">

            <!-- Step 1: phone input -->
            <div id="otp-step-1">
              <div class="form-group" style="margin-bottom:12px">
                <label class="form-label">Phone Number</label>
                <div class="phone-input-wrap">
                  <span class="phone-prefix">+91</span>
                  <input type="tel" class="form-input phone-input-field" id="login-phone"
                    placeholder="98765 43210" maxlength="10" inputmode="numeric" />
                </div>
              </div>
              <button class="btn btn-primary w-full" id="send-otp-btn" style="justify-content:center;padding:12px">
                <span id="send-otp-label">Send OTP 📲</span>
                <span id="send-otp-spinner" style="display:none">⏳ Sending…</span>
              </button>
            </div>

            <!-- Step 2: OTP boxes -->
            <div id="otp-step-2" style="display:none">
              <p class="otp-sent-msg">OTP sent to <strong id="otp-phone-display"></strong></p>
              <div class="form-group" style="margin-bottom:12px">
                <label class="form-label">Enter 6-digit OTP</label>
                <div class="otp-boxes" id="otp-boxes">
                  <input class="otp-box" maxlength="1" inputmode="numeric" />
                  <input class="otp-box" maxlength="1" inputmode="numeric" />
                  <input class="otp-box" maxlength="1" inputmode="numeric" />
                  <input class="otp-box" maxlength="1" inputmode="numeric" />
                  <input class="otp-box" maxlength="1" inputmode="numeric" />
                  <input class="otp-box" maxlength="1" inputmode="numeric" />
                </div>
              </div>
              <button class="btn btn-primary w-full" id="verify-otp-btn" style="justify-content:center;padding:12px">
                <span id="verify-otp-label">Verify &amp; Log In ✅</span>
                <span id="verify-otp-spinner" style="display:none">⏳ Verifying…</span>
              </button>
              <div class="otp-resend-row" style="margin-top:12px">
                <span id="resend-timer" class="otp-timer"></span>
                <button id="resend-btn" class="otp-resend-btn" style="display:none">Resend OTP</button>
                <button id="change-phone-btn" class="otp-change-btn">Change number</button>
              </div>
            </div>

          </div>
        </div>

        <div class="divider"><span>or continue with email</span></div>

        <!-- ── Email / Password Form ── -->
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" id="login-email" placeholder="you@example.com" />
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" class="form-input" id="login-password" placeholder="••••••••" />
        </div>

        <div style="text-align:right;margin-bottom:20px">
          <a href="#" id="forgot-link" style="font-size:0.85rem;color:var(--emerald-400)">Forgot password?</a>
        </div>

        <button class="btn btn-primary w-full" id="login-btn" style="justify-content:center;padding:14px">
          <span id="login-label">Log In</span>
          <span id="login-spinner" style="display:none">⏳ Logging in…</span>
        </button>

        <div class="auth-switch mt-16">Don't have an account? <a href="${appHref('/signup-user')}" data-link>Sign up</a></div>
        <div class="auth-switch" style="margin-top:8px">Are you a host? <a href="${appHref('/host-signup-stay')}" data-link>Register your property →</a></div>
      </div>
    </div>
  `;
}

export function initLogin() {

  // ── Google OAuth ──────────────────────────────────────────────
  document.getElementById('google-btn')?.addEventListener('click', async () => {
    try { await signInGoogle(); }
    catch (e) { showToast(e.message || 'Google login failed', '', 'error'); }
  });

  // ── Email / Password login ────────────────────────────────────
  const btn     = document.getElementById('login-btn');
  const label   = document.getElementById('login-label');
  const spinner = document.getElementById('login-spinner');

  const setLoading = (on) => {
    btn.disabled = on;
    label.style.display  = on ? 'none' : '';
    spinner.style.display = on ? '' : 'none';
  };

  btn?.addEventListener('click', async () => {
    const email    = document.getElementById('login-email')?.value?.trim();
    const password = document.getElementById('login-password')?.value;
    if (!email || !password) { showToast('Please fill all fields', '', 'error'); return; }
    setLoading(true);
    try {
      await signInEmail({ email, password });
      await refreshUserCache();
      showToast('Welcome back! 👋');
      setTimeout(() => window.router.navigate('/'), 500);
    } catch (e) {
      showToast(e.message || 'Login failed', '', 'error');
    } finally {
      setLoading(false);
    }
  });

  document.getElementById('login-password')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') btn?.click();
  });

  // ── Forgot password ───────────────────────────────────────────
  document.getElementById('forgot-link')?.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email')?.value?.trim();
    if (!email) { showToast('Enter your email above first', '', 'error'); return; }
    try {
      const { supabase } = await import('../lib/supabase.js');
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + appHref('/'),
      });
      if (error) throw error;
      showToast('Password reset email sent! ✉️', 'Check your inbox.');
    } catch (e) {
      showToast(e.message || 'Failed to send reset email', '', 'error');
    }
  });

  // ── Phone OTP toggle ──────────────────────────────────────────
  const otpPanel = document.getElementById('phone-otp-panel');
  const otpToggleBtn = document.getElementById('phone-otp-toggle-btn');

  otpToggleBtn?.addEventListener('click', () => {
    const isOpen = otpPanel.style.display !== 'none';
    otpPanel.style.display = isOpen ? 'none' : '';
    otpToggleBtn.style.borderColor = isOpen ? '' : 'var(--emerald-500)';
    otpToggleBtn.style.color = isOpen ? '' : 'var(--emerald-400)';
    if (!isOpen) {
      otpPanel.classList.add('otp-step-enter');
      setTimeout(() => otpPanel.classList.remove('otp-step-enter'), 400);
    }
  });

  // ── Phone OTP flow ────────────────────────────────────────────
  let activePhone = '';
  let resendInterval = null;

  const sendBtn     = document.getElementById('send-otp-btn');
  const sendLabel   = document.getElementById('send-otp-label');
  const sendSpinner = document.getElementById('send-otp-spinner');

  sendBtn?.addEventListener('click', async () => {
    const raw = document.getElementById('login-phone')?.value?.replace(/\D/g, '');
    if (!raw || raw.length < 10) { showToast('Enter a valid 10-digit number', '', 'error'); return; }
    activePhone = '+91' + raw;
    sendBtn.disabled = true;
    sendLabel.style.display = 'none';
    sendSpinner.style.display = '';
    try {
      await sendPhoneOtp(activePhone);
      showToast('OTP sent! 📲', 'Check your messages.');
      document.getElementById('otp-step-1').style.display = 'none';
      document.getElementById('otp-step-2').style.display = '';
      document.getElementById('otp-phone-display').textContent = activePhone;
      focusOtpBox(0);
      startResendTimer();
    } catch (e) {
      showToast(e.message || 'Failed to send OTP', '', 'error');
    } finally {
      sendBtn.disabled = false;
      sendLabel.style.display = '';
      sendSpinner.style.display = 'none';
    }
  });

  document.getElementById('change-phone-btn')?.addEventListener('click', () => {
    document.getElementById('otp-step-2').style.display = 'none';
    document.getElementById('otp-step-1').style.display = '';
    clearInterval(resendInterval);
    clearOtpBoxes();
  });

  const boxes = document.querySelectorAll('#otp-boxes .otp-box');
  boxes.forEach((box, i) => {
    box.addEventListener('input', () => {
      box.value = box.value.replace(/\D/g, '').slice(-1);
      if (box.value && i < 5) focusOtpBox(i + 1);
    });
    box.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && !box.value && i > 0) focusOtpBox(i - 1);
    });
    box.addEventListener('paste', e => {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
      [...paste].slice(0, 6).forEach((ch, j) => { if (boxes[j]) boxes[j].value = ch; });
      focusOtpBox(Math.min(paste.length, 5));
    });
  });

  function focusOtpBox(idx) { boxes[idx]?.focus(); }
  function clearOtpBoxes()  { boxes.forEach(b => b.value = ''); }
  function getOtpValue()    { return [...boxes].map(b => b.value).join(''); }

  const verifyBtn     = document.getElementById('verify-otp-btn');
  const verifyLabel   = document.getElementById('verify-otp-label');
  const verifySpinner = document.getElementById('verify-otp-spinner');

  verifyBtn?.addEventListener('click', async () => {
    const token = getOtpValue();
    if (token.length < 6) { showToast('Enter the full 6-digit OTP', '', 'error'); return; }
    verifyBtn.disabled = true;
    verifyLabel.style.display = 'none';
    verifySpinner.style.display = '';
    try {
      await verifyPhoneOtp(activePhone, token);
      await refreshUserCache();
      showToast('Welcome back! 👋');
      clearInterval(resendInterval);
      setTimeout(() => window.router.navigate('/'), 500);
    } catch (e) {
      showToast(e.message || 'Invalid OTP', '', 'error');
      clearOtpBoxes();
      focusOtpBox(0);
    } finally {
      verifyBtn.disabled = false;
      verifyLabel.style.display = '';
      verifySpinner.style.display = 'none';
    }
  });

  function startResendTimer() {
    const timerEl  = document.getElementById('resend-timer');
    const resendEl = document.getElementById('resend-btn');
    let seconds = 60;
    resendEl.style.display = 'none';
    timerEl.textContent = `Resend in 0:${String(seconds).padStart(2, '0')}`;
    clearInterval(resendInterval);
    resendInterval = setInterval(() => {
      seconds--;
      if (seconds <= 0) {
        clearInterval(resendInterval);
        timerEl.textContent = '';
        resendEl.style.display = '';
      } else {
        timerEl.textContent = `Resend in 0:${String(seconds).padStart(2, '0')}`;
      }
    }, 1000);
  }

  document.getElementById('resend-btn')?.addEventListener('click', async () => {
    if (!activePhone) return;
    try {
      await sendPhoneOtp(activePhone);
      showToast('OTP resent! 📲');
      clearOtpBoxes();
      focusOtpBox(0);
      startResendTimer();
      document.getElementById('resend-btn').style.display = 'none';
    } catch (e) {
      showToast(e.message || 'Failed to resend', '', 'error');
    }
  });
}
