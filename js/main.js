/**
 * Pharmadroga — JavaScript vanilla
 * Interações da landing page: navegação, ofertas, animações e contadores.
 */

const products = [
  {
    id: 1,
    name: 'Vitamina D3 2000UI — 60 cápsulas',
    priceOld: 45.9,
    price: 29.9,
    discount: '-35%',
    icon: 'vitamin',
  },
  {
    id: 2,
    name: 'Protetor Solar FPS 50 — 120ml',
    priceOld: 89.9,
    price: 59.9,
    discount: '-33%',
    icon: 'sun',
  },
  {
    id: 3,
    name: 'Omeprazol 20mg — 28 comprimidos',
    priceOld: 32.5,
    price: 18.9,
    discount: '-42%',
    icon: 'pill',
  },
  {
    id: 4,
    name: 'Shampoo Anticaspa — 400ml',
    priceOld: 38.9,
    price: 24.9,
    discount: '-36%',
    icon: 'bottle',
  },
  {
    id: 5,
    name: 'Termômetro Digital Infravermelho',
    priceOld: 129.9,
    price: 79.9,
    discount: '-38%',
    icon: 'thermo',
  },
  {
    id: 6,
    name: 'Whey Protein 900g — Chocolate',
    priceOld: 159.9,
    price: 99.9,
    discount: '-38%',
    icon: 'protein',
  },
];

const productIcons = {
  vitamin: '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="20" fill="rgba(255,255,255,0.3)"/><text x="32" y="38" text-anchor="middle" fill="white" font-size="20" font-weight="bold">D</text></svg>',
  sun: '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="14" fill="rgba(255,255,255,0.9)"/><g stroke="rgba(255,255,255,0.7)" stroke-width="3"><line x1="32" y1="8" x2="32" y2="14"/><line x1="32" y1="50" x2="32" y2="56"/><line x1="8" y1="32" x2="14" y2="32"/><line x1="50" y1="32" x2="56" y2="32"/></g></svg>',
  pill: '<svg viewBox="0 0 64 64"><rect x="16" y="24" width="32" height="16" rx="8" fill="rgba(255,255,255,0.9)"/><line x1="32" y1="24" x2="32" y2="40" stroke="rgba(10,92,92,0.3)" stroke-width="2"/></svg>',
  bottle: '<svg viewBox="0 0 64 64"><rect x="24" y="16" width="16" height="8" rx="2" fill="rgba(255,255,255,0.7)"/><rect x="20" y="24" width="24" height="28" rx="4" fill="rgba(255,255,255,0.9)"/></svg>',
  thermo: '<svg viewBox="0 0 64 64"><rect x="28" y="12" width="8" height="36" rx="4" fill="rgba(255,255,255,0.9)"/><circle cx="32" cy="52" r="8" fill="rgba(255,255,255,0.7)"/></svg>',
  protein: '<svg viewBox="0 0 64 64"><rect x="22" y="16" width="20" height="36" rx="3" fill="rgba(255,255,255,0.9)"/><rect x="26" y="10" width="12" height="8" rx="2" fill="rgba(255,255,255,0.7)"/></svg>',
};

function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatInstallment(price) {
  const installment = (price / 6).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return `6x de ${installment} sem juros`;
}

function renderProducts() {
  const grid = document.getElementById('offersGrid');
  if (!grid) return;

  grid.innerHTML = products
    .map(
      (product) => `
      <article class="offer-card reveal" data-product-id="${product.id}">
        <div class="offer-card__image">
          <span class="offer-card__tag">${product.discount}</span>
          ${productIcons[product.icon] || productIcons.pill}
        </div>
        <div class="offer-card__body">
          <h3 class="offer-card__name">${product.name}</h3>
          <div class="offer-card__prices">
            <span class="offer-card__price-old">${formatPrice(product.priceOld)}</span>
            <span class="offer-card__price">${formatPrice(product.price)}</span>
          </div>
          <span class="offer-card__installment">${formatInstallment(product.price)}</span>
        </div>
      </article>
    `
    )
    .join('');
}

function initHeader() {
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 20);
  });

  menuToggle?.addEventListener('click', () => {
    const isOpen = nav?.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => nav?.classList.remove('open'));
  });
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}

function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => observer.observe(section));
}

function animateCounter(element, target, duration = 2000) {
  const start = performance.now();
  const suffix = element.dataset.suffix || '';

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    if (target >= 1000) {
      element.textContent = `${(current / 1000).toFixed(current >= 1000 ? 0 : 1)}${suffix || 'M+'}`;
      if (target === 15000) element.textContent = `${current.toLocaleString('pt-BR')}+`;
      else if (target === 8) element.textContent = `${current}M+`;
    } else {
      element.textContent = `${current}${suffix}`;
      if (target === 520) element.textContent = `${current}+`;
      else if (target === 27) element.textContent = `${current}`;
    }

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const stats = document.querySelectorAll('.stat__number[data-count]');
  let triggered = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          stats.forEach((stat) => {
            const target = parseInt(stat.dataset.count, 10);
            animateCounter(stat, target);
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );

  const storesSection = document.getElementById('lojas');
  if (storesSection) observer.observe(storesSection);
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  initHeader();
  initScrollReveal();
  initActiveNav();
  initCounters();
  initSmoothScroll();

  initScrollReveal();
});

export { products, formatPrice, formatInstallment };
