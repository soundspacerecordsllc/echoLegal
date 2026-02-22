/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Crimson Pro', 'Georgia', 'Times New Roman', 'serif'],
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // Slightly tighter scale for reference/encyclopedia feel
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.625' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'xl': ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
      },
      maxWidth: {
        'prose': '65ch',
        'article': '42rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      colors: {
        // Institutional law-tone palette
        surface: '#FAF9F7',   // warm paper background
        ink: '#1C1917',       // charcoal primary text
        muted: '#57534E',     // warm gray secondary text
        accent: {
          DEFAULT: '#2C4A3E', // deep institutional green — links and underlines only
          hover: '#1E3A2E',   // darkened on hover, not brightened
        },
      },
    },
  },
  plugins: [],
}
