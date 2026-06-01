import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../components/ui';
import { Press } from '../components/Press';
import { Bear } from '../components/Bear';
import { Cityscape, FloatIcon } from '../components/shared';
import { useNav } from '../navigation/useNav';
import { C, FONT } from '../theme';

export default function WelcomeScreen() {
  const nav = useNav();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: '#F4FBF6' }}>
      <LinearGradient colors={['#FEFCF6', '#F4FBF6', '#ECFAF1']} locations={[0, 0.6, 1]} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      <FloatIcon name="book" x={36} y={120} size={26} rot={-12} />
      <FloatIcon name="music" x={300} y={150} size={24} rot={10} />
      <FloatIcon name="pin" x={54} y={300} size={22} rot={-6} />
      <FloatIcon name="sparkle" x={316} y={300} size={22} />
      <FloatIcon name="book" x={330} y={250} size={18} rot={8} />

      <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 34, paddingTop: insets.top + 24 }}>
        <View style={{ marginTop: 18, marginBottom: 26 }}>
          <View style={{ position: 'absolute', top: -26, left: -26, right: -26, bottom: -26, borderRadius: 999, backgroundColor: 'rgba(90,226,154,0.18)' }} />
          <LinearGradient colors={['#D8FBE7', '#A7EEC6']} style={{ width: 132, height: 132, borderRadius: 999, alignItems: 'center', justifyContent: 'center' }}>
            <Bear variant="dark" size={78} />
          </LinearGradient>
        </View>
        <Text style={{ fontFamily: FONT.displayExtra, fontSize: 38, color: C.ink, marginBottom: 4, letterSpacing: -0.7 }}>Growlink</Text>
        <Text style={{ color: C.brand600, fontFamily: FONT.bodySemi, fontSize: 14, letterSpacing: 0.6, marginBottom: 30 }}>Explore. Connect. Grow.</Text>
        <Text style={{ fontFamily: FONT.display, fontSize: 31, color: C.ink, textAlign: 'center', lineHeight: 35, marginBottom: 14, letterSpacing: -0.6 }}>
          Your city. Your people. Your <Text style={{ color: C.brand500 }}>opportunities</Text>.
        </Text>
        <Text style={{ fontFamily: FONT.body, fontSize: 14.5, color: C.sub, textAlign: 'center', lineHeight: 22, maxWidth: 300 }}>
          Find the right teachers, services, freelancers and opportunities around you.
        </Text>
      </View>

      <View>
        <View style={{ paddingHorizontal: 34 }}>
          <Button variant="dark" iconRight="arrowR" onPress={() => nav.tab('explore')} style={{ marginBottom: 14 }}>Get Started</Button>
          <Press onPress={() => nav.tab('explore')} style={{ paddingTop: 4, paddingBottom: 18, alignItems: 'center' }}>
            <Text style={{ color: C.brand600, fontFamily: FONT.bodySemi, fontSize: 14 }}>I already have an account</Text>
          </Press>
        </View>
        <Cityscape />
      </View>
    </View>
  );
}
