// Progressive enhancement: native details remain usable if JavaScript is unavailable.
export function initServices(root: HTMLElement) {
  const items = [...root.querySelectorAll<HTMLDetailsElement>('[data-service]')];
  const stage = root.querySelector<HTMLElement>('[data-services-stage]')!;
  // Keep loading announcements outside the busy section so assistive technology can announce them.
  const status = document.getElementById('services-status')!;
  const desktop = matchMedia('(min-width: 1024px)');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const back = root.querySelector<HTMLButtonElement>('[data-services-back]')!;
  let selected: HTMLDetailsElement | null = null;
  let request = 0;
  let animations: Animation[] = [];
  let restoreAnchor: (() => void) | null = null;
  const visuals = new Map(items.map((item) => [item, item.querySelector<HTMLElement>('[data-visual]')!]));

  const cancelAnimations = () => {
    animations.forEach((animation) => animation.cancel());
    animations = [];
    restoreAnchor?.();
    restoreAnchor = null;
  };

  // FLIP keeps the same eight cards in the DOM while they move from grid to list.
  // Counter-scale summaries so their labels do not stretch with the card backgrounds.
  const changeLayout = (update: () => void) => {
    const followers = root.parentElement
      ? [...root.parentElement.children]
          .slice([...root.parentElement.children].indexOf(root) + 1)
          .filter((element): element is HTMLElement => element instanceof HTMLElement && element.tagName === 'SECTION')
      : [];
    const before = new Map([...items, ...followers].map((element) => [element, element.getBoundingClientRect()]));
    cancelAnimations();
    // Prevent a following section becoming the browser's scroll anchor as the layout grows.
    const parent = root.parentElement!;
    const anchor = parent.style.overflowAnchor;
    const restore = () => {
      parent.style.overflowAnchor = anchor;
    };
    restoreAnchor = restore;
    parent.style.overflowAnchor = 'none';
    const scroll = { top: scrollY, left: scrollX };
    update();
    if (scrollY !== scroll.top || scrollX !== scroll.left) window.scrollTo({ ...scroll, behavior: 'instant' });
    if (reduce.matches) {
      restore();
      restoreAnchor = null;
      return Promise.resolve();
    }
    const timing = { duration: 360, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' };
    for (const element of [...items, ...followers]) {
      const from = before.get(element)!;
      const to = element.getBoundingClientRect();
      if (!from.width || !from.height || !to.width || !to.height) continue;
      if ((from.top > innerHeight && to.top > innerHeight) || (from.bottom < 0 && to.bottom < 0)) continue;
      const x = from.left - to.left;
      const y = from.top - to.top;
      const isCard = element instanceof HTMLDetailsElement;
      const sx = isCard ? from.width / to.width : 1;
      const sy = isCard ? from.height / to.height : 1;
      if (Math.abs(x) < 0.5 && Math.abs(y) < 0.5 && Math.abs(sx - 1) < 0.01 && Math.abs(sy - 1) < 0.01) continue;
      animations.push(
        element.animate(
          [
            { transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`, transformOrigin: 'top left' },
            { transform: 'translate(0, 0) scale(1, 1)', transformOrigin: 'top left' },
          ],
          timing,
        ),
      );
      if (isCard)
        animations.push(
          element.querySelector('summary')!.animate(
            [
              { transform: `scale(${1 / sx}, ${1 / sy})`, transformOrigin: 'top left' },
              { transform: 'scale(1, 1)', transformOrigin: 'top left' },
            ],
            timing,
          ),
        );
    }
    return Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
      if (restoreAnchor === restore) {
        restore();
        restoreAnchor = null;
      }
    });
  };

  const revealSummary = (item: HTMLDetailsElement) => {
    const summary = item.querySelector('summary')!;
    const rect = summary.getBoundingClientRect();
    const headerBottom = document.querySelector('[data-header]')?.getBoundingClientRect().bottom ?? 0;
    if (rect.top < headerBottom + 16 || rect.bottom > innerHeight - 16) {
      summary.scrollIntoView({ block: 'start', behavior: reduce.matches ? 'instant' : 'smooth' });
    }
  };

  const finishLoading = () => {
    root.setAttribute('aria-busy', 'false');
    status.textContent = '';
    items.forEach((item) => item.classList.remove('is-pending'));
  };

  const placeVisual = () => {
    for (const item of items) {
      const visual = visuals.get(item)!;
      const content = item.querySelector<HTMLElement>('.service-content')!;
      if (item === selected && desktop.matches) stage.append(visual);
      else content.insertBefore(visual, content.querySelector('.service-cta'));
    }
  };

  const loadArtwork = async (item: HTMLDetailsElement) => {
    const visual = visuals.get(item)!;
    const holder = visual.querySelector<HTMLElement>('[data-illustration]')!;
    let image = holder.querySelector<HTMLImageElement>('picture img');
    if (!image) {
      holder.append(holder.querySelector<HTMLTemplateElement>('template')!.content.cloneNode(true));
      image = holder.querySelector<HTMLImageElement>('picture img')!;
    }
    image.loading = 'eager';
    try {
      await image.decode();
      image.hidden = false;
      holder.querySelector<HTMLElement>('.art-error')!.hidden = true;
    } catch {
      image.hidden = true;
      holder.querySelector<HTMLElement>('.art-error')!.hidden = false;
    }
  };

  const select = async (item: HTMLDetailsElement) => {
    const currentRequest = ++request;
    root.setAttribute('aria-busy', 'true');
    items.forEach((entry) => entry.classList.toggle('is-pending', entry === item));
    const loadingTimer = setTimeout(() => {
      if (currentRequest === request) status.textContent = root.dataset.loadingLabel!;
    }, 300);
    await loadArtwork(item);
    clearTimeout(loadingTimer);
    if (currentRequest !== request) return;
    const transition = changeLayout(() => {
      selected = item;
      root.dataset.view = 'detail';
      back.hidden = false;
      for (const entry of items) {
        entry.open = entry === selected;
        entry.querySelector('summary')!.setAttribute('aria-expanded', String(entry.open));
        // Keep only the selected responsive image live; revisits use the browser cache.
        if (entry !== selected) visuals.get(entry)!.querySelector('[data-illustration] > picture')?.remove();
      }
      placeVisual();
    });
    finishLoading();
    void transition.then(() => {
      if (currentRequest === request && selected === item && !desktop.matches) revealSummary(item);
    });
    if (!reduce.matches) {
      animations.push(
        visuals.get(item)!.animate(
          [
            { opacity: 0.3, transform: 'translateY(6px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 240, delay: 100, fill: 'backwards', easing: 'ease-out' },
        ),
      );
    }
  };

  for (const item of items) {
    const summary = item.querySelector('summary')!;
    summary.setAttribute('aria-expanded', String(item.open));
    summary.addEventListener('click', (event) => {
      event.preventDefault();
      void select(item);
    });
  }
  back.addEventListener('click', () => {
    const previous = selected;
    const currentRequest = ++request;
    const transition = changeLayout(() => {
      selected = null;
      root.dataset.view = 'overview';
      back.hidden = true;
      items.forEach((item) => {
        item.open = false;
        item.querySelector('summary')!.setAttribute('aria-expanded', 'false');
        visuals.get(item)!.querySelector('[data-illustration] > picture')?.remove();
      });
      placeVisual();
    });
    finishLoading();
    previous?.querySelector('summary')?.focus({ preventScroll: true });
    void transition.then(() => {
      if (currentRequest === request && selected === null && previous) revealSummary(previous);
    });
  });
  desktop.addEventListener('change', () => {
    const active = document.activeElement;
    const movingFocus = !!active && [...visuals.values()].some((visual) => visual.contains(active));
    cancelAnimations();
    placeVisual();
    if (movingFocus && active instanceof HTMLElement) active.focus({ preventScroll: true });
  });
  window.addEventListener('resize', cancelAnimations, { passive: true });
  reduce.addEventListener('change', cancelAnimations);
  root.classList.add('enhanced');
  root.dataset.view = 'overview';
  placeVisual();
}
