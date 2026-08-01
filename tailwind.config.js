/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A1628',
          light: '#1E3A5F',
        },
        brand: {
          orange: '#E8601C',
          'orange-dark': '#C94D10',
        },
        steel: '#8A9BB0',
        ink: {
          DEFAULT: '#0A1628',
          2: '#0E1E33',
        },
        blueprint: '#3E5C7E',
        chalk: '#E8EDF2',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-saira)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
