const plugin = require("tailwindcss/plugin")

/** @type {import('tailwindcss').Config} */
module.exports = {
  // mode: "jit",
  content: [
    "./src/**/*.jsx",
    "./src/**/*.js",
    "./src/**/*.tsx",
    "./src/**/*.ts",
    "./src/**/*.mdx",
    "./src/**/*.md",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(({ addBase }) => {
      addBase({
        "a:hover": {
          "@apply underline": {},
        },
      })
    }),
  ],
}
