import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {

  // ── 1. Hero entrance ───────────────────────────────────────
  const hero = document.querySelector(".kb-hero");
  if (hero) {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".kb-hero-kicker > *", { y: 24, opacity: 0, duration: 0.5, stagger: 0.05 })
      .from(".kb-hero-line",     { y: 40, opacity: 0, duration: 0.7, stagger: 0.05 }, "-=0.05")
      .from(".kb-hero-lead",     { y: 24, opacity: 0, duration: 0.6 },             "-=0.1")
      .from(".kb-hero-actions a",{ y: 16, opacity: 0, duration: 0.5, stagger: 0.06 },"-=0.1")
      .from(".kb-hero-stats > div",{ y: 16, opacity: 0, duration: 0.5, stagger: 0.04 },"-=0.06")
      .from(".kb-hero-overlay-card", { y: 24, opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.4")
      .from(".kb-hero-ticker",   { opacity: 0, scale: 0.9, duration: 0.5, stagger: 0.1 }, "-=0.5");
  }

  // ── 2. Reveal staggers on viewport entry
  // A wrapper [data-reveal-stagger] flips `is-visible` once it enters
  // view, and CSS handles the per-child transition. Containers that
  // are already in the viewport on first paint get toggled immediately
  // so they don't induce layout shift while the module hydrates.
  const staggers = gsap.utils.toArray("[data-reveal-stagger]");
  const revealNow = (el) => el.classList.add("is-visible");

  staggers.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const inViewOnLoad = rect.top < innerHeight && rect.bottom > 0;
    if (inViewOnLoad) {
      // Defer to load event so LCP/FCP land first; no layout shift because the
      // transition runs from opacity:0 → 1 (the parent reserved space).
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

  // ── 3. Project cards (not inside [data-reveal-stagger] grids) — sticky-stack.
  const stack = document.querySelector(".kb-projects-stack");
  const projectCards = gsap.utils.toArray(".kb-project", stack);
  if (stack && projectCards.length > 1) {
    ScrollTrigger.create({
      trigger: stack,
      start: "top 10%",
      end: () => `+=${projectCards.length * 300}`,
      pin: true,
      anticipatePin: 1,
    });

    projectCards.forEach((card, i) => {
      if (i === 0) return;
      ScrollTrigger.create({
        trigger: card,
        start: "top 75%",
        onEnter: () => {
          gsap.to(projectCards[i - 1], {
            scale: 0.94, opacity: 0.5, duration: 0.4, ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(projectCards[i - 1], {
            scale: 1, opacity: 1, duration: 0.4, ease: "power2.out",
          });
        },
      });
    });
  }

  // ── 4. Section headings: fade & slide up on scroll ─────
  gsap.utils.toArray(".kb-section-head").forEach((el) => {
    gsap.from(el, {
      y: 20, opacity: 0, duration: 0.5, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
    });
  });

  // ── 5. CTA scale-in ───────────────────────────────────────
  const cta = document.querySelector(".kb-cta");
  if (cta) {
    ScrollTrigger.create({
      trigger: cta,
      start: "top 85%",
      onEnter: () => {
        gsap.fromTo(cta, { scale: 0.96, opacity: 0.8 }, { scale: 1, opacity: 1, duration: 0.7, ease: "power3.out" });
      },
    });
  }
});

// ── Marquee: duplicate the track once so the CSS keyframe (-50%) loops seamlessly.
(function initMarquee() {
  document.querySelectorAll(".kb-hero-marquee-track").forEach((track) => {
    if (track.dataset.duplicated === "1") return;
    track.innerHTML = track.innerHTML + track.innerHTML;
    track.dataset.duplicated = "1";
  });
})();

// ── Cursor and magnetic affordances: gated on CSS pointer
//    (fine + no reduce) AND a desktop breakpoint. They are part of the
//    visual language, not decorative; reduced motion / touch → off.
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
  // Pre-set stagger containers to their final state and clear any leftover
  // GSAP transforms so the page is fully readable without animation.
  document.querySelectorAll("[data-reveal-stagger]").forEach((el) => {
    el.classList.add("is-visible");
  });
  gsap.set(
    "[data-reveal], h1, .kb-lead, .kb-hero-actions a, .kb-hero-stats > div, .kb-cta, .kb-svc-card, .kb-project, .kb-section-head, .kb-faq",
    { clearProps: "all" },
  );
});
