/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F5FE0',
        completeBg: '#E9EBF8', 
        completeText: '#4F5FE0',
        pendingBg: '#FCE7E7', 
        pendingText: '#E04F4F',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
      }
    },
  },
  plugins: [],
}
