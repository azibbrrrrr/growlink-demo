import { View, Text, ScrollView } from 'react-native';
import { ScreenContainer, Avatar, IconBtn } from '../components/ui';
import { Press } from '../components/Press';
import { Icon, IconName } from '../components/Icon';
import { useNav } from '../navigation/useNav';
import { useApp } from '../context/AppContext';
import { money } from '../data';
import { C, shadow, FONT } from '../theme';

export default function ProfileScreen() {
  const nav = useNav();
  const ctx = useApp();
  const links: { icon: IconName; label: string; detail?: string; onPress?: () => void }[] = [
    { icon: 'calendar', label: 'My Bookings', onPress: () => nav.tab('bookings') },
    { icon: 'wallet', label: 'Wallet & Credits', detail: money(250, ctx.sym) },
    { icon: 'gift', label: 'Refer & earn', detail: money(50, ctx.sym) },
    { icon: 'bookmark', label: 'Saved teachers', detail: String(ctx.fav.size || 2) },
    { icon: 'cog', label: 'Settings', onPress: () => nav.push('settings') },
    { icon: 'help', label: 'Help & Support' },
  ];
  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 92 }}>
        <View style={{ backgroundColor: C.brand900, paddingHorizontal: 24, paddingTop: 24, paddingBottom: 30, borderBottomLeftRadius: 26, borderBottomRightRadius: 26 }}>
          <View style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
            <Avatar grad={['#9BEDC2', '#1F9D63']} initials="AS" size={60} verified />
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#fff', fontFamily: FONT.display, fontSize: 18 }}>Aanya Sharma</Text>
              <Text style={{ color: C.brand300, fontSize: 13, marginTop: 2 }}>aanya.s@email.com</Text>
            </View>
            <IconBtn name="edit" variant="glass" />
          </View>
          <View style={{ marginTop: 18, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 14 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={{ color: '#fff', fontSize: 12.5, fontFamily: FONT.bodySemi }}>Profile 75% complete</Text>
              <Text style={{ color: C.brand300, fontSize: 12.5, fontFamily: FONT.bodyBold }}>+50 credits</Text>
            </View>
            <View style={{ height: 7, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.18)', overflow: 'hidden' }}>
              <View style={{ width: '75%', height: '100%', backgroundColor: C.brand400, borderRadius: 4 }} />
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 24, paddingTop: 18 }}>
          <View style={[{ backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden' }, shadow.sm]}>
            {links.map((l, i) => (
              <Press key={l.label} onPress={l.onPress} style={{ flexDirection: 'row', alignItems: 'center', gap: 13, paddingHorizontal: 16, paddingVertical: 15, borderBottomWidth: i < links.length - 1 ? 1 : 0, borderBottomColor: C.hairline }}>
                <View style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: C.brand100, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={l.icon} size={18} color={C.brand600} />
                </View>
                <Text style={{ flex: 1, fontSize: 14.5, fontFamily: FONT.bodySemi, color: C.ink }}>{l.label}</Text>
                {l.detail && <Text style={{ fontSize: 13, color: C.brand600, fontFamily: FONT.bodyBold }}>{l.detail}</Text>}
                <Icon name="chevR" size={16} color={C.hairline2} />
              </Press>
            ))}
          </View>
        </View>
        <View style={{ paddingHorizontal: 24, paddingTop: 16 }}>
          <Press onPress={() => nav.resetTo('welcome')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, padding: 14, backgroundColor: '#fff', borderWidth: 1, borderColor: C.hairline, borderRadius: 16 }}>
            <Icon name="logout" size={18} color={C.red} />
            <Text style={{ fontFamily: FONT.bodyBold, fontSize: 14.5, color: C.red }}>Log out</Text>
          </Press>
        </View>
        <Text style={{ textAlign: 'center', fontSize: 11.5, color: C.muted, marginTop: 16 }}>Growlink v1.0.0</Text>
      </ScrollView>
    </ScreenContainer>
  );
}
