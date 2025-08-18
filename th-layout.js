/* =========================================================
   ToolHouzz — Global header/footer + desktop dropdowns + mobile drawer
   Works on every page. If a page already has the index header/panels,
   we reuse them and only add what's missing (hamburger, backdrop, drawer).
   ========================================================= */
(function () {
  if (document.documentElement.hasAttribute('data-th-layout')) return;
  document.documentElement.setAttribute('data-th-layout', '');

  // Load same fonts the index uses (if absent)
  const FONTS_HREF = 'https://fonts.googleapis.com/css2?family=Inter:wght@600;700;800;900&family=Playfair+Display:wght@400;700&family=Lato:wght@400;700&display=swap';
  if (![...document.styleSheets].some(s=>s.href && s.href.includes('fonts.googleapis'))) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FONTS_HREF;
    document.head.appendChild(link);
  }

  /* ===== Ensure MAIN landmark + Skip link + Live region ===== */
  (function ensureA11yBits(){
    const mainCandidate = document.querySelector('#main, main, .tools, section[role="main"]');
    if (mainCandidate && !document.getElementById('main')) mainCandidate.id = 'main';

    if (!document.querySelector('.th-skip')) {
      const skip = document.createElement('a');
      skip.className = 'th-skip';
      skip.href = '#main';
      skip.textContent = 'Skip to content';
      (document.querySelector('.site-header') || document.body).prepend(skip);
    }

    if (!document.getElementById('th-live-region')) {
      const live = document.createElement('div');
      live.id = 'th-live-region';
      live.setAttribute('role','status');
      live.setAttribute('aria-live','polite');
      live.setAttribute('aria-atomic','true');
      live.className = 'th-visually-hidden';
      document.body.appendChild(live);
      window.thAnnounce = (msg)=>{ if(!msg) return; live.textContent=''; setTimeout(()=>live.textContent=String(msg),10); };
    }
  })();

  /* ===== Header / panels / footer injection (only if missing) ===== */
  const HEADER = `
  <header class="site-header" id="siteHeader">
    <div class="nav-left">
      <a class="brand" href="index.html" aria-label="ToolHouzz home">ToolHouzz</a>
      <button class="mobile-toggle" id="mobileToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobileDrawer">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>

    <div class="nav-center" role="menubar" aria-label="Primary">
      <nav class="nav">
        <div class="nav-item">
          <button class="trigger" data-menu="calc" aria-haspopup="dialog" aria-expanded="false" aria-controls="panel-calc">
            Calculators
            <svg class="caret" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M1.8 5.2a1 1 0 0 1 1.4 0L8 10l4.8-4.8a1 1 0 1 1 1.4 1.4l-5.5 5.5a1 1 0 0 1-1.4 0L1.8 6.6a1 1 0 0 1 0-1.4Z"/></svg>
          </button>
        </div>
        <div class="nav-item">
          <button class="trigger" data-menu="conv" aria-haspopup="dialog" aria-expanded="false" aria-controls="panel-conv">
            Converters
            <svg class="caret" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M1.8 5.2a1 1 0 0 1 1.4 0L8 10l4.8-4.8a1 1 0 1 1 1.4 1.4l-5.5 5.5a1 1 0 0 1-1.4 0L1.8 6.6a1 1 0 0 1 0-1.4Z"/></svg>
          </button>
        </div>
        <div class="nav-item">
          <button class="trigger" data-menu="games" aria-haspopup="dialog" aria-expanded="false" aria-controls="panel-games">
            Mini Games
            <svg class="caret" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M1.8 5.2a1 1 0 0 1 1.4 0L8 10l4.8-4.8a1 1 0 1 1 1.4 1.4l-5.5 5.5a1 1 0 0 1-1.4 0L1.8 6.6a1 1 0 0 1 0-1.4Z"/></svg>
          </button>
        </div>
      </nav>
    </div>

    <div class="nav-right">
      <a href="blog.html">Blog</a>
      <a href="about.html">About</a>
      <a href="privacy.html">Privacy</a>
      <a href="terms.html">Terms</a>
    </div>
  </header>`;

  const PANELS = `
  <div class="menu-panel" id="panel-calc" role="dialog" aria-modal="true" aria-labelledby="calc-title">
    <div class="menu-head"><div class="menu-title" id="calc-title">Calculators</div><button class="menu-close" data-close aria-label="Close menu">×</button></div>
    <div class="drop-grid">
      <div class="dd-col">
        <h5>Health & Personal</h5>
        <a href="bmi.html">BMI Calculator</a>
        <a href="bmr.html">BMR Calculator</a>
        <a href="calorie-macros.html">Calorie &amp; Macros Tracker</a>
        <a href="age.html">Age Calculator</a>
      </div>
      <div class="dd-col">
        <h5>Finance</h5>
        <a href="salary-calculator.html">Salary Calculator</a>
        <a href="retirement-calculator.html">Retirement Calculator</a>
        <a href="sales-tax-cad.html">Sales Tax (CAD)</a>
        <a href="loan.html">Loan Calculator</a>
        <a href="mortgage.html">Mortgage Calculator</a>
        <a href="budget.html">Budget Planner</a>
        <a href="gpa.html">GPA Calculator</a>
      </div>
      <div class="dd-col">
        <h5>Date & Time</h5>
        <a href="days-between.html">Days Between Dates</a>
        <a href="hours-between.html">Hours Between Times</a>
        <a href="timer-stop.html">Timer Stop Challenge</a>
      </div>
      <div class="dd-col">
        <h5>Popular</h5>
        <a href="percentage-calculator.html">Percentage Calculator</a>
        <a href="word-counter.html">Word &amp; Readability</a>
        <a href="gpa.html">GPA (4.0 scale)</a>
      </div>
    </div>
  </div>

  <div class="menu-panel" id="panel-conv" role="dialog" aria-modal="true" aria-labelledby="conv-title">
    <div class="menu-head"><div class="menu-title" id="conv-title">Converters</div><button class="menu-close" data-close aria-label="Close menu">×</button></div>
    <div class="drop-grid">
      <div class="dd-col">
        <h5>PDF</h5>
        <a href="image-to-pdf.html">Image → PDF</a>
        <a href="pdf-to-images.html">PDF → Images</a>
        <a href="merge-pdfs.html">Merge PDFs</a>
        <a href="pdf-split-reorder.html">Split &amp; Reorder PDF</a>
        <a href="compress-pdf.html">Compress PDF</a>
      </div>
      <div class="dd-col">
        <h5>Images</h5>
        <a href="png-to-svg.html">PNG → SVG</a>
      </div>
      <div class="dd-col">
        <h5>General</h5>
        <a href="unit-converter.html">Unit Converter</a>
        <a href="file-converter.html">File Converter</a>
      </div>
      <div class="dd-col">
        <h5>Utility</h5>
        <a href="qr.html">QR Code Generator</a>
        <a href="citation-generator.html">Citation Generator</a>
        <a href="genetic-barcode.html">Genetic Barcode</a>
        <a href="genetic-barcode-reader.html">Genetic Barcode Reader</a>
      </div>
    </div>
  </div>

  <div class="menu-panel" id="panel-games" role="dialog" aria-modal="true" aria-labelledby="games-title">
    <div class="menu-head"><div class="menu-title" id="games-title">Mini Games</div><button class="menu-close" data-close aria-label="Close menu">×</button></div>
    <div class="drop-grid">
      <div class="dd-col"><h5>Brain</h5><a href="tic-tac-toe.html">Tic-Tac-Toe (Single Player)</a></div>
      <div class="dd-col"><h5>Arcade</h5><a href="flappy.html">Flappy</a></div>
      <div class="dd-col"><h5>Timing</h5><a href="timer-stop.html">Timer Stop Challenge</a></div>
      <div class="dd-col"><h5>Coming Soon</h5><a href="#">More mini games</a></div>
    </div>
  </div>`;

  const FOOTER = `
  <footer class="site-footer" id="siteFooter">
    <div class="footer-grid">
      <div>
        <div class="brand" style="font-family:var(--primary-font);color:#e6ecff;font-weight:700">ToolHouzz</div>
        <small>Fast, privacy-first utilities.</small>
      </div>
      <div>
        <h4>Calculators</h4>
        <a href="bmi.html">BMI Calculator</a>
        <a href="bmr.html">BMR Calculator</a>
        <a href="gpa.html">GPA Calculator</a>
        <a href="percentage-calculator.html">Percentage Calculator</a>
        <a href="budget.html">Budget Planner</a>
        <a href="age.html">Age Calculator</a>
        <a href="days-between.html">Days Between Dates</a>
        <a href="hours-between.html">Hours Between Times</a>
      </div>
      <div>
        <h4>Finance</h4>
        <a href="salary-calculator.html">Salary Calculator</a>
        <a href="retirement-calculator.html">Retirement Calculator</a>
        <a href="sales-tax-cad.html">Sales Tax (CAD)</a>
        <a href="loan.html">Loan Calculator</a>
        <a href="mortgage.html">Mortgage Calculator</a>
      </div>
      <div>
        <h4>Converters</h4>
        <a href="image-to-pdf.html">Image → PDF</a>
        <a href="pdf-to-images.html">PDF → Images</a>
        <a href="merge-pdfs.html">Merge PDFs</a>
        <a href="compress-pdf.html">Compress PDF</a>
        <a href="genetic-barcode.html">Genetic Barcode</a>
        <a href="genetic-barcode-reader.html">Genetic Barcode Reader</a>
        <a href="file-converter.html">File Converter</a>
        <h4 style="margin-top:1rem">Mini Games</h4>
        <a href="tic-tac-toe.html">Tic-Tac-Toe</a>
        <a href="flappy.html">Flappy</a>
        <a href="timer-stop.html">Timer Stop Challenge</a>
        <h4 style="margin-top:1rem">Resources</h4>
        <a href="blog.html">Blog</a>
        <h4 style="margin-top:1rem">Legal</h4>
        <a href="about.html">About</a>
        <a href="privacy.html">Privacy</a>
        <a href="terms.html">Terms</a>
      </div>
    </div>

    <div class="footer-accordion" id="footerAccordion">
      <details>
        <summary>Calculators</summary>
        <div class="links">
          <a href="bmi.html">BMI Calculator</a>
          <a href="bmr.html">BMR Calculator</a>
          <a href="gpa.html">GPA Calculator</a>
          <a href="percentage-calculator.html">Percentage Calculator</a>
          <a href="budget.html">Budget Planner</a>
          <a href="age.html">Age Calculator</a>
          <a href="days-between.html">Days Between Dates</a>
          <a href="hours-between.html">Hours Between Times</a>
        </div>
      </details>

      <details>
        <summary>Finance</summary>
        <div class="links">
          <a href="salary-calculator.html">Salary Calculator</a>
          <a href="retirement-calculator.html">Retirement Calculator</a>
          <a href="sales-tax-cad.html">Sales Tax (CAD)</a>
          <a href="loan.html">Loan Calculator</a>
          <a href="mortgage.html">Mortgage Calculator</a>
        </div>
      </details>

      <details>
        <summary>Converters</summary>
        <div class="links">
          <a href="image-to-pdf.html">Image → PDF</a>
          <a href="pdf-to-images.html">PDF → Images</a>
          <a href="merge-pdfs.html">Merge PDFs</a>
          <a href="compress-pdf.html">Compress PDF</a>
          <a href="genetic-barcode.html">Genetic Barcode</a>
          <a href="genetic-barcode-reader.html">Genetic Barcode Reader</a>
          <a href="file-converter.html">File Converter</a>
        </div>
      </details>

      <details>
        <summary>Mini Games</summary>
        <div class="links">
          <a href="tic-tac-toe.html">Tic-Tac-Toe</a>
          <a href="flappy.html">Flappy</a>
          <a href="timer-stop.html">Timer Stop Challenge</a>
        </div>
      </details>

      <details>
        <summary>Site & Legal</summary>
        <div class="links">
          <a href="index.html">Home</a>
          <a href="blog.html">Blog</a>
          <a href="about.html">About</a>
          <a href="privacy.html">Privacy</a>
          <a href="terms.html">Terms</a>
        </div>
      </details>
    </div>

    <p class="legal">© <span id="year"></span> ToolHouzz. All rights reserved.</p>
  </footer>`;

  // Inject header/panels/footer if missing
  if (!document.querySelector('.site-header')) {
    document.body.insertAdjacentHTML('afterbegin', HEADER + `<div class="backdrop" id="backdrop" hidden></div>` + PANELS);
  } else {
    if (!document.getElementById('backdrop')) {
      document.body.insertAdjacentHTML('afterbegin', `<div class="backdrop" id="backdrop" hidden></div>`);
    }
    // If header exists (like index) but lacks hamburger, add it to .nav-left
    if (!document.getElementById('mobileToggle')) {
      const navLeft = document.querySelector('.site-header .nav-left');
      if (navLeft) {
        const btn = document.createElement('button');
        btn.className = 'mobile-toggle';
        btn.id = 'mobileToggle';
        btn.setAttribute('aria-label','Open menu');
        btn.setAttribute('aria-expanded','false');
        btn.setAttribute('aria-controls','mobileDrawer');
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>`;
        navLeft.appendChild(btn);
      }
    }
  }
  if (!document.querySelector('.menu-panel')) {
    document.body.insertAdjacentHTML('afterbegin', PANELS);
  }
  if (!document.querySelector('.site-footer')) {
    document.body.insertAdjacentHTML('beforeend', FOOTER);
  }
  const yearEl = document.getElementById('year'); if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ===== Build mobile drawer (clone links from panels) ===== */
  const drawerWrap = document.createElement('div');
  drawerWrap.className = 'mobile-drawer';
  drawerWrap.id = 'mobileDrawer';
  drawerWrap.innerHTML = `
    <div class="drawer" role="dialog" aria-modal="true" aria-labelledby="mnav-title">
      <div class="drawer-head">
        <h4 id="mnav-title">Menu</h4>
        <button class="close" aria-label="Close menu">×</button>
      </div>

      <details class="section" open>
        <summary>Calculators</summary>
        <div class="links" data-from="panel-calc"></div>
      </details>

      <details class="section">
        <summary>Converters</summary>
        <div class="links" data-from="panel-conv"></div>
      </details>

      <details class="section">
        <summary>Mini Games</summary>
        <div class="links" data-from="panel-games"></div>
      </details>

      <div class="section">
        <div class="links">
          <a href="index.html">Home</a>
          <a href="blog.html">Blog</a>
          <a href="about.html">About</a>
          <a href="privacy.html">Privacy</a>
          <a href="terms.html">Terms</a>
        </div>
      </div>
    </div>`;
  document.body.appendChild(drawerWrap);

  ['panel-calc','panel-conv','panel-games'].forEach(pid=>{
    const src = document.getElementById(pid);
    const dest = drawerWrap.querySelector(`.links[data-from="${pid}"]`);
    if (!src || !dest) return;
    src.querySelectorAll('.dd-col a').forEach(a => dest.appendChild(a.cloneNode(true)));
  });

  /* ===== Desktop dropdown behaviour (same as index) ===== */
  const header = document.getElementById('siteHeader') || document.querySelector('.site-header');
  const backdrop = document.getElementById('backdrop');
  const panels = {
    calc: document.getElementById('panel-calc'),
    conv: document.getElementById('panel-conv'),
    games: document.getElementById('panel-games')
  };
  let openKey = null, closeTimer = null;

  const placePanel = (p)=>{
    if (!p || !header) return;
    const r = header.getBoundingClientRect();
    const top = r.bottom + (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--attach-gap'))||8);
    p.style.top = `${top}px`;
  };
  const showBackdrop = ()=>{
    backdrop.hidden = false;
    requestAnimationFrame(()=>backdrop.classList.add('show'));
  };
  const hideBackdrop = ()=>{
    backdrop.classList.remove('show');
    setTimeout(()=>{ if(!openKey && !drawerWrap.classList.contains('active')) backdrop.hidden = true; }, 160);
  };
  function openPanel(key, btn){
    if(openKey && openKey !== key){
      panels[openKey]?.classList.remove('show');
      document.querySelector(`.trigger[data-menu="${openKey}"]`)?.setAttribute('aria-expanded','false');
    }
    openKey = key;
    placePanel(panels[key]); showBackdrop();
    panels[key]?.classList.add('show');
    btn?.setAttribute('aria-expanded','true');
    panels[key]?.querySelector('[data-close]')?.focus({preventScroll:true});
  }
  function scheduleClose(){ clearTimeout(closeTimer); closeTimer = setTimeout(closePanel, 120); }
  function cancelClose(){ clearTimeout(closeTimer); }
  function closePanel(){
    if(!openKey){ hideBackdrop(); return; }
    panels[openKey]?.classList.remove('show');
    document.querySelector(`.trigger[data-menu="${openKey}"]`)?.setAttribute('aria-expanded','false');
    openKey = null; hideBackdrop();
  }
  window.addEventListener('resize', ()=>{ if(openKey) placePanel(panels[openKey]); });
  window.addEventListener('scroll', ()=>{ if(openKey) placePanel(panels[openKey]); });

  const isDesktopHover = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  document.querySelectorAll('.trigger').forEach(btn=>{
    const key = btn.dataset.menu;
    if(isDesktopHover){
      btn.addEventListener('mouseenter', ()=>openPanel(key,btn));
      btn.addEventListener('mouseleave', scheduleClose);
      panels[key]?.addEventListener('mouseenter', cancelClose);
      panels[key]?.addEventListener('mouseleave', scheduleClose);
    }
    btn.addEventListener('click', e=>{
      e.preventDefault();
      if(openKey === key){ closePanel(); return; }
      openPanel(key,btn);
    });
    btn.addEventListener('keydown', e=>{
      if(e.key==='Enter' || e.key===' '){
        e.preventDefault();
        if(openKey===key){ closePanel(); return; }
        openPanel(key,btn);
      }
    });
  });
  backdrop.addEventListener('click', ()=>{ closePanel(); });

  /* ===== Mobile drawer interactions + focus trap ===== */
  const mobileToggle = document.getElementById('mobileToggle');
  const drawer = drawerWrap.querySelector('.drawer');
  const drawerClose = drawerWrap.querySelector('.close');
  let lastFocused = null;

  const getFocusable = (root) =>
    Array.from(root.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ));

  function openDrawer(){
    if (drawerWrap.classList.contains('active')) return;
    lastFocused = document.activeElement;
    drawerWrap.classList.add('active');
    showBackdrop();
    document.documentElement.classList.add('th-lock-scroll');
    mobileToggle?.setAttribute('aria-expanded','true');
    (getFocusable(drawer)[0] || drawer).focus({preventScroll:true});
  }
  function closeDrawer(){
    if (!drawerWrap.classList.contains('active')) return;
    drawerWrap.classList.remove('active');
    document.documentElement.classList.remove('th-lock-scroll');
    mobileToggle?.setAttribute('aria-expanded','false');
    if (!openKey) hideBackdrop();
    (lastFocused || mobileToggle)?.focus({preventScroll:true});
  }

  mobileToggle?.addEventListener('click', openDrawer);
  drawerClose.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', ()=>{ closePanel(); closeDrawer(); });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape'){ closePanel(); closeDrawer(); }});
  drawer.addEventListener('click', (e)=>{ if (e.target.closest('a')) closeDrawer(); });

  // Focus trap inside drawer
  drawer.addEventListener('keydown', (e)=>{
    if (e.key !== 'Tab') return;
    const f = getFocusable(drawer);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });
})();
