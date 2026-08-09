import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          base: "#0a0b0f",
          surface: "#101219",
          raised: "#161923",
          line: "#242835",
        },
        copy: {
          primary: "#e9edf5",
          secondary: "#a2abbd",
          muted: "#767f92",
        },
        accent: {
          DEFAULT: "#4c9fff",
          soft: "#8dc2ff",
          dim: "rgba(76, 159, 255, 0.14)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        prose: "68ch",
      },
      keyframes: {
        "rise-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        "rise-in": "rise-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
