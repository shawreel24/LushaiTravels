import { loginUser, showToast, appHref, refreshUserCache, setCurrentUser } from '../utils.js';
import { signInEmail } from '../lib/supabase.js';

const LOGIN_TIMEOUT_MS = 12000;
const SESSION_TIMEOUT_MS = 5000;

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

function cacheBasicSupabaseUser(user) {
  if (!user) return;
  setCurrentUser({
    id: user.id,
    email: user.email || '',
    full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
    phone: user.phone || '',
    role: 'user',
  });
}

export function renderLogin() {
  return `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-logo">LushaiTrips</div>
        <h2 class="auth-title">Welcome back</h2>
        <p class="auth-sub">Log in to manage your bookings and trips</p>

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
      if (btn) btn.textContent = 'Checking account...';

      const { user } = await withTimeout(
        signInEmail({ email, password }),
        LOGIN_TIMEOUT_MS,
        'Login timed out. Please try again.'
      );

      cacheBasicSupabaseUser(user);

      if (btn) btn.textContent = 'Loading your account...';
      await withTimeout(refreshUserCache(), SESSION_TIMEOUT_MS, 'Profile sync timed out.');

      showToast('Welcome back!');
      setTimeout(() => window.router.navigate('/'), 500);
      return;
    } catch (e) {
      if (isTimeoutError(e)) {
        try {
          const { getSession } = await import('../lib/supabase.js');
          const session = await withTimeout(
            getSession(),
            SESSION_TIMEOUT_MS,
            'Login timed out. Please try again.'
          );
          if (session) {
            cacheBasicSupabaseUser(session.user);
            refreshUserCache().catch(err => {
              console.warn('[login] background profile sync failed:', err?.message || err);
            });
            showToast('Welcome back!');
            setTimeout(() => window.router.navigate('/'), 500);
            return;
          }
        } catch (sessionErr) {
          console.warn('[login] timeout verification failed:', sessionErr?.message || sessionErr);
        }
      }

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
}
