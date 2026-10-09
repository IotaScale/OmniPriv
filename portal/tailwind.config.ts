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
          DEFAULT: "#00B8DB",
          50: "#E6F9FF",
          100: "#CCF2FF",
          200: "#99E5FF",
          300: "#66D9FF",
          400: "#33CCFF",
          500: "#00B8DB",
          600: "#00869F",
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
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
