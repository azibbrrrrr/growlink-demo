import { View, Text, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, IconName } from './Icon';
import { Grad } from '../data';
import { FONT } from '../theme';

type PhotoProps = {
  grad?: Grad;
  initials?: string;
  icon?: IconName;
  radius?: number;
  style?: StyleProp<ViewStyle>;
  big?: boolean;
};

/**
 * Brand-toned gradient placeholder standing in for teacher/people/hero photos
 * until real imagery is dropped in (per the design handoff note).
 */
export function Photo({ grad = ['#9BEDC2', '#1F9D63'], initials = '', icon, radius = 16, style, big = false }: PhotoProps) {
  return (
    <View style={[{ overflow: 'hidden', borderRadius: radius, alignItems: 'center', justifyContent: 'center', backgroundColor: grad[0] }, style]}>
      <LinearGradient
        colors={grad as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {/* soft light wash (top-left) */}
      <View pointerEvents="none" style={{ position: 'absolute', top: '-25%', left: '-12%', width: '70%', height: '70%', borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.30)' }} />
      {/* soft shade (bottom-right) */}
      <View pointerEvents="none" style={{ position: 'absolute', right: '-15%', bottom: '-18%', width: '65%', height: '65%', borderRadius: 999, backgroundColor: 'rgba(0,0,0,0.12)' }} />
      {icon ? (
        <Icon name={icon} size={big ? 54 : 40} color="rgba(255,255,255,0.92)" stroke={1.6} />
      ) : initials ? (
        <Text style={{ fontFamily: FONT.display, color: 'rgba(255,255,255,0.96)', fontSize: big ? 40 : 18, letterSpacing: 0.4 }}>{initials}</Text>
      ) : null}
    </View>
  );
}
