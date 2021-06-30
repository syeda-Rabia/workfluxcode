module.exports = {
  purge: {
    mode: "layers",
    content: [
      "src/**/*.js",
      "src/**/*.jsx",
      "src/**/*.ts",
      "src/**/*.tsx",
      "public/**/*.html",
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      black: "#000",
      white: "#fff",

      blue: {
        DEFAULT: "#2B7AE4",
        light: "#C8DDF8",
        lightest: "#FAFBFD",
      },

      gray: {
        DEFAULT: "#616162",
        dark: "#484848",
        darkest: "#292929",
        "gray-1": "#D7D7D7",
        "gray-2": "#8F8F8F",
        "gray-3": "#ABABAB",
      },
    },
    screens: {
      xs: { max: "380px" },
      sm: { max: "576px" },
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
