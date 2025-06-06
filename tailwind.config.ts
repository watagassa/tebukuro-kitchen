import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "orange-primary": "#fffbf4",
        "orange-secondary": "#fef9ec",
      },
      screens: {
        button: "320px",
        "image-mid": { raw: "(max-height: 550px)" },
        "image-sml": { raw: "(max-height: 380px)" },
      },
    },
  },
  plugins: [],
};
export default config;
