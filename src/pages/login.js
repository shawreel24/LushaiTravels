import { loginUser, showToast, appHref, refreshUserCache } from '../utils.js';
import { signInEmail } from '../lib/supabase.js';

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
          <input type="password" class="form-input" id="login-password" placeholder="********" />
        </div>

        <div style="text-align:right;margin-bottom:20px">
          <a href="#" style="font-size:0.85rem;color:var(--emerald-400)">Forgot password?</a>
        </div>

        <button class="btn btn-primary w-full" id="login-btn" style="justify-content:center;padding:14px">Log In</button>

        <div class="auth-switch mt-16">Don't have an account? <a href="${appHref('/signup-user')}" data-link>Sign up</a></div>
        <div class="auth-switch" style="margin-top:8px">Are you a host? <a href="${appHref('/host-signup-stay')}" data-link>Register your property -></a></div>
      </div>
    </div>
  `;
}

export function initLogin() {
  document.getElementById('login-btn')?.addEventListener('click', async () => {
    const email = document.getElementById('login-email')?.value?.trim();
    const password = document.getElementById('login-password')?.value;

    if (!email || !password) {
      showToast('Please fill all fields', '', 'error');
      return;
    }

    const btn = document.getElementById('login-btn');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Signing in...';
    }

    try {
      await signInEmail({ email, password });
      await refreshUserCache();
      showToast('Welcome back!');
      setTimeout(() => window.router.navigate('/'), 500);
      return;
    } catch (e) {
      // Backward compatibility for older local-only accounts.
      try {
        loginUser(email, password);
        showToast('Welcome back!');
        setTimeout(() => window.router.navigate('/'), 500);
        return;
      } catch {
        showToast(e?.message || 'Invalid email or password', '', 'error');
      }
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Log In';
      }
    }
  });

  document.getElementById('login-password')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('login-btn')?.click();
  });

  document.getElementById('google-btn')?.addEventListener('click', () => {
    showToast('Google login coming soon!', 'Use email login for now.');
  });
}
