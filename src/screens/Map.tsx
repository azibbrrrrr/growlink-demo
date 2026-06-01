import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconBtn } from '../components/ui';
import { Icon } from '../components/Icon';
import { MapField, MapMarker, ListRow, Segmented } from '../components/shared';
import { useNav } from '../navigation/useNav';
import { useApp } from '../context/AppContext';
import { TEACHERS } from '../data';
import { C, shadow, FONT } from '../theme';

export default function MapScreen() {
  const nav = useNav();
  const { sym } = useApp();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: C.app }}>
      <View style={{ flex: 1 }}>
        <MapField>
          <MapMarker t={TEACHERS[0]} active left="50%" top="34%" onPress={() => nav.push('teacher', { id: 'nisha' })} />
          <MapMarker t={TEACHERS[2]} left="26%" top="24%" onPress={() => nav.push('teacher', { id: 'meera' })} />
          <MapMarker t={TEACHERS[1]} left="78%" top="30%" onPress={() => nav.push('teacher', { id: 'arjun' })} />
          <MapMarker t={TEACHERS[4]} left="66%" top="46%" onPress={() => nav.push('teacher', { id: 'lena' })} />
          <MapMarker t={TEACHERS[3]} left="34%" top="50%" onPress={() => nav.push('teacher', { id: 'rohan' })} />
          <View style={[{ position: 'absolute', left: '82%', top: '56%', marginLeft: -20, marginTop: -20, width: 40, height: 40, borderRadius: 999, backgroundColor: C.brand500, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff' }, shadow.sm]}>
            <Text style={{ color: '#fff', fontFamily: FONT.bodyBold, fontSize: 14 }}>8</Text>
          </View>
        </MapField>
      </View>

      {/* top controls */}
      <View style={{ position: 'absolute', top: insets.top + 8, left: 16, right: 16, flexDirection: 'row', gap: 10 }}>
        <IconBtn name="back" variant="glass" onPress={nav.pop} />
        <View style={[{ flex: 1, height: 40, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.92)', flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14 }, shadow.sm]}>
          <Icon name="pin" size={15} color={C.brand500} />
          <Text style={{ fontSize: 13.5, fontFamily: FONT.bodySemi, color: C.ink }}>Koramangala · within 3 km</Text>
        </View>
        <IconBtn name="filter" variant="glass" onPress={() => nav.push('filters')} />
      </View>
      {/* segmented */}
      <View style={{ position: 'absolute', top: insets.top + 56, left: 0, right: 0, alignItems: 'center' }}>
        <Segmented value="map" onChange={(k) => { if (k === 'list') nav.replace('list'); }} />
      </View>

      {/* bottom sheet peek */}
      <View style={[{ position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingTop: 10, paddingBottom: 16 + insets.bottom, maxHeight: 300 }, shadow.md]}>
        <View style={{ width: 40, height: 5, borderRadius: 3, backgroundColor: C.hairline2, alignSelf: 'center', marginBottom: 10 }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingBottom: 10 }}>
          <Text style={{ fontFamily: FONT.bodyBold, fontSize: 17, color: C.ink }}>12 teachers nearby</Text>
          <Text style={{ fontSize: 13, color: C.brand600, fontFamily: FONT.bodySemi }}>Sort: Distance</Text>
        </View>
        <ScrollView style={{ maxHeight: 200 }} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 4, gap: 10 }} showsVerticalScrollIndicator={false}>
          {TEACHERS.slice(0, 4).map((t) => (
            <ListRow key={t.id} t={t} sym={sym} onPress={() => nav.push('teacher', { id: t.id })} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
