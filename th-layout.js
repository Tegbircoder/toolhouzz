(() => {
  // Prevent double-injection across pages
  if (document.documentElement.hasAttribute('data-th-layout')) return;
  document.documentElement.setAttribute('data-th-layout', '');

  const HEADER = `
  <header class="site-header" id="siteHeader">
    <div class="nav-left">
      <a class="brand" href="index.html" aria-label="ToolHouzz home">ToolHouzz</a>
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
    <div class="nav-right">\n      <a href="blog.html">Blog</a>
      <a href="about.html">About</a>
      <a href="privacy.html">Privacy</a>
      <a href="terms.html">Terms</a>
    </div>
  </header>
  <div class="backdrop" id="backdrop" hidden></div>
  `;

  const PANELS = `
  <div class="menu-panel" id="panel-calc" role="dialog" aria-modal="true" aria-labelledby="calc-title">
    <div class="menu-head"><div class="menu-title" id="calc-title">Calculators</div><button class="menu-close" data-close aria-label="Close menu">×</button></div>
    <div class="drop-grid">
      <div class="dd-col">
        <h5>Health & Personal</h5>
        <a href="bmi.html">BMI Calculator</a>
        <a href="calorie-macros.html">Calorie &amp; Macros Tracker</a>
        <a href="age.html">Age Calculator</a>
      </div>
      <div class="dd-col">
        <h5>Finance</h5>
        <a href="loan.html">Loan Calculator</a>
        <a href="mortgage.html">Mortgage Calculator</a>
        <a href="budget.html">Budget Planner</a>
        <a href="gpa.html">GPA Calculator</a>
      </div>
      <div class="dd-col">
        <h5>Popular</h5>
        <a href="bmi.html">Quick BMI Check</a>
        <a href="gpa.html">GPA (4.0 scale)</a>
        <a href="word-counter.html">Word &amp; Readability</a>
      </div>
      <div class="dd-col">
        <h5>More</h5>
        <a href="graphing-calculator.html">Graphing Calculator</a>
        <a href="pomodoro.html">Pomodoro Timer</a>
        <a href="flashcards.html">Flashcards</a>
      </div>
    </div>
  </div>

  <div class="menu-panel" id="panel-conv" role="dialog" aria-modal="true" aria-labelledby="conv-title">
    <div class="menu-head"><div class="menu-title" id="conv-title">Converters</div><button class="menu-close" data-close aria-label="Close menu">×</button></div>
    <div class="drop-grid">
      <div class="dd-col">
        <h5>PDF</h5>
        <a href="image-to-pdf.html">Image → PDF</a>
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
      </div>
    </div>
  </div>

  <div class="menu-panel" id="panel-games" role="dialog" aria-modal="true" aria-labelledby="games-title">
    <div class="menu-head"><div class="menu-title" id="games-title">Mini Games</div><button class="menu-close" data-close aria-label="Close menu">×</button></div>
    <div class="drop-grid">
      <div class="dd-col"><h5>Brain</h5><a href="tic-tac-toe.html">Tic-Tac-Toe (Single Player)</a></div>
      <div class="dd-col"><h5>Arcade</h5><a href="flappy.html">Flappy</a></div>
      <div class="dd-col"><h5>Popular</h5><a href="tic-tac-toe.html">Play Tic-Tac-Toe</a><a href="flappy.html">Play Flappy</a></div>
      <div class="dd-col"><h5>Coming Soon</h5><a href="#">More mini games</a></div>
    </div>
  </div>`;

  const FOOTER = `
  <footer class="site-footer">
  <div class="footer-grid">
    <div>
      <div class="brand" style="font-family:var(--primary-font);color:#e6ecff;font-weight:700">ToolHouzz</div>
      <small>Fast, privacy-first utilities.</small>
    </div>
    <div>
      <h4>Calculators</h4>
      <a href="bmi.html">BMI Calculator</a>
      <a href="bmr.html">BMR Calculator</a>
      <a href="calorie-macros.html">Calorie &amp; Macros</a>
      <a href="age.html">Age Calculator</a>
      <a href="gpa.html">GPA Calculator</a>
      <a href="percentage-calculator.html">Percentage Calculator</a>
      <a href="unit-converter.html">Unit Converter</a>
      <a href="salary-calculator.html">Salary Calculator</a>
      <a href="retirement-calculator.html">Retirement Calculator</a>
      <a href="sales-tax-cad.html">Sales Tax (Canada)</a>
    </div>
    <div>
      <h4>PDF &amp; Converters</h4>
      <a href="image-to-pdf.html">Image → PDF</a>
      <a href="pdf-to-images.html">PDF → Images</a>
      <a href="merge-pdfs.html">Merge PDFs</a>
      <a href="pdf-split-reorder.html">Split &amp; Reorder PDF</a>
      <a href="compress-pdf.html">Compress PDF</a>
      <a href="file-converter.html">File Converter</a>
      <a href="png-to-svg.html">PNG → SVG</a>
      <a href="qr.html">QR Generator</a>
      <a href="genetic-barcode.html">Genetic Barcode</a>
      <a href="genetic-barcode-reader.html">Genetic Barcode Reader</a>
    </div>
    <div>
      <h4>Mini Games</h4>
      <a href="tic-tac-toe.html">Tic-Tac-Toe</a>
      <a href="flappy.html">Flappy</a>
      <h4 style="margin-top:1rem">ToolHouzz</h4>
      <a href="index.html">Home</a>
      <a href="blog.html">Blog</a>
      <a href="about.html">About</a>
      <a href="privacy.html">Privacy</a>
      <a href="terms.html">Terms</a>
      <a href="sitemap.xml">Sitemap</a>
    </div>
  </div>
  <p class="legal">© <span id="year"></span> ToolHouzz. All rights reserved.</p>
</footer>`;

  // Inject at top and bottom
  document.body.insertAdjacentHTML('afterbegin', HEADER + PANELS);
  document.body.insertAdjacentHTML('beforeend', FOOTER);

  // Year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Dropdown behavior
  const header = document.getElementById('siteHeader');
  const backdrop = document.getElementById('backdrop');
  const panels = {
    calc: document.getElementById('panel-calc'),
    conv: document.getElementById('panel-conv'),
    games: document.getElementById('panel-games')
  };
  let openKey = null, closeTimer = null;

  const placePanel = (p) => {
    if (!p || !header) return;
    const r = header.getBoundingClientRect();
    const gap = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--attach-gap')) || 8;
    p.style.top = `${r.bottom + gap}px`;
  };

  const showBackdrop = () => {
    backdrop.hidden = false;
    requestAnimationFrame(() => backdrop.classList.add('show'));
  };

  const hideBackdrop = () => {
    backdrop.classList.remove('show');
    setTimeout(() => { if (!openKey) backdrop.hidden = true; }, 160);
  };

  function openPanel(key, btn){
    if (openKey && openKey !== key){
      panels[openKey].classList.remove('show');
      const prev = document.querySelector(`.trigger[data-menu="${openKey}"]`);
      if (prev) prev.setAttribute('aria-expanded', 'false');
    }
    openKey = key;
    placePanel(panels[key]); showBackdrop();
    panels[key].classList.add('show');
    if (btn) btn.setAttribute('aria-expanded','true');
    panels[key].querySelector('[data-close]')?.focus({preventScroll:true});
  }

  function scheduleClose(){ clearTimeout(closeTimer); closeTimer = setTimeout(closePanel, 120); }
  function cancelClose(){ clearTimeout(closeTimer); }

  function closePanel(){
    if (!openKey){ hideBackdrop(); return; }
    panels[openKey].classList.remove('show');
    const btn = document.querySelector(`.trigger[data-menu="${openKey}"]`);
    if (btn) btn.setAttribute('aria-expanded','false');
    openKey = null; hideBackdrop();
  }

  window.addEventListener('resize', ()=>{ if (openKey) placePanel(panels[openKey]); });
  window.addEventListener('scroll', ()=>{ if (openKey) placePanel(panels[openKey]); });

  const isDesktopHover = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  document.querySelectorAll('.trigger').forEach(btn=>{
    const key = btn.dataset.menu;
    if (isDesktopHover){
      btn.addEventListener('mouseenter', ()=>openPanel(key,btn));
      btn.addEventListener('mouseleave', scheduleClose);
      panels[key].addEventListener('mouseenter', cancelClose);
      panels[key].addEventListener('mouseleave', scheduleClose);
    }
    btn.addEventListener('click', e=>{
      e.preventDefault();
      if (openKey === key){ closePanel(); return; }
      openPanel(key,btn);
    });
    btn.addEventListener('keydown', e=>{
      if (e.key==='Enter' || e.key===' '){
        e.preventDefault();
        if (openKey===key){ closePanel(); return; }
        openPanel(key,btn);
      }
    });
  });

  backdrop.addEventListener('click', closePanel);
  document.addEventListener('keydown', e=>{ if (e.key==='Escape') closePanel(); });
  document.querySelectorAll('[data-close]').forEach(x=>x.addEventListener('click', closePanel));
})();
