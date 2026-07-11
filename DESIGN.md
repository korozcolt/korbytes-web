# Design System

## Theme

**Dark mode committed palette.** Physical scene: un decisor técnico revisando el sitio a las 10pm desde su oficina en Bogotá o Medellín, evaluando si esta empresa de Sincelejo realmente puede ejecutar su proyecto. La pantalla debe sentirse como una herramienta de precisión, no como un showcase decorativo. El fondo desaparece; el contenido flota con autoridad.

### Color Strategy: Committed

Un color saturado (cobalt/indigo profundo) lleva el 40-60% de la superficie emocional. El ámbar actúa como acento de confianza y calidez LATAM sin caer en clichés tropicales. El cyan original se preserva como acento técnico para elementos interactivos. Tres acentos con roles claros, no decorativos.

## Color Tokens (OKLCH)

```css
:root {
  color-scheme: dark;

  /* ── Core surfaces ── */
  --kb-bg:        oklch(0.08 0.006 260);      /* near-black with micro-indigo tint */
  --kb-bg-raised: oklch(0.12 0.008 260);       /* elevated surface — cards, panels */
  --kb-bg-floating: oklch(0.16 0.010 260);     /* highest elevation — modals, overlays */

  /* ── Brand primary — cobalt/indigo ── */
  --kb-brand:        oklch(0.36 0.140 260);    /* seed-210 — deep indigo, confident */
  --kb-brand-soft:   oklch(0.44 0.120 260);    /* hover, active states */
  --kb-brand-muted:  oklch(0.28 0.090 260);    /* backgrounds, large accent areas */
  --kb-brand-glow:   oklch(0.52 0.160 265);    /* glow effects, focus rings */

  /* ── Accent 1 — Cyan técnico (interactive elements) ── */
  --kb-cyan:         oklch(0.72 0.155 215);    /* buttons, links, interactive */
  --kb-cyan-soft:    oklch(0.80 0.110 215);    /* hover */
  --kb-cyan-muted:   oklch(0.55 0.080 215);    /* badges, chips */

  /* ── Accent 2 — Amber (trust, warmth, status) ── */
  --kb-amber:        oklch(0.68 0.145 85);     /* confidence markers, production badges */
  --kb-amber-soft:   oklch(0.78 0.100 85);     /* hover */
  --kb-amber-muted:  oklch(0.50 0.095 85);     /* subtle warmth, section accents */

  /* ── Accent 3 — Emerald (growth, success, completion) ── */
  --kb-emerald:      oklch(0.65 0.125 165);    /* success states, "listo" badges */
  --kb-emerald-soft: oklch(0.72 0.090 165);    /* hover */
  --kb-emerald-muted: oklch(0.48 0.070 165);   /* subtle success indicators */

  /* ── Text ramp ── */
  --kb-text:         oklch(0.92 0.004 260);    /* primary body — near-white, cool */
  --kb-text-strong:  oklch(0.97 0.002 260);    /* headings, emphasis */
  --kb-text-muted:   oklch(0.62 0.015 260);    /* secondary text — ≥4.5:1 vs bg-raised */
  --kb-text-soft:    oklch(0.42 0.012 260);    /* tertiary, captions, footnotes */

  /* ── Borders & lines ── */
  --kb-line:         oklch(0.22 0.015 260);    /* subtle separators */
  --kb-line-strong:  oklch(0.32 0.020 260);    /* visible borders */
  --kb-line-brand:   oklch(0.42 0.080 260);    /* brand-tinted borders */
  --kb-line-amber:   oklch(0.45 0.060 85);     /* warm separators */

  /* ── Surfaces (glass/translucent — used sparingly) ── */
  --kb-glass:        oklch(0.12 0.008 260 / 0.82);   /* nav, modals */
  --kb-glass-heavy:  oklch(0.08 0.006 260 / 0.94);   /* heavy overlays */

  /* ── Shadows ── */
  --kb-shadow-sm:    0 2px 8px oklch(0 0 0 / 0.28);
  --kb-shadow-md:    0 8px 30px oklch(0 0 0 / 0.38);
  --kb-shadow-lg:    0 20px 60px oklch(0 0 0 / 0.48);
  --kb-shadow-brand: 0 8px 32px oklch(0.36 0.14 260 / 0.28);     /* indigo glow */
  --kb-shadow-amber: 0 8px 28px oklch(0.68 0.145 85 / 0.20);     /* amber glow */

  /* ── Radii ── */
  --kb-radius-sm:   10px;
  --kb-radius-md:   16px;
  --kb-radius-lg:   24px;
  --kb-radius-full: 999px;

  /* ── Motion ── */
  --kb-ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1);
  --kb-ease-in:     cubic-bezier(0.4, 0.0, 1, 1);
  --kb-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --kb-duration-fast: 180ms;
  --kb-duration-normal: 280ms;
  --kb-duration-slow: 500ms;
}
```

### Palette Roles Map

