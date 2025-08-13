/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    ".navigation/**/*.{ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Theme
        'background': '#1A202C',
        'surface': '#2D3748',
        'primary': '#4DB6AC',
        'secondary': '#7986CB',
        'text-primary': '#E2E8F0',
        'text-secondary': '#A0AEC0',
        'text-on-primary': '#1A202C',
        'text-on-secondary': '#1A202C',
        'disabled': '#525252',
      },
    },
  },
  plugins: [],
}

