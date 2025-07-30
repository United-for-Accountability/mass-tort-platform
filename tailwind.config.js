/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Include global stylesheets
    "./styles/**/*.css",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
