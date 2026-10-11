/*
 * 4-D Process canvas (MASTER §6.1), ported from the preview board (design-system/xiontechs/preview/board.js).
 * A dot field moves through four states: raw noise → tidy columns → training toward 4 icons → fitted icons.
 * Colors come from the theme tokens; labels and step text live in the DOM, the canvas is decorative.
 */

type Point = [number, number];
type Draw = (g: CanvasRenderingContext2D) => void;

const HOLD = 4200;
const MORPH = 1300;

// Icon outlines drawn on a 160px box: app, AI robot, IoT signal, smart platform.
const ICONS: Draw[] = [
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
    for (const rad of [34, 64, 94]) {
      g.beginPath();
      g.arc(0, 50, rad, -Math.PI * 0.8, -Math.PI * 0.2);
      g.stroke();
    }
    g.beginPath();
    g.roundRect(-24, 66, 48, 12, 4);
    g.stroke();
  },
  (g) => {
    g.beginPath();
    g.arc(0, 0, 22, 0, 7);
    g.stroke();
    for (const [x, y] of [
      [-62, -48],
      [62, -48],
      [-62, 48],
      [62, 48],
    ]) {
      g.beginPath();
      g.moveTo(x * 0.3, y * 0.3);
      g.lineTo(x * 0.8, y * 0.8);
      g.stroke();
      g.beginPath();
      g.arc(x, y, 13, 0, 7);
      g.stroke();
    }
  },
];

const ease = (x: number) => x * x * (3 - 2 * x);
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

