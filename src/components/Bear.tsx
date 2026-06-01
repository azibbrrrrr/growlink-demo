import { Image, ImageStyle, StyleProp } from 'react-native';

const SRC = {
  dark: require('../../assets/brand/bear-mark.png'),
  mint: require('../../assets/brand/bear-mint.png'),
  cream: require('../../assets/brand/bear-cream.png'),
};

type BearProps = {
  variant?: 'dark' | 'mint' | 'cream';
  size?: number;
  style?: StyleProp<ImageStyle>;
};

/** Standalone bear mark (cropped from the logo lockup) in three tones. */
export function Bear({ variant = 'dark', size = 64, style }: BearProps) {
  return (
    <Image
      source={SRC[variant]}
      style={[{ width: size, height: size, resizeMode: 'contain' }, style]}
    />
  );
}
