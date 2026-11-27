// te.threal service worker: makes the site installable and opens the last loaded version when offline.
// Pages and scripts are always fetched fresh first (network-first), so updates uploaded to GitHub show up right away.
const CACHE = 'tethreal-v4';
const SHELL = ['/', '/index.html', '/app.js', '/config.js', '/manifest.webmanifest', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL).catch(() => {})).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
const CDN = /^https:\/\/(cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)\//;
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Library & font dari CDN: pakai salinan tersimpan dulu (cepat), lalu perbarui di belakang
  if (CDN.test(req.url)) {
    e.respondWith(caches.open(CACHE).then(async (c) => {
      const hit = await c.match(req);
      const net = fetch(req).then((res) => { if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (url.origin !== self.location.origin) return; // Supabase, Google, Canva langsung ke internet
  // Halaman & script sendiri: ambil versi terbaru, tapi kalau internet lambat (>3 detik) pakai salinan tersimpan dulu
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    const net = fetch(req).then((res) => { if (res && res.ok && res.type === 'basic') c.put(req, res.clone()); return res; });
    const hit = await c.match(req, { ignoreSearch: true }) || (req.mode === 'navigate' ? await c.match('/index.html') : undefined);
    if (!hit) return net.catch(() => Response.error());
    const slow = new Promise((r) => setTimeout(() => r(hit), 3000));
    return Promise.race([net.catch(() => hit), slow]);
  })());
});
// Notifikasi push dari te.threal
self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = { title: 'te.threal', body: e.data ? e.data.text() : '' }; }
  e.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    // Kalau te.threal sedang dibuka dan terlihat, lonceng di dalam web sudah menampilkannya.
    if (wins.some((c) => c.visibilityState === 'visible' && c.focused)) return;
    await self.registration.showNotification(d.title || 'te.threal', {
      body: d.body || '', icon: '/icon-192.png', badge: '/icon-192.png', tag: d.tag || undefined, renotify: !!d.tag, silent: false,
      vibrate: [120, 60, 120], timestamp: Date.now(),
      data: { url: d.url || '/#dashboard' },
    });
  })());
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || '/#dashboard';
  e.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const same = wins.find((c) => new URL(c.url).origin === self.location.origin);
    if (same) { await same.focus(); same.postMessage({ type: 'open', url }); return; }
    await self.clients.openWindow(url);
  })());
});
