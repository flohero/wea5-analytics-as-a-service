module.exports = {
  mode: "jit",
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // that is animation class
      animation: {
        'fade-out': 'fadeOut 5s ease-in-out',
      },

      // that is actual animation
      keyframes: {
        fadeOut: {
          '0%': {backgroundColor: 'currentColor'},
          '100%': {
            backgroundColor: 'transparent',
            'z-index': -10,
            display: 'none',
          },
        },
      }
    },
    fontFamily: {
      'atkinson': ['Atkinson\\ Hyperlegible', 'sans-serif'],
      'rubik': ['Rubik', 'sans-serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
