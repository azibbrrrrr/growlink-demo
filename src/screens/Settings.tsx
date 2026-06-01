import { View, Text, ScrollView } from 'react-native';
import { ScreenContainer, TopBar } from '../components/ui';
import { Press } from '../components/Press';
import { Icon, IconName } from '../components/Icon';
import { useNav } from '../navigation/useNav';
import { C, FONT, shadow } from '../theme';

const GROUPS: { h: string; items: [IconName, string][] }[] = [
  { h: 'Account', items: [['user', 'Personal information'], ['card', 'Payment methods'], ['shield', 'Privacy & safety']] },
  { h: 'Preferences', items: [['bell', 'Notifications'], ['compass', 'Language · English']] },
  { h: '', items: [['help', 'Help center'], ['logout', 'Delete account']] },
];

export default function SettingsScreen() {
  const nav = useNav();
  return (
    <ScreenContainer>
      <TopBar title="Settings" onBack={nav.pop} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}>
        {GROUPS.map((g, gi) => (
          <View key={gi} style={{ marginTop: gi ? 20 : 8 }}>
            {g.h ? <Text style={{ fontSize: 12, fontFamily: FONT.bodyBold, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 10 }}>{g.h}</Text> : null}
            <View style={[{ backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden' }, shadow.sm]}>
              {g.items.map(([ic, label], i) => {
                const danger = label === 'Delete account';
                return (
                  <Press key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: i < g.items.length - 1 ? 1 : 0, borderBottomColor: C.hairline }}>
                    <Icon name={ic} size={18} color={danger ? C.red : C.brand600} />
                    <Text style={{ flex: 1, fontSize: 14.5, fontFamily: FONT.bodySemi, color: danger ? C.red : C.ink }}>{label}</Text>
                    <Icon name="chevR" size={16} color={C.hairline2} />
                  </Press>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}
