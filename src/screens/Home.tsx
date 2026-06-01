import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ScreenContainer, IconBtn, Chip, SectionHeader } from '../components/ui';
import { Press } from '../components/Press';
import { Bear } from '../components/Bear';
import { Icon } from '../components/Icon';
import { HomeMapPreview, ServiceCardH, CategoryTile } from '../components/shared';
import { useNav } from '../navigation/useNav';
import { useApp } from '../context/AppContext';
import { TEACHERS, CATEGORIES, FILTERS } from '../data';
import { C, shadow, FONT } from '../theme';

export default function HomeScreen() {
  const nav = useNav();
  const { sym } = useApp();
  const [filter, setFilter] = useState('All');
  return (
    <ScreenContainer>
      {/* header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 20, paddingTop: 10, paddingBottom: 6 }}>
        <View style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: C.brand900, alignItems: 'center', justifyContent: 'center' }}>
          <Bear variant="mint" size={26} />
        </View>
        <Press style={{ flex: 1 }}>
          <Text style={{ fontSize: 11, color: C.muted, fontFamily: FONT.bodySemi, letterSpacing: 0.3 }}>LOCATION</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Icon name="pin" size={14} color={C.brand500} />
            <Text style={{ fontFamily: FONT.bodyBold, fontSize: 15, color: C.ink }}>Koramangala, Bengaluru</Text>
            <Icon name="chevD" size={15} color={C.muted} />
          </View>
        </Press>
        <View>
          <IconBtn name="bell" variant="light" onPress={() => nav.push('activity')} />
          <View style={{ position: 'absolute', top: 6, right: 7, width: 9, height: 9, borderRadius: 999, backgroundColor: C.red, borderWidth: 2, borderColor: '#fff' }} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* search */}
        <View style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 20, paddingTop: 8, paddingBottom: 12 }}>
          <Press onPress={() => nav.push('search')} className="flex-1" style={[{ height: 52, borderRadius: 16, backgroundColor: '#fff', borderWidth: 1, borderColor: C.hairline, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16 }, shadow.sm]}>
            <Icon name="search" size={19} color={C.muted} />
            <Text style={{ color: C.muted, fontSize: 14.5, fontFamily: FONT.body }}>Search teachers, services, skills…</Text>
          </Press>
          <Press onPress={() => nav.push('filters')} style={[{ width: 52, height: 52, borderRadius: 16, backgroundColor: C.brand900, alignItems: 'center', justifyContent: 'center' }, shadow.sm]}>
            <Icon name="filter" size={20} color="#fff" />
          </Press>
        </View>
        {/* filter chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 20, paddingBottom: 14 }}>
          {FILTERS.map((f) => (
            <Chip key={f} active={filter === f} onPress={() => setFilter(f)}>{f}</Chip>
          ))}
        </ScrollView>
        {/* map preview */}
        <HomeMapPreview onOpen={() => nav.push('map')} onMarker={(id) => nav.push('teacher', { id })} />
        {/* nearby */}
        <SectionHeader title="Nearby for you" action="See all" onAction={() => nav.push('list')} style={{ marginTop: 22, marginBottom: 12 }} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 14, paddingHorizontal: 24, paddingBottom: 4 }}>
          {TEACHERS.map((t) => (
            <ServiceCardH key={t.id} t={t} sym={sym} onPress={() => nav.push('teacher', { id: t.id })} />
          ))}
        </ScrollView>
        {/* categories */}
        <SectionHeader title="Explore by category" style={{ marginTop: 24, marginBottom: 14 }} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 24 }}>
          {CATEGORIES.map((c) => (
            <View key={c.key} style={{ width: '33.333%', alignItems: 'center', marginBottom: 18 }}>
              <CategoryTile label={c.key} icon={c.icon} onPress={() => nav.push('list', { cat: c.key })} />
            </View>
          ))}
        </View>
        <View style={{ height: 90 }} />
      </ScrollView>
    </ScreenContainer>
  );
}
