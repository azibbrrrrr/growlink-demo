import React, { ReactNode } from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Press } from './Press';
import { Icon, IconName } from './Icon';
import { Photo } from './Photo';
import { C, shadow, FONT } from '../theme';
import { STATUS_META, BookingStatus, Grad } from '../data';

/* ───────── ScreenContainer: app frame + top safe-area inset ───────── */
export function ScreenContainer({ children, bleed = false, style }: { children: ReactNode; bleed?: boolean; style?: StyleProp<ViewStyle> }) {
  const insets = useSafeAreaInsets();
  return <View style={[{ flex: 1, backgroundColor: C.app, paddingTop: bleed ? 0 : insets.top }, style]}>{children}</View>;
}

/* ───────── circular icon button (headers / hero overlays) ───────── */
type IconBtnVariant = 'light' | 'glass' | 'dark' | 'ghost';
export function IconBtn({
  name, onPress, variant = 'light', size = 40, iconSize = 20, active = false, style,
}: { name: IconName; onPress?: () => void; variant?: IconBtnVariant; size?: number; iconSize?: number; active?: boolean; style?: StyleProp<ViewStyle> }) {
  const variants: Record<IconBtnVariant, ViewStyle> = {
    light: { backgroundColor: '#fff', borderColor: C.hairline, borderWidth: 1, ...shadow.sm },
    glass: { backgroundColor: 'rgba(255,255,255,0.9)', ...shadow.sm },
    dark: { backgroundColor: C.brand900 },
    ghost: { backgroundColor: 'transparent' },
  };
  const iconColor = variant === 'dark' ? '#fff' : variant === 'glass' ? C.brand900 : C.ink;
  return (
    <Press
      onPress={onPress}
      style={[{ width: size, height: size, borderRadius: 999, alignItems: 'center', justifyContent: 'center' }, variants[variant], style]}>
      <Icon
        name={name}
        size={iconSize}
        color={active && name === 'heart' ? C.red : iconColor}
        fill={active && name === 'heart' ? true : undefined}
      />
    </Press>
  );
}

/* ───────── Button ───────── */
type BtnVariant = 'primary' | 'dark' | 'ghost' | 'mint';
export function Button({
  children, onPress, variant = 'primary', size = 'lg', icon, iconRight, full = true, disabled, style,
}: {
  children: ReactNode; onPress?: () => void; variant?: BtnVariant; size?: 'sm' | 'md' | 'lg';
  icon?: IconName; iconRight?: IconName; full?: boolean; disabled?: boolean; style?: StyleProp<ViewStyle>;
}) {
  const pad = { sm: 16, md: 20, lg: 24 }[size];
  const hgt = { sm: 38, md: 46, lg: 54 }[size];
  const fs = { sm: 14, md: 15, lg: 16 }[size];
  const variants: Record<BtnVariant, { bg: string; color: string; sh?: ViewStyle; border?: string }> = {
    primary: { bg: C.brand400, color: '#08231A', sh: shadow.mint },
    dark: { bg: C.brand900, color: '#fff', sh: shadow.cta },
    ghost: { bg: '#fff', color: C.ink, border: C.hairline2 },
    mint: { bg: C.brand100, color: C.brand600 },
  };
  const v = variants[variant] || variants.primary;
  return (
    <Press
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={[
        {
          width: full ? '100%' : 'auto', height: hgt, paddingHorizontal: pad, borderRadius: 999,
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9,
          backgroundColor: v.bg, opacity: disabled ? 0.45 : 1,
          borderWidth: v.border ? 1.5 : 0, borderColor: v.border,
        },
        v.sh,
        style,
      ]}>
      {icon && <Icon name={icon} size={19} color={v.color} />}
      {typeof children === 'string'
        ? <Text style={{ fontFamily: FONT.bodyBold, fontSize: fs, color: v.color, letterSpacing: -0.1 }}>{children}</Text>
        : children}
      {iconRight && <Icon name={iconRight} size={19} color={v.color} />}
    </Press>
  );
}

