/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        dark: '#1B2430',
        primary: {
          light: '#a795b7',
          main: '#8e77a2',
          dark: '#755d88'
        },
        secondary: {
          light: '#c6c486',
          main: '#b5b463',
          dark: '#9c9a4a'
        }
      }
    }
  },
  plugins: [],
  important: true
}
