/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        title: "var(--color-title)",
        subtitle: "var(--color-subtitle)",
        info: "var(--color-info-bg)",
        border: "var(--color-border)",
        button: "var(--color-button-bg)",
        footer: "var(--color-footer)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        title: ["var(--font-title)", "serif"],
        subtitle: ["var(--font-subtitle)", "cursive"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
