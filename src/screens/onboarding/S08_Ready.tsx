import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { T } from '../../constants/theme';
import { PrimaryButton } from '../../components/PrimaryButton';

const WEEK = [
  { k: 'Mon', v: 'Lower · Push' },
  { k: 'Tue', v: 'Rest' },
  { k: 'Wed', v: 'Upper · Pull' },
  { k: 'Thu', v: 'Rest' },
  { k: 'Fri', v: 'Full Body' },
  { k: 'Sat', v: 'Cardio · 30m' },
];

interface Props {
  onStart: () => void;
}

export function S08_Ready({ onStart }: Props) {
  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Program ready</Text>
          <Text style={styles.title}>Welcome,{'\n'}Alex.</Text>
          <Text style={styles.sub}>Your 8-week program is ready. First session starts Monday.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardEyebrow}>Your program</Text>
          <Text style={styles.cardTitle}>Recomp — Moderate</Text>
          <Text style={styles.cardMeta}>4 days / week · 45 min sessions · 8 weeks</Text>

          <View style={styles.divider} />

          <View style={styles.grid}>
            {WEEK.map((r) => (
              <View key={r.k} style={styles.gridCell}>
                <Text style={styles.gridDay}>{r.k}</Text>
                <Text style={styles.gridVal}>{r.v}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ flex: 1 }} />
        <PrimaryButton label="Start training" trailing onPress={onStart} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: T.bg },
  hero: { padding: 24, paddingTop: 40 },
  eyebrow: {
    fontFamily: T.mono,
    fontSize: 11,
    color: T.dim,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
    color: T.text,
    letterSpacing: -1.5,
    lineHeight: 40,
    marginBottom: 16,
  },
  sub: { fontSize: 15, color: T.muted, lineHeight: 22, letterSpacing: -0.1 },
  card: {
    marginHorizontal: 24,
    padding: 24,
    borderRadius: 20,
    backgroundColor: '#0e0e0e',
    borderWidth: 1,
    borderColor: T.border,
  },
  cardEyebrow: {
    fontFamily: T.mono,
    fontSize: 11,
    color: T.dim,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: T.text,
    letterSpacing: -0.6,
    marginBottom: 4,
  },
  cardMeta: { fontSize: 14, color: T.muted, marginBottom: 24 },
  divider: { height: 1, backgroundColor: T.border, marginHorizontal: -24, marginBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  gridCell: { width: '50%', marginBottom: 20 },
  gridDay: {
    fontFamily: T.mono,
    fontSize: 10,
    color: T.dim,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  gridVal: { fontSize: 14, color: T.text, letterSpacing: -0.2 },
});
