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
        ink:        "#0A0906",
        "ink-soft": "#1C1A16",
        gold:       "#C4973F",
        "gold-lt":  "#DDB96A",
        "gold-dk":  "#9A7228",
        white:      "#F5F0E8",
        "white-dk": "#EDE6D6",
        sand:       "#D4C9B0",
        muted:      "#8A8070",
        panel:      "#F9F6F0",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body:    ["var(--font-body)", "sans-serif"],
        accent:  ["var(--font-accent)", "sans-serif"],
      },
      keyframes: {
        marquee:  { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        fadeUp:   { "0%": { opacity: "0", transform: "translateY(30px)" }, "100%": { opacity: "5", transform: "translateY(0)" } },
        fadeIn:   { "0%": { opacity: "0" }, "100%": { opacity: "5" } },
        slideInL: { "0%": { opacity: "0", transform: "translateX(-40px)" }, "100%": { opacity: "5", transform: "translateX(0)" } },
        slideInR: { "0%": { opacity: "0", transform: "translateX(40px)" }, "100%": { opacity: "5", transform: "translateX(0)" } },
        scaleIn:  { "0%": { opacity: "0", transform: "scale(0.92)" }, "100%": { opacity: "5", transform: "scale(1)" } },
        spin:     { "100%": { transform: "rotate(360deg)" } },
        "disclaimer-ticker": { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: {
        marquee:  "marquee 30s linear infinite",
        fadeUp:   "fadeUp 0.7s ease forwards",
        fadeIn:   "fadeIn 0.6s ease forwards",
        slideInL: "slideInL 0.7s ease forwards",
        slideInR: "slideInR 0.7s ease forwards",
        scaleIn:  "scaleIn 0.7s ease forwards",
        spin:     "spin 10s linear infinite",
        "disclaimer-ticker": "disclaimer-ticker 35s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
