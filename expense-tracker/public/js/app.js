// public/js/app.js — Shared utilities

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Health', 'Shopping', 'Education', 'Other'];

const CAT_ICONS = {
  Food: '🍔', Transport: '🚗', Entertainment: '🎬',
  Utilities: '💡', Health: '💊', Shopping: '🛍️',
  Education: '📚', Other: '📦'
};

const CAT_COLORS = {
  Food: '#fbbf24', Transport: '#34d399', Entertainment: '#a78bfa',
  Utilities: '#60a5fa', Health: '#f87171', Shopping: '#fb923c',
  Education: '#2dd4bf', Other: '#94a3b8'
};

// Format currency (PKR)
function formatCurrency(amount) {
  return 'Rs ' + Number(amount).toLocaleString('en-PK');
}

// Format date
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Get current month YYYY-MM
function currentMonth() {
  return new Date().toISOString().slice(0, 7);
}

// Toast notification
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  const colors = { success: 'bg-emerald-500', error: 'bg-red-500', warning: 'bg-amber-500', info: 'bg-sky-500' };
  toast.className = `fixed top-5 right-5 z-50 px-5 py-3 rounded-xl text-white font-medium shadow-2xl ${colors[type] || colors.success}`;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// API helpers
async function apiFetch(url, options = {}) {
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data;
  } catch (err) {
    throw err;
  }
}

// Set active nav link
function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '/' && href === '/') || (path !== '/' && href !== '/' && path.startsWith(href))) {
      link.classList.add('active');
    }
  });
}

// Build nav HTML
function buildNav() {
  const navEl = document.getElementById('sidebar-nav');
  if (!navEl) return;
  const links = [
    { href: '/', icon: '📊', label: 'Dashboard' },
    { href: '/expenses', icon: '💸', label: 'Expenses' },
    { href: '/budget', icon: '🎯', label: 'Budget' },
    { href: '/reports', icon: '📈', label: 'Reports' },
    { href: '/about', icon: 'ℹ️', label: 'About' }
  ];
  navEl.innerHTML = links.map(l => `
    <a href="${l.href}" class="nav-link flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200 text-sm font-medium">
      <span class="text-lg">${l.icon}</span>
      <span>${l.label}</span>
    </a>
  `).join('');
  setActiveNav();
}

// Mobile menu toggle
function initMobileMenu() {
  const btn = document.getElementById('menu-btn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (!btn || !sidebar) return;
  btn.addEventListener('click', () => {
    sidebar.classList.toggle('-translate-x-full');
    overlay && overlay.classList.toggle('hidden');
  });
  overlay && overlay.addEventListener('click', () => {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  buildNav();
  initMobileMenu();
});
