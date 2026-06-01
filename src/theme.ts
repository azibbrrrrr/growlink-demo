import { ViewStyle } from 'react-native';

/**
 * Growlink design tokens (from growlink.tokens.ts / growlink.css).
 * Tailwind/NativeWind is the primary styling layer (see tailwind.config.js);
 * these constants are for the cases NativeWind can't express on native —
 * gradients (expo-linear-gradient), shadows, and dynamic per-item colors.
 */
export const C = {
  brand900: '#132A22',
  brand800: '#173527',
  brand700: '#1C4A36',
  brand600: '#287A57',
  brand500: '#36B878',
  brand400: '#5AE29A',
  brand300: '#9BEDC2',
  brand200: '#C9F6DD',
  brand100: '#ECFFF3',
  app: '#FEFAF3',
  card: '#FFFFFF',
  cardMint: '#ECFFF3',
  hairline: '#EFECE4',
  hairline2: '#E6E2D8',
  ink: '#262626',
  sub: '#575755',
  muted: '#908F8B',
  onMint: '#0E2419',
  amber: '#E08A12',
  amberBg: '#FBEFD7',
  blue: '#2A6FDB',
  blueBg: '#E7F0FD',
  green: '#1F9D63',
  greenBg: '#E4F7EC',
  red: '#DC4B50',
  redBg: '#FBE9E9',
  star: '#F5A623',
  white: '#FFFFFF',
} as const;

/** RN shadows (single-layer approximations of the design's --sh-* tokens). */
export const shadow: Record<'sm' | 'md' | 'cta' | 'mint', ViewStyle> = {
  sm: { shadowColor: '#132A22', shadowOpacity: 0.06, shadowRadius: 14, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  md: { shadowColor: '#132A22', shadowOpacity: 0.1, shadowRadius: 24, shadowOffset: { width: 0, height: 12 }, elevation: 5 },
  cta: { shadowColor: '#132A22', shadowOpacity: 0.22, shadowRadius: 22, shadowOffset: { width: 0, height: 8 }, elevation: 8 },
  mint: { shadowColor: '#36B878', shadowOpacity: 0.28, shadowRadius: 26, shadowOffset: { width: 0, height: 10 }, elevation: 8 },
};

/** Font family names as loaded from @expo-google-fonts (weight is encoded in the family). */
export const FONT = {
  display: 'Montserrat_700Bold',
  displaySemi: 'Montserrat_600SemiBold',
  displayExtra: 'Montserrat_800ExtraBold',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemi: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
} as const;
