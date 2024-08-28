/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        '100': '100',
      },
      transition: {
        'transform': 'transform',
      },
      transform: ['responsive', 'hover', 'focus'],
    },
    screens: {
      'xl': { 'max': '1200px' },
      // => @media (max-width: 1200px) { ... }
      'lg': { 'max': '1080px' },
      // => @media (max-width: 1080px) { ... }
      'md-lg': { 'max': '991px' },
      // => @media (max-width: 991px) { ... }
      'md': { 'max': '767px' },
      // => @media (max-width: 767px) { ... }
      'sm': { 'max': '639px' },
      // => @media (max-width: 639px) { ... }
    }
  },
  plugins: [],
}