// Mobile menu
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const shown = getComputedStyle(mainNav).display !== 'none';
    mainNav.style.display = shown ? 'none' : 'flex';
  });
}

// Smooth anchor scroll for internal links like “Start”
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Search filter (name + keywords + text)
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  const norm = s => (s || '')
    .toString()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/\s+/g, ' ')
    .trim();

  searchInput.addEventListener('input', e => {
    const q = norm(e.target.value);
    const cards = document.querySelectorAll('.card');
    if (!q) { cards.forEach(c => c.style.display = ''); return; }
    cards.forEach(card => {
      const haystack = [
        card.getAttribute('data-name'),
        card.getAttribute('data-keywords'),
        card.textContent
      ].map(norm).join(' ');
      card.style.display = haystack.includes(q) ? '' : 'none';
    });
  });
}

// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

/* =========================================================
   Micro‑interactions: tilt, ripple, scroll‑reveal, parallax
   ========================================================= */

// 3D tilt/press on Home cards (desktop only, respects reduced motion)
(function enableCardTilt(){
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || reduce) return;

  const cards = document.querySelectorAll('body.home .card:not(.disabled)');
  const MAX = 8; // degrees

  cards.forEach(card => {
    let mx = 0, my = 0, raf = null;
    const apply = () => {
      const rx = (0.5 - my) * MAX;
      const ry = (mx - 0.5) * MAX;
      card.style.setProperty('--rx', rx.toFixed(2) + 'deg');
      card.style.setProperty('--ry', ry.toFixed(2) + 'deg');
      raf = null;
    };
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width;
      my = (e.clientY - r.top) / r.height;
      if (raf == null) raf = requestAnimationFrame(apply);
    });
    card.addEventListener('mouseenter', () => card.style.setProperty('--ty', '-6px'));
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.style.removeProperty('--ty');
    });
    card.addEventListener('mousedown', () => card.classList.add('is-press'));
    window.addEventListener('mouseup',   () => card.classList.remove('is-press'));
  });
})();

// Ripple on all .btn
(function enableRipple(){
  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const span = document.createElement('span');
    span.className = 'ripple';
    span.style.left = x + 'px';
    span.style.top  = y + 'px';
    btn.appendChild(span);
    // cleanup
    span.addEventListener('animationend', ()=> span.remove());
  });
})();

// Scroll reveal (IntersectionObserver)
(function enableReveal(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = [...document.querySelectorAll(
    '.card, .section-title, .hero-inner, .tools .grid > .card'
  )];
  if (els.length === 0) return;

  els.forEach(el => el.classList.add('reveal'));
  if (reduce) { els.forEach(el => el.classList.add('is-in')); return; }

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(ent=>{
      if (ent.isIntersecting){
        ent.target.classList.add('is-in');
        io.unobserve(ent.target);
      }
    });
  }, { rootMargin:'-10% 0px -5% 0px', threshold:0.01 });

  els.forEach(el => io.observe(el));
})();

// Parallax for hero blobs (small tilt with cursor – desktop only)
(function heroParallax(){
  const hero = document.querySelector('.hero');
  const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!hero || !fine || reduce) return;

  let raf = null, mx = 0, my = 0;
  const apply = ()=>{
    hero.style.setProperty('--mx', mx.toFixed(3));
    hero.style.setProperty('--my', my.toFixed(3));
    raf = null;
  };
  hero.addEventListener('mousemove', (e)=>{
    const r = hero.getBoundingClientRect();
    mx = (e.clientX - r.left) / r.width - .5; // -0.5..0.5
    my = (e.clientY - r.top) / r.height - .5;
    if (raf == null) raf = requestAnimationFrame(apply);
  });
})();
