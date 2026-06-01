import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconBtn, Button, StickyCTA, SectionHeader, Tag, VerifiedTick } from '../components/ui';
import { Press } from '../components/Press';
import { Icon } from '../components/Icon';
import { Photo } from '../components/Photo';
import { ReviewCard, catIcon } from '../components/shared';
import { useNav } from '../navigation/useNav';
import { useApp } from '../context/AppContext';
import { teacherById, TEACHERS, REVIEWS, money, Pkg } from '../data';
import { C, shadow, FONT } from '../theme';

function StatCell({ value, label, last }: { value: string; label: string; last?: boolean }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 4, borderRightWidth: last ? 0 : 1, borderRightColor: C.hairline }}>
      <Text style={{ fontFamily: FONT.display, fontSize: 17, color: C.ink }}>{value}</Text>
      <Text style={{ fontSize: 11, color: C.muted, marginTop: 3, textAlign: 'center' }}>{label}</Text>
    </View>
  );
}

function PackageCard({ p, sym, selected, onPress }: { p: Pkg; sym: string; selected: boolean; onPress: () => void }) {
  return (
    <Press
      onPress={onPress}
      style={{
        flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, paddingVertical: 14, borderRadius: 16,
        backgroundColor: p.trial ? C.brand100 : '#fff',
        borderWidth: selected ? 2 : p.trial ? 1.5 : 1,
        borderColor: selected ? C.brand400 : p.trial ? C.brand300 : C.hairline,
      }}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <Text style={{ fontFamily: FONT.bodyBold, fontSize: 15, color: C.ink }}>{p.name}</Text>
          {p.trial && (
            <View style={{ backgroundColor: C.brand400, paddingHorizontal: 7, paddingVertical: 2, borderRadius: 999 }}>
              <Text style={{ fontSize: 10, fontFamily: FONT.bodyBold, color: '#08231A' }}>BEST TO START</Text>
            </View>
          )}
          {p.save && <Text style={{ fontSize: 10.5, fontFamily: FONT.bodyBold, color: C.brand600 }}>{p.save}</Text>}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 }}>
          <Icon name="clock" size={12} color={C.muted} />
          <Text style={{ fontSize: 12.5, color: C.muted }}>{p.dur}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Text style={{ fontFamily: FONT.display, fontSize: 18, color: p.trial ? C.brand600 : C.ink }}>{p.price === 0 ? 'Free' : money(p.price, sym)}</Text>
        <View style={{ width: 24, height: 24, borderRadius: 999, borderWidth: selected ? 0 : 2, borderColor: C.hairline2, backgroundColor: selected ? C.brand400 : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
          {selected && <Icon name="check" size={13} color="#08231A" stroke={3} />}
        </View>
      </View>
    </Press>
  );
}

