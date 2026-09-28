/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        atelier: {
          950: '#08080a',
          900: '#0e0e12',
          850: '#141418',
          800: '#1a1a20',
          700: '#272730',
          600: '#3a3a46',
          500: '#525260',
          400: '#848496',
          300: '#a8a8b8',
          200: '#d0d0dc',
          100: '#eaeaf2',
          50: '#f8f8fa'
        },
        gold: {
          DEFAULT: '#c5a880',
          50: '#faf6f0',
          100: '#f4ede1',
          200: '#e8d9c2',
          300: '#dcc5a3',
          400: '#d0b285',
          500: '#c5a880',
          600: '#aa8c64',
          700: '#8f7049',
          800: '#735532',
          900: '#583f21'
        },
        champagne: '#e9dfd0'
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Playfair Display"', 'Didot', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'luxury-gold': '0 10px 30px -10px rgba(197, 168, 128, 0.25)',
        'inner-glow': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)'
      },
      letterSpacing: {
        'luxury': '0.25em',
        'widest': '0.35em'
      }
    },
  },
  plugins: [],
}
