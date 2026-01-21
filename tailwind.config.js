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
        'legal-navy': '#0A1628',
        'legal-navy-light': '#1a2942',
        'legal-gold': '#D4AF37',
        'legal-gold-light': '#E5C158',
        'legal-gray': '#4A5568',
        'legal-gray-light': '#E2E8F0',
      },
      fontFamily: {
        'serif': ['Crimson Pro', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
