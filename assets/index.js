// ===== Footer Year =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Dropdown behavior (hover on desktop, click/tap everywhere) =====
const header = document.getElementById('siteHeader');
const backdrop = document.getElementById('backdrop');
const panels = {
  calc: document.getElementById('panel-calc'),
  conv: document.getElementById('panel-conv'),
  games: document.getElementById('panel-games')
};
let openKey = null, closeTimer = null;

const placePanel = (p) => {
  const r = header.getBoundingClientRect();
  const top =
    r.bottom +
    (parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--attach-gap')
    ) || 8);
  p.style.top = `${top}px`;
};
const showBackdrop = () => {
  backdrop.hidden = false;
  requestAnimationFrame(() => backdrop.classList.add('show'));
};
const hideBackdrop = () => {
  backdrop.classList.remove('show');
  setTimeout(() => {
    if (!openKey) backdrop.hidden = true;
  }, 160);
};
function openPanel(key, btn) {
  if (openKey && openKey !== key) {
    panels[openKey].classList.remove('show');
    const prev = document.querySelector(`.trigger[data-menu="${openKey}"]`);
    if (prev) prev.setAttribute('aria-expanded', 'false');
  }
  openKey = key;
  placePanel(panels[key]);
  showBackdrop();
  panels[key].classList.add('show');
  if (btn) btn.setAttribute('aria-expanded', 'true');
  panels[key].querySelector('[data-close]')?.focus({ preventScroll: true });
}
function scheduleClose() {
  clearTimeout(closeTimer);
  closeTimer = setTimeout(closePanel, 120);
}
function cancelClose() {
  clearTimeout(closeTimer);
}
function closePanel() {
  if (!openKey) {
    hideBackdrop();
    return;
  }
  panels[openKey].classList.remove('show');
  const btn = document.querySelector(`.trigger[data-menu="${openKey}"]`);
  if (btn) btn.setAttribute('aria-expanded', 'false');
  openKey = null;
  hideBackdrop();
}
window.addEventListener('resize', () => {
  if (openKey) placePanel(panels[openKey]);
});
window.addEventListener('scroll', () => {
  if (openKey) placePanel(panels[openKey]);
});

const isDesktopHover = window.matchMedia(
  '(hover:hover) and (pointer:fine)'
).matches;
document.querySelectorAll('.trigger').forEach((btn) => {
  const key = btn.dataset.menu;
  if (isDesktopHover) {
    btn.addEventListener('mouseenter', () => openPanel(key, btn));
    btn.addEventListener('mouseleave', scheduleClose);
    panels[key].addEventListener('mouseenter', cancelClose);
    panels[key].addEventListener('mouseleave', scheduleClose);
  }
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (openKey === key) {
      closePanel();
      return;
    }
    openPanel(key, btn);
  });
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (openKey === key) {
        closePanel();
        return;
      }
      openPanel(key, btn);
    }
  });
});
backdrop.addEventListener('click', closePanel);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePanel();
});
document
  .querySelectorAll('[data-close]')
  .forEach((x) => x.addEventListener('click', closePanel));

// ===== Mobile drawer for index =====
const hamb = document.getElementById('hambBtn');
const drawer = document.getElementById('mobileDrawer');
const sideBackdrop = document.getElementById('sideBackdrop');
const closeDrawerBtn = document.getElementById('closeDrawer');

function openDrawer() {
  drawer.classList.add('show');
  drawer.setAttribute('aria-hidden', 'false');
  sideBackdrop.hidden = false;
  requestAnimationFrame(() => sideBackdrop.classList.add('show'));
  hamb?.setAttribute('aria-expanded', 'true');
}
function closeDrawer() {
  drawer.classList.remove('show');
  drawer.setAttribute('aria-hidden', 'true');
  hamb?.setAttribute('aria-expanded', 'false');
  sideBackdrop.classList.remove('show');
  setTimeout(() => {
    if (!drawer.classList.contains('show')) sideBackdrop.hidden = true;
  }, 160);
}

hamb?.addEventListener('click', openDrawer);
closeDrawerBtn?.addEventListener('click', closeDrawer);
sideBackdrop?.addEventListener('click', closeDrawer);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDrawer();
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 860) closeDrawer();
});

// ===== Search (aliases help) + support ?q= =====
const searchInput = document.getElementById('searchInput');
const gridEl = document.getElementById('toolsGrid');
const noResults = document.getElementById('noResults');
const cards = [...document.querySelectorAll('.card')];

