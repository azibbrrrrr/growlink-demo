import { useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ScreenContainer, TopBar, Button, StickyCTA, FeeRow } from '../components/ui';
import { Press } from '../components/Press';
import { Icon, IconName } from '../components/Icon';
import { MiniTeacher } from '../components/shared';
import { useNav } from '../navigation/useNav';
import { useApp } from '../context/AppContext';
import { teacherById, TEACHERS, DAYS, TIMES, money } from '../data';
import { C, FONT, shadow } from '../theme';

function DatePill({ day, active, onPress }: { day: { dow: string; d: number }; active: boolean; onPress: () => void }) {
  return (
    <Press onPress={onPress} style={{ flex: 1, paddingVertical: 10, borderRadius: 12, borderWidth: active ? 0 : 1, borderColor: C.hairline, backgroundColor: active ? C.brand400 : '#fff', alignItems: 'center', gap: 3 }}>
      <Text style={{ fontSize: 11, fontFamily: FONT.bodySemi, color: active ? '#0E2419' : C.muted }}>{day.dow}</Text>
      <Text style={{ fontFamily: FONT.display, fontSize: 16, color: active ? '#08231A' : C.ink }}>{day.d}</Text>
      {active && <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#08231A' }} />}
    </Press>
  );
}

function TimeSlot({ time, active, onPress }: { time: string; active: boolean; onPress: () => void }) {
  return (
    <Press onPress={onPress} style={{ height: 44, borderRadius: 12, borderWidth: active ? 0 : 1, borderColor: C.hairline, backgroundColor: active ? C.brand400 : '#fff', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontFamily: FONT.bodyBold, fontSize: 13.5, color: active ? '#08231A' : C.ink }}>{time}</Text>
    </Press>
  );
}

function ModeCard({ icon, title, sub, active, onPress }: { icon: IconName; title: string; sub: string; active: boolean; onPress: () => void }) {
  return (
    <Press onPress={onPress} style={{ flex: 1, padding: 14, borderRadius: 16, gap: 8, backgroundColor: active ? C.brand100 : '#fff', borderWidth: active ? 2 : 1, borderColor: active ? C.brand400 : C.hairline }}>
      <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: active ? C.brand400 : C.brand100, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} size={18} color={active ? '#08231A' : C.brand600} />
      </View>
      <View>
        <Text style={{ fontFamily: FONT.bodyBold, fontSize: 14, color: C.ink }}>{title}</Text>
        <Text style={{ fontSize: 11.5, color: C.muted, marginTop: 2 }}>{sub}</Text>
      </View>
    </Press>
  );
}

export default function BookingScreen() {
  const nav = useNav();
  const ctx = useApp();
  const { id, pkgId } = useRoute().params as { id: string; pkgId?: string };
  const t = teacherById(id) || TEACHERS[0];
  const pkg = t.packages.find((p) => p.id === pkgId) || t.packages[0];
  const [date, setDate] = useState(2);
  const [time, setTime] = useState('10:30 AM');
  const [mode, setMode] = useState<'inperson' | 'online'>('inperson');
  const [remarks, setRemarks] = useState('');
  const lesson = pkg.price || 1200;
  const service = Math.round(lesson * 0.1);
  const travel = mode === 'inperson' ? 40 : 0;
  const total = lesson + service + travel;
  const proceed = () => {
    ctx.setBooking({
      teacher: t.id, pkg: pkg.name, dur: pkg.dur, date: `${DAYS[date].dow}, ${DAYS[date].d} May`, time,
      mode: mode === 'inperson' ? 'In-Person' : 'Online', lesson, service, travel, total,
    });
    nav.push('payment');
  };
  return (
    <ScreenContainer>
      <TopBar title="Book a Lesson" onBack={nav.pop} />
      <View style={{ paddingTop: 4 }}>
        <MiniTeacher t={t} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingTop: 18 }}>
        <Text style={{ fontFamily: FONT.bodyBold, fontSize: 17, color: C.ink, marginBottom: 12 }}>Select Date</Text>
        <View style={{ flexDirection: 'row', gap: 7, marginBottom: 24 }}>
          {DAYS.map((d, i) => <DatePill key={i} day={d} active={date === i} onPress={() => setDate(i)} />)}
        </View>

        <Text style={{ fontFamily: FONT.bodyBold, fontSize: 17, color: C.ink, marginBottom: 12 }}>Select Time</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 9, marginBottom: 24 }}>
          {TIMES.map((tm) => (
            <View key={tm} style={{ width: '31.5%' }}>
              <TimeSlot time={tm} active={time === tm} onPress={() => setTime(tm)} />
            </View>
          ))}
        </View>

        <Text style={{ fontFamily: FONT.bodyBold, fontSize: 17, color: C.ink, marginBottom: 12 }}>Lesson Mode</Text>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 24 }}>
          <ModeCard icon="home" title="In-Person" sub="At teacher's location" active={mode === 'inperson'} onPress={() => setMode('inperson')} />
          <ModeCard icon="video" title="Online" sub="Live session" active={mode === 'online'} onPress={() => setMode('online')} />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text style={{ fontFamily: FONT.bodyBold, fontSize: 17, color: C.ink }}>Remarks</Text>
          <Text style={{ fontSize: 11.5, color: C.muted }}>{remarks.length}/140 · optional</Text>
        </View>
        <TextInput
          value={remarks}
          onChangeText={setRemarks}
          maxLength={140}
          multiline
          placeholder="Anything the teacher should know? e.g. complete beginner, prefers morning…"
          placeholderTextColor={C.muted}
          style={{ minHeight: 74, borderRadius: 12, borderWidth: 1, borderColor: C.hairline, padding: 14, fontSize: 14, fontFamily: FONT.body, color: C.ink, textAlignVertical: 'top', marginBottom: 24 }}
        />

        <Text style={{ fontFamily: FONT.bodyBold, fontSize: 17, color: C.ink, marginBottom: 8 }}>Fee Breakdown</Text>
        <View style={[{ backgroundColor: '#fff', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14 }, shadow.sm]}>
          <FeeRow label={`Lesson (${pkg.dur})`} value={money(lesson, ctx.sym)} />
          <FeeRow label="Service Fee" value={money(service, ctx.sym)} />
          {mode === 'inperson' && <FeeRow label="Travel Contribution" info value={money(travel, ctx.sym)} />}
          <View style={{ height: 1, backgroundColor: C.hairline, marginTop: 10 }} />
          <FeeRow label="Total" value={money(total, ctx.sym)} total />
        </View>
      </ScrollView>
      <StickyCTA note="Secure payments. Cancel anytime.">
        <Button variant="dark" iconRight="arrowR" onPress={proceed}>{`Proceed to Pay · ${money(total, ctx.sym)}`}</Button>
      </StickyCTA>
    </ScreenContainer>
  );
}
