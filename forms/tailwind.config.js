/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      primary: "var(--color-primary)",
      "on-primary": "var(--color-on-primary)",
      "surface-muted": "var(--color-surface-muted)",
      "text-primary": "var(--color-text-primary)",
      "text-muted": "var(--color-text-muted)",
      "input-bg": "var(--color-input-bg)",
      success: "var(--color-success)",
      error: "var(--color-error)",
      "border-muted": "var(--color-border-muted)",
      white: "#ffffff",
      black: "#000000",
    },

    colors: {
      background: "#F8F8FB",
    },
    extend: {},
  },
  plugins: [],
};
