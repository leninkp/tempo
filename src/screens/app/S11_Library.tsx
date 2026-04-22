import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Line, Circle, Rect, G } from 'react-native-svg';
import { T } from '../../constants/theme';
import { TabBar } from '../../components/TabBar';

const MUSCLES = [
  { k: 'All', n: 142 },
  { k: 'Chest', n: 18, active: true },
  { k: 'Back', n: 22 },
  { k: 'Shoulders', n: 16 },
  { k: 'Legs', n: 28 },
  { k: 'Arms', n: 20 },
  { k: 'Core', n: 14 },
  { k: 'Glutes', n: 12 },
];

const EXERCISES = [
  {
    name: 'Barbell bench press',
    desc: 'Horizontal press, primary driver for chest mass. Retract scapula, arch slight, elbows ~70° from torso.',
    level: 'Intermediate', equip: 'Barbell', duration: '1:24', pose: 'bench',
  },
  {
    name: 'Incline dumbbell press',
    desc: 'Emphasizes the upper pec fibers. Bench set 30–45°. Dumbbells allow a deeper, more natural groove than the bar.',
    level: 'Intermediate', equip: 'Dumbbells', duration: '1:08', pose: 'incline',
  },
  {
    name: 'Cable fly · low-to-high',
    desc: 'Isolation at the upper chest. Long arc, soft elbows, finish with fists meeting just above chin height.',
    level: 'All levels', equip: 'Cable', duration: '0:52', pose: 'cable',
  },
  {
    name: 'Push-up',
    desc: 'Bodyweight staple. Tight line from crown to heels, elbows track back at ~45°. Scale by hand elevation.',
    level: 'Beginner', equip: 'Bodyweight', duration: '0:46', pose: 'pushup',
  },
];

function ExerciseThumb({ pose, duration }: { pose: string; duration: string }) {
  return (
    <View style={styles.thumb}>
      <Svg width={92} height={92} viewBox="0 0 92 92" style={StyleSheet.absoluteFill}>
        {pose === 'bench' && (
          <G stroke="rgba(255,255,255,0.35)" strokeWidth={1} fill="none" strokeLinecap="round">
            <Line x1={18} y1={58} x2={74} y2={58} />
            <Circle cx={30} cy={52} r={3.5} />
            <Line x1={34} y1={52} x2={58} y2={52} />
            <Line x1={58} y1={36} x2={58} y2={68} />
            <Line x1={46} y1={36} x2={46} y2={68} />
            <Line x1={70} y1={36} x2={70} y2={68} />
          </G>
        )}
        {pose === 'incline' && (
          <G stroke="rgba(255,255,255,0.35)" strokeWidth={1} fill="none" strokeLinecap="round">
            <Line x1={20} y1={70} x2={72} y2={40} />
            <Circle cx={30} cy={62} r={3.5} />
            <Line x1={50} y1={36} x2={56} y2={24} />
            <Line x1={50} y1={52} x2={56} y2={64} />
          </G>
        )}
        {pose === 'cable' && (
          <G stroke="rgba(255,255,255,0.35)" strokeWidth={1} fill="none" strokeLinecap="round">
            <Circle cx={46} cy={32} r={3.5} />
            <Line x1={46} y1={36} x2={46} y2={68} />
            <Line x1={46} y1={44} x2={28} y2={68} />
            <Line x1={46} y1={44} x2={64} y2={68} />
            <Line x1={14} y1={74} x2={32} y2={68} />
            <Line x1={78} y1={74} x2={60} y2={68} />
          </G>
        )}
        {pose === 'pushup' && (
          <G stroke="rgba(255,255,255,0.35)" strokeWidth={1} fill="none" strokeLinecap="round">
            <Line x1={14} y1={64} x2={78} y2={64} />
            <Circle cx={24} cy={48} r={3.5} />
            <Line x1={28} y1={48} x2={70} y2={52} />
            <Line x1={34} y1={50} x2={34} y2={64} />
            <Line x1={58} y1={52} x2={58} y2={64} />
          </G>
        )}
      </Svg>
      {/* Play button */}
      <View style={styles.playBtn}>
        <Svg width={10} height={10} viewBox="0 0 10 10">
          <Path d="M2 1l7 4-7 4V1z" fill="#000" />
        </Svg>
      </View>
      <View style={styles.durationBadge}>
        <Text style={styles.durationText}>{duration}</Text>
      </View>
    </View>
  );
}

