(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Topographic halo: marching-squares isolines over a drifting scalar field.
  const CASES = [null, [[3, 2]], [[2, 1]], [[3, 1]], [[0, 1]], [[3, 0], [2, 1]], [[0, 2]], [[3, 0]],
    [[3, 0]], [[0, 2]], [[0, 1], [3, 2]], [[0, 1]], [[3, 1]], [[2, 1]], [[3, 2]], null];
  const topo = cv => {
    const ctx = cv.getContext('2d');
    const S = 6, L = 9;
    const seed = [...Array(4)].map((_, k) => ({ f: .02 + Math.random() * .03, a: Math.random() * 6.28, p: Math.random() * 6.28, w: .2 + Math.random() * .3, k: 1 / (k + 1) }));
    let w, h, cols, rows, f;
    const t = 7;
    const size = () => {
      const r = Math.min(devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      if (!w) return false;
      cv.width = w * r; cv.height = h * r; ctx.setTransform(r, 0, 0, r, 0, 0);
      cols = Math.ceil(w / S) + 1; rows = Math.ceil(h / S) + 1; f = new Float32Array(cols * rows);
      return true;
    };
    const draw = () => {
      const cx = w / 2, cy = h / 2;
      let lo = Infinity, hi = -Infinity;
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const x = i * S - cx, y = j * S - cy, rr = Math.hypot(x, y);
        let v = rr * .045;
        for (const q of seed) v += q.k * Math.sin((x * Math.cos(q.a) + y * Math.sin(q.a)) * q.f + t * q.w + q.p);
        f[j * cols + i] = v; if (v < lo) lo = v; if (v > hi) hi = v;
      }
      ctx.clearRect(0, 0, w, h);
      for (let l = 1; l < L * 2; l++) {
        const lv = lo + (hi - lo) * l / (L * 2);
        ctx.strokeStyle = l % 4 === 0 ? 'rgba(35,72,216,.55)' : 'rgba(35,72,216,.22)';
        ctx.lineWidth = l % 4 === 0 ? 1 : .7;
        ctx.beginPath();
        for (let j = 0; j < rows - 1; j++) for (let i = 0; i < cols - 1; i++) {
          const a = f[j * cols + i], b = f[j * cols + i + 1], c = f[(j + 1) * cols + i + 1], d = f[(j + 1) * cols + i];
          const segs = CASES[(a > lv) << 3 | (b > lv) << 2 | (c > lv) << 1 | (d > lv)];
          if (!segs) continue;
          const x = i * S, y = j * S;
          const pt = e => e === 0 ? [x + S * (lv - a) / (b - a), y] : e === 1 ? [x + S, y + S * (lv - b) / (c - b)]
            : e === 2 ? [x + S * (lv - d) / (c - d), y + S] : [x, y + S * (lv - a) / (d - a)];
          for (const [e1, e2] of segs) { const p = pt(e1), q = pt(e2); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); }
        }
        ctx.stroke();
      }
    };
    const init = () => { if (size()) draw(); };
    init();
    addEventListener('resize', init, { passive: true });
  };
  document.querySelectorAll('.topo').forEach(topo);

  // Count-up figures.
  const nums = document.querySelectorAll('[data-count]');
  if (nums.length && !reduce && 'IntersectionObserver' in window) {
    const run = el => {
      const end = +el.dataset.count, t0 = performance.now(), dur = 1100;
      const step = now => {
        const k = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(end * e);
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }), { threshold: .6 });
    nums.forEach(el => io.observe(el));
  }

  // Mobile bar: reveal name once the intro identity scrolls away.
  const bar = document.querySelector('.mbar');
  const anchor = document.querySelector('.intro__id') || document.querySelector('.phead');
  if (bar) {
    if (anchor) new IntersectionObserver(([e]) => bar.classList.toggle('is-stuck', !e.isIntersecting), { rootMargin: '-52px 0px 0px 0px' }).observe(anchor);
    else bar.classList.add('is-stuck');
  }

  // Collapsible updates.
  document.querySelectorAll('.more').forEach(b => b.addEventListener('click', () => {
    const list = document.querySelector(b.dataset.target);
    const open = list.dataset.collapsed === 'true';
    list.dataset.collapsed = String(!open);
    b.textContent = open ? b.dataset.less : b.dataset.more;
  }));

  // Lightbox.
  const boxes = document.querySelectorAll('[data-lightbox]');
  if (boxes.length && window.HTMLDialogElement) {
    const dlg = document.createElement('dialog');
    dlg.className = 'lightbox';
    const img = document.createElement('img');
    dlg.append(img); document.body.append(dlg);
    dlg.addEventListener('click', () => dlg.close());
    boxes.forEach(a => a.addEventListener('click', e => {
      e.preventDefault(); img.src = a.href; img.alt = a.querySelector('img')?.alt || ''; dlg.showModal();
    }));
  }

  // Publication filter + search.
  const seg = document.querySelector('.seg');
  const q = document.querySelector('.search input');
  const empty = document.querySelector('.empty');
  if (seg || q) {
    let mode = 'all';
    const apply = () => {
      const term = (q?.value || '').trim().toLowerCase();
      let total = 0;
      document.querySelectorAll('.pubyear').forEach(y => {
        let any = false;
        y.querySelectorAll('.pub').forEach(p => {
          const show = (mode === 'all' || p.dataset.lead === 'true') && (!term || p.dataset.q.includes(term));
          p.hidden = !show; any ||= show; total += show;
        });
        y.hidden = !any;
      });
      if (empty) empty.hidden = total > 0;
    };
    seg?.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      seg.querySelectorAll('button').forEach(x => x.classList.toggle('is-on', x === b));
      mode = b.dataset.filter; apply();
    });
    q?.addEventListener('input', apply);
  }

  // Copy buttons on code blocks.
  const L10N = document.documentElement.lang.startsWith('zh') ? ['复制', '已复制'] : ['Copy', 'Copied'];
  document.querySelectorAll('.highlight').forEach(h => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'copy'; b.textContent = L10N[0];
    b.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(h.querySelector('pre').innerText); b.textContent = L10N[1]; b.classList.add('is-done'); }
      catch { return; }
      setTimeout(() => { b.textContent = L10N[0]; b.classList.remove('is-done'); }, 1600);
    });
    h.append(b);
  });

  // Beijing time for any .clock element.
  document.querySelectorAll('.clock').forEach(el => {
    const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Shanghai', hour: '2-digit', minute: '2-digit', hour12: false });
    const tick = () => { el.textContent = fmt.format(new Date()) + ' UTC+8'; };
    tick(); setInterval(tick, 30000);
  });
})();
