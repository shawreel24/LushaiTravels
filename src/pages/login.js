import { signInEmail, signInGoogle } from '../lib/supabase.js';
import { refreshUserCache, showToast, appHref } from '../utils.js';

export function renderLogin() {
  return `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-logo">LushaiTrips</div>
        <h2 class="auth-title">Welcome back</h2>
        <p class="auth-sub">Log in to manage your bookings and trips</p>

        <button class="social-btn" id="google-btn">
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
          Continue with Google
        </button>

        <div class="divider"><span>or continue with email</span></div>

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
  const btn    = document.getElementById('login-btn');
  const label  = document.getElementById('login-label');
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

  document.getElementById('google-btn')?.addEventListener('click', async () => {
    try {
      await signInGoogle();
      // page will redirect to Google; no need to do anything else
    } catch (e) {
      showToast(e.message || 'Google login failed', '', 'error');
    }
  });

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
}
