import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ScreenContainer, TopBar, Chip, Stars } from '../components/ui';
import { ReviewCard } from '../components/shared';
import { useNav } from '../navigation/useNav';
import { teacherById, TEACHERS, REVIEWS, REVIEW_DIST } from '../data';
import { C, shadow, FONT } from '../theme';

export default function AllReviews() {
  const nav = useNav();
  const { id } = useRoute().params as { id: string };
  const t = teacherById(id) || TEACHERS[0];
  const [f, setF] = useState('Most recent');
  return (
    <ScreenContainer>
      <TopBar title="Reviews" onBack={nav.pop} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}>
        <View style={[{ flexDirection: 'row', gap: 20, alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 18, marginBottom: 18 }, shadow.sm]}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontFamily: FONT.display, fontSize: 40, color: C.ink, lineHeight: 42 }}>{t.rating}</Text>
            <Stars value={t.rating} size={13} gap={1} />
            <Text style={{ fontSize: 12, color: C.muted, marginTop: 6 }}>{t.reviews} reviews</Text>
          </View>
          <View style={{ flex: 1, gap: 6 }}>
            {REVIEW_DIST.map((d) => (
              <View key={d.s} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 11, color: C.muted, width: 8 }}>{d.s}</Text>
                <View style={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: C.hairline, overflow: 'hidden' }}>
                  <View style={{ width: `${d.p}%`, height: '100%', backgroundColor: C.star }} />
                </View>
                <Text style={{ fontSize: 11, color: C.muted, width: 26, textAlign: 'right' }}>{d.p}%</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
          {['Most recent', 'Highest', 'Lowest'].map((s) => (
            <Chip key={s} active={f === s} onPress={() => setF(s)}>{s}</Chip>
          ))}
        </View>
        <View style={{ gap: 12 }}>
          {REVIEWS.map((r) => <ReviewCard key={r.id} r={r} w="100%" />)}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
