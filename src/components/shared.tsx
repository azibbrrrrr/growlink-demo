import { View, Text, DimensionValue } from 'react-native';
import Svg, { Path, G, Rect, Circle, Defs, LinearGradient as SvgGrad, Stop } from 'react-native-svg';
import { Press } from './Press';
import { Icon, IconName } from './Icon';
import { Photo } from './Photo';
import { Bear } from './Bear';
import { Avatar, VerifiedTick } from './ui';
import { C, shadow, FONT } from '../theme';
import { Teacher, money, Review, Grad } from '../data';

export const catIcon = (cat: string): IconName =>
  cat === 'Music' ? 'music' : cat === 'Fitness' ? 'dumbbell' : cat === 'Design' ? 'palette' : 'book';

/* ───────── decorative cityscape (welcome) ───────── */
export function Cityscape() {
  return (
    <Svg viewBox="0 0 390 220" width="100%" height={150} preserveAspectRatio="xMidYMax slice">
      <Defs>
        <SvgGrad id="h1" x1="0" y1="0" x2="0" y2="1"><Stop offset="0" stopColor="#CFF3DE" /><Stop offset="1" stopColor="#B7ECCC" /></SvgGrad>
        <SvgGrad id="h2" x1="0" y1="0" x2="0" y2="1"><Stop offset="0" stopColor="#86DDAC" /><Stop offset="1" stopColor="#5CC489" /></SvgGrad>
        <SvgGrad id="h3" x1="0" y1="0" x2="0" y2="1"><Stop offset="0" stopColor="#36B878" /><Stop offset="1" stopColor="#1F8A57" /></SvgGrad>
      </Defs>
      <Path d="M0 120 Q90 92 180 110 T390 100 V220 H0 Z" fill="url(#h1)" />
      <G fill="#A7E7C2" opacity={0.7}>
        <Rect x={60} y={84} width={14} height={40} rx={2} /><Rect x={80} y={72} width={16} height={52} rx={2} />
        <Rect x={250} y={78} width={14} height={46} rx={2} /><Rect x={268} y={88} width={18} height={36} rx={2} />
        <Rect x={300} y={70} width={14} height={54} rx={2} />
      </G>
      <Path d="M0 150 Q110 120 210 142 T390 138 V220 H0 Z" fill="url(#h2)" />
      <G fill="#3FAE78">
        {[30, 150, 330].map((x, i) => (
          <G key={i}>
            <Rect x={x + 5} y={150} width={4} height={16} rx={1} fill="#2E8A5C" />
            <Circle cx={x + 7} cy={146} r={11} /><Circle cx={x} cy={152} r={8} /><Circle cx={x + 14} cy={152} r={8} />
          </G>
        ))}
      </G>
      <Path d="M0 178 Q120 156 230 174 T390 170 V220 H0 Z" fill="url(#h3)" />
      <G x={196} y={150}>
        <Path d="M0 -14 a10 10 0 0 1 10 10 c0 7-10 16-10 16 S-10 3-10 -4 a10 10 0 0 1 10 -10 Z" fill="#0E2419" />
        <Circle cx={0} cy={-4} r={4} fill="#5AE29A" />
      </G>
    </Svg>
  );
}

export function FloatIcon({ name, x, y, size, rot = 0 }: { name: IconName; x: number; y: number; size: number; rot?: number }) {
  return (
    <View style={{ position: 'absolute', left: x, top: y, opacity: 0.5, transform: [{ rotate: `${rot}deg` }] }}>
      <Icon name={name} size={size} color={C.brand300} stroke={1.7} />
    </View>
  );
}

/* ───────── stylized map field ───────── */
export function MapField({ children, height = '100%' as number | string }: { children?: React.ReactNode; height?: number | string }) {
  return (
    <View style={{ width: '100%', height: height as any, overflow: 'hidden', backgroundColor: '#EAF6EE' }}>
      <View style={{ position: 'absolute', left: '-6%', top: '8%', width: '46%', height: '40%', borderRadius: 30, backgroundColor: '#D7EFDF' }} />
      <View style={{ position: 'absolute', right: '-8%', bottom: '6%', width: '52%', height: '46%', borderRadius: 34, backgroundColor: '#DCEEDD' }} />
      <View style={{ position: 'absolute', right: '6%', top: '-10%', width: '30%', height: '40%', borderBottomLeftRadius: 40, borderBottomRightRadius: 40, backgroundColor: '#CFE8F2', transform: [{ rotate: '8deg' }] }} />
      <Svg viewBox="0 0 390 600" width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0 }}>
        <G stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" opacity={0.95}>
          <Path d="M-20 120 Q160 160 420 90" /><Path d="M-20 360 Q200 300 420 380" />
          <Path d="M120 -20 Q90 280 160 620" /><Path d="M300 -20 Q330 300 270 620" />
        </G>
        <G stroke="#EDEAE0" strokeWidth={4} fill="none" strokeLinecap="round">
          <Path d="M-20 230 Q200 210 420 250" /><Path d="M220 -20 Q210 300 240 620" />
        </G>
      </Svg>
      {children}
    </View>
  );
}

