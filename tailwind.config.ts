import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#f6f7f9",
        panel: "#ffffff",
        panel2: "#f3f4f6",
        panel3: "#e9ecef",
        border: "#e5e7eb",
        accent: "#E8711A",
        accentHover: "#cf6415",
        muted: "#6b7280",
        soft: "#374151",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
