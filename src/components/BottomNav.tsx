import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Press } from './Press';
import { Icon, IconName } from './Icon';
import { useNav } from '../navigation/useNav';
import { C, FONT, shadow } from '../theme';

type TabDef = { route: string; icon: IconName; label: string } | null;
const TABS: TabDef[] = [
  { route: 'Explore', icon: 'compass', label: 'Explore' },
  { route: 'Bookings', icon: 'calendar', label: 'Bookings' },
  null, // center FAB
  { route: 'Chats', icon: 'chat', label: 'Chats' },
  { route: 'Profile', icon: 'user', label: 'Profile' },
];

export function BottomNav({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const nav = useNav();
  const activeRoute = state.routes[state.index]?.name;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', paddingHorizontal: 12, paddingTop: 8, paddingBottom: 8 + insets.bottom, backgroundColor: 'rgba(255,255,255,0.96)', borderTopWidth: 1, borderTopColor: C.hairline }}>
      {TABS.map((t, i) => {
        if (t === null) {
          return (
            <View key="fab" style={{ width: 60 }}>
              <Press onPress={() => nav.push('map')} style={[{ position: 'absolute', left: '50%', marginLeft: -29, top: -26, width: 58, height: 58, borderRadius: 999, backgroundColor: C.brand900, borderWidth: 4, borderColor: C.app, alignItems: 'center', justifyContent: 'center' }, shadow.md]}>
                <Icon name="plus" size={26} color={C.brand400} stroke={2.4} />
              </Press>
            </View>
          );
        }
        const on = activeRoute === t.route;
        return (
          <Press key={t.route} onPress={() => navigation.navigate(t.route as never)} style={{ flex: 1, alignItems: 'center', gap: 3, paddingVertical: 4 }}>
            <View style={{ height: 30, paddingHorizontal: 16, borderRadius: 999, alignItems: 'center', justifyContent: 'center', backgroundColor: on ? C.brand900 : 'transparent' }}>
              <Icon name={t.icon} size={21} color={on ? C.brand400 : C.muted} stroke={2} />
            </View>
            <Text style={{ fontSize: 10.5, fontFamily: FONT.bodySemi, color: on ? C.ink : C.muted }}>{t.label}</Text>
          </Press>
        );
      })}
    </View>
  );
}
