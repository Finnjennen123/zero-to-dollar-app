import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "primary-coral": "#E8735A",
        "primary-coral-hover": "#D8614A",
        "soft-sage": "#8BA888",
        "golden-amber": "#D4A853",
        "text-primary": "#1A1A1A",
        "text-secondary": "#4A4A4A",
        "text-muted": "#7A7A7A",
        "bg-cream": "#FBF8F4",
        "dashboard-bg": "#F8F6F3",
        "border-base": "#E8E4DF",
        error: "#D94F4F",
        success: "#5BA85B",
      },
      fontFamily: {
        display: ["var(--font-instrument-serif)", "serif"],
        sans: ["var(--font-plus-jakarta)", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};

export default config;
