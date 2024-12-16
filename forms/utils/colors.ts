type ColorKeys =
  | "accent"
  | "accentHover"
  | "muted"
  | "fill"
  | "fillMuted"
  | "textInverted"
  | "textBase"
  | "textMuted"
  | "buttonAccent"
  | "buttonAccentHover"
  | "buttonMuted"
  | "success"
  | "error"
  | "borderMuted";

type RGBColor = {
  rgb: string;
  rgba: (opacity: number) => string;
};

type Colors = {
  [K in ColorKeys]: RGBColor;
};

const getRGBValues = (variableName: string): string => {
  if (typeof document === "undefined") {
    // Default light theme values for SSR or initial load
    const defaultValues: Record<string, string> = {
      accent: "112, 82, 242",
      "accent-hover": "95, 67, 218",
      muted: "237, 237, 242",
      fill: "248, 248, 251",
      "fill-muted": "237, 237, 242",
      "text-inverted": "255, 255, 255",
      "text-base": "1, 16, 86",
      "text-muted": "127, 132, 166",
      "button-accent": "112, 82, 242",
      "button-accent-hover": "95, 67, 218",
      "button-muted": "237, 237, 242",
      success: "27, 185, 101",
      error: "185, 27, 39",
      "border-muted": "225, 227, 227",
    };
    return defaultValues[variableName] || "0, 0, 0";
  }

  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--color-${variableName}-rgb`)
    .trim();
};

const createColorObject = (variableName: string): RGBColor => ({
  rgb: `rgb(${getRGBValues(variableName)})`,
  rgba: (opacity: number) => `rgb(${getRGBValues(variableName)}, ${opacity})`,
});

export const colors: Colors = {
  accent: createColorObject("accent"),
  accentHover: createColorObject("accent-hover"),
  muted: createColorObject("muted"),
  fill: createColorObject("fill"),
  fillMuted: createColorObject("fill-muted"),
  textInverted: createColorObject("text-inverted"),
  textBase: createColorObject("text-base"),
  textMuted: createColorObject("text-muted"),
  buttonAccent: createColorObject("button-accent"),
  buttonAccentHover: createColorObject("button-accent-hover"),
  buttonMuted: createColorObject("button-muted"),
  success: createColorObject("success"),
  error: createColorObject("error"),
  borderMuted: createColorObject("border-muted"),
};

// Usage example:
// colors.accent.rgb -> "rgb(var(--color-accent-rgb))"
// colors.accent.rgba(0.8) -> "rgba(var(--color-accent-rgb), 0.8)"
