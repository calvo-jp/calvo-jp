import {withTV} from 'tailwind-variants/transformer';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default withTV({
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ["'Inter'", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      data: {
        open: 'state="open"',
        closed: 'state="closed"',
        invalid: 'invalid',
      },
    },
  },
  plugins: [],
});
