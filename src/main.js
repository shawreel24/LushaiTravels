import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderHome, initHome } from './pages/home.js';
import { renderDiscover, initDiscover } from './pages/discover.js';
import { renderSurprise, initSurprise } from './pages/surprise.js';
import { renderDestinationDetail, initDestinationDetail } from './pages/destination-detail.js';
import { renderStays, initStays } from './pages/stays.js';
import { renderStayDetail, initStayDetail } from './pages/stay-detail.js';
import { renderGuides, initGuides, renderGuideDetail, initGuideDetail } from './pages/guides.js';
import { renderTransport, initTransport, renderTransportDetail, initTransportDetail } from './pages/transport.js';
import { renderBooking, initBooking } from './pages/booking.js';
import { renderBookingConfirmed, initBookingConfirmed } from './pages/booking-confirmed.js';
import { renderLogin, initLogin } from './pages/login.js';
import { renderSignupUser, initSignupUser } from './pages/signup-user.js';
import { renderHostSignupStay, initHostSignupStay } from './pages/host-signup-stay.js';
import { renderHostSignupGuide, initHostSignupGuide } from './pages/host-signup-guide.js';
import { renderHostSignupTransport, initHostSignupTransport } from './pages/host-signup-transport.js';
import { renderProfile, initProfile } from './pages/profile.js';
import { renderHostDashboard, initHostDashboard } from './pages/host-dashboard.js';
import { scrollTop, appHref, getRoutePathname } from './utils.js';

// ── Router ─────────────────────────────────────────────────────────────────
const routes = {
  '/': { render: renderHome, init: initHome, footer: true },
  '/discover': { render: renderDiscover, init: initDiscover, footer: true },
  '/surprise': { render: renderSurprise, init: initSurprise, footer: true },
  '/stays': { render: renderStays, init: initStays, footer: true },
  '/guides': { render: renderGuides, init: initGuides, footer: true },
  '/transport': { render: renderTransport, init: initTransport, footer: true },
  '/booking-confirmed': { render: renderBookingConfirmed, init: initBookingConfirmed, footer: false },
  '/login': { render: renderLogin, init: initLogin, footer: false },
  '/signup-user': { render: renderSignupUser, init: initSignupUser, footer: false },
  '/host-signup-stay': { render: renderHostSignupStay, init: initHostSignupStay, footer: false },
  '/host-signup-guide': { render: renderHostSignupGuide, init: initHostSignupGuide, footer: false },
  '/host-signup-transport': { render: renderHostSignupTransport, init: initHostSignupTransport, footer: false },
  '/profile': { render: renderProfile, init: initProfile, footer: true },
  '/host-dashboard': { render: renderHostDashboard, init: initHostDashboard, footer: true },
};

function matchRoute(pathname) {
  // Exact match
  if (routes[pathname]) return { route: routes[pathname], params: {} };

  // Dynamic: /destination/:id
  if (pathname.startsWith('/destination/')) {
    const id = pathname.slice('/destination/'.length);
    return { route: { render: () => renderDestinationDetail(id), init: () => initDestinationDetail(id), footer: true }, params: { id } };
  }
  if (pathname.startsWith('/stay/')) {
    const id = pathname.slice('/stay/'.length);
    return { route: { render: () => renderStayDetail(id), init: () => initStayDetail(id), footer: true }, params: { id } };
  }
  if (pathname.startsWith('/guide/')) {
    const id = pathname.slice('/guide/'.length);
    return { route: { render: () => renderGuideDetail(id), init: () => initGuideDetail(id), footer: true }, params: { id } };
  }
  if (pathname.startsWith('/transport/')) {
    const id = pathname.slice('/transport/'.length);
    return { route: { render: () => renderTransportDetail(id), init: () => initTransportDetail(id), footer: true }, params: { id } };
  }
  if (pathname.startsWith('/book/')) {
    const id = pathname.slice('/book/'.length);
    return { route: { render: () => null, init: () => null, footer: false, booking: id }, params: { id } };
  }

  // 404
  return {
    route: {
      render: () => `<div style="min-height:80vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:120px 24px"><div><div style="font-size:5rem;margin-bottom:16px">🗺️</div><h1 style="margin-bottom:12px">Page Not Found</h1><p style="margin-bottom:24px;color:var(--text-muted)">Looks like this trail doesn't exist.</p><a href="${appHref('/')}" class="btn btn-primary" data-link>Back to Home</a></div></div>`,
      init: () => {}, footer: true
    }, params: {}
  };
}

function toHistoryUrl(input) {
  const trimmed = input.trim();
  const qIdx = trimmed.indexOf('?');
  const pathPart = qIdx >= 0 ? trimmed.slice(0, qIdx) : trimmed;
  const queryPart = qIdx >= 0 ? trimmed.slice(qIdx) : '';
  const basePrefix = import.meta.env.BASE_URL.replace(/\/$/, '');
  const isFull =
    !!basePrefix &&
    (pathPart === basePrefix || pathPart.startsWith(`${basePrefix}/`));
  return isFull ? pathPart + queryPart : appHref(pathPart) + queryPart;
}

async function navigate(href) {
  const target = toHistoryUrl(href);
  const url = new URL(target, window.location.origin);
  history.pushState({}, '', url.pathname + url.search + url.hash);
  await render(getRoutePathname(url.pathname), url.searchParams);
}

async function render(pathname, searchParams = new URLSearchParams()) {
  const content = document.getElementById('page-content');
  const footerEl = document.getElementById('footer-container');

  // Booking route special case
  if (pathname.startsWith('/book/')) {
    const id = pathname.slice('/book/'.length);
    content.innerHTML = renderBooking(id, searchParams);
    footerEl.innerHTML = '';
    renderNavbar();
    wireLinks();
    initBooking(id, searchParams);
    scrollTop();
    return;
  }

  const { route } = matchRoute(pathname);

  // Render navbar
  renderNavbar();

  // Render page
  content.innerHTML = route.render() || '';

  // Render or hide footer
  if (route.footer) renderFooter(); else footerEl.innerHTML = '';

  // Wire all data-link elements
  wireLinks();

  // Init page
  route.init?.();

  scrollTop();
}

function wireLinks() {
  document.querySelectorAll('[data-link]').forEach(el => {
    el.removeEventListener('click', handleLink);
    el.addEventListener('click', handleLink);
  });
}

function handleLink(e) {
  e.preventDefault();
  const href = e.currentTarget.getAttribute('href');
  if (href && href !== '#') void navigate(href);
}

// Expose router globally
window.router = { navigate };

// Handle browser back/forward
window.addEventListener('popstate', () => {
  render(getRoutePathname(location.pathname), new URLSearchParams(location.search));
});

// Boot
render(getRoutePathname(location.pathname), new URLSearchParams(location.search));
