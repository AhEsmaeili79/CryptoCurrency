export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          lg: "1440px",
          md: "1440px",
          sm: "100%",
        },
      },
      colors: {
        gray: {
          50: "#FAFDFF",
          100: "#BFCCD3",
          300: "#99A3A9",
          400: "#4C5254",
          400: "#737B7F",
          800: "#2E3133",
        },
        blue: {
          primary: "#2150F5",
          50: "#E9F7FD",
          100: "#DAE9F0",
          200: "#E5F5FD",
          300: "#C3D3FE",
          400: "#B5C5FC",
          500: "#466DF7",
          700: "#1C43CC",
          800: "#1635A3",
          900: "#071031",
        },
        red: {
          primary: "#F53A21",
          300: "#FCBDB5",
          500: "#F87C6B",
          700: "#F75B46",
        },
        yellow: {
          primary: "#FFF110",
          800: "#E8B229",
        },
        orange: {
          primary: "#E5AE1F",
        },
        green: {
          primary: "#18CE2A",
        },
      },
      fontSize: {
        14: "14px",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1100px",
        xl: "1330px",
        "2xl": "1536px",
      },
      zIndex: {
        1: 1,
      },
    },
  },
  plugins: [
    {
      '@tailwindcss/line-clamp': {},
    },
  ],
};
