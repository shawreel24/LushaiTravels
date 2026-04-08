import { registerUser, showToast, appHref } from '../utils.js';

export function renderSignupUser() {
  return `
    <div class="auth-page">
      <div class="auth-card" style="max-width:520px">
        <div class="auth-logo">LushaiTrips</div>
        <h2 class="auth-title">Create your account</h2>
        <p class="auth-sub">Join thousands exploring Mizoram's hidden gems</p>

        <button class="social-btn" id="phone-signup-btn">Sign up with Phone OTP</button>

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

        <button class="btn btn-primary w-full" id="signup-btn" style="justify-content:center;padding:14px">Create Account</button>
        <div class="auth-switch mt-16">Already have an account? <a href="${appHref('/login')}" data-link>Log in</a></div>
        <div class="auth-switch" style="margin-top:8px">Want to host? <a href="${appHref('/host-signup-stay')}" data-link>Register as Host -></a></div>
      </div>
    </div>
  `;
}

export function initSignupUser() {
  document.getElementById('signup-btn')?.addEventListener('click', () => {
    const fullName = document.getElementById('su-name')?.value?.trim();
    const email = document.getElementById('su-email')?.value?.trim();
    const phone = document.getElementById('su-phone')?.value?.trim();
    const password = document.getElementById('su-password')?.value;
    const confirm = document.getElementById('su-confirm')?.value;
    if (!fullName || !email || !phone || !password) { showToast('Please fill all fields', '', 'error'); return; }
    if (password !== confirm) { showToast('Passwords do not match', '', 'error'); return; }
    if (password.length < 8) { showToast('Password must be at least 8 characters', '', 'error'); return; }
    try {
      registerUser({ fullName, email, phone, password });
      showToast('Account created! Welcome');
      setTimeout(() => window.router.navigate('/discover'), 600);
    } catch (e) {
      showToast(e.message, '', 'error');
    }
  });

  document.getElementById('phone-signup-btn')?.addEventListener('click', () => showToast('OTP signup coming soon!'));
}
