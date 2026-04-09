import { getCurrentUser, logout, appHref, getRoutePathname } from '../utils.js';

export function renderNavbar() {
  const container = document.getElementById('navbar-container');
  const user = getCurrentUser();
  const H = appHref;
  container.innerHTML = `
    <nav id="navbar">
      <div class="container nav-inner">
        <a href="${H('/')}" class="nav-logo" data-link>Lushai<span>Trips</span></a>
        <div class="nav-links">
          <a href="${H('/')}" data-link>Home</a>
          <a href="${H('/discover')}" data-link>Discover</a>
          <a href="${H('/stays')}" data-link>Stays</a>
          <a href="${H('/guides')}" data-link>Guides</a>
          <a href="${H('/transport')}" data-link>Transport</a>
          <a href="${H('/surprise')}" data-link>🎲 Surprise Me</a>
        </div>
        <div class="nav-cta">
          ${user ? `
            <div class="nav-avatar" id="nav-user-btn" title="${user.fullName || user.name}">${user.avatar || '👤'}</div>
          ` : `
            <a href="${H('/login')}" class="btn btn-secondary btn-sm" data-link>Log in</a>
            <a href="${H('/signup-user')}" class="btn btn-primary btn-sm" data-link>Sign up</a>
          `}
          <div class="nav-hamburger" id="hamburger">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </nav>
    <div class="mobile-menu" id="mobile-menu">
      <a href="${H('/')}" data-link>🏠 Home</a>
      <a href="${H('/discover')}" data-link>🗺️ Discover</a>
      <a href="${H('/stays')}" data-link>🏡 Stays</a>
      <a href="${H('/guides')}" data-link>👨‍🏫 Guides</a>
      <a href="${H('/transport')}" data-link>🚗 Transport</a>
      <a href="${H('/surprise')}" data-link>🎲 Surprise Me</a>
      <div style="height:1px;background:var(--glass-border);margin:8px 0"></div>
      ${user ? `
        <a href="${H('/profile')}" data-link>👤 My Profile</a>
        ${user.role === 'host' ? `<a href="${H('/host-dashboard')}" data-link>🏠 Host Dashboard</a>` : ''}
        <a href="#" id="mobile-logout">🚪 Log out</a>
      ` : `
        <a href="${H('/login')}" data-link>Log in</a>
        <a href="${H('/signup-user')}" class="btn btn-primary" data-link style="text-align:center">Sign up</a>
      `}
    </div>
  `;

  // Scroll effect
  window.addEventListener('scroll', () => {
    document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 30);
  });

  // Hamburger
  document.getElementById('hamburger')?.addEventListener('click', () => {
    document.getElementById('mobile-menu')?.classList.toggle('open');
  });

  // User avatar dropdown
  document.getElementById('nav-user-btn')?.addEventListener('click', () => {
    const menu = document.createElement('div');
    menu.style.cssText = 'position:fixed;top:70px;right:24px;background:var(--bg2);border:1px solid var(--glass-border);border-radius:var(--radius);padding:8px;z-index:2000;min-width:180px;animation:fadeIn 0.2s ease';
    menu.innerHTML = `
      <a href="${H('/profile')}" data-link style="display:block;padding:10px 14px;border-radius:8px;color:var(--text-muted);transition:var(--transition)" onmouseover="this.style.background='var(--glass)'" onmouseout="this.style.background=''">👤 My Profile</a>
      ${user?.role === 'host' ? `<a href="${H('/host-dashboard')}" data-link style="display:block;padding:10px 14px;border-radius:8px;color:var(--text-muted);transition:var(--transition)" onmouseover="this.style.background='var(--glass)'" onmouseout="this.style.background=''">🏠 Host Dashboard</a>` : `<a href="${H('/host-signup-stay')}" data-link style="display:block;padding:10px 14px;border-radius:8px;color:var(--text-muted)" onmouseover="this.style.background='var(--glass)'" onmouseout="this.style.background=''">🏡 Become a Host</a>`}
      <div style="height:1px;background:var(--glass-border);margin:4px 0"></div>
      <button id="dd-logout" style="width:100%;padding:10px 14px;border-radius:8px;background:none;color:#f87171;text-align:left;font-size:0.9rem;cursor:pointer;border:none">🚪 Log out</button>
    `;
    document.body.appendChild(menu);
    menu.querySelectorAll('[data-link]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        window.router.navigate(el.getAttribute('href'));
        menu.remove();
      });
    });
    setTimeout(() => document.addEventListener('click', () => menu.remove(), { once: true }), 100);
    menu.querySelector('#dd-logout')?.addEventListener('click', () => { logout(); });
  });

  document.getElementById('mobile-logout')?.addEventListener('click', (e) => { e.preventDefault(); logout(); });

  // Active link (compare route path, not raw pathname)
  const here = getRoutePathname(location.pathname);
  const links = document.querySelectorAll('.nav-links a, .mobile-menu a');
  links.forEach(link => {
    const h = link.getAttribute('href');
    if (!h || h === '#') return;
    const path = getRoutePathname(new URL(h, window.location.origin).pathname);
    if (path === here) link.classList.add('active');
  });
}
