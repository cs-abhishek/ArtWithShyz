/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bodoni': ['Bodoni Moda', 'serif'],
        'cormorant': ['Cormorant Garamond', 'serif'],
        'sans': ['Cormorant Garamond', 'serif'], // Set as default sans font
        'serif': ['Cormorant Garamond', 'serif'], // Set as default serif font
      },
    },
  },
  plugins: [],
}
