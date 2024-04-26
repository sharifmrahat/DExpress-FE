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
        primary: "#ff3f39",
        accent: "#ffffff",
        secondary: "#0f1b24",
        tertiary: "#d9b995",
        background: "#f0f3f7",
      },
    },
  },
  plugins: [],
};
export default config;
