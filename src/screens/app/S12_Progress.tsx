import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Line, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { T } from '../../constants/theme';
import { TabBar } from '../../components/TabBar';

const WEEKS = [
  { w: 1, done: 4, planned: 4 },
  { w: 2, done: 4, planned: 4 },
  { w: 3, done: 3, planned: 4 },
  { w: 4, done: 4, planned: 4 },
  { w: 5, done: 2, planned: 4 },
  { w: 6, done: 0, planned: 4 },
  { w: 7, done: 0, planned: 4 },
  { w: 8, done: 0, planned: 4 },
];
const CURRENT = 5;

const BW = [75.2, 74.9, 74.6, 74.3, 73.8, 73.4, 73.1, 72.7];
const BW_MIN = Math.min(...BW) - 0.5;
const BW_MAX = Math.max(...BW) + 0.5;
const bwPoints = BW.map((v, i) => ({
  x: (i / (BW.length - 1)) * 280,
  y: 90 - ((v - BW_MIN) / (BW_MAX - BW_MIN)) * 80,
}));
const bwPath = bwPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
const bwAreaPath = bwPath + ` L 280 100 L 0 100 Z`;

const PRS = [
  { lift: 'Back squat',  val: '85',   unit: 'kg', delta: '+7.5', weeks: 'Wk 01 → 05' },
  { lift: 'Bench press', val: '62.5', unit: 'kg', delta: '+5.0', weeks: 'Wk 02 → 05' },
  { lift: 'Deadlift',    val: '110',  unit: 'kg', delta: '+10',  weeks: 'Wk 01 → 04' },
];

function barColor(ratio: number, isFuture: boolean): string {
  if (isFuture) return 'transparent';
  if (ratio === 1 || ratio >= 0.75) return T.lime;
  if (ratio >= 0.5) return T.amber;
  return T.coral;
}

