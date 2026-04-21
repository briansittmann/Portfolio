/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:                   'rgb(var(--color-primary) / <alpha-value>)',
        background:                'rgb(var(--color-background) / <alpha-value>)',
        'on-background':           'rgb(var(--color-on-background) / <alpha-value>)',
        'on-surface':              'rgb(var(--color-on-surface) / <alpha-value>)',
        'on-surface-variant':      'rgb(var(--color-on-surface-variant) / <alpha-value>)',
        'surface-container':       'rgb(var(--color-surface-container) / <alpha-value>)',
        'surface-container-high':  'rgb(var(--color-surface-container-high) / <alpha-value>)',
        'surface-container-highest':'rgb(var(--color-surface-container-highest) / <alpha-value>)',
        'surface-container-low':   'rgb(var(--color-surface-container-low) / <alpha-value>)',
        'outline-variant':         'rgb(var(--color-outline-variant) / <alpha-value>)',
        'on-primary':              'rgb(var(--color-on-primary) / <alpha-value>)',
        'on-primary-fixed':        'rgb(var(--color-on-primary-fixed) / <alpha-value>)',
      },
      fontFamily: {
        headline: ['Inter', 'sans-serif'],
        body:     ['Inter', 'sans-serif'],
        label:    ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg: '1.5rem',
        xl: '2.5rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
}
