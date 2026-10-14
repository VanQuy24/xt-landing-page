/*
 * Solutions page mockups (design-system/xiontechs/pages/solutions.md).
 * Each window is a `[data-viz]` root. A step `[data-s]` shows when it has `data-on` (styles in global.css);
 * the server HTML already marks the final state, so these scripts only animate towards it.
 * Rules: sequences start when a window is on screen and stop when it leaves; with reduced motion nothing
 * auto-plays and the final state stays; every lookup tolerates missing elements.
 */

type El = HTMLElement | null | undefined;
type Frame = [delay: number, run: () => void];

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (root: ParentNode, sel: string) => root.querySelector<HTMLElement>(sel);
const $$ = (root: ParentNode, sel: string) => [...root.querySelectorAll<HTMLElement>(sel)];

function setOn(els: El | El[], on: boolean) {
  for (const el of Array.isArray(els) ? els : [els]) el?.toggleAttribute('data-on', on);
}

/** Hide `items` at once, without animating them out, so their next entrance plays from the start. */
function reset(root: HTMLElement, items: El[]) {
  root.setAttribute('data-instant', '');
  setOn(items, false);
  void root.offsetWidth;
  root.removeAttribute('data-instant');
}

/** Reset `items`, run `before` (e.g. switch panels, which then still fades), and play the entrance. */
function replay(root: HTMLElement, items: El[], before: () => void = () => {}) {
  reset(root, items);
  before();
  setOn(items, true);
}

/** Calls `cb(true)` while the window is on screen and the tab is visible; also pauses its CSS loops. */
function watch(root: HTMLElement, cb: (visible: boolean) => void = () => {}) {
  let inView = false;
  let last: boolean | undefined;
  const emit = () => {
    const visible = inView && document.visibilityState === 'visible';
    if (visible === last) return;
    last = visible;
    root.toggleAttribute('data-paused', !visible);
    cb(visible);
  };
  new IntersectionObserver(
    (entries) => {
      for (const e of entries) inView = e.isIntersecting;
      emit();
    },
    { threshold: 0.35 },
  ).observe(root);
  document.addEventListener('visibilitychange', emit);
}

/** Runs frames in order, each after its delay. `play()` always restarts from the first frame. */
function player(frames: Frame[], loop: boolean) {
  let timer = 0;
  let i = 0;
  let playing = false;
  const next = () => {
    if (i >= frames.length) {
      if (!loop) return void (playing = false);
      i = 0;
    }
    const [delay, run] = frames[i];
    timer = window.setTimeout(() => {
      i += 1;
      run();
      next();
    }, delay);
  };
  return {
    play() {
      clearTimeout(timer);
      playing = true;
      i = 0;
      next();
    },
    stop() {
      clearTimeout(timer);
      playing = false;
    },
    get playing() {
      return playing;
    },
  };
}

const noop = () => {};

function pressed(buttons: HTMLElement[], key: string, value: string) {
  for (const b of buttons) b.setAttribute('aria-pressed', String(b.dataset[key] === value));
}

/** Parent Platform: a phone that alternates between Tap and Chat; the buttons take manual control. */
export function initParent(root: HTMLElement) {
  const buttons = $$(root, '[data-mode]');
  const panels = $$(root, '[data-panel]');
  const tapItems = $$(root, '[data-panel="tap"] [data-s]');
  const [ask, typing, card, sent] = ['ask', 'typing', 'card', 'sent'].map((k) => $(root, `[data-chat="${k}"]`));
  const steps = [ask, typing, card, sent];

  const show = (mode: string) => {
    pressed(buttons, 'mode', mode);
    for (const p of panels) setOn(p, p.dataset.panel === mode);
  };
  const tap = () => replay(root, tapItems, () => show('tap'));
  const chatFrames: Frame[] = [
    [
      0,
      () => {
        reset(root, steps);
        show('chat');
      },
    ],
    [400, () => setOn(ask, true)],
    [600, () => setOn(typing, true)],
    [1200, () => (setOn(typing, false), setOn(card, true))],
    [900, () => setOn(sent, true)],
  ];
  const auto = player([[0, tap], [5000, noop], ...chatFrames, [2000, noop]], true);
  const once = player(chatFrames, false);
  let manual = false;

  for (const b of buttons) {
    b.addEventListener('click', () => {
      manual = true;
      auto.stop();
      once.stop();
      const mode = b.dataset.mode ?? 'chat';
      if (mode === 'tap') tap();
      else if (reduced()) {
        show('chat');
        setOn(
          steps.filter((s) => s !== typing),
          true,
        );
        setOn(typing, false);
      } else once.play();
    });
  }
  watch(root, (visible) => {
    if (!visible) auto.stop();
    else if (!manual && !reduced()) auto.play();
  });
}

