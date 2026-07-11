import { animate, stagger } from "animejs";

const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const noMotion = prefersReducedMotion;

// ── Cursor magnético ───────────────────────────────────────────
function initCursor() {
  if (noMotion) return;
  if (matchMedia("(max-width: 980px)").matches) return;

  const cursor = document.createElement("div");
  cursor.className = "kb-cursor";
  document.body.appendChild(cursor);

  let cx = -100, cy = -100;
  let targetX = -100, targetY = -100;

  window.addEventListener("pointermove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  }, { passive: true });

  const interactive = "a, button, [data-magnetic], input, textarea, select, [role='button']";

  document.addEventListener("pointerover", (e) => {
    const t = e.target as HTMLElement;
    if (t.closest(interactive)) cursor.classList.add("is-hover");
  }, { passive: true });
  document.addEventListener("pointerout", (e) => {
    const t = e.target as HTMLElement;
    if (t.closest(interactive)) cursor.classList.remove("is-hover");
  }, { passive: true });

  document.addEventListener("pointerdown", () => cursor.classList.add("is-press"));
  document.addEventListener("pointerup", () => cursor.classList.remove("is-press"));

  function loop() {
    cx += (targetX - cx) * 0.18;
    cy += (targetY - cy) * 0.18;
    cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  }
  loop();
}

// ── Magnetic buttons ───────────────────────────────────────────
function initMagnetic() {
  if (noMotion) return;
  const targets = document.querySelectorAll<HTMLElement>("[data-magnetic]");
  targets.forEach((el) => {
    let raf = 0;
    const strength = 0.25;
    const damp = 0.18;
    let tx = 0, ty = 0, x = 0, y = 0;

    function move(e: PointerEvent) {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      tx = (e.clientX - cx) * strength;
      ty = (e.clientY - cy) * strength;
      if (!raf) raf = requestAnimationFrame(loop);
    }
    function loop() {
      x += (tx - x) * damp;
      y += (ty - y) * damp;
      el.style.transform = `translate(${x}px, ${y}px)`;
      if (Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    }
    function leave() {
      tx = 0; ty = 0;
      if (!raf) raf = requestAnimationFrame(loop);
    }
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave, { passive: true });
  });
}

// ── Reveal on scroll (IntersectionObserver) ──────────────────
function initReveal() {
  const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
  const staggers = document.querySelectorAll<HTMLElement>("[data-reveal-stagger]");

  if (noMotion) {
    els.forEach((e) => e.classList.add("is-visible"));
    staggers.forEach((e) => e.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
  );
  els.forEach((e) => io.observe(e));
  staggers.forEach((e) => io.observe(e));
}

// ── Hero hero title char reveal ────────────────────────────────
function initHeroTitle() {
  const title = document.querySelector<HTMLElement>(".kb-hero-title");
  if (!title) return;
  if (noMotion) return;

  // Animate each kb-hero-word with stagger
  const words = title.querySelectorAll<HTMLElement>(".kb-hero-word");
  animate(words, {
    opacity: [0, 1],
    translateY: [42, 0],
    duration: 900,
    ease: "out(4)",
    delay: stagger(70, { start: 200 }),
  });

  // Lead + actions
  animate(".kb-hero-lead", {
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 700,
    ease: "out(3)",
    delay: 720,
  });
  animate(".kb-hero-actions", {
    opacity: [0, 1],
    translateY: [16, 0],
    duration: 600,
    ease: "out(3)",
    delay: 880,
  });
  animate(".kb-hero-stats > div", {
    opacity: [0, 1],
    translateY: [16, 0],
    duration: 500,
    ease: "out(3)",
    delay: stagger(80, { start: 1000 }),
  });
  animate(".kb-hero-overlay-card", {
    opacity: [0, 1],
    translateY: [20, 0],
    scale: [0.96, 1],
    duration: 800,
    ease: "out(3)",
    delay: 1100,
  });

  // Marquee
  animate(".kb-hero-marquee-track", {
    translateX: ["0%", "-50%"],
    duration: 30000,
    ease: "linear",
    loop: true,
  });
}

// ── Magnetic stat numbers ─────────────────────────────────────
function initNumberCounter() {
  if (noMotion) return;
  const nums = document.querySelectorAll<HTMLElement>("[data-count]");
  nums.forEach((el) => {
    const target = Number(el.dataset.count);
    if (Number.isNaN(target)) return;
    const obj = { v: 0 };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(obj, {
              v: target,
              duration: 1400,
              ease: "out(3)",
              onUpdate: () => {
                el.textContent = String(Math.round(obj.v));
              },
            });
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
  });
}

// ── Boot ──────────────────────────────────────────────────────
document.addEventListener("astro:page-load", boot);
document.addEventListener("DOMContentLoaded", boot);

function boot() {
  initCursor();
  initMagnetic();
  initReveal();
  initHeroTitle();
  initNumberCounter();
}
