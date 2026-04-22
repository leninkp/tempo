import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { T } from '../constants/theme';

type TabKey = 'Today' | 'Library' | 'Progress' | 'Rewards' | 'Profile';

interface Props {
  active: TabKey;
  onPress?: (tab: TabKey) => void;
}

const tabs: { k: TabKey; icon: (active: boolean) => React.ReactNode }[] = [
  {
    k: 'Today',
    icon: (a) => (
      <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
        <Path d="M2 6h14M4 2v2M14 2v2M2 10h14M2 14h14" stroke={a ? T.text : T.muted} strokeWidth={1.4} strokeLinecap="round" />
      </Svg>
    ),
  },
  {
    k: 'Library',
    icon: (a) => (
      <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
        <Rect x={3} y={3} width={12} height={12} rx={1.5} stroke={a ? T.text : T.muted} strokeWidth={1.4} />
        <Path d="M3 7h12" stroke={a ? T.text : T.muted} strokeWidth={1.4} />
      </Svg>
    ),
  },
  {
    k: 'Progress',
    icon: (a) => (
      <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
        <Path d="M2 14l4-4 3 3 7-7" stroke={a ? T.text : T.muted} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    ),
  },
  {
    k: 'Rewards',
    icon: (a) => (
      <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
        <Path
          d="M9 1l2.5 5.5L17 7.5l-4 4L14 17l-5-2.8L4 17l1-5.5-4-4 5.5-1z"
          fill={a ? T.amber : 'none'}
          stroke={a ? T.amber : T.muted}
          strokeWidth={a ? 1 : 1.2}
        />
      </Svg>
    ),
  },
  {
    k: 'Profile',
    icon: (a) => (
      <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
        <Circle cx={9} cy={6} r={3} stroke={a ? T.text : T.muted} strokeWidth={1.4} />
        <Path d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke={a ? T.text : T.muted} strokeWidth={1.4} />
      </Svg>
    ),
  },
];

export function TabBar({ active, onPress }: Props) {
  return (
    <View style={styles.bar}>
      {tabs.map((t) => (
        <TouchableOpacity key={t.k} style={styles.tab} onPress={() => onPress?.(t.k)} activeOpacity={0.7}>
          {t.icon(active === t.k)}
          <Text style={[styles.label, { color: active === t.k ? T.text : T.muted }]}>{t.k}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 28,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: T.border,
    backgroundColor: T.bg,
  },
  tab: {
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontFamily: T.mono,
    fontSize: 10,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
});
