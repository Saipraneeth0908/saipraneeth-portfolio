import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          base: "#070b14",
          deep: "#0b1020",
          surface: "#11182a",
          raised: "#162033",
          line: "#263247",
        },
        copy: {
          primary: "#f4f7fb",
          secondary: "#a9b4c7",
          muted: "#7d8799",
        },
        accent: {
          blue: "#36c5f0",
          cyan: "#5ff6e8",
          violet: "#9b8cff",
          green: "#69db9c",
          gold: "#e6b86a",
        },
      },
      boxShadow: {
        glow: "0 0 34px rgba(54, 197, 240, 0.24)",
        panel: "0 24px 80px rgba(0, 0, 0, 0.38)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "radial-grid":
          "radial-gradient(circle at 20% 20%, rgba(54,197,240,.16), transparent 28%), radial-gradient(circle at 80% 10%, rgba(155,140,255,.14), transparent 25%), radial-gradient(circle at 50% 80%, rgba(95,246,232,.08), transparent 30%)",
      },
    },
  },
  plugins: [],
};

export default config;
