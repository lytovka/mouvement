import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: '#343232',
          secondary: '#F5F5F5',
          'primary-content': '#F5F5F5',
          'secondary-content': '#343232'
        }
      }
    ]
  },
  plugins: [require('daisyui')]
}