export default function TeacherProfile() {
  const nav = useNav();
  const ctx = useApp();
  const insets = useSafeAreaInsets();
  const { id } = useRoute().params as { id: string };
  const t = teacherById(id) || TEACHERS[0];
  const [fav, setFav] = useState(ctx.fav.has(t.id));
  const [sel, setSel] = useState(t.packages[0].id);
  const selPkg = t.packages.find((p) => p.id === sel) || t.packages[0];
  const book = () => nav.push('booking', { id: t.id, pkgId: sel });
  return (
    <View style={{ flex: 1, backgroundColor: C.app }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* hero */}
        <View style={{ height: 300 }}>
          <Photo grad={t.grad} icon={catIcon(t.cat)} big radius={0} style={{ width: '100%', height: '100%', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }} />
          <LinearGradient colors={['rgba(0,0,0,0.18)', 'rgba(0,0,0,0)', 'rgba(8,28,20,0.55)']} locations={[0, 0.3, 1]} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }} />
          <View style={{ position: 'absolute', top: insets.top + 8, left: 16, right: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <IconBtn name="back" variant="glass" onPress={nav.pop} />
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <IconBtn name="share" variant="glass" />
              <IconBtn name="heart" variant="glass" active={fav} onPress={() => { setFav(!fav); ctx.toggleFav(t.id); }} />
            </View>
          </View>
          {t.top && (
            <View style={[{ position: 'absolute', top: insets.top + 52, left: 16, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.95)' }, shadow.sm]}>
              <Icon name="star" size={13} color={C.star} />
              <Text style={{ fontSize: 12, fontFamily: FONT.bodyBold, color: C.brand900 }}>Top Rated</Text>
            </View>
          )}
          <View style={{ position: 'absolute', left: 24, right: 24, bottom: 22 }}>
            <Text style={{ fontFamily: FONT.displayExtra, fontSize: 30, color: '#fff', letterSpacing: -0.4 }}>{t.role}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 }}>
              <Text style={{ fontSize: 17, fontFamily: FONT.bodyBold, color: '#fff' }}>{t.name}</Text>
              {t.verified && <VerifiedTick size={17} />}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Icon name="pin" size={13} color="#fff" />
                <Text style={{ fontSize: 13, color: '#fff' }}>Koramangala</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Icon name="compass" size={13} color="#fff" />
                <Text style={{ fontSize: 13, color: '#fff' }}>{t.dist} away</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ paddingTop: 18 }}>
          {/* stats */}
          <View style={[{ flexDirection: 'row', marginHorizontal: 24, paddingVertical: 14, backgroundColor: '#fff', borderRadius: 16 }, shadow.sm]}>
            <StatCell value={`${t.rating} ★`} label={`${t.reviews} reviews`} />
            <StatCell value={t.yrs} label="Years Exp." />
            <StatCell value={t.students} label="Students" />
            <StatCell value={t.response} label="Response" last />
          </View>
          {/* hear me play */}
          <Press style={{ flexDirection: 'row', alignItems: 'center', gap: 14, marginHorizontal: 24, marginTop: 16, padding: 12, backgroundColor: C.brand900, borderRadius: 16 }}>
            <View style={{ width: 48, height: 48, borderRadius: 999, backgroundColor: C.brand400, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: 0, height: 0, borderTopWidth: 8, borderBottomWidth: 8, borderLeftWidth: 13, borderTopColor: 'transparent', borderBottomColor: 'transparent', borderLeftColor: '#08231A', marginLeft: 3 }} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#fff', fontFamily: FONT.bodyBold, fontSize: 14.5 }}>Hear me play</Text>
              <Text style={{ color: C.brand300, fontSize: 12.5, marginTop: 2 }}>0:48 · video introduction</Text>
            </View>
            <Icon name="video" size={20} color={C.brand300} />
          </Press>
          {/* about */}
          <View style={{ paddingHorizontal: 24, paddingTop: 22 }}>
            <Text style={{ fontFamily: FONT.bodyBold, fontSize: 17, color: C.ink, marginBottom: 8 }}>About {t.name.split(' ')[0]}</Text>
            <Text style={{ fontFamily: FONT.body, fontSize: 14, color: C.sub, lineHeight: 22 }}>{t.bio}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
              {t.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
            </View>
          </View>
          {/* reviews */}
          <SectionHeader title={`Reviews (${t.reviews})`} action="See all" onAction={() => nav.push('reviews', { id: t.id })} style={{ marginTop: 24, marginBottom: 12 }} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingHorizontal: 24, paddingBottom: 4 }}>
            {REVIEWS.slice(0, 3).map((r) => <ReviewCard key={r.id} r={r} w={268} />)}
          </ScrollView>
          {/* packages */}
          <SectionHeader title="Packages" style={{ marginTop: 24, marginBottom: 12 }} />
          <View style={{ gap: 10, paddingHorizontal: 24, paddingBottom: 16 }}>
            {t.packages.map((p) => <PackageCard key={p.id} p={p} sym={ctx.sym} selected={sel === p.id} onPress={() => setSel(p.id)} />)}
          </View>
        </View>
      </ScrollView>
      <StickyCTA note="Secure payments. Cancel anytime.">
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View>
            <Text style={{ fontSize: 11, color: C.muted }}>From</Text>
            <Text style={{ fontFamily: FONT.display, fontSize: 20, color: C.ink }}>{selPkg.price === 0 ? 'Free' : money(selPkg.price, ctx.sym)}</Text>
          </View>
          <Button variant="dark" iconRight="arrowR" onPress={book} style={{ flex: 1 }}>Book a Lesson</Button>
        </View>
      </StickyCTA>
    </View>
  );
}
