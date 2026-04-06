import { sendPhoneOtp, verifyPhoneOtp, signUpEmail, signInGoogle } from '../lib/supabase.js';
import { refreshUserCache, showToast, appHref } from '../utils.js';

export function renderSignupUser() {
  return `
    <div class="auth-page">
      <div class="auth-card" style="max-width:520px">
        <div class="auth-logo">LushaiTrips</div>
        <h2 class="auth-title">Create your account</h2>
        <p class="auth-sub">Join thousands exploring Mizoram's hidden gems</p>

        <!-- ── Social Buttons ── -->
        <button class="social-btn" id="google-signup-btn">
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
          Sign up with Google
        </button>
        <button class="social-btn" id="su-phone-otp-toggle-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
          Sign up with Phone OTP
        </button>

        <!-- ── Phone OTP Panel (hidden by default) ── -->
        <div id="su-phone-otp-panel" style="display:none;margin-bottom:8px">
          <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius);padding:20px;margin-top:4px">

            <!-- Step 1 -->
            <div id="su-otp-step-1">
              <div class="form-group" style="margin-bottom:12px">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-input" id="su-otp-name" placeholder="Jane Doe" />
              </div>
              <div class="form-group" style="margin-bottom:12px">
                <label class="form-label">Phone Number</label>
                <div class="phone-input-wrap">
                  <span class="phone-prefix">+91</span>
                  <input type="tel" class="form-input phone-input-field" id="su-otp-phone"
                    placeholder="98765 43210" maxlength="10" inputmode="numeric" />
                </div>
              </div>
              <button class="btn btn-primary w-full" id="su-send-otp-btn" style="justify-content:center;padding:12px">
                <span id="su-send-label">Send OTP 📲</span>
                <span id="su-send-spinner" style="display:none">⏳ Sending…</span>
              </button>
            </div>

            <!-- Step 2 -->
            <div id="su-otp-step-2" style="display:none">
              <p class="otp-sent-msg">OTP sent to <strong id="su-phone-display"></strong></p>
              <div class="form-group" style="margin-bottom:12px">
                <label class="form-label">Enter 6-digit OTP</label>
                <div class="otp-boxes" id="su-otp-boxes">
                  <input class="otp-box" maxlength="1" inputmode="numeric" />
                  <input class="otp-box" maxlength="1" inputmode="numeric" />
                  <input class="otp-box" maxlength="1" inputmode="numeric" />
                  <input class="otp-box" maxlength="1" inputmode="numeric" />
                  <input class="otp-box" maxlength="1" inputmode="numeric" />
                  <input class="otp-box" maxlength="1" inputmode="numeric" />
                </div>
              </div>
              <button class="btn btn-primary w-full" id="su-verify-btn" style="justify-content:center;padding:12px">
                <span id="su-verify-label">Create Account 🎉</span>
                <span id="su-verify-spinner" style="display:none">⏳ Verifying…</span>
              </button>
              <div class="otp-resend-row" style="margin-top:12px">
                <span id="su-resend-timer" class="otp-timer"></span>
                <button id="su-resend-btn" class="otp-resend-btn" style="display:none">Resend OTP</button>
                <button id="su-change-phone-btn" class="otp-change-btn">Change number</button>
              </div>
            </div>

          </div>
        </div>

        <div class="divider"><span>or sign up with email</span></div>

        <!-- ── Email / Password Form ── -->
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" class="form-input" id="su-name" placeholder="Jane Doe" />
          </div>
          <div class="form-group">
            <label class="form-label">Phone Number</label>
            <input type="tel" class="form-input" id="su-phone" placeholder="+91 98765 43210" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input type="email" class="form-input" id="su-email" placeholder="you@example.com" />
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" class="form-input" id="su-password" placeholder="Min 8 characters" />
          </div>
          <div class="form-group">
            <label class="form-label">Confirm Password</label>
            <input type="password" class="form-input" id="su-confirm" placeholder="Repeat password" />
          </div>
        </div>

        <div style="background:var(--glass);border:1px solid var(--glass-border);border-radius:var(--radius-sm);padding:14px;margin-bottom:20px;font-size:0.8rem;color:var(--text-muted)">
          By signing up, you agree to our <a href="#" style="color:var(--emerald-400)">Terms of Service</a> and <a href="#" style="color:var(--emerald-400)">Privacy Policy</a>.
        </div>

        <button class="btn btn-primary w-full" id="signup-btn" style="justify-content:center;padding:14px">
          <span id="signup-label">Create Account 🎉</span>
          <span id="signup-spinner" style="display:none">⏳ Creating account…</span>
        </button>
        <div class="auth-switch mt-16">Already have an account? <a href="${appHref('/login')}" data-link>Log in</a></div>
        <div class="auth-switch" style="margin-top:8px">Want to host? <a href="${appHref('/host-signup-stay')}" data-link>Register as Host →</a></div>
      </div>
    </div>
  `;
}

