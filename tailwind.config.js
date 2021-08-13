module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        jellyfish: "url('jellyfish.jpg')",
      }),
      keyframes: {
        sliding: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': {transform: 'translateX(0%)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      animations: {
        sliding: 'sliding 2s linear',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
