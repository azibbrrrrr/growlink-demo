import { useState, ReactNode } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Chip } from '../components/ui';
import { Press } from '../components/Press';
import { Icon } from '../components/Icon';
import { useNav } from '../navigation/useNav';
import { useApp } from '../context/AppContext';
import { money } from '../data';
import { C, FONT } from '../theme';

function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <View style={{ marginBottom: 22 }}>
      <Text style={{ fontFamily: FONT.bodyBold, fontSize: 14, color: C.ink, marginBottom: 12 }}>{label}</Text>
      {children}
    </View>
  );
}

export default function FiltersSheet() {
  const nav = useNav();
  const { sym } = useApp();
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState('Any');
  const [rating, setRating] = useState(4);
  const [price, setPrice] = useState(1200);
  const [verified, setVerified] = useState(true);
  const [cats, setCats] = useState<string[]>(['Music']);
  const toggleCat = (c: string) => setCats((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));
  const pricePct = ((price - 200) / (2500 - 200)) * 100;
  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(15,30,24,0.45)', justifyContent: 'flex-end' }}>
      <Press onPress={nav.pop} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '88%' }}>
        <View style={{ width: 40, height: 5, borderRadius: 3, backgroundColor: C.hairline2, alignSelf: 'center', marginTop: 10, marginBottom: 4 }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 8, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: C.hairline }}>
          <Text style={{ fontFamily: FONT.display, fontSize: 19, color: C.ink }}>Filters</Text>
          <Press onPress={nav.pop} style={{ width: 32, height: 32, borderRadius: 999, backgroundColor: C.brand100, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="x" size={16} color={C.brand700} />
          </Press>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 8 }}>
          <FilterGroup label="Category">
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 9 }}>
              {['Music', 'Tutoring', 'Fitness', 'Design', 'Writing'].map((c) => (
                <Chip key={c} active={cats.includes(c)} onPress={() => toggleCat(c)}>{c}</Chip>
              ))}
            </View>
          </FilterGroup>
          <FilterGroup label={`Max price per lesson · ${money(price, sym)}`}>
            <View style={{ height: 6, borderRadius: 3, backgroundColor: C.hairline, overflow: 'hidden' }}>
              <View style={{ width: `${pricePct}%`, height: '100%', backgroundColor: C.brand500 }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
              <Text style={{ fontSize: 11.5, color: C.muted }}>{money(200, sym)}</Text>
              <Text style={{ fontSize: 11.5, color: C.muted }}>{money(2500, sym)}+</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
              {[600, 1200, 1800, 2500].map((p) => (
                <Chip key={p} active={price === p} onPress={() => setPrice(p)}>{money(p, sym)}</Chip>
              ))}
            </View>
          </FilterGroup>
          <FilterGroup label="Minimum rating">
            <View style={{ flexDirection: 'row', gap: 9 }}>
              {[3, 4, 4.5].map((r) => (
                <Chip key={r} active={rating === r} onPress={() => setRating(r)}>{`★ ${r}+`}</Chip>
              ))}
            </View>
          </FilterGroup>
          <FilterGroup label="Lesson mode">
            <View style={{ flexDirection: 'row', gap: 9 }}>
              {['Any', 'In-Person', 'Online'].map((m) => (
                <Chip key={m} active={mode === m} onPress={() => setMode(m)}>{m}</Chip>
              ))}
            </View>
          </FilterGroup>
          <FilterGroup label="Distance">
            <View style={{ flexDirection: 'row', gap: 9 }}>
              {['1 km', '3 km', '5 km', 'Any'].map((d, i) => (
                <Chip key={d} active={i === 1}>{d}</Chip>
              ))}
            </View>
          </FilterGroup>
          <Press onPress={() => setVerified(!verified)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: C.brand100, borderRadius: 12, padding: 16, marginBottom: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9 }}>
              <Icon name="shield" size={17} color={C.brand600} />
              <Text style={{ fontFamily: FONT.bodySemi, fontSize: 14, color: C.ink }}>Verified teachers only</Text>
            </View>
            <View style={{ width: 44, height: 26, borderRadius: 13, backgroundColor: verified ? C.brand500 : '#D8D5CC', justifyContent: 'center' }}>
              <View style={{ position: 'absolute', left: verified ? 21 : 3, width: 20, height: 20, borderRadius: 999, backgroundColor: '#fff' }} />
            </View>
          </Press>
        </ScrollView>
        <View style={{ flexDirection: 'row', gap: 12, paddingHorizontal: 24, paddingTop: 12, paddingBottom: 20 + insets.bottom, borderTopWidth: 1, borderTopColor: C.hairline }}>
          <Button variant="ghost" full={false} onPress={nav.pop} style={{ flex: 1 }}>Reset</Button>
          <Button variant="dark" full={false} onPress={nav.pop} style={{ flex: 2 }}>Show 18 results</Button>
        </View>
      </View>
    </View>
  );
}
