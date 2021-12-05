module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        "form-primary": {
          light: "#78bbe0",
          medium: "#2684ff",
          dark: "#004e79",
        },
        "form-neutral": {
          light: "#ffffff",
          medium: "#f6f6f6",
          dark: "#eaeaea",
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
