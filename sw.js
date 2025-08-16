self.addEventListener('install', event => {
  const ASSETS = ["offline.html", "styles.min.fb3c4a7d.css", "th-layout.min.3ff5e211.css", "th-layout.min.c8590f5c.js", "app.min.bdafbc22.js"];
  event.waitUntil(caches.open('toolhouzz-v1').then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== 'toolhouzz-v1').map(k => caches.delete(k))))
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);
  // Navigation requests: try network, fall back to offline.html
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).catch(() => caches.match('offline.html')));
    return;
  }
  // For CSS/JS assets, use cache-first
  if (url.pathname.match(/\.min\.[0-9a-f]{8}\.(css|js)$/)) {
    event.respondWith(
      caches.match(req).then(res => res || fetch(req).then(r => { 
        const copy = r.clone();
        caches.open('toolhouzz-v1').then(c => c.put(req, copy));
        return r;
      }))
    );
    return;
  }
  // Default: network first with cache fallback
  event.respondWith(
    fetch(req).then(r => {
      const copy = r.clone();
      caches.open('toolhouzz-v1').then(c => c.put(req, copy));
      return r;
    }).catch(() => caches.match(req))
  );
});
