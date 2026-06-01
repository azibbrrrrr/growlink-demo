import { View, Text, ScrollView } from 'react-native';
import { ScreenContainer, TopBar } from '../components/ui';
import { Icon, IconName } from '../components/Icon';
import { useNav } from '../navigation/useNav';
import { C, shadow, FONT } from '../theme';

type Item = { icon: IconName; c: string; bg: string; title: string; body: string; t: string; unread?: boolean };
const GROUPS: { day: string; items: Item[] }[] = [
  {
    day: 'Today',
    items: [
      { icon: 'calendar', c: '#2A6FDB', bg: '#E7F0FD', title: 'Booking confirmed', body: 'Nisha Rao · Wed 21 May, 10:30 AM', t: '2h', unread: true },
      { icon: 'chat', c: '#287A57', bg: '#ECFFF3', title: 'New message from Nisha', body: 'See you on Wednesday! Bring your…', t: '4h', unread: true },
    ],
  },
  {
    day: 'Yesterday',
    items: [
      { icon: 'card', c: '#1F9D63', bg: '#E4F7EC', title: 'Payment held safely', body: 'RM1,360 in escrow until check-out', t: '1d' },
      { icon: 'bell', c: '#E08A12', bg: '#FBEFD7', title: 'Lesson reminder', body: 'Yoga with Meera in 24 hours', t: '1d' },
    ],
  },
  {
    day: 'This week',
    items: [{ icon: 'star', c: '#F5A623', bg: '#FDF2DC', title: 'How was your lesson?', body: 'Leave a review for Arjun K.', t: '3d' }],
  },
];

export default function ActivityScreen() {
  const nav = useNav();
  return (
    <ScreenContainer>
      <TopBar title="Activity" onBack={nav.pop} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}>
        {GROUPS.map((g) => (
          <View key={g.day}>
            <Text style={{ fontSize: 12, fontFamily: FONT.bodyBold, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.4, marginTop: 16, marginBottom: 10 }}>{g.day}</Text>
            <View style={{ gap: 10 }}>
              {g.items.map((it, i) => (
                <View key={i} style={[{ flexDirection: 'row', gap: 12, alignItems: 'flex-start', backgroundColor: '#fff', borderRadius: 16, padding: 14 }, shadow.sm]}>
                  <View style={{ width: 40, height: 40, borderRadius: 999, backgroundColor: it.bg, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={it.icon} size={19} color={it.c} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: FONT.bodyBold, fontSize: 14, color: C.ink }}>{it.title}</Text>
                    <Text style={{ fontSize: 12.5, color: C.sub, marginTop: 2 }}>{it.body}</Text>
                  </View>
                  <Text style={{ fontSize: 11, color: C.muted }}>{it.t}</Text>
                  {it.unread && <View style={{ position: 'absolute', top: 14, right: 36, width: 8, height: 8, borderRadius: 999, backgroundColor: C.brand500 }} />}
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}
