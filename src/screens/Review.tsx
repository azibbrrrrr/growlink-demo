import { useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ScreenContainer, TopBar, Button, StickyCTA, Avatar, Chip } from '../components/ui';
import { Press } from '../components/Press';
import { Icon } from '../components/Icon';
import { useNav } from '../navigation/useNav';
import { teacherById, TEACHERS } from '../data';
import { C, FONT } from '../theme';

export default function ReviewScreen() {
  const nav = useNav();
  const { id } = useRoute().params as { id: string };
  const t = teacherById(id) || TEACHERS[0];
  const [stars, setStars] = useState(5);
  const [tags, setTags] = useState<string[]>(['Patient']);
  const [text, setText] = useState('');
  const toggle = (x: string) => setTags((p) => (p.includes(x) ? p.filter((y) => y !== x) : [...p, x]));
  return (
    <ScreenContainer>
      <TopBar title="Leave a Review" onBack={nav.pop} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 10, paddingBottom: 24, alignItems: 'center' }} keyboardShouldPersistTaps="handled">
        <Avatar grad={t.grad} initials={t.initials} size={64} verified={t.verified} />
        <Text style={{ fontFamily: FONT.bodyBold, fontSize: 16, color: C.ink, marginTop: 12 }}>{t.name}</Text>
        <Text style={{ fontSize: 13, color: C.muted, marginBottom: 18 }}>{t.role}</Text>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 24 }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Press key={i} onPress={() => setStars(i)}>
              <Icon name="star" size={38} color={i <= stars ? C.star : C.hairline2} />
            </Press>
          ))}
        </View>
        <Text style={{ alignSelf: 'stretch', fontFamily: FONT.bodyBold, fontSize: 14, color: C.ink, marginBottom: 12 }}>What stood out?</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 9, alignSelf: 'stretch', marginBottom: 22 }}>
          {['Patient', 'Punctual', 'Skilled', 'Encouraging', 'Well prepared', 'Fun'].map((x) => (
            <Chip key={x} active={tags.includes(x)} onPress={() => toggle(x)}>{x}</Chip>
          ))}
        </View>
        <TextInput
          value={text}
          onChangeText={setText}
          multiline
          placeholder="Share more about your experience…"
          placeholderTextColor={C.muted}
          style={{ alignSelf: 'stretch', minHeight: 96, borderRadius: 12, borderWidth: 1, borderColor: C.hairline, padding: 14, fontSize: 14, fontFamily: FONT.body, color: C.ink, textAlignVertical: 'top' }}
        />
      </ScrollView>
      <StickyCTA>
        <Button variant="dark" onPress={nav.pop}>Submit review</Button>
      </StickyCTA>
    </ScreenContainer>
  );
}
