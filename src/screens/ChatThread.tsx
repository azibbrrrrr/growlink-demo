import { View, Text, ScrollView, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenContainer, IconBtn, Avatar } from '../components/ui';
import { Press } from '../components/Press';
import { Icon } from '../components/Icon';
import { useNav } from '../navigation/useNav';
import { teacherById, TEACHERS } from '../data';
import { C, shadow, FONT } from '../theme';

function Bubble({ me, system, redacted, children }: { me?: boolean; system?: boolean; redacted?: boolean; children: string }) {
  if (system) {
    return (
      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: C.brand100, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 }}>
          <Icon name="shield" size={12} color={C.brand500} />
          <Text style={{ fontSize: 11.5, color: C.muted }}>{children}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={{ flexDirection: 'row', justifyContent: me ? 'flex-end' : 'flex-start', marginBottom: 8 }}>
      <View style={[{ maxWidth: '76%', paddingHorizontal: 14, paddingVertical: 10, backgroundColor: me ? C.brand400 : '#fff', borderTopLeftRadius: 18, borderTopRightRadius: 18, borderBottomLeftRadius: me ? 18 : 4, borderBottomRightRadius: me ? 4 : 18 }, shadow.sm]}>
        <Text style={{ fontSize: 14, lineHeight: 20, color: me ? '#0E2419' : C.ink }}>{children}</Text>
        {redacted && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 6, alignSelf: 'flex-start', backgroundColor: 'rgba(0,0,0,0.08)', paddingHorizontal: 9, paddingVertical: 3, borderRadius: 999 }}>
            <Icon name="lock" size={11} color={C.ink} />
            <Text style={{ fontSize: 11, fontFamily: FONT.bodyBold, color: C.ink }}>contact hidden</Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default function ChatThreadScreen() {
  const nav = useNav();
  const insets = useSafeAreaInsets();
  const params = (useRoute().params as { id?: string }) || {};
  const t = teacherById(params.id || 'nisha') || TEACHERS[0];
  return (
    <ScreenContainer>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 11, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: C.hairline }}>
        <IconBtn name="back" variant="light" onPress={nav.pop} />
        <Avatar grad={t.grad} initials={t.initials} size={40} online />
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: FONT.bodyBold, fontSize: 15, color: C.ink }}>{t.name}</Text>
          <Text style={{ fontSize: 11.5, color: C.brand600, fontFamily: FONT.bodySemi }}>Violin Lesson · Wed 21 May</Text>
        </View>
        <IconBtn name="calendar" variant="light" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
        <Bubble system>Messages are kept inside Growlink for your safety</Bubble>
        <Bubble>Hi! Looking forward to my first violin lesson 🎻</Bubble>
        <Bubble me>Welcome! Do you have your own violin, or should I arrange one?</Bubble>
        <Bubble>I have one at home. Can I reach you on</Bubble>
        <Bubble redacted>You can reach me at </Bubble>
        <Bubble me>Let’s keep everything here — I’ll send a reminder before the lesson 👍</Bubble>
        <Bubble>Perfect, see you Wednesday!</Bubble>
      </ScrollView>
      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 14 + insets.bottom, borderTopWidth: 1, borderTopColor: C.hairline, backgroundColor: C.app }}>
        <View style={{ flex: 1, height: 44, borderRadius: 999, backgroundColor: '#fff', borderWidth: 1, borderColor: C.hairline, justifyContent: 'center', paddingHorizontal: 16 }}>
          <TextInput placeholder="Message…" placeholderTextColor={C.muted} style={{ fontSize: 14.5, fontFamily: FONT.body, color: C.ink, padding: 0 }} />
        </View>
        <Press style={{ width: 44, height: 44, borderRadius: 999, backgroundColor: C.brand400, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="arrowR" size={20} color="#08231A" />
        </Press>
      </View>
    </ScreenContainer>
  );
}
