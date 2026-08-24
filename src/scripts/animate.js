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

initCursor();
initMagnetic();

mm.add("(prefers-reduced-motion: reduce)", () => {
  document.querySelectorAll("[data-reveal-stagger]").forEach((el) => {
    el.classList.add("is-visible");
  });
  gsap.set("[data-reveal]", { clearProps: "all" });
});
