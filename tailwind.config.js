const tailwindCfg = {
  content: ['./src/**/*.{js,jsx,ts,tsx,css}'],
  darkMode: 'media',
  theme: {
    extend: {},
    fontFamily: {
      sans: ['M PLUS Code Latin', 'sans-serif'],
    },
    fontWeight: {
      lighter: 100,
      light: 200,
      semilight: 300,
      regular: 400,
      semibold: 500,
      bold: 600,
      bolder: 700,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

module.exports = tailwindCfg;
