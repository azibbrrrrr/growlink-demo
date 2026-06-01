import { useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { ScreenContainer, IconBtn, Chip } from '../components/ui';
import { Press } from '../components/Press';
import { Icon } from '../components/Icon';
import { ListRow } from '../components/shared';
import { useNav } from '../navigation/useNav';
import { useApp } from '../context/AppContext';
import { TEACHERS } from '../data';
import { C, FONT } from '../theme';

export default function SearchScreen() {
  const nav = useNav();
  const { sym } = useApp();
  const [q, setQ] = useState('');
  const recents = ['Violin lessons', 'Yoga near me', 'Maths tutor'];
  const trending = ['Piano', 'Guitar', 'Classical', 'Vinyasa', 'Branding', 'Exam Prep'];
  const results = TEACHERS.filter((t) => (t.name + t.role + t.cat).toLowerCase().includes(q.toLowerCase()));
  return (
    <ScreenContainer>
      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 12 }}>
        <IconBtn name="back" variant="light" onPress={nav.pop} />
        <View style={{ flex: 1, height: 48, borderRadius: 16, backgroundColor: '#fff', borderWidth: 1.5, borderColor: C.brand400, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14 }}>
          <Icon name="search" size={18} color={C.brand500} />
          <TextInput autoFocus value={q} onChangeText={setQ} placeholder="Search teachers, skills…" placeholderTextColor={C.muted} style={{ flex: 1, fontSize: 15, color: C.ink, fontFamily: FONT.body, padding: 0 }} />
          {q ? (
            <Press onPress={() => setQ('')}>
              <Icon name="x" size={16} color={C.muted} />
            </Press>
          ) : null}
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }} keyboardShouldPersistTaps="handled">
        {!q ? (
          <View>
            <Text style={{ fontFamily: FONT.bodyBold, fontSize: 14, color: C.ink, marginTop: 10, marginBottom: 10 }}>Recent</Text>
            {recents.map((r) => (
              <Press key={r} onPress={() => setQ(r)} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: C.hairline }}>
                <Icon name="clock" size={17} color={C.muted} />
                <Text style={{ fontSize: 14.5, color: C.sub, fontFamily: FONT.body }}>{r}</Text>
              </Press>
            ))}
            <Text style={{ fontFamily: FONT.bodyBold, fontSize: 14, color: C.ink, marginTop: 22, marginBottom: 12 }}>Trending skills</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 9 }}>
              {trending.map((s) => (
                <Chip key={s} onPress={() => setQ(s)}>{s}</Chip>
              ))}
            </View>
          </View>
        ) : (
          <View>
            <Text style={{ fontSize: 13, color: C.muted, marginTop: 8, marginBottom: 12 }}>{results.length} results for "{q}"</Text>
            <View style={{ gap: 12 }}>
              {results.map((t) => (
                <ListRow key={t.id} t={t} sym={sym} onPress={() => nav.push('teacher', { id: t.id })} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