export function MapMarker({ t, active, onPress, left, top }: { t: Teacher; active?: boolean; onPress?: () => void; left: DimensionValue; top: DimensionValue }) {
  const size = active ? 46 : 38;
  return (
    <Press onPress={onPress} style={{ position: 'absolute', left, top, marginLeft: -(size / 2), marginTop: -(size / 2), alignItems: 'center' }}>
      <View style={[{ width: size, height: size, borderRadius: 999, padding: 2, backgroundColor: active ? C.brand900 : '#fff' }, shadow.sm]}>
        <Photo grad={t.grad} initials={t.initials} radius={999} style={{ width: '100%', height: '100%' }} />
      </View>
      <View style={{ width: 0, height: 0, borderLeftWidth: 5, borderRightWidth: 5, borderTopWidth: 6, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: active ? C.brand900 : '#fff', marginTop: -1 }} />
    </Press>
  );
}

/* ───────── home map preview ───────── */
export function HomeMapPreview({ onOpen, onMarker }: { onOpen: () => void; onMarker: (id: string) => void }) {
  return (
    <Press onPress={onOpen} className="mx-6 rounded-xl overflow-hidden" style={[{ height: 188 }, shadow.sm]}>
      <MapField>
        <MapMarker t={MARKERS[2]} left="24%" top="30%" onPress={() => onMarker('meera')} />
        <MapMarker t={MARKERS[1]} left="74%" top="26%" onPress={() => onMarker('arjun')} />
        <MapMarker t={MARKERS[3]} left="30%" top="72%" onPress={() => onMarker('rohan')} />
        <View style={{ position: 'absolute', left: '52%', top: '50%', marginLeft: -26, marginTop: -26 }}>
          <View style={[{ width: 52, height: 52, borderRadius: 999, backgroundColor: C.brand900, alignItems: 'center', justifyContent: 'center' }, shadow.md]}>
            <Bear variant="mint" size={34} />
          </View>
        </View>
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 14, alignItems: 'center' }}>
          <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 7, height: 38, paddingHorizontal: 16, borderRadius: 999, backgroundColor: C.brand900 }, shadow.md]}>
            <Icon name="compass" size={15} color={C.brand400} />
            <Text style={{ color: '#fff', fontSize: 13, fontFamily: FONT.bodySemi }}>Search this area</Text>
          </View>
        </View>
      </MapField>
    </Press>
  );
}

/* MARKERS holds the same teacher objects, imported lazily to avoid a cycle issue */
import { TEACHERS } from '../data';
const MARKERS = TEACHERS;

