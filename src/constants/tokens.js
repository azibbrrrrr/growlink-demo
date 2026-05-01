/* ── DESIGN TOKENS ─────────────────────────────────────────── */
export const T = {
  // Primary greens
  p900: "#0D2B22", p800: "#1A3C34", p700: "#2D5A4A", p600: "#2D6A4F",
  p500: "#3D8B6F", p400: "#52B788", p300: "#74C69D", p200: "#B7E4C7",
  p100: "#D8F3DC", p50:  "#F0FDF4",

  // Accent
  amber: "#F59E0B", amberL: "#FEF3C7", amberD: "#D97706",
  red:   "#EF4444", redL:   "#FEE2E2",
  blue:  "#3B82F6", blueL:  "#EFF6FF",
  green: "#22C55E", greenL: "#DCFCE7",

  // Neutrals
  white:   "#FFFFFF",
  surface: "#F5FBF7",
  card:    "#FFFFFF",
  border:  "#E2EDE7",

  gray50:  "#F8FAF9",
  gray100: "#EFF2F0",
  gray200: "#D9E2DC",
  gray300: "#B0C4BB",
  gray400: "#7A9E8F",
  gray500: "#5A7A6B",
  gray600: "#3D5C4E",
  gray700: "#2D4A3A",
  gray900: "#0F1F18",
};

export const GRAD = `linear-gradient(160deg,${T.p800} 0%,${T.p600} 55%,${T.p500} 100%)`;
