import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Brand ── */
        primary: {
          DEFAULT: "#6366F1",
          50:  "#EEEEFF",
          100: "#D8D9FE",
          200: "#B4B5FD",
          300: "#8F91FC",
          400: "#7476F9",
          500: "#6366F1",
          600: "#4446D4",
          700: "#3032A8",
          800: "#1F207C",
          900: "#111250",
        },
        accent: {
          DEFAULT: "#A78BFA",
          dark:    "#7C3AED",
        },
        success: "#22C55E",
        warning: "#F59E0B",
        danger:  "#EF4444",
        /* ── Neutrals ── */
        dark: {
          DEFAULT: "#07070E",
          50:  "#0E0E1C",
          100: "#13132A",
          200: "#1A1A38",
          300: "#222244",
        },
      },
      fontFamily: {
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        mono:    ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "marquee":    "marquee 35s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "blink":      "blink 1.2s step-start infinite",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
      boxShadow: {
        "card":         "0 1px 3px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
        "card-hover":   "0 4px 20px rgba(0,0,0,0.8), 0 0 0 1px rgba(99,102,241,0.25)",
        "primary":      "0 0 0 3px rgba(99,102,241,0.3)",
        "inset-top":    "inset 0 1px 0 rgba(255,255,255,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