export function S12_Progress() {
  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View style={styles.topBar}>
          <Text style={styles.topBarLabel}>Progress</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Hero */}
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>Week 05 of 08 · Recomp</Text>
            <Text style={styles.title}>17 sessions{'\n'}logged.</Text>
            <View style={styles.statsRow}>
              {[
                { k: 'Consistency', v: '92', u: '%', delta: '+4' },
                { k: 'Total volume', v: '38.2', u: 'k kg', delta: '+12%' },
                { k: 'Streak', v: '12', u: 'days', delta: null },
              ].map((s) => (
                <View key={s.k} style={{ flex: 1 }}>
                  <Text style={styles.statKey}>{s.k}</Text>
                  <Text style={styles.statVal}>{s.v}<Text style={styles.statUnit}> {s.u}</Text></Text>
                  {s.delta && <Text style={styles.statDelta}>↑ {s.delta}</Text>}
                </View>
              ))}
            </View>
          </View>

          {/* Consistency chart */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionLabel}>Consistency · 8 wk</Text>
              <Text style={styles.sectionVal}>17 / 32 sessions</Text>
            </View>
            <View style={styles.card}>
              <View style={styles.barsRow}>
                {WEEKS.map((w) => {
                  const isCurrent = w.w === CURRENT;
                  const isFuture = w.w > CURRENT;
                  const ratio = w.done / w.planned;
                  const color = barColor(ratio, isFuture);
                  return (
                    <View key={w.w} style={styles.barCol}>
                      <View style={[styles.barTrack, {
                        borderWidth: isCurrent && !isFuture ? 1 : 0,
                        borderColor: isCurrent && !isFuture ? color : 'transparent',
                      }]}>
                        {!isFuture && (
                          <View style={[styles.barFill, { height: `${ratio * 100}%`, backgroundColor: color }]} />
                        )}
                      </View>
                      <Text style={[styles.barLabel, { color: isCurrent && !isFuture ? color : T.dim }]}>
                        W{String(w.w).padStart(2, '0')}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <View style={styles.legendRow}>
                {[
                  { c: T.lime, k: 'On plan' },
                  { c: T.amber, k: 'Partial' },
                  { c: T.coral, k: 'Missed' },
                ].map((l) => (
                  <View key={l.k} style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: l.c }]} />
                    <Text style={styles.legendLabel}>{l.k}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Bodyweight chart */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionLabel}>Bodyweight</Text>
              <Text style={styles.sectionVal}>−2.5 kg in 8 wk</Text>
            </View>
            <View style={[styles.card, { paddingBottom: 14 }]}>
              <Text style={styles.bwCurrent}>72.7<Text style={styles.bwUnit}> kg</Text></Text>
              <Text style={styles.bwCurrentLabel}>current</Text>
              <Svg width="100%" height={100} viewBox="0 0 280 100" preserveAspectRatio="none">
                <Defs>
                  <LinearGradient id="bwFill" x1="0" x2="0" y1="0" y2="1">
                    <Stop offset="0%" stopColor={T.lime} stopOpacity={0.45} />
                    <Stop offset="100%" stopColor={T.lime} stopOpacity={0} />
                  </LinearGradient>
                  <LinearGradient id="bwStroke" x1="0" x2="1" y1="0" y2="0">
                    <Stop offset="0%" stopColor={T.amber} />
                    <Stop offset="55%" stopColor={T.lime} />
                    <Stop offset="100%" stopColor={T.mint} />
                  </LinearGradient>
                </Defs>
                <Line x1={0} y1={20} x2={280} y2={20} stroke="rgba(255,255,255,0.05)" strokeDasharray="2 3" />
                <Line x1={0} y1={60} x2={280} y2={60} stroke="rgba(255,255,255,0.05)" strokeDasharray="2 3" />
                <Path d={bwAreaPath} fill="url(#bwFill)" />
                <Path d={bwPath} stroke="url(#bwStroke)" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                {bwPoints.map((p, i) => {
                  const last = i === bwPoints.length - 1;
                  if (last) return (
                    <React.Fragment key={i}>
                      <Circle cx={p.x} cy={p.y} r={7} fill={T.mint} opacity={0.25} />
                      <Circle cx={p.x} cy={p.y} r={3.5} fill={T.mint} />
                      <Circle cx={p.x} cy={p.y} r={1.5} fill="#000" />
                    </React.Fragment>
                  );
                  return <Circle key={i} cx={p.x} cy={p.y} r={1.8} fill={T.lime} opacity={0.7} />;
                })}
              </Svg>
              <View style={styles.chartLabels}>
                {['W01','W03','W05','W08'].map(l => (
                  <Text key={l} style={styles.chartLabel}>{l}</Text>
                ))}
              </View>
            </View>
          </View>

          {/* PRs */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { marginBottom: 12 }]}>Personal records</Text>
            <View style={styles.prList}>
              {PRS.map((p, i) => (
                <View key={p.lift} style={[styles.prRow, i < PRS.length - 1 && styles.prBorder]}>
                  <View style={styles.prBadge}><Text style={styles.prBadgeText}>PR</Text></View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.prLift}>{p.lift}</Text>
                    <Text style={styles.prWeeks}>{p.weeks}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.prVal}>{p.val}<Text style={styles.prUnit}> {p.unit}</Text></Text>
                    <Text style={styles.prDelta}>↑ {p.delta}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          <View style={{ height: 16 }} />
        </ScrollView>
      </SafeAreaView>
      <TabBar active="Progress" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: T.bg },
  topBar: { paddingHorizontal: 24, paddingTop: 14, paddingBottom: 18 },
  topBarLabel: { fontFamily: T.mono, fontSize: 10, color: T.dim, letterSpacing: 1.4, textTransform: 'uppercase' },
  hero: { paddingHorizontal: 24, paddingBottom: 22 },
  eyebrow: { fontFamily: T.mono, fontSize: 12, color: T.dim, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 14 },
  title: { fontSize: 40, fontWeight: '600', color: T.text, letterSpacing: -1.5, lineHeight: 40, marginBottom: 14 },
  statsRow: { flexDirection: 'row', gap: 0 },
  statKey: { fontFamily: T.mono, fontSize: 10, color: T.dim, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  statVal: { fontSize: 22, fontWeight: '600', color: T.text, letterSpacing: -0.5 },
  statUnit: { fontSize: 11, color: T.muted, fontWeight: '500', letterSpacing: 0 },
  statDelta: { fontFamily: T.mono, fontSize: 10, color: T.text, letterSpacing: 0.4, marginTop: 2, opacity: 0.6 },
  section: { paddingHorizontal: 24, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 },
  sectionLabel: { fontFamily: T.mono, fontSize: 11, color: T.dim, letterSpacing: 1.2, textTransform: 'uppercase' },
  sectionVal: { fontSize: 12, color: T.muted },
  card: { padding: 18, borderRadius: 16, backgroundColor: '#0b0b0b', borderWidth: 1, borderColor: T.border },
  barsRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-end', height: 72 },
  barCol: { flex: 1, alignItems: 'center', gap: 6 },
  barTrack: {
    width: '100%', height: 56, borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden', justifyContent: 'flex-end',
  },
  barFill: { width: '100%', borderRadius: 4 },
  barLabel: { fontFamily: T.mono, fontSize: 9, letterSpacing: 0.6 },
  legendRow: { flexDirection: 'row', gap: 14, marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: T.border },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 2 },
  legendLabel: { fontFamily: T.mono, fontSize: 10, color: T.muted, letterSpacing: 0.6, textTransform: 'uppercase' },
  bwCurrent: { fontSize: 28, fontWeight: '600', color: T.text, letterSpacing: -0.8 },
  bwUnit: { fontSize: 12, color: T.muted, fontWeight: '500' },
  bwCurrentLabel: { fontFamily: T.mono, fontSize: 11, color: T.muted, letterSpacing: 0.4, marginBottom: 12 },
  chartLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  chartLabel: { fontFamily: T.mono, fontSize: 9, color: T.dim, letterSpacing: 0.6 },
  prList: { borderRadius: 16, overflow: 'hidden', backgroundColor: '#0b0b0b', borderWidth: 1, borderColor: T.border },
  prRow: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14 },
  prBorder: { borderBottomWidth: 1, borderBottomColor: T.border },
  prBadge: {
    width: 32, height: 32, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center', justifyContent: 'center',
  },
  prBadgeText: { fontFamily: T.mono, fontSize: 10, color: T.text, letterSpacing: 0.4 },
  prLift: { fontSize: 15, fontWeight: '500', color: T.text, letterSpacing: -0.2, marginBottom: 2 },
  prWeeks: { fontFamily: T.mono, fontSize: 10, color: T.dim, letterSpacing: 0.6 },
  prVal: { fontSize: 18, fontWeight: '600', color: T.text, letterSpacing: -0.4 },
  prUnit: { fontSize: 11, color: T.muted, fontWeight: '500' },
  prDelta: { fontFamily: T.mono, fontSize: 10, color: T.muted, letterSpacing: 0.4 },
});
