// Draws every `.plot[data-plot]` from its JSON spec. Plotly and the spec load
// when a chart comes near the viewport; the chart draws and animates in once
// it is actually visible. Colours in specs are tokens ('@s1', '@seq2', '@ink',
// ...) resolved from CSS variables, so charts follow the light/dark theme and
// redraw when it changes. Adapted from the Mercity research site.

type Plotly = (typeof import('plotly.js-cartesian-dist-min'))['default'];
type Spec = { data: Record<string, unknown>[]; layout: Record<string, unknown> };

const CONFIG = {
  responsive: true,
  displaylogo: false,
  scrollZoom: false,
  modeBarButtonsToRemove: ['select2d', 'lasso2d', 'autoScale2d', 'toggleSpikelines'],
};

let plotly: Promise<Plotly> | undefined;
const loadPlotly = () =>
  (plotly ??= import('plotly.js-cartesian-dist-min').then((m) => (m.default ?? m) as Plotly));

const specs = new WeakMap<HTMLElement, Spec>();
const seen = new WeakSet<HTMLElement>();

// '@s1' -> value of --viz-s1 on <html>, recursively through the spec.
function resolve<T>(value: T): T {
  const css = getComputedStyle(document.documentElement);
  const walk = (v: unknown): unknown => {
    if (typeof v === 'string' && v.startsWith('@')) return css.getPropertyValue(`--viz-${v.slice(1)}`).trim() || v;
    if (Array.isArray(v)) return v.map(walk);
    if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x)]));
    return v;
  };
  return walk(value) as T;
}

function isObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === 'object' && !Array.isArray(v);
}

function merge(base: Record<string, unknown>, over: Record<string, unknown>) {
  const out: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(over)) out[k] = isObject(v) && isObject(out[k]) ? merge(out[k] as Record<string, unknown>, v) : v;
  return out;
}

// Recessive axes and grid in the site's own ink, on a transparent surface.
function themedLayout(layout: Record<string, unknown>, el: HTMLElement) {
  const axis = {
    gridcolor: '@grid',
    zerolinecolor: '@axis',
    linecolor: '@axis',
    tickcolor: '@axis',
    tickfont: { color: '@muted', size: 11 },
    title: { font: { color: '@muted', size: 12 } },
    automargin: true,
  };
  const axes = Object.fromEntries(
    Object.keys(layout)
      .filter((k) => /^[xy]axis\d*$/.test(k))
      .map((k) => [k, merge(axis, layout[k] as Record<string, unknown>)]),
  );
  const base = {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { family: getComputedStyle(el).fontFamily, color: '@ink2', size: 12 },
    height: parseInt(getComputedStyle(el).getPropertyValue('--plot-height')) || 420,
    margin: { t: 16, r: 16, b: 48, l: 56 },
    hoverlabel: { bgcolor: '@surface', bordercolor: '@axis', font: { color: '@ink', size: 12 } },
    legend: { font: { color: '@ink2', size: 12 }, orientation: 'h', x: 0, y: 1.08, bgcolor: 'rgba(0,0,0,0)' },
    xaxis: axis,
    yaxis: axis,
    bargap: 0.28,
  };
  return resolve(merge(merge(base, layout), axes));
}

function animate(el: HTMLElement) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const timing = { duration: 850, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' };
  el.querySelectorAll<SVGPathElement>('.scatterlayer .js-line').forEach((path) => {
    if (getComputedStyle(path).strokeDasharray !== 'none') {
      path.animate([{ opacity: 0 }, { opacity: 1 }], timing);
      return;
    }
    const length = path.getTotalLength();
    path.animate(
      [
        { strokeDasharray: `${length} ${length}`, strokeDashoffset: `${length}`, opacity: 0 },
        { strokeDasharray: `${length} ${length}`, strokeDashoffset: '0', opacity: 1 },
      ],
      timing,
    );
  });
  el.querySelectorAll<SVGPathElement>('.barlayer .point path').forEach((path, i) => {
    const horizontal = (path.closest('.trace') as unknown as { __data__?: { trace?: { orientation?: string } } })
      ?.__data__?.trace?.orientation === 'h';
    path.style.transformBox = 'fill-box';
    path.style.transformOrigin = horizontal ? 'left center' : 'center bottom';
    path.animate(
      [
        { transform: horizontal ? 'scaleX(0)' : 'scaleY(0)', opacity: 0 },
        { transform: 'none', opacity: 1 },
      ],
      { ...timing, delay: Math.min(i * 25, 400), fill: 'backwards' },
    );
  });
  el.querySelectorAll<SVGElement>('.scatterlayer .points, .barlayer .bartext, .heatmaplayer, .layer-above').forEach(
    (node) => node.animate([{ opacity: 0 }, { opacity: 1 }], { ...timing, delay: 200, fill: 'backwards' }),
  );
}

async function draw(el: HTMLElement, withAnimation: boolean) {
  try {
    const [P, spec] = await Promise.all([
      loadPlotly(),
      specs.get(el) ?? fetch(el.dataset.plot!).then((r) => (r.ok ? r.json() : Promise.reject(r.status))),
    ]);
    specs.set(el, spec);
    const narrow = el.clientWidth < 560;
    await P.react(el, resolve(spec.data), themedLayout(spec.layout, el), {
      ...CONFIG,
      displayModeBar: narrow ? false : 'hover',
    });
    el.dataset.state = 'ready';
    if (withAnimation) animate(el);
  } catch (error) {
    console.error('plot failed', el.dataset.plot, error);
    el.dataset.state = 'error';
    el.textContent = 'This chart could not load. The Table view has the numbers.';
  }
}

export function initPlots() {
  const plots = [...document.querySelectorAll<HTMLElement>('.plot[data-plot]')].filter((el) => !seen.has(el));
  if (!plots.length) return;

  const near = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        void loadPlotly();
        near.disconnect();
      }
    },
    { rootMargin: '800px 0px' },
  );

  const visible = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        visible.unobserve(e.target);
        void draw(e.target as HTMLElement, true);
      }
    },
    { threshold: 0.15 },
  );

  for (const el of plots) {
    seen.add(el);
    near.observe(el);
    visible.observe(el);
  }

  // Redraw drawn charts in the new palette when the theme toggles.
  new MutationObserver(() => {
    plots.filter((el) => el.dataset.state === 'ready').forEach((el) => void draw(el, false));
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}
