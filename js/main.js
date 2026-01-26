// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");

if (mobileMenuBtn && mobileMenu && menuIcon) {
  mobileMenuBtn.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden");
    menuIcon.textContent = isHidden ? "close" : "menu";
    mobileMenuBtn.setAttribute("aria-expanded", isHidden ? "true" : "false");
  });

  // Close menu when clicking a link
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuIcon.textContent = "menu";
      mobileMenuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// Parallax effect initialization (defer to idle to reduce LCP impact)
const initParallax = () => {
  const parallaxImage = document.getElementById("parallax-about");
  if (parallaxImage && typeof simpleParallax !== "undefined") {
    new simpleParallax(parallaxImage, {
      scale: 1.3,
      delay: 0.6,
      orientation: "up",
      transition: "cubic-bezier(0,0,0,1)",
    });
  }
};

window.addEventListener("load", () => {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(initParallax, { timeout: 2000 });
  } else {
    setTimeout(initParallax, 800);
  }
});

// WhatsApp floating button (global)
(() => {
  const WHATSAPP_NUMBER = "573043978157";
  const DEFAULT_TEXT =
    "Hola KOR Bytes, quiero información sobre desarrollo de software a medida e integraciones.";

  const buildUrl = () => {
    const text = encodeURIComponent(DEFAULT_TEXT);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  };

  const ensureStyles = () => {
    if (document.getElementById("kb-wa-fab-styles")) return;
    const style = document.createElement("style");
    style.id = "kb-wa-fab-styles";
    style.textContent = `
      .kb-wa-fab {
        position: fixed;
        right: 18px;
        bottom: 18px;
        width: 64px;
        height: 64px;
        border-radius: 9999px;
        background: #25D366;
        color: white;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 12px 24px rgba(0,0,0,.25);
        z-index: 9999;
        text-decoration: none;
        transform: translateZ(0);
      }
      .kb-wa-fab:hover { filter: brightness(0.95); }
      .kb-wa-fab:focus { outline: 3px solid rgba(160,0,109,.45); outline-offset: 4px; }
      @media (max-width: 640px) {
        .kb-wa-fab { right: 14px; bottom: 14px; }
      }
    `;
    document.head.appendChild(style);
  };

  const mount = () => {
    // Avoid duplicates
    if (document.querySelector(".kb-wa-fab")) return;

    ensureStyles();

    const a = document.createElement("a");
    a.className = "kb-wa-fab";
    a.href = buildUrl();
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("aria-label", "Escribir por WhatsApp a KOR Bytes");

    // WhatsApp icon (SVG)
    a.innerHTML = `
      <svg width="36" height="36" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M19.11 17.53c-.28-.14-1.64-.81-1.89-.9-.25-.09-.44-.14-.62.14-.19.28-.71.9-.87 1.08-.16.19-.32.21-.6.07-.28-.14-1.16-.43-2.21-1.37-.82-.73-1.38-1.64-1.54-1.91-.16-.28-.02-.43.12-.57.12-.12.28-.32.41-.48.14-.16.19-.28.28-.46.09-.19.05-.35-.02-.49-.07-.14-.62-1.5-.85-2.06-.22-.53-.45-.46-.62-.47l-.53-.01c-.19 0-.49.07-.74.35-.25.28-.97.95-.97 2.31 0 1.36.99 2.67 1.13 2.86.14.19 1.95 2.98 4.73 4.18.66.29 1.17.46 1.57.59.66.21 1.26.18 1.74.11.53-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/>
        <path fill="currentColor" d="M16.02 5.33c-5.89 0-10.69 4.79-10.69 10.69 0 1.89.5 3.73 1.46 5.35L5.33 26.67l5.42-1.42c1.57.86 3.35 1.31 5.27 1.31h.01c5.89 0 10.69-4.79 10.69-10.69 0-2.86-1.11-5.54-3.14-7.56-2.02-2.02-4.7-3.14-7.56-3.14zm0 19.43h-.01c-1.7 0-3.37-.46-4.82-1.34l-.35-.21-3.21.84.86-3.13-.23-.36a8.9 8.9 0 0 1-1.37-4.76c0-4.91 3.99-8.9 8.9-8.9 2.38 0 4.61.93 6.29 2.61a8.84 8.84 0 0 1 2.61 6.29c0 4.91-3.99 8.9-8.67 8.96z"/>
      </svg>
    `;

    document.body.appendChild(a);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
