/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070809',
          900: '#0A0C0F',
          850: '#0E1115',
          800: '#13171C',
          750: '#181D23',
          700: '#1F252D',
          650: '#272F38',
          600: '#323B45',
        },
        volt: {
          DEFAULT: '#D4FF3E',
          300: '#E4FF85',
          400: '#D4FF3E',
          500: '#C2F02A',
          600: '#A9D81C',
        },
        iris: { DEFAULT: '#7C5CFF', 400: '#9B82FF', 600: '#6541F0' },
        aqua: { DEFAULT: '#22D3EE', 400: '#5BE3F5' },
        coral: '#FB7185',
        amber: '#FBBF24',
        mint: '#34D399',
        fg: '#F3F6F9',
        mut: '#9AA4B0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(212,255,62,0.20), 0 8px 30px -8px rgba(212,255,62,0.35)',
        'glow-iris': '0 10px 40px -12px rgba(124,92,255,0.55)',
        card: '0 12px 40px -16px rgba(0,0,0,0.7)',
        soft: '0 6px 24px -12px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'ai-grad': 'linear-gradient(135deg, #7C5CFF 0%, #22D3EE 100%)',
        'volt-grad': 'linear-gradient(135deg, #E4FF85 0%, #D4FF3E 50%, #A9D81C 100%)',
        'fade-up': 'linear-gradient(to top, rgba(7,8,9,0.96) 8%, rgba(7,8,9,0) 60%)',
      },
      keyframes: {
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s infinite',
        'pulse-ring': 'pulse-ring 1.8s cubic-bezier(0.2,0.6,0.4,1) infinite',
        float: 'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