export function S11_Library() {
  const [activeMusle, setActiveMuscle] = useState('Chest');

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <Text style={styles.topBarLabel}>Library</Text>
          <View style={{ flexDirection: 'row', gap: 14 }}>
            <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
              <Circle cx={8} cy={8} r={6} stroke={T.text} strokeWidth={1.6} />
              <Path d="M13 13l4 4" stroke={T.text} strokeWidth={1.6} strokeLinecap="round" />
            </Svg>
            <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
              <Path d="M2 4h14M4 9h10M6 14h6" stroke={T.text} strokeWidth={1.6} strokeLinecap="round" />
            </Svg>
          </View>
        </View>

        <View style={styles.titleBlock}>
          <Text style={styles.pageTitle}>Exercises</Text>
          <Text style={styles.pageSubtitle}>142 movements · video demos with coaching cues</Text>
        </View>

        {/* Muscle chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
          {MUSCLES.map((m) => (
            <TouchableOpacity
              key={m.k}
              onPress={() => setActiveMuscle(m.k)}
              style={[styles.chip, activeMusle === m.k && styles.chipActive]}
              activeOpacity={0.7}
            >
              <Text style={[styles.chipLabel, { color: activeMusle === m.k ? '#000' : T.text }]}>{m.k}</Text>
              <Text style={[styles.chipCount, { color: activeMusle === m.k ? 'rgba(0,0,0,0.5)' : T.dim }]}>{m.n}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>Chest · 18 exercises</Text>
          <Text style={styles.sectionSort}>Sort: popular</Text>
        </View>

        {/* Exercise list */}
        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
          {EXERCISES.map((e) => (
            <TouchableOpacity key={e.name} style={styles.exerciseCard} activeOpacity={0.8}>
              <ExerciseThumb pose={e.pose} duration={e.duration} />
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName} numberOfLines={1}>{e.name}</Text>
                <Text style={styles.exerciseDesc} numberOfLines={2}>{e.desc}</Text>
                <View style={styles.tagRow}>
                  <View style={styles.tag}><Text style={styles.tagText}>{e.level}</Text></View>
                  <View style={styles.tag}><Text style={styles.tagText}>{e.equip}</Text></View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <View style={{ height: 16 }} />
        </ScrollView>
      </SafeAreaView>
      <TabBar active="Library" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: T.bg },
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 24, paddingTop: 14, paddingBottom: 18,
  },
  topBarLabel: { fontFamily: T.mono, fontSize: 10, color: T.dim, letterSpacing: 1.4, textTransform: 'uppercase' },
  titleBlock: { paddingHorizontal: 24, paddingBottom: 20 },
  pageTitle: { fontSize: 34, fontWeight: '600', color: T.text, letterSpacing: -1.2, lineHeight: 36, marginBottom: 10 },
  pageSubtitle: { fontSize: 13, color: T.muted, letterSpacing: -0.1 },
  chipsRow: { paddingHorizontal: 24, gap: 8, paddingBottom: 20 },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999,
    backgroundColor: '#111', borderWidth: 1, borderColor: T.border,
  },
  chipActive: { backgroundColor: T.text, borderWidth: 0 },
  chipLabel: { fontSize: 13, fontWeight: '600', letterSpacing: -0.2 },
  chipCount: { fontFamily: T.mono, fontSize: 10, letterSpacing: 0.4 },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline',
    paddingHorizontal: 26, paddingBottom: 10,
  },
  sectionLabel: { fontFamily: T.mono, fontSize: 11, color: T.dim, letterSpacing: 1.2, textTransform: 'uppercase' },
  sectionSort: { fontSize: 12, color: T.muted, letterSpacing: -0.1 },
  list: { paddingHorizontal: 16, gap: 8 },
  exerciseCard: {
    padding: 12, borderRadius: 18, backgroundColor: '#0b0b0b',
    borderWidth: 1, borderColor: T.border, flexDirection: 'row', gap: 14,
  },
  thumb: {
    width: 92, height: 92, borderRadius: 14, flexShrink: 0,
    backgroundColor: '#1c1c1c', borderWidth: 1, borderColor: T.border,
    overflow: 'hidden', position: 'relative',
    alignItems: 'center', justifyContent: 'center',
  },
  playBtn: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center', justifyContent: 'center',
  },
  durationBadge: {
    position: 'absolute', bottom: 6, right: 6,
    paddingHorizontal: 5, paddingVertical: 2, borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  durationText: { fontFamily: T.mono, fontSize: 9, color: T.text, letterSpacing: 0.2 },
  exerciseInfo: { flex: 1, minWidth: 0 },
  exerciseName: { fontSize: 15, fontWeight: '600', color: T.text, letterSpacing: -0.3, marginBottom: 4 },
  exerciseDesc: { fontSize: 12, color: T.muted, lineHeight: 17, letterSpacing: -0.1, marginBottom: 8 },
  tagRow: { flexDirection: 'row', gap: 6, marginTop: 'auto' },
  tag: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.06)' },
  tagText: { fontFamily: T.mono, fontSize: 9, color: T.muted, letterSpacing: 0.6, textTransform: 'uppercase' },
});
