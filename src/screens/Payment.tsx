import { useState } from 'react';
import { View, Text, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { ScreenContainer, TopBar, Button, StickyCTA, Avatar } from '../components/ui';
import { Press } from '../components/Press';
import { Icon, IconName } from '../components/Icon';
import { useNav } from '../navigation/useNav';
import { useApp } from '../context/AppContext';
import { teacherById, TEACHERS, money } from '../data';
import { C, FONT } from '../theme';

function PayMethod({ icon, label, sub, active, onPress }: { icon: IconName; label: string; sub: string; active: boolean; onPress: () => void }) {
  return (
    <Press onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', gap: 13, padding: 16, paddingVertical: 14, borderRadius: 16, backgroundColor: '#fff', borderWidth: active ? 2 : 1, borderColor: active ? C.brand400 : C.hairline }}>
      <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: C.brand100, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} size={19} color={C.brand600} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: FONT.bodyBold, fontSize: 14, color: C.ink }}>{label}</Text>
        <Text style={{ fontSize: 12, color: C.muted, marginTop: 1 }}>{sub}</Text>
      </View>
      <View style={{ width: 22, height: 22, borderRadius: 999, borderWidth: active ? 0 : 2, borderColor: C.hairline2, backgroundColor: active ? C.brand400 : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
        {active && <Icon name="check" size={12} color="#08231A" stroke={3} />}
      </View>
    </Press>
  );
}

export default function PaymentScreen() {
  const nav = useNav();
  const ctx = useApp();
  const b = ctx.booking || { total: 1360, lesson: 1200, service: 120, travel: 40, teacher: 'nisha', pkg: 'Single Lesson', date: 'Wed, 21 May', time: '10:30 AM', dur: '60 min', mode: 'In-Person' };
  const t = teacherById(b.teacher) || TEACHERS[0];
  const [method, setMethod] = useState('card');
  const [pay, setPay] = useState<'full' | 'deposit'>('full');
  const [busy, setBusy] = useState(false);
  const deposit = Math.round(b.total * 0.3);
  const amount = pay === 'full' ? b.total : deposit;
  const doPay = () => {
    setBusy(true);
    setTimeout(() => {
      ctx.confirmBooking();
      nav.replace('confirmed');
    }, 1300);
  };
  return (
    <ScreenContainer>
      <TopBar title="Payment" onBack={nav.pop} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 6, paddingBottom: 16 }}>
        {/* order summary */}
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center', backgroundColor: C.brand900, borderRadius: 16, padding: 16, marginBottom: 20 }}>
          <Avatar grad={t.grad} initials={t.initials} size={46} radius={12} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#fff', fontFamily: FONT.bodyBold, fontSize: 14.5 }}>{b.pkg || 'Single Lesson'}</Text>
            <Text style={{ color: C.brand300, fontSize: 12.5, marginTop: 3 }}>{`${t.name} · ${b.date || 'Wed, 21 May'} · ${b.time || '10:30 AM'}`}</Text>
          </View>
          <Text style={{ fontFamily: FONT.display, fontSize: 18, color: '#fff' }}>{money(b.total, ctx.sym)}</Text>
        </View>
        {/* pay option */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 22 }}>
          {(['full', 'deposit'] as const).map((opt) => {
            const on = pay === opt;
            return (
              <Press key={opt} onPress={() => setPay(opt)} style={{ flex: 1, padding: 14, borderRadius: 16, backgroundColor: on ? C.brand100 : '#fff', borderWidth: on ? 2 : 1, borderColor: on ? C.brand400 : C.hairline }}>
                <Text style={{ fontFamily: FONT.bodyBold, fontSize: 14, color: C.ink }}>{opt === 'full' ? 'Pay in full' : 'Deposit 30%'}</Text>
                <Text style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{opt === 'full' ? money(b.total, ctx.sym) : `${money(deposit, ctx.sym)} now`}</Text>
              </Press>
            );
          })}
        </View>
        {/* methods */}
        <Text style={{ fontFamily: FONT.bodyBold, fontSize: 17, color: C.ink, marginBottom: 12 }}>Payment method</Text>
        <View style={{ gap: 10, marginBottom: 18 }}>
          <PayMethod icon="card" label="Credit / Debit card" sub="Visa ···· 4821" active={method === 'card'} onPress={() => setMethod('card')} />
          <PayMethod icon="wallet" label="Growlink Credits" sub={`${money(250, ctx.sym)} available`} active={method === 'credits'} onPress={() => setMethod('credits')} />
          <PayMethod icon="shield" label="FPX Online Banking" sub="Pay from your bank" active={method === 'fpx'} onPress={() => setMethod('fpx')} />
        </View>
        {/* promo */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 18 }}>
          <View style={{ flex: 1, height: 46, borderRadius: 12, borderWidth: 1, borderStyle: 'dashed', borderColor: C.hairline2, flexDirection: 'row', alignItems: 'center', gap: 9, paddingHorizontal: 14 }}>
            <Icon name="gift" size={17} color={C.brand500} />
            <TextInput placeholder="Promo code" placeholderTextColor={C.muted} style={{ flex: 1, fontSize: 14, fontFamily: FONT.body, color: C.ink, padding: 0 }} />
          </View>
          <Button variant="mint" size="md" full={false}>Apply</Button>
        </View>
        {/* trust */}
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start', backgroundColor: C.greenBg, borderRadius: 12, padding: 14 }}>
          <Icon name="lock" size={17} color={C.green} />
          <Text style={{ flex: 1, fontSize: 12.5, color: C.sub, lineHeight: 19 }}>
            <Text style={{ color: C.green, fontFamily: FONT.bodyBold }}>Funds held in escrow.</Text> Your money is released to the teacher only after lesson check-out.
          </Text>
        </View>
      </ScrollView>
      <StickyCTA note="256-bit encrypted · powered by Growlink Pay">
        <Button variant="primary" icon={busy ? undefined : 'lock'} onPress={busy ? undefined : doPay} disabled={busy}>
          {busy ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <ActivityIndicator size="small" color="#08231A" />
              <Text style={{ fontFamily: FONT.bodyBold, fontSize: 16, color: '#08231A' }}>Processing…</Text>
            </View>
          ) : (
            `Pay ${money(amount, ctx.sym)}`
          )}
        </Button>
      </StickyCTA>
    </ScreenContainer>
  );
}