/* ───────── Chip ───────── */
export function Chip({ children, active, onPress, style }: { children: ReactNode; active?: boolean; onPress?: () => void; style?: StyleProp<ViewStyle> }) {
  return (
    <Press
      onPress={onPress}
      style={[
        { height: 34, paddingHorizontal: 16, borderRadius: 999, alignItems: 'center', justifyContent: 'center', backgroundColor: active ? C.brand900 : '#fff', borderWidth: active ? 0 : 1, borderColor: C.hairline },
        !active && shadow.sm,
        style,
      ]}>
      <Text style={{ fontFamily: FONT.bodySemi, fontSize: 13.5, color: active ? '#fff' : C.sub }}>{children}</Text>
    </Press>
  );
}

/* ───────── Tag ───────── */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <View style={{ paddingHorizontal: 13, paddingVertical: 7, borderRadius: 999, backgroundColor: C.brand100, alignSelf: 'flex-start' }}>
      <Text style={{ color: C.brand600, fontSize: 12.5, fontFamily: FONT.bodySemi }}>{children}</Text>
    </View>
  );
}

/* ───────── StatusBadge ───────── */
export function StatusBadge({ status, style }: { status: BookingStatus; style?: StyleProp<ViewStyle> }) {
  const m = STATUS_META[status];
  if (!m) return null;
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', height: 26, paddingHorizontal: 11, borderRadius: 999, backgroundColor: m.bg, gap: 6 }, style]}>
      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: m.c }} />
      <Text style={{ fontSize: 12, fontFamily: FONT.bodyBold, color: m.c }}>{m.label}</Text>
    </View>
  );
}

/* ───────── Stars ───────── */
export function Stars({ value, size = 13, count, color = C.star, gap = 1.5 }: { value: number; size?: number; count?: number; color?: string; gap?: number }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
      <View style={{ flexDirection: 'row', gap }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <View key={i} style={{ opacity: i < Math.round(value) ? 1 : 0.25 }}>
            <Icon name="star" size={size} color={color} />
          </View>
        ))}
      </View>
      {count !== undefined && <Text style={{ fontSize: 12.5, color: C.muted, fontFamily: FONT.bodyMedium }}>{`(${count})`}</Text>}
    </View>
  );
}

/* ───────── RatingPill ───────── */
export function RatingPill({ value, style }: { value: number; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, backgroundColor: C.brand100 }, style]}>
      <Icon name="star" size={13} color={C.star} />
      <Text style={{ fontSize: 13, fontFamily: FONT.bodyBold, color: C.brand700 }}>{value}</Text>
    </View>
  );
}

