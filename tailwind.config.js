import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{html,js,svelte,ts}'],
  safelist: ['dark'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        sans: [...fontFamily.sans]
      },
      fontSize: {
        // 1rem = 16px
        /** 80px size / 84px high / bold */
        mega: ['5rem', { lineHeight: '5.25rem', fontWeight: '700' }],
        /** 56px size / 62px high / bold */
        h1: ['3.5rem', { lineHeight: '3.875rem', fontWeight: '700' }],
        /** 40px size / 48px high / bold */
        h2: ['2.5rem', { lineHeight: '3rem', fontWeight: '700' }],
        /** 32px size / 36px high / bold */
        h3: ['2rem', { lineHeight: '2.25rem', fontWeight: '700' }],

        /** 32px size / 36px high / normal */
        'body-2xl': ['2rem', { lineHeight: '2.25rem' }],
        /** 28px size / 36px high / normal */
        'body-xl': ['1.75rem', { lineHeight: '2.25rem' }],
        /** 24px size / 32px high / normal */
        'body-lg': ['1.5rem', { lineHeight: '2rem' }],
        /** 20px size / 28px high / normal */
        'body-md': ['1.25rem', { lineHeight: '1.75rem' }],
        /** 16px size / 20px high / normal */
        'body-sm': ['1rem', { lineHeight: '1.25rem' }],
        /** 14px size / 18px high / normal */
        'body-xs': ['0.875rem', { lineHeight: '1.125rem' }],
        /** 12px size / 16px high / normal */
        'body-2xs': ['0.75rem', { lineHeight: '1rem' }],

        /** 18px size / 24px high / semibold */
        caption: ['1.125rem', { lineHeight: '1.5rem', fontWeight: '600' }],
        /** 12px size / 16px high / bold */
        button: ['0.75rem', { lineHeight: '1rem', fontWeight: '700' }]
      }
    }
  }
}

export default config
