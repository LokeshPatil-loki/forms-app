/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      // Primary Colors
      accent: {
        DEFAULT: "var(--color-accent)",
        hover: "var(--color-accent-hover)",
      },
      muted: "var(--color-muted)",

      // Background and Surface
      fill: {
        DEFAULT: "var(--color-fill)",
        muted: "var(--color-fill-muted)",
      },

      // Text Colors
      text: {
        base: "var(--color-text-base)",
        muted: "var(--color-text-muted)",
        inverted: "var(--color-text-inverted)",
      },

      // Button Colors
      button: {
        accent: {
          DEFAULT: "var(--color-button-accent)",
          hover: "var(--color-button-accent-hover)",
        },
        muted: "var(--color-button-muted)",
      },

      // Status Colors
      success: "var(--color-success)",
      error: "var(--color-error)",

      // Borders
      border: {
        muted: "var(--color-border-muted)",
      },
    },
    extend: {
      fontFamily: {
        inter: ["Inter"],
        roboto: ["Roboto"],
        // Make Inter the default sans font
        sans: ["Inter"],
      },
    },
  },
  plugins: [],
};
