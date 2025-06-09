/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        propertyradar: {
          blue: '#1f77b8',
          lightblue: '#45a6dd',
          darkblue: '#2d4670',
          cyan: '#8fe7ff',
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#1f77b8',
          600: '#2d4670',
          700: '#1e3a5f',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      borderRadius: {
        'propertyradar': '30px',
      },
    },
  },
  plugins: [],
}