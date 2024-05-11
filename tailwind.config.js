/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // that is animation class
      animation: {
        fade: 'fadeIn 1s ease-in-out',
        fadeOut: 'fadeOut 0.5s ease-in-out',
      },

      // that is actual animation
      keyframes: theme => ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        }
      }),
      fontFamily:{
        // 'borel':['"Borel"', 'cursive']
      }
    },
  },
  plugins: [],
}

