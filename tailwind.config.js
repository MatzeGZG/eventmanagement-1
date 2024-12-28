/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'fjs-gold': '#D4AF37',
        'fjs-dark-gold': '#8B7355',
        'fjs-light-gold': '#F4D03F',
        'fjs-charcoal': '#1A1A1A',
        'fjs-silver': '#E0E0E0',
        'fjs-pearl': '#FFFFFF',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(to right, #8B7355, #D4AF37)',
        'gradient-dark': 'linear-gradient(to bottom, #1A1A1A, #121212)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};