module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      padding: {
        xs: '1rem',
        sm: '1rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4.5rem',
      },
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
    extend: {
      fontFamily: {
        sans: ['Poppins'],

        poppins: "'Poppins', sans-serif",
        jost: "'Jost', sans-serif",
        oxanium: "'Oxanium', sans-serif",
        blome: "'Blome', sans-serif",

        sans_serif: 'sans-serif',
        sf_pro: 'SF Pro Display',
        nebula: 'Nebula',
        blank_space: 'Blank Space',
        Elemental_End: ['Elemental-End', 'sans-serif'],
      },
      colors: {
        primary: '#2563eb',
        secondary: '#a855f7',
      },
    },
  },
  plugins: [],
}