/**
 * Staff Platform: the assistant overrides the page you are on. Default Attendance page → "Who was late today?"
 * turns it into the late list → "Open wellbeing for Grade 10" switches the module tab to Wellbeing. Loops.
 */
export function initStaff(root: HTMLElement) {
  const chat = (k: string) => $(root, `[data-chat="${k}"]`);
  const views = $$(root, '[data-view]');
  const allChat = $$(root, '[data-chat]');
  const tabs = $$(root, '[data-tab]');
  const items = (v: string) => $$(root, `[data-view="${v}"] [data-s]`);
  const view = (v: string) => {
    for (const p of views) setOn(p, p.dataset.view === v);
    setOn(items(v), true);
  };
  const tab = (i: number) => {
    for (const t of tabs) {
      const on = t.dataset.tab === String(i);
      t.toggleAttribute('data-active', on);
      setOn($(t, '[data-underline]'), on);
    }
  };

  const auto = player(
    [
      [
        0,
        () => {
          setOn(allChat, false);
          for (const v of ['page', 'late', 'wellbeing']) setOn(items(v), false);
          tab(0);
          view('page');
        },
      ],
      [2500, () => setOn(chat('ask1'), true)],
      [500, () => setOn(chat('typing1'), true)],
      [1200, () => (setOn(chat('typing1'), false), setOn(chat('done1'), true), view('late'))],
      [3500, () => setOn(chat('ask2'), true)],
      [500, () => setOn(chat('typing2'), true)],
      [1200, () => (setOn(chat('typing2'), false), setOn(chat('done2'), true), tab(3), view('wellbeing'))],
      [4200, noop],
    ],
    true,
  );
  watch(root, (visible) => {
    if (!visible) auto.stop();
    else if (!reduced()) auto.play();
  });
}

/**
 * Plays `frames` once, the first time the window is on screen. Only a window that starts below the fold is
 * hidden first (`hide`); one already on screen at load keeps its final state.
 */
function once(root: HTMLElement, hide: () => void, frames: Frame[]) {
  const run = player(frames, false);
  let pending = !reduced() && root.getBoundingClientRect().top > innerHeight;
  if (pending) hide();
  watch(root, (visible) => {
    if (visible && pending) {
      pending = false;
      run.play();
    }
  });
}

/** ESS agents: question → typing → answer card, and the 15 agent tiles light up. */
export function initEss(root: HTMLElement) {
  const [ask, typing, card] = ['ask', 'typing', 'card'].map((k) => $(root, `[data-chat="${k}"]`));
  const tiles = $$(root, '[data-tile]');
  const hide = () => reset(root, [ask, card, ...tiles]);
  once(root, hide, [
    [300, () => setOn(ask, true)],
    [500, () => setOn(typing, true)],
    [1100, () => (setOn(typing, false), setOn(card, true))],
    [300, () => setOn(tiles, true)],
  ]);
}