/* ───────── Avatar ───────── */
export function Avatar({
  grad, initials, size = 44, verified, online, radius, style,
}: { grad?: Grad; initials?: string; size?: number; verified?: boolean; online?: boolean; radius?: number; style?: StyleProp<ViewStyle> }) {
  const r = radius !== undefined ? radius : size / 2;
  return (
    <View style={[{ width: size, height: size }, style]}>
      <Photo grad={grad} initials={initials} radius={r} style={{ width: size, height: size }} />
      {verified && (
        <View style={{ position: 'absolute', right: -2, bottom: -2, width: size * 0.42, height: size * 0.42, borderRadius: 999, backgroundColor: C.brand500, borderWidth: 2, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="check" size={size * 0.24} color="#fff" stroke={3} />
        </View>
      )}
      {online && <View style={{ position: 'absolute', right: 0, top: 2, width: 11, height: 11, borderRadius: 999, backgroundColor: C.brand400, borderWidth: 2, borderColor: '#fff' }} />}
    </View>
  );
}

/* ───────── VerifiedTick ───────── */
export function VerifiedTick({ size = 16 }: { size?: number }) {
  return (
    <View style={{ width: size, height: size, borderRadius: 999, backgroundColor: C.brand500, alignItems: 'center', justifyContent: 'center' }}>
      <Icon name="check" size={size * 0.62} color="#fff" stroke={3.2} />
    </View>
  );
}

/* ───────── SectionHeader ───────── */
export function SectionHeader({ title, action, onAction, style }: { title: string; action?: string; onAction?: () => void; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', paddingHorizontal: 24 }, style]}>
      <Text style={{ fontFamily: FONT.bodyBold, fontSize: 17, color: C.ink, letterSpacing: -0.1 }}>{title}</Text>
      {action && (
        <Press onPress={onAction}>
          <Text style={{ color: C.brand600, fontFamily: FONT.bodySemi, fontSize: 13.5 }}>{action}</Text>
        </Press>
      )}
    </View>
  );
}

/* ───────── FeeRow ───────── */
export function FeeRow({ label, value, info, total, free }: { label: string; value: string; info?: boolean; total?: boolean; free?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: total ? 14 : 7, paddingBottom: total ? 0 : 7 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <Text style={{ fontSize: total ? 16 : 14, fontFamily: total ? FONT.display : FONT.bodyMedium, color: total ? C.ink : C.sub }}>{label}</Text>
        {info && <Icon name="info" size={14} color={C.muted} />}
      </View>
      <Text style={{ fontSize: total ? 19 : 14, fontFamily: total ? FONT.display : FONT.bodyBold, color: free ? C.brand600 : C.ink }}>{value}</Text>
    </View>
  );
}

/* ───────── Stepper (numbered step dots) ───────── */
export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 24 }}>
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
            <View style={{ width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: i <= current ? C.brand400 : '#fff', borderWidth: i <= current ? 0 : 1.5, borderColor: C.hairline2 }}>
              {i < current ? <Icon name="check" size={13} color="#08231A" stroke={3} /> : <Text style={{ fontSize: 12, fontFamily: FONT.bodyBold, color: i <= current ? '#08231A' : C.muted }}>{i + 1}</Text>}
            </View>
            {i === current && <Text style={{ fontSize: 13, fontFamily: FONT.bodyBold, color: C.ink }}>{s}</Text>}
          </View>
          {i < steps.length - 1 && <View style={{ flex: 1, height: 2, borderRadius: 2, backgroundColor: i < current ? C.brand400 : C.hairline2 }} />}
        </React.Fragment>
      ))}
    </View>
  );
}

/* ───────── StickyCTA (footer CTA bar) ───────── */
export function StickyCTA({ children, note }: { children: ReactNode; note?: string }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingHorizontal: 24, paddingTop: 12, paddingBottom: 20 + insets.bottom, backgroundColor: C.app, borderTopWidth: 1, borderTopColor: C.hairline }}>
      {children}
      {note && (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: 10 }}>
          <Icon name="shield" size={13} color={C.brand500} />
          <Text style={{ fontSize: 12, color: C.muted, fontFamily: FONT.body }}>{note}</Text>
        </View>
      )}
    </View>
  );
}

/* ───────── TopBar (back + title + trailing) ───────── */
export function TopBar({ title, onBack, trailing, transparent }: { title?: string; onBack?: () => void; trailing?: ReactNode; transparent?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 8, backgroundColor: transparent ? 'transparent' : C.app }}>
      {onBack && <IconBtn name="back" onPress={onBack} variant="light" size={40} />}
      <Text style={{ flex: 1, fontFamily: FONT.display, fontSize: 18, color: C.ink }} numberOfLines={1}>{title}</Text>
      {trailing}
    </View>
  );
}

/* ───────── EmptyState ───────── */
export function EmptyState({ icon, title, body, cta, onCta }: { icon: IconName; title: string; body: string; cta?: string | null; onCta?: () => void }) {
  return (
    <View style={{ alignItems: 'center', paddingVertical: 60, paddingHorizontal: 30 }}>
      <View style={{ width: 84, height: 84, borderRadius: 999, backgroundColor: C.brand100, alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
        <Icon name={icon} size={34} color={C.brand500} stroke={1.7} />
      </View>
      <Text style={{ fontFamily: FONT.display, fontSize: 18, color: C.ink, marginBottom: 8 }}>{title}</Text>
      <Text style={{ fontFamily: FONT.body, fontSize: 14, color: C.sub, textAlign: 'center', maxWidth: 240, marginBottom: 20, lineHeight: 21 }}>{body}</Text>
      {cta ? <Button variant="dark" full={false} onPress={onCta}>{cta}</Button> : null}
    </View>
  );
}