const aliases = {
  jpg: 'jpg jpeg image photo pictures',
  jpeg: 'jpg jpeg image photo pictures',
  png: 'png image',
  webp: 'webp image',
  heic: 'heic image',
  pdf: 'pdf document',
  'image to pdf':
    'image to pdf images to pdf photo to pdf picture to pdf img2pdf image2pdf',
  img2pdf: 'image to pdf images to pdf',
  image2pdf: 'image to pdf images to pdf',
  'pdf to images':
    'pdf to images pdf to image pdf2img pdf2image pdf to png pdf to jpg pdf to jpeg pdf to webp export pages',
  pdf2img: 'pdf to images pdf to png pdf to jpg pdf to jpeg',
  pdf2image: 'pdf to images pdf to png pdf to jpg pdf to jpeg',
  'pdf to png': 'pdf to images',
  'pdf to jpg': 'pdf to images jpg jpeg',
  'pdf to jpeg': 'pdf to images jpg jpeg',
  'pdf to webp': 'pdf to images webp',
  genetic: 'genetic barcode id code',
  barcode: 'barcode genetic id code',
  id: 'id code barcode genetic',
  'genetic barcode': 'barcode id genetic code',
  reader: 'reader scan',
  scan: 'scan reader barcode',
  'genetic barcode reader': 'scan barcode id',
  cad: 'canada canadian sales tax gst pst qst hst',
  canada: 'cad canada sales tax gst pst qst hst',
  'sales tax': 'tax cad canada hst gst pst qst',
  'sales tax cad': 'cad canada hst gst pst qst tax',
  percentage: 'percent change increase decrease',
  'percentage calculator': 'percent change increase decrease',
  bmr: 'basal metabolic rate calories tdee',
  'bmr calculator': 'basal metabolic rate mifflin st jeor',
  retirement: 'future value investment inflation nest egg',
  salary: 'pay wage hourly yearly monthly',
  gpa: 'gpa grade point average school study',
  'gpa calculator': 'grade point average',
  timer: 'timer stop challenge game',
  'timer stop': 'timer stop challenge',
  'time difference': 'hours between times duration',
  'days between': 'date difference days weeks leftover full',
  blog: 'news article post posts guide tips how-to',
  article: 'blog news guide tutorial',
  news: 'blog article posts',
  qr: 'qr qrcode barcode code',
  loan: 'loan emi interest finance',
  mortgage: 'mortgage home emi finance',
  svg: 'svg vector',
  apa: 'apa mla chicago citation references cite',
  mla: 'mla apa chicago citation references cite',
  chicago: 'chicago apa mla citation references cite',
  split: 'split reorder extract pages',
  graph: 'graph plot math function',
  pomodoro: 'timer focus study',
  flashcards: 'cards memory spaced'
};
const norm = (s) => (s || '').toString().toLowerCase().trim();
const expandQuery = (q) => {
  const words = norm(q);
  const extra = words
    .split(/\s+/)
    .map((p) => aliases[p] || '')
    .join(' ');
  const joined = aliases[words] || '';
  return (words + ' ' + extra + ' ' + joined).trim();
};
function search(q) {
  const tokens = norm(expandQuery(q)).split(/\s+/).filter(Boolean);
  let matches = 0;
  cards.forEach((card) => {
    const hay = `${norm(card.dataset.name)} ${norm(card.dataset.tags)} ${norm(
      card.textContent
    )}`;
    const ok = tokens.length === 0 || tokens.every((t) => hay.includes(t));
    card.style.display = ok ? '' : 'none';
    if (ok) matches++;
  });
  const posts = [...document.querySelectorAll('.post-card')];
  let postMatches = 0;
  posts.forEach((post) => {
    const hay = `${norm(post.dataset?.name || '')} ${norm(
      post.dataset?.tags || ''
    )} ${norm(post.textContent)}`;
    const ok = tokens.length === 0 || tokens.every((t) => hay.includes(t));
    post.style.display = ok ? '' : 'none';
    if (ok) postMatches++;
  });

  if (matches === 0 && postMatches === 0) {
    gridEl.style.display = 'none';
    document.querySelector('.blog-grid').style.display = 'none';
    noResults.style.display = 'block';
    noResults.textContent = 'No tools or posts found';
  } else {
    gridEl.style.display = '';
    document.querySelector('.blog-grid').style.display = '';
    noResults.style.display = 'none';
  }
}

// input listener
searchInput.addEventListener('input', (e) => search(e.target.value));

// support ?q=searchterm from URL (for SearchAction schema)
const params = new URLSearchParams(location.search);
const q = params.get('q') || '';
if (q) {
  searchInput.value = q;
  search(q);
} else {
  search('');
}
