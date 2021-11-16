module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.tsx',
    './src/widgets/**/*.tsx',
    './src/layouts/**/*.tsx',
  ],
  darkMode: 'media',
  theme: {
    extend: {},
    fontFamily: {
      sans: ['M PLUS Code Latin', 'sans-serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
