import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ScreenContainer, TopBar, IconBtn, Chip } from '../components/ui';
import { ListRow, Segmented } from '../components/shared';
import { useNav } from '../navigation/useNav';
import { useApp } from '../context/AppContext';
import { TEACHERS } from '../data';
import { C } from '../theme';

export default function ListScreen() {
  const nav = useNav();
  const { sym } = useApp();
  const params = (useRoute().params as { cat?: string }) || {};
  const [sort, setSort] = useState('Distance');
  const list = params.cat ? TEACHERS.filter((t) => t.cat === params.cat) : TEACHERS;
  const shown = list.length ? list : TEACHERS;
  return (
    <ScreenContainer>
      <TopBar
        title={params.cat ?? 'Nearby teachers'}
        onBack={nav.pop}
        trailing={<IconBtn name="filter" variant="light" onPress={() => nav.push('filters')} />}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }} contentContainerStyle={{ gap: 8, paddingHorizontal: 24, paddingBottom: 12, paddingTop: 2 }}>
        {['Distance', 'Top rated', 'Price', 'Verified'].map((s) => (
          <Chip key={s} active={sort === s} onPress={() => setSort(s)}>{s}</Chip>
        ))}
      </ScrollView>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <Text style={{ fontSize: 13, color: C.muted }}>{shown.length} results</Text>
          <Segmented value="list" onChange={(k) => { if (k === 'map') nav.replace('map'); }} />
        </View>
        <View style={{ gap: 12 }}>
          {shown.map((t) => (
            <ListRow key={t.id} t={t} sym={sym} onPress={() => nav.push('teacher', { id: t.id })} />
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
