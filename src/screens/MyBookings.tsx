import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ScreenContainer, StatusBadge, Avatar, EmptyState } from '../components/ui';
import { Press } from '../components/Press';
import { Icon, IconName } from '../components/Icon';
import { useNav } from '../navigation/useNav';
import { useApp } from '../context/AppContext';
import { teacherById, Booking } from '../data';
import { C, shadow, FONT } from '../theme';

function BookingCard({ b, onPress }: { b: Booking; onPress: () => void }) {
  const t = teacherById(b.teacher)!;
  const meta: [IconName, string][] = [
    ['calendar', b.date],
    ['clock', b.time],
    [b.mode === 'Online' ? 'video' : 'home', b.mode],
  ];
  return (
    <Press onPress={onPress} className="bg-card rounded-lg" style={[{ padding: 14 }, shadow.sm]}>
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <Avatar grad={t.grad} initials={t.initials} size={48} radius={12} verified={t.verified} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: FONT.bodyBold, fontSize: 15, color: C.ink }}>{t.name}</Text>
          <Text style={{ fontSize: 12.5, color: C.muted, marginTop: 1 }}>{b.pkg} · {b.dur}</Text>
        </View>
        <StatusBadge status={b.status} />
      </View>
      <View style={{ flexDirection: 'row', gap: 16, marginTop: 13, paddingTop: 13, borderTopWidth: 1, borderTopColor: C.hairline }}>
        {meta.map(([ic, val], i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Icon name={ic} size={14} color={C.brand500} />
            <Text style={{ fontSize: 12.5, color: C.sub, fontFamily: FONT.bodySemi }}>{val}</Text>
          </View>
        ))}
      </View>
    </Press>
  );
}

export default function MyBookingsScreen() {
  const nav = useNav();
  const { bookings } = useApp();
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const list = bookings.filter((b) => b.when === tab);
  return (
    <ScreenContainer>
      <View style={{ paddingHorizontal: 24, paddingTop: 14, paddingBottom: 4 }}>
        <Text style={{ fontFamily: FONT.display, fontSize: 28, color: C.ink }}>My Bookings</Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 8, paddingHorizontal: 24, paddingTop: 10, paddingBottom: 14 }}>
        {([['upcoming', 'Upcoming'], ['past', 'Past']] as const).map(([k, l]) => (
          <Press key={k} onPress={() => setTab(k)} style={{ flex: 1, height: 42, borderRadius: 999, alignItems: 'center', justifyContent: 'center', backgroundColor: tab === k ? C.brand900 : '#fff', borderWidth: tab === k ? 0 : 1, borderColor: C.hairline }}>
            <Text style={{ fontFamily: FONT.bodyBold, fontSize: 14, color: tab === k ? '#fff' : C.sub }}>{l}</Text>
          </Press>
        ))}
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 92 }}>
        {list.length ? (
          <View style={{ gap: 12 }}>
            {list.map((b) => <BookingCard key={b.id} b={b} onPress={() => nav.push('bookingDetail', { id: b.id })} />)}
          </View>
        ) : (
          <EmptyState
            icon="calendar"
            title={`No ${tab} bookings`}
            body={tab === 'upcoming' ? 'Find a teacher and book your first lesson.' : 'Your completed lessons will appear here.'}
            cta={tab === 'upcoming' ? 'Explore teachers' : null}
            onCta={() => nav.tab('explore')}
          />
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
