/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#1a1a1a', // Deep charcoal - gray-900
        'secondary': '#2d2d2d', // Elevated surface - gray-800
        'accent': '#ffdb00', // Electric yellow - yellow-400
        'accent-hover': '#e6c500', // Darker yellow for hover states - yellow-500
        
        // Background Colors
        'background': '#0f0f0f', // True dark background - gray-950
        'surface': '#242424', // Card backgrounds - gray-700
        'surface-hover': '#2a2a2a', // Lighter surface for hover - gray-600
        
        // Text Colors
        'text-primary': '#ffffff', // Pure white - white
        'text-secondary': '#b3b3b3', // Muted text - gray-400
        
        // Status Colors
        'success': '#00ff88', // Bright green - green-400
        'warning': '#ff8800', // Orange - orange-500
        'error': '#ff4444', // Clear red - red-500
        
        // Border and Shadow
        'border': 'rgba(255, 255, 255, 0.1)', // Subtle border - white with opacity
      },
      fontFamily: {
        'heading': ['Orbitron', 'sans-serif'], // Futuristic geometric typeface
        'body': ['Inter', 'sans-serif'], // Contemporary sans-serif
        'caption': ['Roboto Mono', 'monospace'], // Monospace for technical specs
        'data': ['JetBrains Mono', 'monospace'], // Highly legible monospace
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'scale-tap': 'scale-tap 150ms cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in': 'fade-in 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slide-up 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        'scale-tap': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0.95)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      boxShadow: {
        'neon': '0 4px 20px rgba(255, 219, 0, 0.1)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        '110': '110',
        '200': '200',
        '300': '300',
      },
      transitionTimingFunction: {
        'racing': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '250': '250ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}