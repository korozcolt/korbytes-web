import { toThreeColor } from "./oklch";

const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initHeroScene() {
  const container = document.getElementById("kb-three-scene");
  if (!container) return;

  if (prefersReducedMotion) {
    container.classList.add("is-static");
    return;
  }

  // Defer the heavy 3D code until the browser is idle enough that
  // LCP / first paint have already landed. This keeps the ~460 KB
  // THREE.js bundle out of the critical path while the page is
  // already readable — the SVG traces already paint the architecture
  // motif behind the copy, so the 3D scene is a progressive enrich.
  const scheduleTeardown = () => {
    window.removeEventListener("load", schedule);
    document.removeEventListener("visibilitychange", onVisible);
    startScene();
  };
  const schedule = () => scheduleTeardown();
  const onVisible = () => {
    if (document.visibilityState === "visible") scheduleTeardown();
  };

  if (document.readyState === "complete") {
    schedule();
  } else {
    window.addEventListener("load", schedule, { once: true, passive: true });
    document.addEventListener("visibilitychange", onVisible, { passive: true });
  }

  async function startScene() {
    if (!container) return;
    const THREE: any = await import("three");
    mountScene(THREE, container);
  }
}

function mountScene(THREE: any, container: HTMLElement) {
  const width = () => container.clientWidth;
  const height = () => container.clientHeight;

  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  container.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width(), height(), false);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(40, width() / height(), 0.1, 50);
  camera.position.set(0, 0.5, 6.4);
  // ── Architectural core: faceted icosahedron (PASS Core) ──
  const coreGeom = new THREE.IcosahedronGeometry(1.2, 0);
  const coreMat = new THREE.MeshStandardMaterial({
    color: toThreeColor(THREE, "oklch(0.55 0.18 260)"),
    wireframe: true,
    transparent: true,
    opacity: 0.65,
    roughness: 0.35,
    emissive: toThreeColor(THREE, "oklch(0.30 0.20 265)"),
    emissiveIntensity: 0.7,
  });
  const core = new THREE.Mesh(coreGeom, coreMat);
  scene.add(core);

  // Inner solid
  const innerGeom = new THREE.IcosahedronGeometry(0.96, 1);
  const innerMat = new THREE.MeshBasicMaterial({
    color: toThreeColor(THREE, "oklch(0.78 0.155 80)"),
    wireframe: true,
    transparent: true,
    opacity: 0.32,
  });
  const inner = new THREE.Mesh(innerGeom, innerMat);
  scene.add(inner);

  // Glow halo
  const glowGeom = new THREE.SphereGeometry(1.5, 32, 32);
  const glowMat = new THREE.MeshBasicMaterial({
    color: toThreeColor(THREE, "oklch(0.65 0.190 265)"),
    transparent: true,
    opacity: 0.06,
    side: THREE.BackSide,
  });
  const glow = new THREE.Mesh(glowGeom, glowMat);
  scene.add(glow);

  // ── PASS verticals as orbiting satellites ──
  const verticals = [
    { color: "oklch(0.78 0.155 215)", name: "VolleyPass" },
    { color: "oklch(0.78 0.155 80)",  name: "FarmaPass"  },
    { color: "oklch(0.74 0.140 160)", name: "DatesPass"  },
    { color: "oklch(0.72 0.180 350)", name: "CampusPass" },
    { color: "oklch(0.85 0.110 215)", name: "MoviPass"   },
    { color: "oklch(0.85 0.110 80)",  name: "ClubPass"   },
    { color: "oklch(0.85 0.140 160)", name: "CertiPass"  },
    { color: "oklch(0.65 0.190 265)", name: "StorePass"  },
  ];

  const orbitGroup = new THREE.Group();
  scene.add(orbitGroup);

  const satellites = verticals.map((v, i) => {
    const r = 2.4;
    const angle = (i / verticals.length) * Math.PI * 2;
    const elev = (i % 2 === 0 ? 0.35 : -0.35);
    const geom = new THREE.SphereGeometry(0.07, 16, 16);
    const mat = new THREE.MeshBasicMaterial({ color: toThreeColor(THREE, v.color) });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.userData.angle = angle;
    mesh.userData.radius = r;
    mesh.userData.elev = elev;
    orbitGroup.add(mesh);

    const ringGeom = new THREE.TorusGeometry(r, 0.005, 8, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: toThreeColor(THREE, v.color),
      transparent: true,
      opacity: 0.18,
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = Math.PI / 2 + elev;
    orbitGroup.add(ring);

    return mesh;
  });

  const dust = new THREE.BufferGeometry();
  const dustCount = 220;
  const dustPositions = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    const r = 3.2 + Math.random() * 4;
    const t = Math.random() * Math.PI * 2;
    const p = (Math.random() - 0.5) * Math.PI;
    dustPositions[i * 3 + 0] = r * Math.cos(t) * Math.cos(p);
    dustPositions[i * 3 + 1] = r * Math.sin(p) * 0.6;
    dustPositions[i * 3 + 2] = r * Math.sin(t) * Math.cos(p);
  }
  dust.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
  const dustMat = new THREE.PointsMaterial({
    color: toThreeColor(THREE, "oklch(0.78 0.155 215)"),
    size: 0.018,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
  });
  const dustPoints = new THREE.Points(dust, dustMat);
  scene.add(dustPoints);

  const pointer = { x: 0, y: 0, target: { x: 0, y: 0 } };
  window.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect();
    pointer.target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    pointer.target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
  }, { passive: true });

  const clock = new THREE.Clock();
  let raf = 0;
  function tick() {
    const t = clock.getElapsedTime();
    pointer.x += (pointer.target.x - pointer.x) * 0.05;
    pointer.y += (pointer.target.y - pointer.y) * 0.05;

    core.rotation.x = t * 0.18 + pointer.y * 0.18;
    core.rotation.y = t * 0.24 + pointer.x * 0.18;
    inner.rotation.x = -t * 0.32;
    inner.rotation.y = -t * 0.20;
    glow.rotation.y = t * 0.08;

    orbitGroup.rotation.y = t * 0.16;
    satellites.forEach((s) => {
      const a = s.userData.angle + t * 0.18;
      s.position.x = Math.cos(a) * s.userData.radius;
      s.position.z = Math.sin(a) * s.userData.radius;
      s.position.y = Math.sin(a * 1.2) * s.userData.elev * 1.4;
    });

    dustPoints.rotation.y = t * 0.04;
    dustPoints.rotation.x = t * 0.02;

    camera.position.x = pointer.x * 0.5;
    camera.position.y = 0.4 - pointer.y * 0.4;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  }
  tick();

  const ro = new ResizeObserver(() => {
    const w = width();
    const h = height();
    if (w === 0 || h === 0) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  });
  ro.observe(container);

  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      if (!raf) tick();
    } else {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  });
  io.observe(container);
}
