/* Tailwind CDN config */
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#A0006D",
        "kor-blue": "#2E3696",
        "background-light": "#F8F9FA",
        "background-dark": "#0B0B0B",
        "card-dark": "#161616",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
    },
  },
};
