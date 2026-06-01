import { View, Text, ScrollView } from 'react-native';
import { ScreenContainer, Avatar } from '../components/ui';
import { Press } from '../components/Press';
import { useNav } from '../navigation/useNav';
import { teacherById, THREADS } from '../data';
import { C, FONT } from '../theme';

export default function ChatsScreen() {
  const nav = useNav();
  return (
    <ScreenContainer>
      <View style={{ paddingHorizontal: 24, paddingTop: 14, paddingBottom: 12 }}>
        <Text style={{ fontFamily: FONT.display, fontSize: 28, color: C.ink }}>Chats</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 92 }}>
        {THREADS.map((th) => {
          const t = teacherById(th.id)!;
          return (
            <Press key={th.id} onPress={() => nav.push('chatThread', { id: th.id })} style={{ flexDirection: 'row', gap: 13, alignItems: 'center', paddingVertical: 12, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: C.hairline }}>
              <Avatar grad={t.grad} initials={t.initials} size={52} online={th.unread > 0} />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <Text style={{ fontFamily: FONT.bodyBold, fontSize: 15, color: C.ink }}>{t.name}</Text>
                  <Text style={{ fontSize: 11.5, color: C.muted }}>{th.time}</Text>
                </View>
                <Text style={{ fontSize: 11.5, color: C.brand600, fontFamily: FONT.bodySemi, marginTop: 2, marginBottom: 3 }}>{th.ctx}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
                  <Text numberOfLines={1} style={{ flex: 1, fontSize: 13, color: th.unread ? C.ink : C.muted, fontFamily: th.unread ? FONT.bodySemi : FONT.body }}>{th.last}</Text>
                  {th.unread > 0 && (
                    <View style={{ minWidth: 20, height: 20, borderRadius: 10, backgroundColor: C.brand500, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 }}>
                      <Text style={{ color: '#fff', fontSize: 11, fontFamily: FONT.bodyBold }}>{th.unread}</Text>
                    </View>
                  )}
                </View>
              </View>
            </Press>
          );
        })}
      </ScrollView>
    </ScreenContainer>
  );
}
