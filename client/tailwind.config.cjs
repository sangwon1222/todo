/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: true,
  theme: {
    extend: {
      gridTemplateColumns: {
        4: 'repeat(4, auto)',
        footer: '200px minmax(900px, 1fr) 100px',
      },
    },
  },
  plugins: [],
}
