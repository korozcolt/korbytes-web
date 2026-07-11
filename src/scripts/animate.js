import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {

  // ── 1. Hero entrance ───────────────────────────────────────
  const hero = document.querySelector(".kb-hero");
  if (hero) {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".kb-eyebrow", { y: 24, opacity: 0, duration: 0.6 })
      .from("h1", { y: 40, opacity: 0, duration: 0.7 }, "-=0.08")
      .from(".kb-lead", { y: 24, opacity: 0, duration: 0.6 }, "-=0.1")
      .from(".kb-actions a", { y: 16, opacity: 0, duration: 0.5, stagger: 0.06 }, "-=0.08")
      .from(".kb-stat", { y: 16, opacity: 0, duration: 0.5, stagger: 0.04 }, "-=0.06")
      .from(".kb-orbit > *", { y: 20, opacity: 0, duration: 0.6, stagger: 0.05 }, "-=0.2");
  }

  // ── 2. Services & PASS cards: fade-up on scroll ──────────
  gsap.utils.toArray(".kb-service").forEach((el) => {
    gsap.from(el, {
      y: 24, opacity: 0, duration: 0.5, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
    });
  });

  // PASS project cards (not inside the sticky-stack projects section)
  gsap.utils.toArray(".kb-section:not(.kb-band) .kb-project").forEach((el) => {
    gsap.from(el, {
      y: 20, opacity: 0, duration: 0.45, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
    });
  });

  // ── 3. Project cards stack ────────────────────────────────
  const stack = document.querySelector(".kb-projects-stack");
  const projectCards = gsap.utils.toArray(".kb-project", stack);
  if (stack && projectCards.length > 1) {
    // Pin the entire stack container
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

  // ── 4. CTA scale-in ───────────────────────────────────────
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

mm.add("(prefers-reduced-motion: reduce)", () => {
  gsap.set(
    ".kb-eyebrow, h1, .kb-lead, .kb-actions a, .kb-stat, .kb-cta, .kb-service, .kb-project, .kb-orbit > *, .kb-faq, .kb-faq-item, .kb-accordion, .kb-band, .kb-reveal",
    { clearProps: "all" },
  );
});
