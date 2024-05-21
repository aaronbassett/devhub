import polkadotBrandColors from "./src/config/polkadot-brand-colors"

/** @type {import('tailwindcss').Config} */
export default {
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
  plugins: [require("flowbite/plugin")],
}
