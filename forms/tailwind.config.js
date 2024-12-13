/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#7052f2",
          hover: "#5f43da",
        },
        muted: "#ededf2",
        fill: {
          DEFAULT: "#f8f8fb",
          muted: "#ededf2",
        },
        text: {
          inverted: "#ffffff",
          base: "#011056",
          muted: "#7f84a6",
        },
        button: {
          accent: "#7052f2",
          "accent-hover": "#5f43da",
          muted: "#ededf2",
        },
        status: {
          success: "#1bb965",
          error: "#b91b27",
        },
        border: {
          muted: "#e1e3e3",
        },
      },
    },
  },
  plugins: [],
};
