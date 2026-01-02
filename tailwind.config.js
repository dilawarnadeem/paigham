/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        marquee_Ltr: 'marquee_Ltr 45s linear infinite',
        marquee_Rtl: 'marquee_Rtl 45s linear infinite',
        scaleIn: 'scaleIn 2s ease-in-out  infinite',
      },
      keyframes: {
        marquee_Ltr: {
          '100%': { transform: 'translateX(100%)' },
          '0%': { transform: 'translateX(-100%)' },
        },
        marquee_Rtl: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
          scaleIn: {
          '0%': { transform: 'scale(0.8)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      colors: {
        primary: `var(--primary)`,
        secondary: `var(--secondary)`,
        orange: `var(--orange)`,
        lightgray: `var(--lightgray)`,
        pure: `var(--pure)`,
        darkgray: `var(--darkgray)`,
        blue: `var(--blue)`,
      },
      fontFamily: {
        'anton': `var(--anton)`,
      },
      fontFamily: {
        'anton': `var(--montserrat)`,
        'metapro': `var(--montserrat)`,
        'montserrat': `var(--montserrat)`,
        'mehr': `var(--mehr)`,
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
