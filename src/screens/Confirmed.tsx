import { useEffect, useRef } from 'react';
import { View, Text, ScrollView, Animated } from 'react-native';
import { ScreenContainer, Button, StickyCTA, Avatar, StatusBadge } from '../components/ui';
import { Press } from '../components/Press';
import { Icon, IconName } from '../components/Icon';
import { useNav } from '../navigation/useNav';
import { useApp } from '../context/AppContext';
import { teacherById, TEACHERS, money } from '../data';
import { C, shadow, FONT } from '../theme';

const COLORS = ['#5AE29A', '#36B878', '#FFC98C', '#7CC8FF', '#1F9D63'];

function ConfettiPiece({ index }: { index: number }) {
  const left = (index * 37) % 100;
  const delay = (index % 5) * 90;
  const dur = 1600 + (index % 4) * 320;
  const size = 6 + (index % 4) * 2;
  const y = useRef(new Animated.Value(-20)).current;
  const rot = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(y, { toValue: 620, duration: dur, delay, useNativeDriver: true }),
      Animated.timing(rot, { toValue: 1, duration: dur, delay, useNativeDriver: true }),
    ]).start();
  }, []);
  return (
    <Animated.View
      style={{
        position: 'absolute', top: -20, left: `${left}%`, width: size, height: size * 0.5, borderRadius: 2,
        backgroundColor: COLORS[index % COLORS.length], opacity: 0.9,
        transform: [{ translateY: y }, { rotate: rot.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '540deg'] }) }],
      }}
    />
  );
}

function Confetti() {
  return (
    <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
      {Array.from({ length: 24 }).map((_, i) => <ConfettiPiece key={i} index={i} />)}
    </View>
  );
}

function InfoLine({ icon, label, value }: { icon: IconName; label: string; value: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <Icon name={icon} size={16} color={C.brand500} />
      <Text style={{ fontSize: 13, color: C.muted, flex: 1 }}>{label}</Text>
      <Text style={{ fontSize: 13.5, fontFamily: FONT.bodyBold, color: C.ink }}>{value}</Text>
    </View>
  );
}

export default function ConfirmedScreen() {
  const nav = useNav();
  const ctx = useApp();
  const b = ctx.booking;
  const t = teacherById(b?.teacher || 'nisha') || TEACHERS[0];
  const pop = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(pop, { toValue: 1, friction: 5, tension: 80, useNativeDriver: true }).start();
  }, []);
  return (
    <ScreenContainer>
      <Confetti />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 40, paddingBottom: 16, alignItems: 'center' }}>
        <Animated.View style={{ marginTop: 14, marginBottom: 22, transform: [{ scale: pop }] }}>
          <View style={{ position: 'absolute', top: -18, left: -18, right: -18, bottom: -18, borderRadius: 999, backgroundColor: 'rgba(90,226,154,0.22)' }} />
          <View style={[{ width: 96, height: 96, borderRadius: 999, backgroundColor: C.brand400, alignItems: 'center', justifyContent: 'center' }, shadow.mint]}>
            <Icon name="check" size={50} color="#08231A" stroke={3} />
          </View>
        </Animated.View>
        <Text style={{ fontFamily: FONT.display, fontSize: 27, color: C.ink, marginBottom: 8 }}>You’re booked! 🎉</Text>
        <Text style={{ fontFamily: FONT.body, fontSize: 14, color: C.sub, textAlign: 'center', lineHeight: 22, maxWidth: 280, marginBottom: 24 }}>
          {`Your lesson with ${t.name} is requested. We’ll notify you the moment it’s confirmed.`}
        </Text>
        {/* summary card */}
        <View style={[{ width: '100%', backgroundColor: '#fff', borderRadius: 20, overflow: 'hidden' }, shadow.md]}>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center', padding: 16 }}>
            <Avatar grad={t.grad} initials={t.initials} size={46} verified={t.verified} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: FONT.bodyBold, fontSize: 15, color: C.ink }}>{t.name}</Text>
              <Text style={{ fontSize: 12.5, color: C.muted }}>{b?.pkg || 'Single Lesson'}</Text>
            </View>
            <StatusBadge status="pending" />
          </View>
          <View style={{ borderTopWidth: 1, borderTopColor: C.hairline2, borderStyle: 'dashed', padding: 16, gap: 11 }}>
            <InfoLine icon="calendar" label="Date" value={b?.date || 'Wed, 21 May'} />
            <InfoLine icon="clock" label="Time" value={b?.time || '10:30 AM'} />
            <InfoLine icon={b?.mode === 'Online' ? 'video' : 'home'} label="Mode" value={b?.mode || 'In-Person'} />
            <InfoLine icon="card" label="Total paid" value={money(b?.total || 1360, ctx.sym)} />
          </View>
        </View>
        <Press style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 18 }}>
          <Icon name="calendarPlus" size={18} color={C.brand600} />
          <Text style={{ fontFamily: FONT.bodyBold, fontSize: 14, color: C.brand600 }}>Add to calendar</Text>
        </Press>
      </ScrollView>
      <StickyCTA>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Button variant="ghost" icon="chat" full={false} onPress={() => nav.tab('chats')} style={{ flex: 1 }}>Message</Button>
          <Button variant="dark" full={false} onPress={() => nav.tab('bookings')} style={{ flex: 1.4 }}>View my bookings</Button>
        </View>
      </StickyCTA>
    </ScreenContainer>
  );
}
