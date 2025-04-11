/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./src/**/*.{html,vue,js}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Roboto Mono"', 'monospace']
      }
    }
  },
  plugins: []
}

