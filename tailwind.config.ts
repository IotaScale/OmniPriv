import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00B8FF",
          50: "#E6F9FF",
          100: "#CCF2FF",
          200: "#99E5FF",
          300: "#66D9FF",
          400: "#33CCFF",
          500: "#00B8FF",
          600: "#0090CC",
          700: "#006899",
          800: "#004066",
          900: "#001833",
        },
        dark: {
          DEFAULT: "#030711",
          50: "#0A1628",
          100: "#0D1E36",
          200: "#102644",
          300: "#133052",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(0,184,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,255,0.05) 1px, transparent 1px)",
        "card-glow":
          "radial-gradient(ellipse at top left, rgba(0,184,255,0.12) 0%, transparent 60%)",
        "cyan-radial":
          "radial-gradient(ellipse at center, rgba(0,184,255,0.15) 0%, transparent 70%)",
        "page-gradient":
          "linear-gradient(180deg, #030711 0%, #0A1628 30%, #030711 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "marquee": "marquee 35s linear infinite",
        "float": "float 4s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "border-anim": "borderAnim 4s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,184,255,0.25)" },
          "50%": { boxShadow: "0 0 50px rgba(0,184,255,0.6)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        borderAnim: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
