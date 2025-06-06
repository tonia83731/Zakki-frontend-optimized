/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust if your files are in a different directory
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1EBA4B",
        primary_80: "rgb(30, 186, 75, .8)",
        primary_60: "rgb(30, 186, 75, .6)",
        primary_40: "rgb(30, 186, 75, .4)",
        primary_20: "rgb(30, 186, 75, .2)",

        green_hover: "#8FDDA5",
        green_focus: "#0A3E19",
        green_focus_80: "rgb(10, 62, 25, .8)",
        green_border: "#0F5D25",
        green_surface: "#D2F1DB",
        disabled: "#C2C2C2",

        light: "#FFFFFF",
        light_80: "rgb(255, 255, 255, .8)",
        light_60: "rgb(255, 255, 255, .6)",
        light_40: "rgb(255, 255, 255, .4)",
        light_20: "rgb(255, 255, 255, .2)",

        dark: "#0A0A0A",
        dark_80: "rgb(10, 10, 10, .8)",
        dark_60: "rgb(10, 10, 10, .6)",
        dark_40: "rgb(10, 10, 10, .4)",
        dark_20: "rgb(10, 10, 10, .2)",

        neutral_90: "#404040",
        neutral_80: "#616161",
        neutral_70: "#757575",
        neutral_60: "#9E9E9E",

        neutral_40: "#E0E0E0",
        neutral_30: "#EDEDED",
        neutral_20: "#F5F5F5",

        warning: "#F6B840",
        error: "#BA4B1E",
        success: "#1EBA99",

        blue_light: "#1E3FBA",
        blue_dark: "#2E2381",

        skin: "#FFEDDF",
      },
    },
  },
  plugins: [],
};
