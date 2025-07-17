/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        encode: ['Encode Sans Expanded', 'sans-serif'],
        yanone: ['Yanone Kaffeesatz', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

