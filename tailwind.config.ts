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
        ink: "#0B1B2B",
        deep: "#12324D",
        blue: "#1E5A8A",
        sky: "#5FA8D3",
        mist: "#EAF2F8",
        paper: "#FBFCFD",
        line: "#D7E3ED",
        gold: "#B99770",
        grey: "#5C6B78",
        green: "#2f9e6f",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-cormorant)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
