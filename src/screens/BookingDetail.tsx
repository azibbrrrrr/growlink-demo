import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ScreenContainer, TopBar, StatusBadge, Avatar, IconBtn, Button, FeeRow } from '../components/ui';
import { Icon, IconName } from '../components/Icon';
import { MapField } from '../components/shared';
import { useNav } from '../navigation/useNav';
import { useApp } from '../context/AppContext';
import { teacherById, money, BookingStatus } from '../data';
import { C, shadow, FONT } from '../theme';

function Timeline({ status }: { status: BookingStatus }) {
  if (status === 'cancelled') {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: C.redBg, borderRadius: 12, padding: 14 }}>
        <Icon name="x" size={16} color={C.red} />
        <Text style={{ fontSize: 13, fontFamily: FONT.bodySemi, color: C.red }}>This booking was cancelled</Text>
      </View>
    );
  }
  const steps = [
    { label: 'Requested', done: true },
    { label: 'Confirmed', done: status !== 'pending' },
    { label: 'Lesson done', done: status === 'completed' },
  ];
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <View style={{ alignItems: 'center', gap: 7, width: 64 }}>
            <View style={{ width: 26, height: 26, borderRadius: 999, alignItems: 'center', justifyContent: 'center', backgroundColor: s.done ? C.brand400 : '#fff', borderWidth: s.done ? 0 : 2, borderColor: C.hairline2 }}>
              {s.done ? <Icon name="check" size={13} color="#08231A" stroke={3} /> : <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: C.hairline2 }} />}
            </View>
            <Text style={{ fontSize: 10.5, fontFamily: FONT.bodySemi, color: s.done ? C.ink : C.muted, textAlign: 'center' }}>{s.label}</Text>
          </View>
          {i < steps.length - 1 && <View style={{ flex: 1, height: 2, marginTop: 12, borderRadius: 2, backgroundColor: steps[i + 1].done ? C.brand400 : C.hairline2 }} />}
        </React.Fragment>
      ))}
    </View>
  );
}

export default function BookingDetailScreen() {
  const nav = useNav();
  const ctx = useApp();
  const { id } = useRoute().params as { id: string };
  const b = ctx.bookings.find((x) => x.id === id) || ctx.bookings[0];
  const t = teacherById(b.teacher)!;
  const service = Math.round((b.price || 1200) * 0.08);
  const lesson = (b.price || 1200) - service;
  const rows: [IconName, string, string][] = [
    ['calendar', 'Date', b.date],
    ['clock', 'Time', b.time],
    [b.mode === 'Online' ? 'video' : 'home', 'Mode', b.mode],
    ['pin', 'Location', b.mode === 'Online' ? 'Video link sent before lesson' : "Teacher's studio, Koramangala"],
  ];
  return (
    <ScreenContainer>
      <TopBar title="Booking Detail" onBack={nav.pop} trailing={<StatusBadge status={b.status} />} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 6, paddingBottom: 24 }}>
        <View style={[{ backgroundColor: '#fff', borderRadius: 16, padding: 18, marginBottom: 16 }, shadow.sm]}>
          <Timeline status={b.status} />
        </View>
        <View style={[{ flexDirection: 'row', gap: 12, alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 14, marginBottom: 16 }, shadow.sm]}>
          <Avatar grad={t.grad} initials={t.initials} size={50} verified={t.verified} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: FONT.bodyBold, fontSize: 15, color: C.ink }}>{t.name}</Text>
            <Text style={{ fontSize: 12.5, color: C.muted }}>{t.role}</Text>
          </View>
          <IconBtn name="chat" variant="light" onPress={() => nav.tab('chats')} />
        </View>
        <View style={[{ backgroundColor: '#fff', borderRadius: 16, paddingHorizontal: 16, marginBottom: 16 }, shadow.sm]}>
          {rows.map((r, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 13, borderBottomWidth: i < rows.length - 1 ? 1 : 0, borderBottomColor: C.hairline }}>
              <Icon name={r[0]} size={16} color={C.brand500} />
              <Text style={{ fontSize: 13, color: C.muted, width: 70 }}>{r[1]}</Text>
              <Text style={{ flex: 1, fontSize: 13.5, fontFamily: FONT.bodySemi, color: C.ink, textAlign: 'right' }}>{r[2]}</Text>
            </View>
          ))}
        </View>
        {b.mode !== 'Online' && (
          <View style={[{ height: 120, borderRadius: 16, overflow: 'hidden', marginBottom: 16 }, shadow.sm]}>
            <MapField>
              <View style={{ position: 'absolute', left: '50%', top: '50%', marginLeft: -18, marginTop: -22 }}>
                <View style={[{ width: 36, height: 36, borderRadius: 999, backgroundColor: C.brand900, alignItems: 'center', justifyContent: 'center' }, shadow.sm]}>
                  <Icon name="pinDot" size={18} color={C.brand400} />
                </View>
              </View>
            </MapField>
          </View>
        )}
        <View style={[{ backgroundColor: '#fff', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 16 }, shadow.sm]}>
          <FeeRow label="Lesson" value={money(lesson, ctx.sym)} />
          <FeeRow label="Service Fee" value={money(service, ctx.sym)} />
          <View style={{ height: 1, backgroundColor: C.hairline, marginTop: 10 }} />
          <FeeRow label="Total" value={money(b.price, ctx.sym)} total />
          {b.status !== 'cancelled' && (
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', marginTop: 12, backgroundColor: C.greenBg, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10 }}>
              <Icon name="shield" size={15} color={C.green} />
              <Text style={{ fontSize: 12, color: C.green, fontFamily: FONT.bodySemi }}>{b.status === 'completed' ? 'Released to teacher' : 'Held safely in escrow'}</Text>
            </View>
          )}
        </View>
        {b.status === 'confirmed' && (
          <View style={{ gap: 10 }}>
            <Button variant="primary" icon="pinDot">Check in to lesson</Button>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Button variant="ghost" full={false} style={{ flex: 1 }}>Reschedule</Button>
              <Button variant="ghost" full={false} style={{ flex: 1 }}>
                <Text style={{ fontFamily: FONT.bodyBold, fontSize: 16, color: C.red }}>Cancel</Text>
              </Button>
            </View>
          </View>
        )}
        {b.status === 'completed' && <Button variant="dark" icon="star" onPress={() => nav.push('review', { id: b.teacher })}>Leave a review</Button>}
        {b.status === 'pending' && (
          <Button variant="ghost">
            <Text style={{ fontFamily: FONT.bodyBold, fontSize: 16, color: C.red }}>Cancel request</Text>
          </Button>
        )}
        {b.status === 'cancelled' && <Button variant="dark" icon="calendarPlus" onPress={() => nav.push('teacher', { id: b.teacher })}>Rebook this teacher</Button>}
      </ScrollView>
    </ScreenContainer>
  );
}
