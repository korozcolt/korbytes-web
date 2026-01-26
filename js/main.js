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

// Parallax effect initialization
document.addEventListener("DOMContentLoaded", () => {
  const parallaxImage = document.getElementById("parallax-about");
  if (parallaxImage && typeof simpleParallax !== "undefined") {
    new simpleParallax(parallaxImage, {
      scale: 1.3,
      delay: 0.6,
      orientation: "up",
      transition: "cubic-bezier(0,0,0,1)",
    });
  }
});
