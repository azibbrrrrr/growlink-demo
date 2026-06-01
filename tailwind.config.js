/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Growlink brand greens (growlink.tokens.ts)
        brand: {
          50: '#F5FFF8',
          100: '#ECFFF3', // surface.cardMint
          200: '#C9F6DD',
          300: '#9BEDC2',
          400: '#5AE29A', // official mint
          500: '#36B878', // accent
          600: '#287A57',
          700: '#1C4A36',
          800: '#173527',
          900: '#132A22', // official primary dark green
          950: '#071711',
        },
        app: '#FEFAF3', // warm cream background
        card: '#FFFFFF',
        cardmint: '#ECFFF3',
        hairline: '#EFECE4',
        hairline2: '#E6E2D8',
        ink: '#262626', // text.primary
        sub: '#575755', // text.secondary
        muted: '#908F8B', // text.muted
        onmint: '#0E2419', // text on mint
        // status
        amber: '#E08A12',
        amberbg: '#FBEFD7',
        blue: '#2A6FDB',
        bluebg: '#E7F0FD',
        green: '#1F9D63',
        greenbg: '#E4F7EC',
        red: '#DC4B50',
        redbg: '#FBE9E9',
        star: '#F5A623',
      },
      fontFamily: {
        'm-semibold': ['Montserrat_600SemiBold'],
        'm-bold': ['Montserrat_700Bold'],
        'm-extrabold': ['Montserrat_800ExtraBold'],
        i: ['Inter_400Regular'],
        'i-medium': ['Inter_500Medium'],
        'i-semibold': ['Inter_600SemiBold'],
        'i-bold': ['Inter_700Bold'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '36px',
        pill: '999px',
      },
    },
  },
  plugins: [],
};
