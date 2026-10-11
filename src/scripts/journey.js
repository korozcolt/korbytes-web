/**
 * Motor del recorrido de la portada (scroll-world).
 *
 * El scroll controla el tiempo de 4 clips de video que unen 5 paradas (del caos operativo al sistema). Cada parada
 * muestra un fotograma fijo (hold) con su texto; entre paradas el clip avanza o
 * retrocede segun el scroll (transit). La logica de carga, scrub y compatibilidad
 * movil viene de scroll-world/references/scrub-engine.js (blob siempre buscable,
 * seeks sin cola, cebado iOS, crossfade de costuras); la interfaz es propia.
 *
 * El HTML de cada parada lo renderiza el servidor (SEO, accesibilidad, sin JS).
 */

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const smooth = (x) => {
	x = clamp(x);
	return x * x * (3 - 2 * x);
};
const lerp = (a, b, t) => a + (b - a) * t;

export function mountJourney(root, cfg) {
	const stage = root.querySelector("[data-journey-stage]");
	const track = root.querySelector("[data-journey-track]");
	const panels = Array.from(root.querySelectorAll("[data-stop]"));
	const dots = Array.from(root.querySelectorAll("[data-stop-dot]"));
	const hint = root.querySelector("[data-journey-hint]");
	const bar = root.querySelector("[data-journey-bar]");
	const N = panels.length;
	if (!stage || !track || N < 2) return;

	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const coarse = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
	const smallMQ = window.matchMedia("(max-width: 860px)");
	const isMobile = () => coarse || smallMQ.matches;
	const connection = navigator.connection || {};
	const saveData = Boolean(connection.saveData) || /(^|-)(2|3)g$/.test(connection.effectiveType || "");
	const useLightClips = () => isMobile() || saveData;

	const stops = cfg.stops; // [{ still, stillM, focus }]
	const clips = cfg.clips; // [{ src, srcM }] longitud N-1
	const HOLD = cfg.holds; // peso de scroll de cada parada (en alturas de ventana)
	const TRANSIT = cfg.transit; // peso de scroll de cada clip
	const FADE = cfg.crossfade ?? 0.07;

	// ---- cadena de segmentos: hold0, transit0, hold1, ... holdN-1 ----
	const segs = [];
	const holdSeg = [];
	for (let i = 0; i < N; i++) {
		const hold = { kind: "hold", i, w: HOLD[i] ?? 1 };
		segs.push(hold);
		holdSeg[i] = hold;
		if (i < N - 1) segs.push({ kind: "transit", i, w: TRANSIT, clip: clips[i] });
	}

	// ---- escenas ----
	segs.forEach((s) => {
		const scene = document.createElement("div");
		scene.className = "journey-scene";
		const img = new Image();
		img.className = "journey-scene__still";
		img.alt = "";
		img.decoding = "async";
		const stopIndex = s.i;
		img.src = useLightClips() && stops[stopIndex].stillM ? stops[stopIndex].stillM : stops[stopIndex].still;
		scene.appendChild(img);
		stage.appendChild(scene);
		Object.assign(s, {
			el: scene,
			img,
			video: null,
			loading: false,
			ready: false,
			hasClip: false,
			cur: 0,
			target: 0,
			visible: false,
			local: 0,
		});
	});

	// ---- layout ----
	let vh = window.innerHeight;
	let laidOutW = window.innerWidth;
	let total = 0;
	let active = -1;
	let ticking = false;

	function layout() {
		vh = window.innerHeight;
		laidOutW = window.innerWidth;
		let off = 0;
		segs.forEach((s) => {
			s.start = off * vh;
			off += s.w;
			s.end = off * vh;
		});
		total = off;
		track.style.height = `${total * vh}px`;
		read();
	}

	// Encuadre horizontal: solo cuando la ventana es mas vertical que el video 16:9.
	const needsFocus = () => window.innerWidth / window.innerHeight < 1.6;
	function focusX(s, local) {
		if (!needsFocus()) return 50;
		const a = stops[s.i].focus ?? 50;
		if (s.kind === "hold") return a;
		const b = stops[s.i + 1].focus ?? 50;
		return lerp(a, b, smooth(local));
	}

	function jumpTo(i, instant) {
		const seg = holdSeg[i];
		window.scrollTo({
			top: seg.start + (seg.end - seg.start) * 0.5,
			behavior: reduce || instant ? "auto" : "smooth",
		});
	}

	// ---- carga de clips (Blob: siempre buscable aunque el host no sirva byte ranges) ----
	function loadClip(s) {
		if (reduce || s.kind !== "transit" || s.loading || !s.clip) return;
		s.loading = true;
		const url = useLightClips() && s.clip.srcM ? s.clip.srcM : s.clip.src;
		fetch(url)
			.then((r) => (r.ok ? r.blob() : Promise.reject(new Error(String(r.status)))))
			.then((blob) => {
				const v = document.createElement("video");
				v.className = "journey-scene__video";
				v.muted = true;
				v.playsInline = true;
				v.preload = "auto";
				v.setAttribute("muted", "");
				v.setAttribute("playsinline", "");
				v.setAttribute("aria-hidden", "true");
				v.src = URL.createObjectURL(blob);
				v.addEventListener("loadedmetadata", () => {
					s.ready = true;
					read();
				});
				// El fotograma fijo solo se oculta cuando el video ya pinto un fotograma
				// real (en iOS un video mudo sin reproducir se queda en blanco).
				v.addEventListener("seeked", () => s.el.classList.add("has-clip"), { once: true });
				v.addEventListener("loadeddata", () => {
					try {
						v.pause();
					} catch (e) {}
					if (userReady) prime(v);
				});
				s.el.appendChild(v);
				s.video = v;
				s.hasClip = true;
			})
			.catch(() => {
				s.loading = false;
			});
	}

	// Precarga secuencial en segundo plano (el primero ya, el resto en reposo).
	function preloadInOrder() {
		if (reduce || saveData) return;
		const queue = segs.filter((s) => s.kind === "transit");
		let k = 0;
		const next = () => {
			if (k >= queue.length) return;
			loadClip(queue[k++]);
			const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1200));
			idle(next, { timeout: 4000 });
		};
		next();
	}

	// ---- lectura de scroll ----
	function read() {
		const y = window.scrollY || window.pageYOffset;
		const fade = FADE * vh;
		let ci = 0;
		for (let i = 0; i < segs.length; i++) if (y >= segs[i].start) ci = i;

		segs.forEach((s, i) => {
			if (y > s.start - 1.8 * vh && y < s.end + 1.2 * vh) loadClip(s);
			const local = clamp((y - s.start) / (s.end - s.start));
			s.local = local;
			s.target = local;
			let outside = 0;
			if (y < s.start) outside = s.start - y;
			else if (y > s.end) outside = y - s.end;
			// La ultima escena se queda al terminar el recorrido (fondo del resto de la pagina).
			const isLast = i === segs.length - 1;
			const op = isLast && y > s.end ? 1 : smooth(1 - outside / fade);
			s.el.style.opacity = op;
			s.visible = op > 0.001;
			s.el.style.zIndex = i === ci ? "20" : String(10 + Math.round(op * 8));
			const fx = focusX(s, local);
			const pos = `${fx.toFixed(2)}% 50%`;
			s.img.style.objectPosition = pos;
			if (s.video) s.video.style.objectPosition = pos;
			if (s.kind === "hold" && !reduce) {
				s.img.style.transform = `scale(${(1 + local * 0.035).toFixed(4)})`;
			}
		});

		// ---- textos de cada parada ----
		const RAMP = 0.2;
		panels.forEach((p, i) => {
			const seg = holdSeg[i];
			const pr = clamp((y - seg.start) / (seg.end - seg.start));
			const rise = i === 0 ? 1 : smooth(pr / RAMP);
			let fall;
			if (i === N - 1) {
				// La ultima parada cede paso al resto de la pagina antes de que termine el track.
				const fs = seg.end - vh * 1.55;
				const fe = seg.end - vh * 1.1;
				fall = 1 - smooth((y - fs) / (fe - fs));
			} else {
				fall = smooth((1 - pr) / RAMP);
			}
			const o = Math.min(rise, fall);
			p.style.opacity = o.toFixed(3);
			p.style.transform = reduce ? "none" : `translate3d(0, ${((0.5 - pr) * 24).toFixed(1)}px, 0)`;
			const visible = o > 0.04;
			p.toggleAttribute("inert", !visible);
			p.setAttribute("aria-hidden", visible ? "false" : "true");
		});

		// ---- parada activa (riel, menu, eventos) ----
		const cur = segs[ci];
		const near = clamp(
			cur.kind === "hold" ? cur.i : cur.local > 0.5 ? cur.i + 1 : cur.i,
			0,
			N - 1,
		);
		if (near !== active) {
			active = near;
			dots.forEach((d, k) => {
				d.classList.toggle("is-active", k === near);
				if (k === near) d.setAttribute("aria-current", "step");
				else d.removeAttribute("aria-current");
			});
			document.documentElement.dataset.stop = String(near);
			document.dispatchEvent(new CustomEvent("journey:stop", { detail: { index: near } }));
		}
		const end = total * vh;
		if (bar) bar.style.transform = `scaleX(${clamp(y / end).toFixed(4)})`;
		if (hint) hint.style.opacity = String(clamp(1 - y / (0.4 * vh)));
		root.classList.toggle("is-past", y > end - vh * 0.25);
		ticking = false;
	}

	// ---- scrub de los clips (suavizado + sin cola de seeks) ----
	function raf() {
		const eps = isMobile() ? 0.02 : 0.008;
		for (const s of segs) {
			if (!s.hasClip || !s.ready || !s.video) continue;
			if (s.video.seeking) continue;
			if (!s.visible && Math.abs(s.cur - s.target) < 0.002) continue;
			s.cur += (s.target - s.cur) * (reduce ? 1 : 0.2);
			const dur = s.video.duration || 1;
			const t = clamp(s.cur, 0, 0.999) * dur;
			if (Math.abs(s.video.currentTime - t) > eps) {
				try {
					s.video.currentTime = t;
				} catch (e) {}
			}
		}
		requestAnimationFrame(raf);
	}

	// iOS necesita un gesto antes de pintar un video mudo con seek.
	let userReady = false;
	function prime(v) {
		if (!isMobile() || !v) return;
		try {
			const p = v.play();
			if (p && p.then) p.then(() => v.pause()).catch(() => {});
		} catch (e) {}
	}
	function firstGesture() {
		if (userReady) return;
		userReady = true;
		segs.forEach((s) => prime(s.video));
	}
	window.addEventListener("pointerdown", firstGesture, { once: true, passive: true });
	window.addEventListener("touchstart", firstGesture, { once: true, passive: true });

	// ---- eventos ----
	window.addEventListener(
		"scroll",
		() => {
			if (!ticking) {
				ticking = true;
				requestAnimationFrame(read);
			}
		},
		{ passive: true },
	);
	// En movil el resize se dispara al mostrar/ocultar la barra de URL: solo relayout si cambia el ancho.
	window.addEventListener("resize", () => {
		if (coarse && window.innerWidth === laidOutW) return;
		layout();
	});
	window.addEventListener("orientationchange", layout);
	window.addEventListener("load", layout);

	dots.forEach((d, i) => d.addEventListener("click", () => jumpTo(i)));

	// Enlaces internos (#ancla o /#ancla) que apuntan a una parada.
	const anchors = panels.map((p) => p.id);
	function stopFromHref(href) {
		if (!href) return -1;
		const hash = href.includes("#") ? href.slice(href.indexOf("#") + 1) : "";
		return anchors.indexOf(hash);
	}
	document.addEventListener("click", (e) => {
		const a = e.target instanceof Element ? e.target.closest("a[href]") : null;
		if (!a) return;
		const url = new URL(a.getAttribute("href"), window.location.href);
		if (url.pathname.replace(/\/$/, "") !== window.location.pathname.replace(/\/$/, "")) return;
		const i = stopFromHref(url.hash);
		if (i < 0) return;
		e.preventDefault();
		jumpTo(i);
		history.replaceState(null, "", url.hash);
	});
	window.addEventListener("hashchange", () => {
		const i = stopFromHref(window.location.hash);
		if (i >= 0) jumpTo(i);
	});

	root.classList.add("is-ready");
	layout();
	requestAnimationFrame(raf);
	if (!reduce) loadClip(segs[1]); // el primer clip, de inmediato
	window.setTimeout(preloadInOrder, 600);
	const initial = stopFromHref(window.location.hash);
	if (initial > 0) window.setTimeout(() => jumpTo(initial, true), 50);
}