| Token | Role | Used In |
|-------|------|---------|
| `--kb-bg` | Page background | body, main sections |
| `--kb-bg-raised` | Elevated surfaces | cards, panels, service cards |
| `--kb-brand` | Primary identity | hero accent areas, section bands, brand moments |
| `--kb-brand-glow` | Focus/interactive glow | focus rings, hover glows |
| `--kb-cyan` | Interactive elements | buttons, links, chips, badges, focus indicators |
| `--kb-amber` | Trust/confidence | production badges, stat highlights, CTA warmth |
| `--kb-emerald` | Success/completion | success states, completion badges |
| `--kb-text` | Body copy | primary content text |
| `--kb-text-muted` | Secondary text | descriptions, metadata |
| `--kb-line` | Subtle borders | card borders, separators |

## Typography

### Strategy: 3 voices with role clarity

| Voice | Family | Role | Weight Range |
|-------|--------|------|-------------|
| **Display** | Space Grotesk | Headings H1–H3, hero text, large labels | 500, 700 |
| **Body** | DM Sans | Body text, nav, UI labels, paragraphs | 400, 500, 700 |
| **Mono** | JetBrains Mono | Badges, chips, code references, stats, technical metadata | 400, 500, 700 |

### Rationale

- **Space Grotesk** se preserva (identidad existente) pero recalibrado. Tracking máximo -0.03em en display, -0.015em en H2/H3. La versión actual (-0.045em) comprime demasiado.
- **DM Sans** reemplaza Manrope. Geométrica pero cálida, excelente legibilidad en dark mode, pairing comprobado con Space Grotesk. Google Fonts.
- **JetBrains Mono** añade la tercera voz técnica. Para tags de estado, nombres de productos (PASS, NEXUS, SIGMA), chips tecnológicos, stats numéricas. Diferencia inmediata entre "marca" y "código".

### Typographic Scale

```css
/* Fluid heading scale */
h1 { font-size: clamp(2.8rem, 6vw, 5.5rem); line-height: 0.92; letter-spacing: -0.03em; font-weight: 700; }
h2 { font-size: clamp(2rem, 3.5vw, 3.8rem); line-height: 0.96; letter-spacing: -0.02em; font-weight: 700; }
h3 { font-size: clamp(1.25rem, 1.8vw, 1.75rem); line-height: 1.1; letter-spacing: -0.015em; font-weight: 700; }

/* Body */
body { font-size: 1rem; line-height: 1.6; font-weight: 400; }
.lead { font-size: clamp(1.05rem, 1.6vw, 1.2rem); line-height: 1.65; max-width: 65ch; }

/* Mono voice */
.mono-label { font-family: "JetBrains Mono", monospace; font-size: 0.78rem; font-weight: 500; letter-spacing: 0.02em; }
```

### Font Loading

```html
<!-- Self-hosted or Google Fonts with swap + preload -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap" onload="this.onload=null;this.rel='stylesheet'" />
```

## Surface Architecture

Four distinct surface treatments — each section has its own "skin":

### 1. Ink Surface (Hero, brand statements)

```css
.ink-surface {
  background: var(--kb-bg);
  /* Subtle brand radial gradient — not a grid, not stripes */
  background-image: radial-gradient(ellipse 40rem 30rem at 20% 0%, oklch(0.36 0.140 260 / 0.18), transparent 60%);
}
```

### 2. Raised Surface (Services, Features, FAQ)

```css
.raised-surface {
  background: var(--kb-bg-raised);
  border: 1px solid var(--kb-line);
  border-radius: var(--kb-radius-md);
  box-shadow: var(--kb-shadow-sm);
  /* No backdrop-filter. Solid depth via color + shadow. */
}
```

### 3. Warm Elevated Surface (Projects, Cases, Locations)

```css
.warm-surface {
  background: oklch(0.14 0.010 85); /* warm-tinted raised */
  border: 1px solid var(--kb-line-amber);
  border-radius: var(--kb-radius-md);
  box-shadow: var(--kb-shadow-sm);
}
```

### 4. Drenched Surface (CTA final, footer)

```css
.drenched-surface {
  background: linear-gradient(135deg, oklch(0.16 0.060 260), oklch(0.10 0.030 85));
  border: 1px solid var(--kb-line-brand);
  border-radius: var(--kb-radius-lg);
}
```

## Component Anatomy

### Double-Bezel Cards (high-end-visual-design pattern)

```css
/* Outer shell */
.card-shell {
  background: var(--kb-bg-raised);
  border: 1px solid var(--kb-line);
  border-radius: var(--kb-radius-lg);
  padding: 2px; /* thin frame */
}
/* Inner core */
.card-core {
  background: linear-gradient(180deg, oklch(0.14 0.010 260 / 0.6), oklch(0.11 0.006 260 / 0.8));
  border-radius: calc(var(--kb-radius-lg) - 2px);
  padding: 1.5rem;
  box-shadow: inset 0 1px 0 oklch(1 0 0 / 0.06);
}
```

### Buttons

