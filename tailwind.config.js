/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#e6f3ff',
          100: '#b3d9ff',
          200: '#80bfff',
          300: '#4da6ff',
          400: '#1a8cff',
          500: '#0066e6',
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001433',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'blue-glow': 'linear-gradient(135deg, #0066e6 0%, #1a8cff 25%, #4da6ff 50%, #1a8cff 75%, #0066e6 100%)',
        'blue-shine': 'linear-gradient(45deg, #003d99 0%, #0052cc 25%, #0066e6 50%, #1a8cff 75%, #4da6ff 100%)',
      },
      boxShadow: {
        'blue-glow': '0 0 20px rgba(26, 140, 255, 0.3)',
        'blue-glow-lg': '0 0 40px rgba(26, 140, 255, 0.4)',
      },
    },
  },
  plugins: [],
};