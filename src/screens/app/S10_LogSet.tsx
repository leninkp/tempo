import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { T } from '../../constants/theme';

const SETS = [
  { n: 1, weight: '60', reps: '6', rpe: '6', state: 'done' },
  { n: 2, weight: '70', reps: '6', rpe: '',  state: 'active' },
  { n: 3, weight: '—',  reps: '—', rpe: '',  state: 'upcoming' },
  { n: 4, weight: '—',  reps: '—', rpe: '',  state: 'upcoming' },
];

const CHIPS = ['−2.5', '−1', '+1', '+2.5', '+5'];
const KEYPAD = [['1','2','3'],['4','5','6'],['7','8','9'],['.','0','⌫']];

export function S10_LogSet() {
  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        {/* Session header */}
        <View style={styles.header}>
          <TouchableOpacity style={{ width: 60 }}>
            <Svg width={11} height={18} viewBox="0 0 11 18" fill="none">
              <Path d="M9.5 1.5L1.5 9l8 7.5" stroke={T.text} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.timerLabel}>Session · 12:04</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View style={styles.recDot} />
              <Text style={styles.recText}>Recording</Text>
            </View>
          </View>
          <TouchableOpacity style={{ width: 60, alignItems: 'flex-end' }}>
            <Text style={styles.endBtn}>End</Text>
          </TouchableOpacity>
        </View>

        {/* Progress segments */}
        <View style={styles.segments}>
          {[1,2,3,4,5,6].map(i => (
            <View key={i} style={[styles.seg, {
              backgroundColor: i < 2 ? T.text : i === 2 ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.12)',
            }]} />
          ))}
        </View>

        {/* Exercise title */}
        <View style={styles.exerciseHead}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Text style={styles.exerciseNum}>Exercise 02 / 06</Text>
            <View style={styles.targetChip}><Text style={styles.targetChipText}>Target 4 × 6</Text></View>
          </View>
          <Text style={styles.exerciseName}>Back squat</Text>
          <Text style={styles.exerciseLast}>Last session · 4 × 6 @ 67.5 kg</Text>
        </View>

        {/* Sets table */}
        <View style={styles.tableWrap}>
          <View style={styles.tableHead}>
            {['Set','Weight','Reps','RPE'].map((h, i) => (
              <Text key={h} style={[styles.tableHeadCell, i === 0 && { width: 32 }, i === 3 && { textAlign: 'right', width: 52 }]}>{h}</Text>
            ))}
          </View>
          <View style={styles.table}>
            {SETS.map((s, i) => {
              const isActive = s.state === 'active';
              const isDone = s.state === 'done';
              const isUp = s.state === 'upcoming';
              return (
                <View key={s.n} style={[
                  styles.tableRow,
                  isActive && styles.tableRowActive,
                  i < SETS.length - 1 && styles.tableRowBorder,
                ]}>
                  {isActive && <View style={styles.activeBar} />}
                  <Text style={[styles.setNum, { color: isDone ? T.muted : isActive ? T.text : T.dim }]}>
                    {String(s.n).padStart(2, '0')}
                  </Text>
                  <Text style={[styles.setCellLg, { color: isUp ? T.dim : T.text, fontSize: isActive ? 22 : 16 }]}>
                    {s.weight}{!isUp && <Text style={styles.cellUnit}> kg</Text>}
                  </Text>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={[styles.setCellLg, { color: isUp ? T.dim : T.text, fontSize: isActive ? 22 : 16 }]}>{s.reps}</Text>
                    {isActive && <View style={styles.cursor} />}
                  </View>
                  <Text style={[styles.rpeCell, { color: isDone ? T.muted : T.dim }]}>{s.rpe || '—'}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Quick chips */}
        <View style={styles.chips}>
          {CHIPS.map((c) => (
            <TouchableOpacity key={c} style={styles.chip} activeOpacity={0.7}>
              <Text style={styles.chipText}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Keypad */}
        <View style={styles.keypad}>
          {KEYPAD.map((row, ri) => (
            <View key={ri} style={styles.keypadRow}>
              {row.map((k) => (
                <TouchableOpacity key={k} activeOpacity={0.7}
                  style={[styles.key, (k === '.' || k === '⌫') && styles.keyMuted]}
                >
                  <Text style={[styles.keyLabel, (k === '.' || k === '⌫') && { color: T.muted }]}>{k}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        {/* Log CTA */}
        <View style={styles.cta}>
          <TouchableOpacity style={styles.ctaAux}>
            <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
              <Path d="M9 1v16M1 9h16" stroke={T.muted} strokeWidth={1.6} strokeLinecap="round" />
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ctaMain} activeOpacity={0.85}>
            <Text style={styles.ctaLabel}>Log set · rest 90s</Text>
            <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
              <Path d="M1 7h12M8 2l5 5-5 5" stroke="#000" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: T.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingTop: 14, paddingBottom: 18,
  },
  timerLabel: { fontFamily: T.mono, fontSize: 10, color: T.dim, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 2 },
  recDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: T.text },
  recText: { fontSize: 13, color: T.text, fontWeight: '500', letterSpacing: -0.1 },
  endBtn: { fontSize: 14, color: T.muted },
  segments: { flexDirection: 'row', gap: 4, paddingHorizontal: 24, marginBottom: 0 },
  seg: { flex: 1, height: 3, borderRadius: 2 },
  exerciseHead: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 20 },
  exerciseNum: { fontFamily: T.mono, fontSize: 11, color: T.dim, letterSpacing: 1.4, textTransform: 'uppercase' },
  targetChip: {
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: T.border,
  },
  targetChipText: { fontFamily: T.mono, fontSize: 10, color: T.muted, letterSpacing: 0.8, textTransform: 'uppercase' },
  exerciseName: { fontSize: 32, fontWeight: '600', color: T.text, letterSpacing: -1, lineHeight: 36, marginBottom: 6 },
  exerciseLast: { fontSize: 13, color: T.muted, letterSpacing: -0.1 },
  tableWrap: { paddingHorizontal: 24, marginBottom: 16 },
  tableHead: {
    flexDirection: 'row', gap: 8, paddingHorizontal: 14, paddingBottom: 8,
    fontFamily: T.mono,
  },
  tableHeadCell: { flex: 1, fontFamily: T.mono, fontSize: 10, color: T.dim, letterSpacing: 1.2, textTransform: 'uppercase' },
  table: { borderRadius: 16, overflow: 'hidden', backgroundColor: '#0b0b0b', borderWidth: 1, borderColor: T.border },
  tableRow: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, paddingHorizontal: 14, position: 'relative' },
  tableRowActive: { backgroundColor: 'rgba(255,255,255,0.06)' },
  tableRowBorder: { borderBottomWidth: 1, borderBottomColor: T.border },
  activeBar: { position: 'absolute', left: 0, top: 6, bottom: 6, width: 2, backgroundColor: T.text, borderRadius: 2 },
  setNum: { fontFamily: T.mono, fontSize: 12, letterSpacing: 0.4, width: 32 },
  setCellLg: { flex: 1, fontWeight: '600', letterSpacing: -0.4 },
  cellUnit: { fontSize: 11, color: T.muted, fontWeight: '500', letterSpacing: 0 },
  rpeCell: { fontFamily: T.mono, fontSize: 12, letterSpacing: 0.2, width: 52, textAlign: 'right' },
  cursor: { width: 2, height: 22, backgroundColor: T.text },
  chips: { flexDirection: 'row', gap: 8, paddingHorizontal: 24, marginBottom: 14 },
  chip: {
    flex: 1, paddingVertical: 10, borderRadius: 10,
    backgroundColor: '#141414', borderWidth: 1, borderColor: T.border,
    alignItems: 'center',
  },
  chipText: { fontFamily: T.mono, fontSize: 13, color: T.text, letterSpacing: 0.2 },
  keypad: { paddingHorizontal: 18, gap: 8, marginBottom: 10 },
  keypadRow: { flexDirection: 'row', gap: 8 },
  key: {
    flex: 1, height: 52, borderRadius: 12,
    backgroundColor: '#1a1a1a', borderWidth: 1, borderColor: T.border,
    alignItems: 'center', justifyContent: 'center',
  },
  keyMuted: { backgroundColor: 'transparent', borderWidth: 0 },
  keyLabel: { fontSize: 22, fontWeight: '500', color: T.text, letterSpacing: -0.3 },
  cta: { flexDirection: 'row', gap: 8, paddingHorizontal: 18, paddingBottom: 28, paddingTop: 8 },
  ctaAux: {
    width: 56, height: 56, borderRadius: 16,
    backgroundColor: '#1a1a1a', borderWidth: 1, borderColor: T.border,
    alignItems: 'center', justifyContent: 'center',
  },
  ctaMain: {
    flex: 1, height: 56, borderRadius: 16, backgroundColor: T.text,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 22,
  },
  ctaLabel: { fontSize: 16, fontWeight: '600', color: '#000', letterSpacing: -0.2 },
});
