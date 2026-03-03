/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'openclaw': {
          primary: '#6366f1',
          dark: '#1e293b',
          light: '#f1f5f9'
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}