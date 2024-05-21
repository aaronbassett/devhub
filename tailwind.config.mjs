import polkadotBrandColors from "./src/config/polkadot-brand-colors"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector", '[data-mode="dark"]'],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        accent: polkadotBrandColors.pink,
        primary: polkadotBrandColors.pink,
        ...polkadotBrandColors,
      },
      fontFamily: {
        display: "unbounded, ui-serif",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("flowbite-typography")],
}
