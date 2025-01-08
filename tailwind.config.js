import {withTV} from 'tailwind-variants/transformer';
import defaultTheme from 'tailwindcss/defaultTheme';
import uiIngredients from 'ui-ingredients-plugin-tailwindcss';

/** @type {import('tailwindcss').Config} */
export default withTV({
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ["'Inter'", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [uiIngredients],
});
