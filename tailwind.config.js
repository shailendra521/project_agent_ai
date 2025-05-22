/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'hrone': {
          50: '#e6f0ed',
          100: '#cce1db',
          200: '#99c3b7',
          300: '#66a593',
          400: '#33876f',
          500: '#02563D',
          600: '#024e37',
          700: '#024731',
          800: '#013f2b',
          900: '#013725',
        }
      }
    },
  },
  plugins: [],
};