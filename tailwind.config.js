export default {
  mode: "jit",
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      xs: '375px',
      sm: '768px',
      md: '1024px',
      lg: '1200px',
      xl: '1440px',
    },
    color: {},
  },
  plugins: [],
}
