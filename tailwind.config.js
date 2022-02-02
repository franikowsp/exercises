const colors = require("tailwindcss/colors");

const teal = {
  50: "#ddfafc",
  100: "#baf6fa",
  200: "#98f1f7",
  300: "#76ecf5",
  400: "#54e7f2",
  500: "#31e3ef",
  600: "#12dcea",
  700: "#0fbbc8",
  800: "#0d9ba5",
  900: "#0a7b83",
};

const mediumseagreen = {
  50: "#e7f9f2",
  100: "#cff3e5",
  200: "#b7edd8",
  300: "#9fe7ca",
  400: "#87e1bd",
  600: "#6fdbb0",
  500: "#57d5a3",
  700: "#3fcf96",
  800: "#30c087",
  900: "#2aa876",
};

const goldenrod = {
  50: "#fffbf0",
  100: "#fff6e0",
  200: "#fff2d1",
  300: "#ffedc1",
  400: "#ffe9b2",
  500: "#ffe4a3",
  600: "#ffdf93",
  700: "#ffdb84",
  800: "#ffd674",
  900: "#ffd265",
};

const sandybrown = {
  50: "#fef5f0",
  100: "#fcebe0",
  200: "#fbe1d1",
  300: "#f9d7c1",
  400: "#f8cdb2",
  500: "#f7c4a3",
  600: "#f5ba93",
  700: "#f4b084",
  800: "#f2a674",
  900: "#f19c65",
};

const indianred = {
  50: "#faedec",
  100: "#f5dbda",
  200: "#f0cac7",
  300: "#ebb8b5",
  400: "#e7a6a2",
  500: "#e2948f",
  600: "#dd827d",
  700: "#d8716a",
  800: "#d35f58",
  900: "#ce4d45",
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      teal,
      mediumseagreen,
      goldenrod,
      sandybrown,
      indianred,
      purple: colors.purple,
      gray: colors.gray,
      slate: colors.slate,
    },
    extend: {},
  },
  plugins: [],
};
