/**
 * Baskı Atölyesi - Ana JavaScript
 */

const WHATSAPP_NUMBER = '905551234567';
const DEFAULT_MESSAGE = 'Merhaba, baskı ürünleri hakkında bilgi almak istiyorum.';

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function openWhatsApp(message) {
  window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
}

function getProductMessage(productName) {
  return `Merhaba, ${productName} için sipariş vermek istiyorum. Detaylı bilgi alabilir miyim?`;
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScroll();
  initWhatsAppButtons();
  initSmoothScroll();
  initFAQ();
  initActiveNav();
});

function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initWhatsAppButtons() {
  const generalIds = [
    'headerWhatsapp',
    'heroWhatsapp',
    'ctaWhatsapp',
    'floatingWhatsapp',
    'footerPhone',
    'mobileWhatsapp',
  ];

  generalIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openWhatsApp(DEFAULT_MESSAGE);
    });
  });

  document.querySelectorAll('.product-order').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.product-card');
      const productName = card?.dataset.product || 'ürün';
      openWhatsApp(getProductMessage(productName));
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function initFAQ() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      items.forEach((other) => {
        other.classList.remove('active');
        other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}