/** `#295896` -> `41, 88, 150` */
const rgb = (hex: string) => {
  const n = parseInt(hex.trim().slice(1), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
};

export function initFourD(sec: HTMLElement) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cv = sec.querySelector<HTMLCanvasElement>('[data-canvas]')!;
  const ctx = cv.getContext('2d');
  if (!ctx) return;
  const stops = [...sec.querySelectorAll<HTMLButtonElement>('[data-stop]')];
  const names = stops.map((b) => b.querySelector('[data-name]')?.textContent ?? '');
  const descs = stops.map((b) => b.closest('li')?.querySelector('[data-desc]')?.textContent ?? '');
  const toggle = sec.querySelector<HTMLButtonElement>('[data-toggle]')!;
  const live = sec.querySelector<HTMLElement>('[data-live]')!;
  const current = sec.querySelector<HTMLElement>('[data-current]')!;
  const lossLabel = sec.dataset.loss ?? '';

  const css = getComputedStyle(document.documentElement);
  const token = (name: string) => css.getPropertyValue(name);
  const INK = rgb(token('--color-ink-400'));
  const BLUE = token('--color-blue-600');
  const BLUE_RGB = rgb(BLUE);
  const LINE = token('--color-line');
  const MUTED = token('--color-ink-500');
  const FONT = getComputedStyle(document.body).fontFamily;

  const N = innerWidth < 700 ? 360 : 720;
  const Q = N / 4;
  let seed = 11;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const lag = Array.from({ length: N }, rnd);
  const clumps = Array.from({ length: 3 }, (): Point => [0.15 + rnd() * 0.7, 0.2 + rnd() * 0.6]);
  const kind = Array.from({ length: N }, () => {
    const v = rnd();
    return v < 0.5 ? 'u' : v < 0.72 ? 'c' : v < 0.82 ? 's' : v < 0.88 ? 'o' : 'd';
  });
  const raw = Array.from({ length: N }, () => [rnd(), rnd(), rnd()] as const);
  const shape = Array.from({ length: N }, () => {
    const v = rnd();
    return v < 0.76 ? 0 : v < 0.88 ? 1 : 3;
  });
  const r0 = Array.from({ length: N }, () => 1.1 + rnd() * 2.4);
  const a0 = Array.from({ length: N }, () => 0.25 + rnd() * 0.5);
  const nv = Array.from({ length: N }, (): Point => {
    const a = rnd() * 6.2832;
    const d = 0.3 + rnd() * 0.7;
    return [Math.cos(a) * d, Math.sin(a) * d];
  });

  let stage = -1;
  let prev = -1;
  let t = 0;
  let last = 0;
  let playing = !reduce;
  let visible = false;
  let S: Point[][] = [];
  let G: Point[] = [];
  let pos: Point[] = [];
  let rad: number[] = [];
  let from: Point[] = [];
  let fromR: number[] = [];
  let m = 1;
  let W = 0;
  let H = 0;
  let trainP = 0;

  // Sample each icon's pixels into Q target points.
  function glyphs(w: number, h: number): Point[] {
    const off = document.createElement('canvas');
    off.width = w;
    off.height = h;
    const g = off.getContext('2d', { willReadFrequently: true })!;
    g.strokeStyle = g.fillStyle = '#000';
    g.lineWidth = 7;
    g.lineCap = g.lineJoin = 'round';
    const size = Math.min((w / 4) * 0.62, h * 0.72);
    const out: Point[] = [];
    ICONS.forEach((drawIcon, k) => {
      g.clearRect(0, 0, w, h);
      g.save();
      g.translate(((k + 0.5) / 4) * w, h * 0.5);
      g.scale(size / 160, size / 160);
      drawIcon(g);
      g.restore();
      const px = g.getImageData(0, 0, w, h).data;
      const pts: Point[] = [];
      for (let y = 0; y < h; y += 2) for (let x = 0; x < w; x += 2) if (px[(y * w + x) * 4 + 3] > 128) pts.push([x, y]);
      for (let i = pts.length - 1; i > 0; i--) {
        const j = Math.floor(lag[(i + k) % N] * (i + 1)) % (i + 1);
        [pts[i], pts[j]] = [pts[j], pts[i]];
      }
      for (let i = 0; i < Q; i++) out.push(pts[Math.floor((i * pts.length) / Q)] ?? [((k + 0.5) / 4) * w, h / 2]);
    });
    return out;
  }

  function scatter(): Point[] {
    const out: Point[] = [];
    raw.forEach(([a, b, c], i) => {
      const kd = kind[i];
      if (kd === 'c') {
        const [cx, cy] = clumps[i % 3];
        const ang = a * 6.2832;
        const d = Math.pow(b, 2) * 0.12;
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
  }

  function columns(): Point[] {
    const cols = 12;
    const bw = Math.min((W / 4) * 0.5, H * 0.6);
    const cell = bw / cols;
    return raw.map((_, i): Point => {
      const k = Math.floor(i / Q);
      const j = i % Q;
      return [
        ((k + 0.5) / 4) * W - bw / 2 + ((j % cols) + 0.5) * cell,
        H * 0.5 - ((Q / cols) * cell) / 2 + (Math.floor(j / cols) + 0.5) * cell,
      ];
    });
  }

  function layout() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth;
    H = cv.clientHeight;
    if (!W || !H) return;
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    G = glyphs(W, H);
    S = [scatter(), columns()];
    pos = target(Math.max(stage, 0)).map((p): Point => [p[0], p[1]]);
    from = pos.map((p): Point => [p[0], p[1]]);
    rad = Array.from({ length: N }, (_, i) => radius(Math.max(stage, 0), i));
    fromR = [...rad];
    m = 1;
    draw(0);
  }

  function target(st: number): Point[] {
    if (st < 2) return S[st];
    const amp = st === 3 ? 0 : Math.min(W / 4, H) * 0.32 * Math.pow(1 - trainP, 1.6) + 2;
    return G.map(([x, y], i): Point => [x + nv[i][0] * amp, y + nv[i][1] * amp]);
  }

  const radius = (st: number, i: number) => (st === 0 ? r0[i] : st === 3 ? 2.4 : 1.9);

  // Small loss curve in the top end corner during Development.
  function loss() {
    if (stage !== 2) return;
    const bw = W < 600 ? 96 : 150;
    const bh = W < 600 ? 40 : 56;
    const x0 = W - bw - 16;
    const y0 = 14;
    const g = ctx!;
    g.strokeStyle = LINE;
    g.lineWidth = 1;
    g.beginPath();
    g.moveTo(x0, y0);
    g.lineTo(x0, y0 + bh);
    g.lineTo(x0 + bw, y0 + bh);
    g.stroke();
    g.strokeStyle = BLUE;
    g.lineWidth = 1.8;
    g.beginPath();
    for (let s = 0; s <= 60 * trainP; s++) {
      const u = s / 60;
      const l = 0.06 + 0.86 * Math.exp(-4.5 * u) + 0.05 * Math.sin(u * 47) * (1 - u);
      const px = x0 + u * bw;
      const py = y0 + (1 - l) * bh;
      if (s) g.lineTo(px, py);
      else g.moveTo(px, py);
    }
    g.stroke();
    g.fillStyle = MUTED;
    g.font = `600 12px ${FONT}`;
    g.fillText(lossLabel, x0, y0 + bh + 16);
  }

  function draw(now: number) {
    if (!S.length) return;
    const g = ctx!;
    g.clearRect(0, 0, W, H);
    const st = Math.max(stage, 0);
    const to = target(st);
    const blue = st === 3 ? ease(m) : 0;
    const jit = now && !reduce ? (st === 3 ? 0.6 : 1) : 0;
    const fit = st === 3 ? ease(clamp01((m - 0.45) / 0.55)) : 0;
    // Batch points into 5 tones (4 grays + blue) so each frame is ~10 path draws.
    const fills = Array.from({ length: 5 }, () => new Path2D());
    const strokes = Array.from({ length: 5 }, () => new Path2D());
    for (let i = 0; i < N; i++) {
      const k = ease(clamp01(m * 1.6 - lag[i] * 0.6));
      let x = from[i][0] + (to[i][0] - from[i][0]) * k;
      let y = from[i][1] + (to[i][1] - from[i][1]) * k;
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
      const sh = rawness > 0.5 ? shape[i] : 0;
      const s2 = r + 0.5;
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
      `rgba(${BLUE_RGB}, ${1 - fit * 0.75})`,
    ];
    g.lineWidth = 1.1;
    tones.forEach((c, b) => {
      g.fillStyle = g.strokeStyle = c;
      g.fill(fills[b]);
      g.stroke(strokes[b]);
    });
    if (fit > 0) {
      const size = Math.min((W / 4) * 0.62, H * 0.72);
      ICONS.forEach((drawIcon, k) => {
        g.save();
        g.globalAlpha = fit;
        g.translate(((k + 0.5) / 4) * W, H * 0.5);
        g.scale(size / 160, size / 160);
        g.strokeStyle = g.fillStyle = BLUE;
        g.lineWidth = 7;
        g.lineCap = g.lineJoin = 'round';
        drawIcon(g);
        g.restore();
      });
    }
    loss();
  }

  function go(k: number) {
    if (k === stage) return;
    prev = stage;
    stage = k;
    if (k === 2) trainP = reduce ? 1 : 0;
    from = pos.map((p): Point => [p[0], p[1]]);
    fromR = [...rad];
    m = reduce ? 1 : 0;
    sec.dataset.stage = String(k);
    stops.forEach((b, i) => {
      b.closest('li')!.dataset.state = i === k ? 'now' : i < k ? 'reached' : 'next';
      if (i === k) b.setAttribute('aria-current', 'step');
      else b.removeAttribute('aria-current');
    });
    live.textContent = names[k];
    current.textContent = descs[k];
    draw(0);
  }

  const line = (p: number) => sec.style.setProperty('--f', String(stage === 3 ? 1 : (stage + p) / 3));
  const sync = () => {
    toggle.textContent = playing ? toggle.dataset.pause! : toggle.dataset.play!;
    toggle.setAttribute('aria-pressed', String(!playing));
  };

  function frame(now: number) {
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

  stops.forEach((b, k) =>
    b.addEventListener('click', () => {
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

  sec.dataset.enhanced = '';
  go(0);
  line(0);
  sync();
  if (!reduce) requestAnimationFrame(frame);
}