export function initSignupUser() {

  // ── Google OAuth ───────────────────────────────────────────────
  document.getElementById('google-signup-btn')?.addEventListener('click', async () => {
    try { await signInGoogle(); }
    catch (e) { showToast(e.message || 'Google sign up failed', '', 'error'); }
  });

  // ── Email / Password signup ────────────────────────────────────
  const btn     = document.getElementById('signup-btn');
  const label   = document.getElementById('signup-label');
  const spinner = document.getElementById('signup-spinner');

  const setLoading = (on) => {
    btn.disabled = on;
    label.style.display  = on ? 'none' : '';
    spinner.style.display = on ? '' : 'none';
  };

  btn?.addEventListener('click', async () => {
    const fullName = document.getElementById('su-name')?.value?.trim();
    const email    = document.getElementById('su-email')?.value?.trim();
    const phone    = document.getElementById('su-phone')?.value?.trim();
    const password = document.getElementById('su-password')?.value;
    const confirm  = document.getElementById('su-confirm')?.value;

    if (!fullName || !email || !phone || !password) { showToast('Please fill all fields', '', 'error'); return; }
    if (password !== confirm) { showToast('Passwords do not match', '', 'error'); return; }
    if (password.length < 8)  { showToast('Password must be at least 8 characters', '', 'error'); return; }

    setLoading(true);
    try {
      await signUpEmail({ email, password, fullName, phone });
      await refreshUserCache();
      showToast('Account created! Welcome 🎉', 'Check your email to confirm your account.');
      setTimeout(() => window.router.navigate('/discover'), 800);
    } catch (e) {
      showToast(e.message || 'Sign up failed', '', 'error');
    } finally {
      setLoading(false);
    }
  });

  // ── Phone OTP toggle ───────────────────────────────────────────
  const suOtpPanel = document.getElementById('su-phone-otp-panel');
  const suOtpToggle = document.getElementById('su-phone-otp-toggle-btn');

  suOtpToggle?.addEventListener('click', () => {
    const isOpen = suOtpPanel.style.display !== 'none';
    suOtpPanel.style.display = isOpen ? 'none' : '';
    suOtpToggle.style.borderColor = isOpen ? '' : 'var(--emerald-500)';
    suOtpToggle.style.color = isOpen ? '' : 'var(--emerald-400)';
    if (!isOpen) {
      suOtpPanel.classList.add('otp-step-enter');
      setTimeout(() => suOtpPanel.classList.remove('otp-step-enter'), 400);
    }
  });

  // ── Phone OTP flow ─────────────────────────────────────────────
  let activePhone = '';
  let activeName  = '';
  let resendInterval = null;

  const sendBtn = document.getElementById('su-send-otp-btn');

  sendBtn?.addEventListener('click', async () => {
    activeName = document.getElementById('su-otp-name')?.value?.trim();
    const raw  = document.getElementById('su-otp-phone')?.value?.replace(/\D/g, '');
    if (!activeName) { showToast('Please enter your name', '', 'error'); return; }
    if (!raw || raw.length < 10) { showToast('Enter a valid 10-digit number', '', 'error'); return; }
    activePhone = '+91' + raw;
    sendBtn.disabled = true;
    document.getElementById('su-send-label').style.display = 'none';
    document.getElementById('su-send-spinner').style.display = '';
    try {
      await sendPhoneOtp(activePhone);
      showToast('OTP sent! 📲', 'Check your messages.');
      document.getElementById('su-otp-step-1').style.display = 'none';
      document.getElementById('su-otp-step-2').style.display = '';
      document.getElementById('su-phone-display').textContent = activePhone;
      focusSuBox(0);
      startResendTimer();
    } catch (e) {
      showToast(e.message || 'Failed to send OTP', '', 'error');
    } finally {
      sendBtn.disabled = false;
      document.getElementById('su-send-label').style.display = '';
      document.getElementById('su-send-spinner').style.display = 'none';
    }
  });

  document.getElementById('su-change-phone-btn')?.addEventListener('click', () => {
    document.getElementById('su-otp-step-2').style.display = 'none';
    document.getElementById('su-otp-step-1').style.display = '';
    clearInterval(resendInterval);
    suBoxes.forEach(b => b.value = '');
  });

  const suBoxes = document.querySelectorAll('#su-otp-boxes .otp-box');
  suBoxes.forEach((box, i) => {
    box.addEventListener('input', () => {
      box.value = box.value.replace(/\D/g, '').slice(-1);
      if (box.value && i < 5) focusSuBox(i + 1);
    });
    box.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && !box.value && i > 0) focusSuBox(i - 1);
    });
    box.addEventListener('paste', e => {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
      [...paste].slice(0, 6).forEach((ch, j) => { if (suBoxes[j]) suBoxes[j].value = ch; });
      focusSuBox(Math.min(paste.length, 5));
    });
  });

  function focusSuBox(idx) { suBoxes[idx]?.focus(); }

  const verifyBtn = document.getElementById('su-verify-btn');

  verifyBtn?.addEventListener('click', async () => {
    const token = [...suBoxes].map(b => b.value).join('');
    if (token.length < 6) { showToast('Enter the full 6-digit OTP', '', 'error'); return; }
    verifyBtn.disabled = true;
    document.getElementById('su-verify-label').style.display = 'none';
    document.getElementById('su-verify-spinner').style.display = '';
    try {
      await verifyPhoneOtp(activePhone, token, { full_name: activeName });
      await refreshUserCache();
      showToast('Account created! Welcome 🎉');
      clearInterval(resendInterval);
      setTimeout(() => window.router.navigate('/discover'), 800);
    } catch (e) {
      showToast(e.message || 'Invalid OTP', '', 'error');
      suBoxes.forEach(b => b.value = '');
      focusSuBox(0);
    } finally {
      verifyBtn.disabled = false;
      document.getElementById('su-verify-label').style.display = '';
      document.getElementById('su-verify-spinner').style.display = 'none';
    }
  });

  function startResendTimer() {
    const timerEl  = document.getElementById('su-resend-timer');
    const resendEl = document.getElementById('su-resend-btn');
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

  document.getElementById('su-resend-btn')?.addEventListener('click', async () => {
    if (!activePhone) return;
    try {
      await sendPhoneOtp(activePhone);
      showToast('OTP resent! 📲');
      suBoxes.forEach(b => b.value = '');
      focusSuBox(0);
      startResendTimer();
      document.getElementById('su-resend-btn').style.display = 'none';
    } catch (e) {
      showToast(e.message || 'Failed to resend', '', 'error');
    }
  });
}
