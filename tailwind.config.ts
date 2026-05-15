import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        panel: "#141414",
        panel2: "#1a1a1a",
        panel3: "#1e1e1e",
        border: "#2a2a2a",
        accent: "#c8773a",
        accentHover: "#d68a4f",
        muted: "#888888",
        soft: "#d4d4d4",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