/** XSS: attendance counts up with its bar, alerts slide in one by one, then the classroom detections one by one. */
export function initXss(root: HTMLElement) {
  const count = $(root, '[data-count]');
  const bar = $(root, '[data-bar]');
  const alerts = $$(root, '[data-alert]');
  const boxes = $$(root, '[data-box]');
  const target = Number(count?.textContent ?? '');
  const countUp = () => {
    if (!count || Number.isNaN(target)) return;
    const start = performance.now();
    const step = (now: number) => {
      const f = Math.min(1, (now - start) / 900);
      count.textContent = String(Math.round(target * (1 - (1 - f) ** 3)));
      if (f < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const hide = () => {
    reset(root, [bar, ...boxes, ...alerts]);
    if (count) count.textContent = '0';
  };
  once(root, hide, [
    [300, () => (countUp(), setOn(bar, true))],
    ...alerts.map((a): Frame => [500, () => setOn(a, true)]),
    ...boxes.map((b): Frame => [600, () => setOn(b, true)]),
  ]);
  // Marker pulses are CSS loops; `watch` inside `once` pauses them off screen.
}

/** XT Smart Platform map: the category cards rise in, staggered. */
export function initMap(root: HTMLElement) {
  const cards = $$(root, '[data-s]');
  once(root, () => reset(root, cards), [[100, () => setOn(cards, true)]]);
}

/** Grader agent: words light up in reading order, the rubric bars fill, then the mark counts up. */
export function initGrader(root: HTMLElement) {
  const words = $$(root, '[data-word]');
  const bars = $$(root, '[data-rubric]');
  const mark = $(root, '[data-mark]');
  const final = mark?.textContent?.trim() ?? '';
  const sep = final.includes(',') ? ',' : '.';
  const target = Number(final.replace(',', '.'));
  const show = (n: number) => mark && (mark.textContent = n.toFixed(1).replace('.', sep));
  const countUp = () => {
    if (!mark || Number.isNaN(target)) return;
    const start = performance.now();
    const step = (now: number) => {
      const f = Math.min(1, (now - start) / 800);
      show(target * (1 - (1 - f) ** 3));
      if (f < 1) requestAnimationFrame(step);
      else mark.textContent = final;
    };
    requestAnimationFrame(step);
  };
  const hide = () => {
    reset(root, [...words, ...bars]);
    show(0);
  };
  once(root, hide, [
    [300, () => setOn(words, true)],
    [words.length * 20 + 200, () => setOn(bars, true)],
    [300, countUp],
  ]);
}

/** Smart timetabling: a three-step stepper that auto-advances; the buttons take manual control. */
export function initTimetabling(root: HTMLElement) {
  const buttons = $$(root, '[data-goto]');
  const panels = $$(root, '[data-pane]');
  const swap = $$(root, '[data-swap]');
  const lift = $(root, '[data-lift]');

  const go = (step: string, animate: boolean) => {
    const show = () => {
      pressed(buttons, 'goto', step);
      for (const p of panels) setOn(p, p.dataset.pane === step);
    };
    const items = $$(root, `[data-pane="${step}"] [data-s]`).filter((el) => !swap.includes(el) && el !== lift);
    if (!animate) {
      show();
      setOn([...items, ...swap], true);
      setOn(lift, false);
      return;
    }
    // Step 1 starts in the old order (swap rows not "on") and with the dragged row lifted.
    if (step === '1') reset(root, swap);
    replay(root, items, show);
    if (step === '1') setOn(lift, true);
  };
  const move = () => {
    setOn(swap, true);
    window.setTimeout(() => setOn(lift, false), 450);
  };

  const auto = player(
    [
      [0, () => go('1', true)],
      [900, move],
      [3100, () => go('2', true)],
      [4000, () => go('3', true)],
      [4000, noop],
    ],
    true,
  );
  const once = player([[900, move]], false);
  let manual = false;

  for (const b of buttons) {
    b.addEventListener('click', () => {
      manual = true;
      auto.stop();
      once.stop();
      const step = b.dataset.goto ?? '3';
      const animate = !reduced();
      go(step, animate);
      if (step === '1' && animate) once.play();
    });
  }
  watch(root, (visible) => {
    if (!visible) auto.stop();
    else if (!manual && !reduced()) auto.play();
  });
}

const inits: Record<string, (root: HTMLElement) => void> = {
  parent: initParent,
  staff: initStaff,
  ess: initEss,
  map: initMap,
  grader: initGrader,
  xss: initXss,
  timetabling: initTimetabling,
};

/** Wire every `[data-viz]` window of the given kind once (safe to call from several components). */
export function initViz(kind: string) {
  for (const root of $$(document, `[data-viz="${kind}"]:not([data-viz-ready])`)) {
    root.setAttribute('data-viz-ready', '');
    inits[kind]?.(root);
  }
}
