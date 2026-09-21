import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.documentElement.classList.add("kb-motion-ready");

gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
  // Reveal staggers on viewport entry — a wrapper [data-reveal-stagger] flips
  // `is-visible` once it enters view, CSS handles the per-child transition.
  const staggers = gsap.utils.toArray("[data-reveal-stagger]");
  const revealNow = (el) => el.classList.add("is-visible");

  staggers.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const inViewOnLoad = rect.top < innerHeight && rect.bottom > 0;
    if (inViewOnLoad) {
      addEventListener("load", () => revealNow(el), { once: true, passive: true });
    } else {
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => revealNow(el),
      });
    }
  });
});

// ── Marquee: duplicate the track once so the CSS keyframe (-50%) loops seamlessly.
(function initMarquee() {
  document.querySelectorAll("[data-marquee-track]").forEach((track) => {
    if (track.dataset.duplicated === "1") return;
    track.innerHTML = track.innerHTML + track.innerHTML;
    track.dataset.duplicated = "1";
  });
})();

// ── Cursor and magnetic affordances: gated on CSS pointer
//    (fine + no reduce) AND a desktop breakpoint.
function initCursor() {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (matchMedia("(max-width: 980px)").matches) return;

  const cursor = document.createElement("div");
  cursor.className = "kb-cursor";
  document.body.appendChild(cursor);

  let cx = -100, cy = -100;
  let tx = -100, ty = -100;

  window.addEventListener("pointermove", (e) => {
    tx = e.clientX;
    ty = e.clientY;
  }, { passive: true });

  const interactive = "a, button, [data-magnetic], input, textarea, select, [role='button']";

  document.addEventListener("pointerover", (e) => {
    const t = e.target;
    if (t.closest(interactive)) cursor.classList.add("is-hover");
  }, { passive: true });
  document.addEventListener("pointerout", (e) => {
    const t = e.target;
    if (t.closest(interactive)) cursor.classList.remove("is-hover");
  }, { passive: true });
  document.addEventListener("pointerdown", () => cursor.classList.add("is-press"));
  document.addEventListener("pointerup",   () => cursor.classList.remove("is-press"));

  function loop() {
    cx += (tx - cx) * 0.18;
    cy += (ty - cy) * 0.18;
    cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  }
  loop();
}

function initMagnetic() {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const targets = document.querySelectorAll("[data-magnetic]");
  targets.forEach((el) => {
    const strength = 0.22;
    const damp = 0.18;
    let raf = 0, tx = 0, ty = 0, x = 0, y = 0;

    function move(e) {
      const rect = el.getBoundingClientRect();
      const ccx = rect.left + rect.width / 2;
      const ccy = rect.top + rect.height / 2;
      tx = (e.clientX - ccx) * strength;
      ty = (e.clientY - ccy) * strength;
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

// ── Hero particle network: small constellation of drifting dots with
//    proximity lines, drawn on a <canvas>. Gated on reduced-motion (the
//    canvas is simply left blank there — CSS supplies a static gradient
//    fallback) and paused while the tab/hero is out of view.
function initHeroParticles() {
  const canvas = document.getElementById("hero-particles");
  if (!canvas || !matchMedia("(prefers-reduced-motion: no-preference)").matches) return;

  const ctx = canvas.getContext("2d");
  const accent = "255, 91, 46";
  let width, height, dpr, points, raf, running = true;

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = width < 640 ? 22 : width < 1080 ? 34 : 46;
    points = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
    }));
  }

  function step() {
    if (!running) return;
    ctx.clearRect(0, 0, width, height);
    const linkDist = width < 640 ? 90 : 130;

    for (const p of points) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    }
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < linkDist) {
          ctx.strokeStyle = `rgba(${accent}, ${0.16 * (1 - dist / linkDist)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }
    }
    for (const p of points) {
      ctx.fillStyle = `rgba(${accent}, 0.5)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = requestAnimationFrame(step);
  }

  resize();
  step();
  addEventListener("resize", resize, { passive: true });
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running && !raf) step();
  });
}

initCursor();
initMagnetic();
initHeroParticles();

mm.add("(prefers-reduced-motion: reduce)", () => {
  document.querySelectorAll("[data-reveal-stagger]").forEach((el) => {
    el.classList.add("is-visible");
  });
  gsap.set("[data-reveal]", { clearProps: "all" });
});
