(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Animated isolines (marching squares over a drifting scalar field).
  const cv = document.querySelector('.hero__field');
  if (cv && cv.getContext) {
    const ctx = cv.getContext('2d');
    const S = 14;
    const LEVELS = 11;
    // Edges: 0 top, 1 right, 2 bottom, 3 left. Corner bits: TL 8, TR 4, BR 2, BL 1.
    const CASES = [null, [[3, 2]], [[2, 1]], [[3, 1]], [[0, 1]], [[3, 0], [2, 1]], [[0, 2]], [[3, 0]],
      [[3, 0]], [[0, 2]], [[0, 1], [3, 2]], [[0, 1]], [[3, 1]], [[2, 1]], [[3, 2]], null];
    const waves = Array.from({ length: 5 }, (_, k) => ({
      fx: (Math.random() * 2 - 1) * 0.012, fy: (Math.random() * 2 - 1) * 0.012,
      w: 0.05 + Math.random() * 0.08, p: Math.random() * 6.28, a: 1 / (k + 1.2)
    }));
    let w = 0, h = 0, cols = 0, rows = 0, f, visible = true, t = Math.random() * 100, last = 0;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / S) + 1; rows = Math.ceil(h / S) + 1;
      f = new Float32Array(cols * rows);
    };

    const field = () => {
      let min = Infinity, max = -Infinity;
      for (let j = 0; j < rows; j++) {
        const y = j * S;
        for (let i = 0; i < cols; i++) {
          const x = i * S;
          let v = 0;
          for (const q of waves) v += q.a * Math.sin(x * q.fx + y * q.fy + t * q.w + q.p) * Math.cos(y * q.fx - x * q.fy + q.p);
          f[j * cols + i] = v;
          if (v < min) min = v; if (v > max) max = v;
        }
      }
      return [min, max];
    };

    const draw = () => {
      const [min, max] = field();
      ctx.clearRect(0, 0, w, h);
      for (let l = 1; l < LEVELS; l++) {
        const lv = min + (max - min) * l / LEVELS;
        const major = l % 5 === 0;
        ctx.strokeStyle = major ? 'rgba(15,98,254,.38)' : 'rgba(15,98,254,.16)';
        ctx.lineWidth = major ? 1.1 : .8;
        ctx.beginPath();
        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const a = f[j * cols + i], b = f[j * cols + i + 1], c = f[(j + 1) * cols + i + 1], d = f[(j + 1) * cols + i];
            const segs = CASES[(a > lv) << 3 | (b > lv) << 2 | (c > lv) << 1 | (d > lv)];
            if (!segs) continue;
            const x = i * S, y = j * S;
            const pt = e => e === 0 ? [x + S * (lv - a) / (b - a), y]
              : e === 1 ? [x + S, y + S * (lv - b) / (c - b)]
              : e === 2 ? [x + S * (lv - d) / (c - d), y + S]
              : [x, y + S * (lv - a) / (d - a)];
            for (const [e1, e2] of segs) {
              const p1 = pt(e1), p2 = pt(e2);
              ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]);
            }
          }
        }
        ctx.stroke();
      }
    };

    const loop = now => {
      if (visible && now - last > 50) { t += 0.05; draw(); last = now; }
      requestAnimationFrame(loop);
    };

    resize(); draw();
    addEventListener('resize', () => { resize(); draw(); }, { passive: true });
    if (!reduce) {
      new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(cv);
      document.addEventListener('visibilitychange', () => { visible = !document.hidden; });
      requestAnimationFrame(loop);
    }
  }

  // Beijing-time readout.
  const clock = document.querySelector('.hero__clock');
  if (clock) {
    const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Shanghai', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const tick = () => { clock.textContent = 'UTC+8 ' + fmt.format(new Date()); };
    tick(); setInterval(tick, 1000);
  }

  // Mobile menu.
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });

  // Lightbox.
  const boxes = document.querySelectorAll('[data-lightbox]');
  if (boxes.length && window.HTMLDialogElement) {
    const dlg = document.createElement('dialog');
    dlg.className = 'lightbox';
    const img = document.createElement('img');
    dlg.append(img);
    document.body.append(dlg);
    dlg.addEventListener('click', () => dlg.close());
    boxes.forEach(a => a.addEventListener('click', e => {
      e.preventDefault();
      img.src = a.href;
      img.alt = a.querySelector('img')?.alt || '';
      dlg.showModal();
    }));
  }

  // Publication filter.
  const seg = document.querySelector('.seg');
  seg?.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    seg.querySelectorAll('button').forEach(x => x.classList.toggle('is-on', x === b));
    const lead = b.dataset.filter === 'lead';
    document.querySelectorAll('.pubyear').forEach(y => {
      let any = false;
      y.querySelectorAll('.pub').forEach(p => {
        const show = !lead || p.dataset.lead === 'true';
        p.hidden = !show; any ||= show;
      });
      y.hidden = !any;
    });
  });
})();

document.querySelectorAll('.more-btn').forEach(b => b.addEventListener('click', () => {
  const list = document.querySelector(b.dataset.target);
  const collapsed = list.dataset.collapsed === 'true';
  list.dataset.collapsed = String(!collapsed);
  b.textContent = collapsed ? b.dataset.less : b.dataset.more;
}));