/* ───────── horizontal service card (Home → Nearby) ───────── */
export function ServiceCardH({ t, sym, onPress }: { t: Teacher; sym: string; onPress: () => void }) {
  return (
    <Press onPress={onPress} className="rounded-lg overflow-hidden bg-card" style={[{ width: 150 }, shadow.sm]}>
      <View>
        <Photo grad={t.grad} icon={catIcon(t.cat)} radius={0} style={{ width: '100%', height: 104 }} />
        {t.top && (
          <View style={{ position: 'absolute', top: 8, left: 8, flexDirection: 'row', alignItems: 'center', gap: 3, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, backgroundColor: 'rgba(19,42,34,0.82)' }}>
            <Icon name="star" size={10} color={C.brand400} />
            <Text style={{ color: '#fff', fontSize: 10, fontFamily: FONT.bodyBold }}>Top</Text>
          </View>
        )}
      </View>
      <View style={{ paddingHorizontal: 12, paddingTop: 10, paddingBottom: 12 }}>
        <Text style={{ fontFamily: FONT.bodyBold, fontSize: 13.5, color: C.ink }} numberOfLines={1}>{t.short}</Text>
        <Text style={{ fontSize: 12, color: C.muted, marginTop: 2, marginBottom: 8, fontFamily: FONT.body }} numberOfLines={1}>{t.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Icon name="star" size={12} color={C.star} />
            <Text style={{ fontSize: 12.5, fontFamily: FONT.bodyBold, color: C.ink }}>{t.rating}</Text>
            <Text style={{ fontSize: 11.5, color: C.muted }}>· {t.dist}</Text>
          </View>
          <Text style={{ fontSize: 12.5, fontFamily: FONT.bodyBold, color: C.brand600 }}>{money(t.packages[0].price, sym)}</Text>
        </View>
      </View>
    </Press>
  );
}

/* ───────── category tile ───────── */
export function CategoryTile({ label, icon, onPress }: { label: string; icon: IconName; onPress: () => void }) {
  return (
    <Press onPress={onPress} style={{ alignItems: 'center', gap: 8 }}>
      <View style={{ width: 60, height: 60, borderRadius: 16, backgroundColor: C.brand100, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} size={24} color={C.brand600} />
      </View>
      <Text style={{ fontSize: 12, fontFamily: FONT.bodySemi, color: C.sub }}>{label}</Text>
    </Press>
  );
}

/* ───────── vertical result row (list / search / map sheet) ───────── */
export function ListRow({ t, sym, onPress }: { t: Teacher; sym: string; onPress: () => void }) {
  return (
    <Press onPress={onPress} className="bg-card rounded-lg" style={[{ flexDirection: 'row', gap: 12, padding: 10 }, shadow.sm]}>
      <Photo grad={t.grad} icon={catIcon(t.cat)} radius={12} style={{ width: 84, height: 84 }} />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Text style={{ fontFamily: FONT.bodyBold, fontSize: 15, color: C.ink }}>{t.role}</Text>
          {t.verified && <VerifiedTick size={14} />}
        </View>
        <Text style={{ fontSize: 13, color: C.muted, marginTop: 1, fontFamily: FONT.body }}>{t.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Icon name="star" size={13} color={C.star} />
            <Text style={{ fontSize: 13, fontFamily: FONT.bodyBold, color: C.ink }}>{t.rating}</Text>
            <Text style={{ fontSize: 12, color: C.muted }}>({t.reviews})</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
            <Icon name="pin" size={12} color={C.muted} />
            <Text style={{ fontSize: 12, color: C.muted }}>{t.dist}</Text>
          </View>
        </View>
      </View>
      <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
        <Text style={{ fontSize: 11, color: C.muted }}>from</Text>
        <Text style={{ fontSize: 15, fontFamily: FONT.display, color: C.brand600 }}>{money(t.packages[0].price, sym)}</Text>
      </View>
    </Press>
  );
}

/* ───────── review card ───────── */
export function ReviewCard({ r, w }: { r: Review; w: number | string }) {
  return (
    <View className="bg-card rounded-lg" style={[{ width: w as any, padding: 16 }, shadow.sm]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <Avatar grad={r.grad} initials={r.initials} size={38} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: FONT.bodyBold, fontSize: 14, color: C.ink }}>{r.name}</Text>
          <Text style={{ fontSize: 12, color: C.muted }}>{r.when}</Text>
        </View>
        <Stars value={r.stars} size={13} />
      </View>
      <Text style={{ fontFamily: FONT.body, fontSize: 13.5, color: C.sub, lineHeight: 21 }}>{r.body}</Text>
    </View>
  );
}

/* ───────── segmented map/list toggle ───────── */
export function Segmented({ value, onChange }: { value: 'map' | 'list'; onChange: (k: 'map' | 'list') => void }) {
  const options: { k: 'map' | 'list'; label: string; icon: IconName }[] = [
    { k: 'map', label: 'Map', icon: 'pin' },
    { k: 'list', label: 'List', icon: 'grid' },
  ];
  return (
    <View style={[{ flexDirection: 'row', backgroundColor: '#fff', borderRadius: 999, padding: 4, gap: 2 }, shadow.md]}>
      {options.map((o) => {
        const on = value === o.k;
        return (
          <Press key={o.k} onPress={() => onChange(o.k)} style={{ height: 36, paddingHorizontal: 18, borderRadius: 999, flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: on ? C.brand900 : 'transparent' }}>
            <Icon name={o.icon} size={15} color={on ? '#fff' : C.sub} />
            <Text style={{ fontSize: 13.5, fontFamily: FONT.bodyBold, color: on ? '#fff' : C.sub }}>{o.label}</Text>
          </Press>
        );
      })}
    </View>
  );
}

/* ───────── mini teacher header (booking) ───────── */
import { RatingPill } from './ui';
export function MiniTeacher({ t }: { t: Teacher }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 24, paddingBottom: 18, borderBottomWidth: 1, borderBottomColor: C.hairline }}>
      <Avatar grad={t.grad} initials={t.initials} size={46} verified={t.verified} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: FONT.bodyBold, fontSize: 15.5, color: C.ink }}>{t.name}</Text>
        <Text style={{ fontSize: 12.5, color: C.muted }}>{t.role}</Text>
      </View>
      <RatingPill value={t.rating} />
    </View>
  );
}

/* Stars import kept at bottom to avoid clutter above */
import { Stars } from './ui';
