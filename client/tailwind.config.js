/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./*.html"
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary:"var(--bg-primary)", //#0e0c16
        secondary:"var(--bg-secondary)",//  #0d0b20
        white: 'var(--white)',
        black: 'var(--black)',
        gray: {
          50: 'var(--gray-50)',
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          750: 'var(--gray-750)',
          800: 'var(--gray-800)',
          900: 'var(--gray-900)',
          950: 'var(--gray-950)',
        },
        red: {
          500: 'var(--red-500)',
          700: 'var(--red-700)',
        },
        'brand-purple': 'var(--brand-purple)',
      },
      textColor: {
        white: 'var(--white)',
        black: 'var(--black)',
        
        gray: {
          50: 'var(--gray-50)',
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          750: 'var(--gray-750)',
          800: 'var(--gray-800)',
          900: 'var(--gray-900)',
          950: 'var(--gray-950)',
        },
        red: {
          500: 'var(--red-500)',
          700: 'var(--red-700)',
        },
        'brand-purple': 'var(--brand-purple)',
      },
      fontFamily:{
        roboto:"Roboto"
      }
    },
  },
  plugins: [],
}
