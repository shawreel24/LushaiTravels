import { signUpEmail, signInGoogle } from '../lib/supabase.js';
import { refreshUserCache, showToast, appHref } from '../utils.js';

export function renderSignupUser() {
  return `
    <div class="auth-page">
      <div class="auth-card" style="max-width:520px">
        <div class="auth-logo">LushaiTrips</div>
        <h2 class="auth-title">Create your account</h2>
        <p class="auth-sub">Join thousands exploring Mizoram's hidden gems</p>

        <button class="social-btn" id="google-signup-btn">
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
          Sign up with Google
        </button>

        <div class="divider"><span>or sign up with email</span></div>

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

  document.getElementById('google-signup-btn')?.addEventListener('click', async () => {
    try {
      await signInGoogle();
    } catch (e) {
      showToast(e.message || 'Google sign up failed', '', 'error');
    }
  });
}
