/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {

      },

      gridTemplateColumns: {
        'board': 'repeat(20, 45px)'
      },

      gridTemplateRows: {
        'board': 'repeat(10, 45px)'
      }
    },
  },
  plugins: [],
}

