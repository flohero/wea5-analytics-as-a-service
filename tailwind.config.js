module.exports = {
  mode: "jit",
  purge: {
    enabled: false,
    content: ['./src/**/*.{html,ts}']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'atkinson': ['Atkinson\\ Hyperlegible', 'sans-serif'],
      'rubik': ['Rubik', 'sans-serif'],
      //'MyFont': ['"My Font"', 'serif'] // Ensure fonts with spaces have " " surrounding it.
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
