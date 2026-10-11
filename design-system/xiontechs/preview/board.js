const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Count-up for stat tiles (once, when visible) */
document.querySelectorAll('[data-count]').forEach((el) => {
  const to = +el.dataset.count;
  if (reduce) return;
  const io = new IntersectionObserver(
    ([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let t0;
      const step = (now) => {
        t0 ??= now;
        const p = Math.min((now - t0) / 1200, 1);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      el.textContent = '0';
      requestAnimationFrame(step);
    },
    { threshold: 0.4 },
  );
  io.observe(el);
});

/* Project visualization tabs */
document.querySelectorAll('[data-pv-tabs]').forEach((list) => {
  const tabs = [...list.querySelectorAll('[data-pv]')];
  const panels = [...document.querySelectorAll('.pv-panel')];
  const show = (i) => {
    tabs.forEach((t, k) => {
      t.setAttribute('aria-selected', k === i);
      t.tabIndex = k === i ? 0 : -1;
    });
    panels.forEach((p, k) => (p.hidden = k !== i));
  };
  tabs.forEach((t, i) => t.addEventListener('click', () => show(i)));
  list.addEventListener('keydown', (e) => {
    const i = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    const n = (i + d + tabs.length) % tabs.length;
    show(n);
    tabs[n].focus();
  });
});

/* 4-D Process — ported from xiontech-landingpage/variants.html, recolored for the white theme */
document.querySelectorAll('[data-fourd]').forEach((sec) => {
  const HOLD = 4200,
    MORPH = 1300,
    N = innerWidth < 700 ? 360 : 720;
  const names = ['Discovery', 'Design', 'Development', 'Deployment'];
  const stops = [...sec.querySelectorAll('.stop')];
  const toggle = sec.querySelector('[data-play]');
  const cv = sec.querySelector('.fd-canvas'),
    ctx = cv.getContext('2d');
  const INK = '138, 148, 166'; // ink-400
  const BLUE = '#295896'; // blue-600
  let stage = -1,
    t = 0,
    last = 0,
    playing = !reduce,
    visible = false;
  const Q = N / 4;
  let seed = 11;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const lag = Array.from({ length: N }, rnd);
  const clumps = Array.from({ length: 3 }, () => [0.15 + rnd() * 0.7, 0.2 + rnd() * 0.6]);
  const kind = Array.from({ length: N }, () => {
    const v = rnd();
    return v < 0.5 ? 'u' : v < 0.72 ? 'c' : v < 0.82 ? 's' : v < 0.88 ? 'o' : 'd';
  });
  const raw = Array.from({ length: N }, () => [rnd(), rnd(), rnd()]);
  const shape = Array.from({ length: N }, () => {
    const v = rnd();
    return v < 0.76 ? 0 : v < 0.88 ? 1 : 3;
  });
  const r0 = Array.from({ length: N }, () => 1.1 + rnd() * 2.4);
  const a0 = Array.from({ length: N }, () => 0.25 + rnd() * 0.5);
  const nv = Array.from({ length: N }, () => {
    const a = rnd() * 6.2832,
      d = 0.3 + rnd() * 0.7;
    return [Math.cos(a) * d, Math.sin(a) * d];
  });
  const ICONS = [
    (g) => {
      g.beginPath();
      g.roundRect(-38, -70, 76, 140, 14);
      g.stroke();
      g.beginPath();
      g.moveTo(-14, 52);
      g.lineTo(14, 52);
      g.stroke();
      g.beginPath();
      g.roundRect(-22, -46, 44, 30, 6);
      g.stroke();
      g.beginPath();
      g.moveTo(-22, 2);
      g.lineTo(22, 2);
      g.moveTo(-22, 22);
      g.lineTo(10, 22);
      g.stroke();
    },
    (g) => {
      g.beginPath();
      g.roundRect(-52, -38, 104, 84, 18);
      g.stroke();
      g.beginPath();
      g.arc(-20, 0, 9, 0, 7);
      g.arc(20, 0, 9, 0, 7);
      g.fill();
      g.beginPath();
      g.moveTo(0, -38);
      g.lineTo(0, -62);
      g.stroke();
      g.beginPath();
      g.arc(0, -68, 7, 0, 7);
      g.fill();
      g.beginPath();
      g.moveTo(-18, 26);
      g.lineTo(18, 26);
      g.moveTo(-52, 0);
      g.lineTo(-66, 0);
      g.moveTo(52, 0);
      g.lineTo(66, 0);
      g.stroke();
    },
    (g) => {
      g.beginPath();
      g.arc(0, 50, 10, 0, 7);
      g.fill();
      [34, 64, 94].forEach((rad) => {
        g.beginPath();
        g.arc(0, 50, rad, -Math.PI * 0.8, -Math.PI * 0.2);
        g.stroke();
      });
      g.beginPath();
      g.roundRect(-24, 66, 48, 12, 4);
      g.stroke();
    },
    (g) => {
      g.beginPath();
      g.arc(0, 0, 22, 0, 7);
      g.stroke();
      [
        [-62, -48],
        [62, -48],
        [-62, 48],
        [62, 48],
      ].forEach(([x, y]) => {
        g.beginPath();
        g.moveTo(x * 0.3, y * 0.3);
        g.lineTo(x * 0.8, y * 0.8);
        g.stroke();
        g.beginPath();
        g.arc(x, y, 13, 0, 7);
        g.stroke();
      });
    },
  ];
  function glyphs(w, h) {
    const off = document.createElement('canvas');
    off.width = w;
    off.height = h;
    const g = off.getContext('2d', { willReadFrequently: true });
    g.strokeStyle = g.fillStyle = '#000';
    g.lineWidth = 7;
    g.lineCap = g.lineJoin = 'round';
    const size = Math.min((w / 4) * 0.62, h * 0.72),
      out = [];
    ICONS.forEach((drawIcon, k) => {
      g.clearRect(0, 0, w, h);
      g.save();
      g.translate(((k + 0.5) / 4) * w, h * 0.5);
      g.scale(size / 160, size / 160);
      drawIcon(g);
      g.restore();
      const px = g.getImageData(0, 0, w, h).data,
        pts = [];
      for (let y = 0; y < h; y += 2) for (let x = 0; x < w; x += 2) if (px[(y * w + x) * 4 + 3] > 128) pts.push([x, y]);
      for (let i = pts.length - 1; i > 0; i--) {
        const j = Math.floor(lag[(i + k) % N] * (i + 1)) % (i + 1);
        [pts[i], pts[j]] = [pts[j], pts[i]];
      }
      for (let i = 0; i < Q; i++) out.push(pts[Math.floor((i * pts.length) / Q)] || [((k + 0.5) / 4) * w, h / 2]);
    });
    return out;
  }
  let S = [],
    G = [],
    pos = [],
    rad = [],
    from = [],
    fromR = [],
    m = 1,
    W = 0,
    H = 0,
    trainP = 0,
    prev = -1;
  function layout() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth;
    H = cv.clientHeight;
    if (!W || !H) return;
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    G = glyphs(W, H);
    const cols = 12,
      bw = Math.min((W / 4) * 0.5, H * 0.6),
      cell = bw / cols;
    S = [
      (() => {
        const out = [];
        raw.forEach(([a, b, c], i) => {
          const kd = kind[i];
          if (kd === 'c') {
            const [cx, cy] = clumps[i % 3],
              ang = a * 6.2832,
              d = Math.pow(b, 2) * 0.12;
            out.push([(cx + Math.cos(ang) * d) * W, (cy + Math.sin(ang) * d * 1.6) * H]);
          } else if (kd === 's') {
            const row = Math.floor(c * 6);
            out.push([(0.1 + ((row * 0.13) % 0.6) + a * 0.22) * W, (0.15 + row * 0.13) * H]);
          } else if (kd === 'o') out.push([(a < 0.5 ? 0.01 + a * 0.06 : 0.93 + a * 0.06) * W, (0.03 + b * 0.94) * H]);
          else if (kd === 'd' && i > 0) {
            const [px, py] = out[i - 1];
            out.push([px + (a - 0.5) * 4, py + (b - 0.5) * 4]);
          } else out.push([(0.04 + a * 0.92) * W, (0.08 + Math.pow(b, 1.3) * 0.86) * H]);
        });
        return out;
      })(),
      raw.map((_, i) => {
        const k = Math.floor(i / Q),
          j = i % Q;
        return [
          ((k + 0.5) / 4) * W - bw / 2 + ((j % cols) + 0.5) * cell,
          H * 0.5 - ((Q / cols) * cell) / 2 + (Math.floor(j / cols) + 0.5) * cell,
        ];
      }),
    ];
    pos = target(Math.max(stage, 0)).map((p) => [...p]);
    from = pos.map((p) => [...p]);
    rad = Array.from({ length: N }, (_, i) => radius(Math.max(stage, 0), i));
    fromR = [...rad];
    m = 1;
    draw(0);
  }
  function target(st) {
    if (st < 2) return S[st];
    const amp = st === 3 ? 0 : Math.min(W / 4, H) * 0.32 * Math.pow(1 - trainP, 1.6) + 2;
    return G.map(([x, y], i) => [x + nv[i][0] * amp, y + nv[i][1] * amp]);
  }
  const radius = (st, i) => (st === 0 ? r0[i] : st === 3 ? 2.4 : 1.9);
  const ease = (x) => x * x * (3 - 2 * x);
  function loss() {
    if (stage !== 2) return;
    const bw = W < 600 ? 96 : 150,
      bh = W < 600 ? 40 : 56,
      x0 = W - bw - 16,
      y0 = 14;
    ctx.strokeStyle = '#E3E8EF';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x0, y0 + bh);
    ctx.lineTo(x0 + bw, y0 + bh);
    ctx.stroke();
    ctx.strokeStyle = BLUE;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    for (let s = 0; s <= 60 * trainP; s++) {
      const u = s / 60,
        l = 0.06 + 0.86 * Math.exp(-4.5 * u) + 0.05 * Math.sin(u * 47) * (1 - u);
      const px = x0 + u * bw,
        py = y0 + (1 - l) * bh;
      s ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
    }
    ctx.stroke();
    ctx.fillStyle = '#5B6676';
    ctx.font = '600 12px Inter, sans-serif';
    ctx.fillText('loss', x0, y0 + bh + 16);
  }
  function draw(now) {
    if (!S.length) return;
    ctx.clearRect(0, 0, W, H);
    const st = Math.max(stage, 0),
      to = target(st),
      blue = st === 3 ? ease(m) : 0;
    const jit = now && !reduce ? (st === 3 ? 0.6 : 1) : 0;
    const fit = st === 3 ? ease(Math.max(0, Math.min(1, (m - 0.45) / 0.55))) : 0;
    const fills = [new Path2D(), new Path2D(), new Path2D(), new Path2D(), new Path2D()];
    const strokes = [new Path2D(), new Path2D(), new Path2D(), new Path2D(), new Path2D()];
    for (let i = 0; i < N; i++) {
      const k = ease(Math.max(0, Math.min(1, m * 1.6 - lag[i] * 0.6)));
      let x = from[i][0] + (to[i][0] - from[i][0]) * k,
        y = from[i][1] + (to[i][1] - from[i][1]) * k;
      const r = fromR[i] + (radius(st, i) - fromR[i]) * k;
      pos[i][0] = x;
      pos[i][1] = y;
      rad[i] = r;
      if (jit) {
        x += Math.sin(now / 900 + i) * jit;
        y += Math.cos(now / 1100 + i * 1.3) * jit;
      }
      const rawness = st === 0 ? k : prev === 0 ? 1 - k : 0;
      const a = st === 0 ? a0[i] : 0.6;
      const b = blue * (0.35 + 0.65 * lag[i]) > 0.3 ? 4 : Math.max(0, Math.min(3, Math.floor((a - 0.25) / 0.13)));
      const sh = rawness > 0.5 ? shape[i] : 0,
        s2 = r + 0.5;
      if (sh === 0) {
        fills[b].moveTo(x + r, y);
        fills[b].arc(x, y, r, 0, 6.2832);
      } else if (sh === 1) {
        strokes[b].moveTo(x - s2, y - s2);
        strokes[b].lineTo(x + s2, y + s2);
        strokes[b].moveTo(x + s2, y - s2);
        strokes[b].lineTo(x - s2, y + s2);
      } else {
        strokes[b].moveTo(x + s2, y);
        strokes[b].arc(x, y, s2, 0, 6.2832);
      }
    }
    const tones = [
      `rgba(${INK}, .35)`,
      `rgba(${INK}, .5)`,
      `rgba(${INK}, .65)`,
      `rgba(${INK}, .8)`,
      `rgba(41, 88, 150, ${1 - fit * 0.75})`,
    ];
    ctx.lineWidth = 1.1;
    tones.forEach((c, b) => {
      ctx.fillStyle = ctx.strokeStyle = c;
      ctx.fill(fills[b]);
      ctx.stroke(strokes[b]);
    });
    if (fit > 0) {
      const size = Math.min((W / 4) * 0.62, H * 0.72);
      ICONS.forEach((drawIcon, k) => {
        ctx.save();
        ctx.globalAlpha = fit;
        ctx.translate(((k + 0.5) / 4) * W, H * 0.5);
        ctx.scale(size / 160, size / 160);
        ctx.strokeStyle = ctx.fillStyle = BLUE;
        ctx.lineWidth = 7;
        ctx.lineCap = ctx.lineJoin = 'round';
        drawIcon(ctx);
        ctx.restore();
      });
    }
    loss();
  }
  function go(k) {
    if (k === stage) return;
    prev = stage;
    stage = k;
    if (k === 2) trainP = reduce ? 1 : 0;
    from = pos.map((p) => [...p]);
    fromR = [...rad];
    m = reduce ? 1 : 0;
    sec.dataset.stage = k;
    stops.forEach((li, i) => {
      li.classList.toggle('reached', i <= k);
      li.classList.toggle('now', i === k);
      const b = li.querySelector('button');
      i === k ? b.setAttribute('aria-current', 'step') : b.removeAttribute('aria-current');
    });
    sec.querySelector('[data-live]').textContent = names[k];
    draw(0);
  }
  function line(p) {
    sec.style.setProperty('--f', stage === 3 ? 1 : (stage + p) / 3);
  }
  function sync() {
    toggle.textContent = playing ? 'Pause' : 'Play';
  }
  function frame(now) {
    const dt = last ? Math.min(now - last, 100) : 0;
    last = now;
    if (visible && !document.hidden) {
      if (playing) {
        t = (t + dt) % (HOLD * 4);
        go(Math.floor(t / HOLD));
      }
      line((t % HOLD) / HOLD);
      if (m < 1) m = Math.min(1, m + dt / MORPH);
      if (stage === 2 && trainP < 1) trainP = Math.min(1, trainP + dt / HOLD);
      draw(now);
    }
    requestAnimationFrame(frame);
  }
  stops.forEach((li, k) =>
    li.querySelector('button').addEventListener('click', () => {
      playing = false;
      t = k * HOLD;
      go(k);
      line(0);
      sync();
    }),
  );
  toggle.addEventListener('click', () => {
    playing = !playing;
    sync();
  });
  new IntersectionObserver(
    ([e]) => {
      visible = e.isIntersecting;
    },
    { threshold: 0.25 },
  ).observe(sec);
  new ResizeObserver(layout).observe(cv);
  t = 0;
  go(0);
  line(0);
  sync();
  if (reduce) {
    new ResizeObserver(() => draw(0)).observe(cv);
    return;
  }
  requestAnimationFrame(frame);
});