```css
/* Primary — pill, solid cyan, white text on fill */
.btn-primary {
  background: var(--kb-cyan);
  color: var(--kb-bg); /* near-black text on saturated cyan */
  border-radius: var(--kb-radius-full);
  font-weight: 700;
  padding: 0.85rem 1.4rem;
  transition: transform var(--kb-duration-fast) var(--kb-ease-out);
}
.btn-primary:hover { transform: translateY(-1px); }
.btn-primary:active { transform: scale(0.985); }

/* Secondary — outline, transparent fill */
.btn-secondary {
  border: 1px solid var(--kb-line-strong);
  color: var(--kb-text);
  border-radius: var(--kb-radius-full);
  background: transparent;
  padding: 0.85rem 1.4rem;
  font-weight: 600;
  transition: border-color var(--kb-duration-fast) var(--kb-ease-out);
}
.btn-secondary:hover { border-color: var(--kb-cyan); }
```

### Badges / Status Pills

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.65rem;
  border-radius: var(--kb-radius-full);
  font-family: "JetBrains Mono", monospace;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.badge-production { background: oklch(0.68 0.145 85 / 0.15); color: var(--kb-amber); border: 1px solid oklch(0.68 0.145 85 / 0.25); }
.badge-development { background: oklch(0.36 0.140 260 / 0.15); color: var(--kb-brand-soft); border: 1px solid oklch(0.36 0.140 260 / 0.25); }
.badge-concept { background: oklch(0.12 0.008 260 / 0.6); color: var(--kb-text-muted); border: 1px solid var(--kb-line); }
.badge-success { background: oklch(0.65 0.125 165 / 0.15); color: var(--kb-emerald); border: 1px solid oklch(0.65 0.125 165 / 0.25); }
```

## Motion Design

### Philosophy

Motion here is **narrative, not decorative**. Three moments of emphasis across the entire page — not a scroll-fade on every section. Each animation communicates hierarchy, sequence, or feedback.

### Moments

1. **Hero Entrance** (page load, GSAP core)
   - Eyebrow → stagger 0.08s → H1 → stagger 0.1s → lead → stagger 0.08s → CTAs → stagger 0.06s → stats
   - Easing: `power3.out` for headings, `power2.out` for body
   - Duration: 0.6-0.8s per element
   - Reduced motion: all elements visible instantly

2. **Project Cards Stack** (scroll, GSAP ScrollTrigger)
   - Projects section: cards pin and stack (sticky-stack pattern)
   - Each card scales to 0.94 and fades to 0.5 as next card arrives
   - Reduced motion: static grid, no stacking

3. **CTA Section Scale** (scroll entry, GSAP ScrollTrigger)
   - CTA card scales from 0.96 to 1 with subtle opacity ramp
   - Duration: 0.7s, ease: `power3.out`
   - Reduced motion: static

### Reduced Motion Protocol

All animations gated behind:
```javascript
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  // animations here
});
```

Under `(prefers-reduced-motion: reduce)`, all elements render in final state instantly.

## Layout Grids

```css
/* Container */
.container { width: min(1180px, calc(100% - 32px)); margin: 0 auto; }

/* Grids — all collapse to 1 column below 980px */
.grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem; }
.grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; }
.grid-bento { grid-template-columns: 2fr 1fr 1fr; gap: 1rem; }

/* Hero grid: asymmetric 1.1fr / 0.9fr */
.hero-grid { grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr); gap: 3rem; align-items: center; }
```

## Absolute Bans (from impeccable + frontend-design + design-taste-frontend)

1. ❌ Gradient text (`background-clip: text`) — banned globally
2. ❌ Glassmorphism as default — uso puntual solo en nav overlay
3. ❌ Eyebrow above every section — máximo 1 cada 3 secciones
4. ❌ Identical card grids — cada grid tiene variación visual
5. ❌ `border: 1px solid X` + `box-shadow: 0 Npx Mpx` with M ≥ 16px — pick one
6. ❌ `border-radius: 32px+` on cards — max 24px
7. ❌ Decorative grid backgrounds (linear-gradient line grids)
8. ❌ Side-stripe borders
9. ❌ Space Mono as default — JetBrains Mono instead
10. ❌ repeating-linear-gradient stripe backgrounds
11. ❌ Hero metric template (big number + small label + gradient)
12. ❌ Nested cards (cards inside cards)

## Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| `≤ 980px` | All grids → 1 column, nav links → hamburger, backdrop-filter disabled |
| `≤ 640px` | Tighter container, smaller logo (150px), buttons full-width, reduced padding (72px) |

## Implementation Tech

- **Framework:** Astro (preserved — zero framework change)
- **Styling:** CSS vanilla with custom properties (preserved — 826 lines refactored, not replaced)
- **Animation:** GSAP core + ScrollTrigger (new dependency — added via npm)
- **Fonts:** Google Fonts with preload + swap (updated families, same loading strategy)
- **Icons:** Phosphor Icons (new dependency — replaces inline SVGs)
- **Images:** Real screenshots + Unsplash placeholders where needed