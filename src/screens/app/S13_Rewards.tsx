import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { T } from '../../constants/theme';
import { TabBar } from '../../components/TabBar';

const XP_CURRENT = 1240;
const XP_NEEDED = 2000;
const RING_R = 58;
const RING_C = 2 * Math.PI * RING_R;
const RING_OFFSET = RING_C * (1 - XP_CURRENT / XP_NEEDED);

const WEEK = ['M','T','W','T','F','S','S'];
const WEEK_STATE = ['done','done','done','done','today','rest','rest'];

const ACHIEVEMENTS = [
  { k: 'Iron week',    desc: '4 sessions in a single week', icon: '✱', unlocked: true,  color: T.lime,  xp: 150 },
  { k: 'Early riser', desc: '5 sessions before 8 AM',       icon: '◒', unlocked: true,  color: T.amber, xp: 100 },
  { k: 'Volume king', desc: 'Log 50,000 kg total volume',   icon: '▲', unlocked: false, color: T.coral, xp: 250, progress: 0.76 },
  { k: 'Century club',desc: '100 sessions lifetime',        icon: '●', unlocked: false, color: T.mint,  xp: 500, progress: 0.17 },
];

export function S13_Rewards() {
  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <Text style={styles.topBarLabel}>Rewards</Text>
          <View style={styles.xpChip}>
            <Svg width={10} height={10} viewBox="0 0 10 10">
              <Path d="M5 0l1.5 3.5L10 4l-2.8 2.4L8 10 5 8 2 10l0.8-3.6L0 4l3.5-0.5z" fill={T.amber} />
            </Svg>
            <Text style={styles.xpText}>1,240 XP</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Level hero */}
          <View style={styles.levelHero}>
            <View style={styles.ringWrap}>
              <Svg width={128} height={128} viewBox="0 0 128 128" style={{ transform: [{ rotate: '-90deg' }] }}>
                <Defs>
                  <LinearGradient id="ringGrad" x1="0" x2="1" y1="0" y2="1">
                    <Stop offset="0%" stopColor={T.amber} />
                    <Stop offset="60%" stopColor={T.lime} />
                    <Stop offset="100%" stopColor={T.mint} />
                  </LinearGradient>
                </Defs>
                <Circle cx={64} cy={64} r={RING_R} stroke="rgba(255,255,255,0.08)" strokeWidth={8} fill="none" />
                <Circle
                  cx={64} cy={64} r={RING_R}
                  stroke="url(#ringGrad)" strokeWidth={8} fill="none"
                  strokeLinecap="round"
                  strokeDasharray={RING_C}
                  strokeDashoffset={RING_OFFSET}
                />
              </Svg>
              <View style={styles.ringCenter}>
                <Text style={styles.ringLevelLabel}>Level</Text>
                <Text style={styles.ringLevel}>07</Text>
                <Text style={styles.ringTitle}>CHALLENGER</Text>
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.nextLevelLabel}>Next level</Text>
              <Text style={styles.nextLevelXP}>760 XP to go</Text>
              <Text style={styles.nextLevelDesc}>
                Log 3 more sessions or crush a new PR to reach{' '}
                <Text style={{ color: T.mint }}>Relentless</Text>.
              </Text>
              <View style={styles.xpTrack}>
                <View style={[styles.xpFill, { width: `${(XP_CURRENT / XP_NEEDED) * 100}%` }]} />
              </View>
            </View>
          </View>

          {/* Streak */}
          <View style={styles.section}>
            <View style={styles.streakCard}>
              <View style={styles.streakRow}>
                <Text style={styles.streakNum}>12</Text>
                <Text style={styles.streakLabel}>day streak</Text>
              </View>
              <Text style={styles.streakSub}>Longest this program. Keep it alive.</Text>
              <View style={styles.weekBeads}>
                {WEEK.map((d, i) => {
                  const s = WEEK_STATE[i];
                  const isDone = s === 'done';
                  const isToday = s === 'today';
                  return (
                    <View key={i} style={styles.bead}>
                      <View style={[styles.beadCircle, {
                        backgroundColor: isDone ? T.amber : isToday ? 'transparent' : 'rgba(255,255,255,0.06)',
                        borderWidth: isToday ? 1.5 : 0,
                        borderColor: isToday ? T.amber : 'transparent',
                        borderStyle: isToday ? 'dashed' : undefined,
                      }]}>
                        <Text style={[styles.beadIcon, { color: isDone ? '#000' : isToday ? T.amber : T.dim }]}>
                          {isDone ? '✓' : isToday ? '→' : '·'}
                        </Text>
                      </View>
                      <Text style={[styles.beadDay, { color: isToday ? T.amber : T.dim }]}>{d}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>

          {/* Weekly quest */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionLabel}>Weekly quest</Text>
              <Text style={styles.sectionSub}>Ends in 2d 14h</Text>
            </View>
            <View style={styles.questCard}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text style={styles.questTitle}>Lift 20,000 kg this week</Text>
                <View style={styles.xpReward}><Text style={styles.xpRewardText}>+200 XP</Text></View>
              </View>
              <Text style={styles.questProgress}>14,320 / 20,000 kg · 72%</Text>
              <View style={styles.questTrack}>
                <View style={[styles.questFill, { width: '72%' }]} />
              </View>
            </View>
          </View>

          {/* Achievements */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionLabel}>Achievements · 2 / 24</Text>
              <Text style={styles.seeAll}>See all</Text>
            </View>
            <View style={styles.achieveGrid}>
              {ACHIEVEMENTS.map((a) => (
                <View key={a.k} style={[styles.achieveCard, {
                  backgroundColor: a.unlocked ? `${a.color}0E` : '#0b0b0b',
                  borderColor: a.unlocked ? `${a.color}44` : T.border,
                }]}>
                  <View style={[styles.achieveIcon, {
                    backgroundColor: a.unlocked ? a.color : 'rgba(255,255,255,0.06)',
                  }]}>
                    <Text style={[styles.achieveIconText, { color: a.unlocked ? '#000' : T.dim }]}>{a.icon}</Text>
                  </View>
                  <Text style={[styles.achieveName, { color: a.unlocked ? T.text : T.muted }]}>{a.k}</Text>
                  <Text style={styles.achieveDesc}>{a.desc}</Text>
                  {a.unlocked ? (
                    <Text style={[styles.achieveStatus, { color: a.color }]}>UNLOCKED · +{a.xp} XP</Text>
                  ) : (
                    <>
                      <View style={styles.achieveTrack}>
                        <View style={[styles.achieveFill, { width: `${(a.progress || 0) * 100}%`, backgroundColor: a.color }]} />
                      </View>
                      <Text style={styles.achievePercent}>{Math.round((a.progress || 0) * 100)}% · +{a.xp} XP</Text>
                    </>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Leaderboard teaser */}
          <View style={[styles.section, { marginBottom: 16 }]}>
            <View style={styles.leaderCard}>
              <View style={styles.leaderRank}><Text style={styles.leaderRankText}>#4</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.leaderTitle}>You're #4 in your squad</Text>
                <Text style={styles.leaderSub}>180 XP behind #3 · Maya K.</Text>
              </View>
              <Svg width={8} height={14} viewBox="0 0 8 14" fill="none">
                <Path d="M1 1l6 6-6 6" stroke={T.muted} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <TabBar active="Rewards" />
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
  xpChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999,
    backgroundColor: 'rgba(246,184,78,0.12)',
    borderWidth: 1, borderColor: 'rgba(246,184,78,0.3)',
  },
  xpText: { fontFamily: T.mono, fontSize: 11, color: T.amber, letterSpacing: 0.4, fontWeight: '600' },
  levelHero: { paddingHorizontal: 24, paddingBottom: 28, flexDirection: 'row', alignItems: 'center', gap: 22 },
  ringWrap: { width: 128, height: 128, position: 'relative', alignItems: 'center', justifyContent: 'center' },
  ringCenter: { position: 'absolute', alignItems: 'center' },
  ringLevelLabel: { fontFamily: T.mono, fontSize: 9, color: T.dim, letterSpacing: 1.2, textTransform: 'uppercase' },
  ringLevel: { fontSize: 36, fontWeight: '700', color: T.text, letterSpacing: -1.5, lineHeight: 38 },
  ringTitle: { fontFamily: T.mono, fontSize: 9, color: T.lime, letterSpacing: 0.8, marginTop: 2 },
  nextLevelLabel: { fontFamily: T.mono, fontSize: 11, color: T.dim, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 },
  nextLevelXP: { fontSize: 22, fontWeight: '600', color: T.text, letterSpacing: -0.5, lineHeight: 25, marginBottom: 6 },
  nextLevelDesc: { fontSize: 12, color: T.muted, lineHeight: 17, letterSpacing: -0.1, marginBottom: 12 },
  xpTrack: { height: 4, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' },
  xpFill: { height: '100%', borderRadius: 4, backgroundColor: T.lime },
  section: { paddingHorizontal: 24, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 },
  sectionLabel: { fontFamily: T.mono, fontSize: 11, color: T.dim, letterSpacing: 1.2, textTransform: 'uppercase' },
  sectionSub: { fontFamily: T.mono, fontSize: 11, color: T.muted, letterSpacing: 0.4 },
  seeAll: { fontSize: 12, color: T.muted },
  streakCard: {
    padding: 20, borderRadius: 20,
    backgroundColor: '#0a0808',
    borderWidth: 1, borderColor: 'rgba(246,184,78,0.22)',
  },
  streakRow: { flexDirection: 'row', alignItems: 'baseline', gap: 10, marginBottom: 4 },
  streakNum: { fontSize: 48, fontWeight: '700', color: T.text, letterSpacing: -2, lineHeight: 52 },
  streakLabel: { fontSize: 16, fontWeight: '600', color: T.amber, letterSpacing: -0.3 },
  streakSub: { fontSize: 12, color: T.muted, letterSpacing: -0.1, marginBottom: 16 },
  weekBeads: { flexDirection: 'row', gap: 6 },
  bead: { flex: 1, alignItems: 'center', gap: 4 },
  beadCircle: {
    width: 28, height: 28, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  beadIcon: { fontFamily: T.mono, fontSize: 11, fontWeight: '700' },
  beadDay: { fontFamily: T.mono, fontSize: 9, letterSpacing: 0.6 },
  questCard: {
    padding: 18, borderRadius: 16,
    backgroundColor: '#0b0b0b', borderWidth: 1, borderColor: T.border,
  },
  questTitle: { fontSize: 16, fontWeight: '600', color: T.text, letterSpacing: -0.3, flex: 1 },
  xpReward: {
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6,
    backgroundColor: 'rgba(110,231,183,0.12)',
  },
  xpRewardText: { fontFamily: T.mono, fontSize: 11, color: T.mint, letterSpacing: 0.4 },
  questProgress: { fontSize: 12, color: T.muted, marginBottom: 14 },
  questTrack: { height: 6, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.06)', overflow: 'hidden' },
  questFill: { height: '100%', borderRadius: 6, backgroundColor: T.lime },
  achieveGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  achieveCard: {
    width: '48%', padding: 14, borderRadius: 14,
    borderWidth: 1,
  },
  achieveIcon: {
    width: 32, height: 32, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', marginBottom: 10,
  },
  achieveIconText: { fontSize: 16, fontWeight: '700' },
  achieveName: { fontSize: 13, fontWeight: '600', letterSpacing: -0.2, marginBottom: 2 },
  achieveDesc: { fontSize: 11, color: T.dim, lineHeight: 15, letterSpacing: -0.05, marginBottom: 8, minHeight: 30 },
  achieveStatus: { fontFamily: T.mono, fontSize: 10, letterSpacing: 0.6 },
  achieveTrack: { height: 3, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.06)', overflow: 'hidden', marginBottom: 6 },
  achieveFill: { height: '100%', borderRadius: 3 },
  achievePercent: { fontFamily: T.mono, fontSize: 9, color: T.dim, letterSpacing: 0.6 },
  leaderCard: {
    padding: 14, borderRadius: 14,
    backgroundColor: '#0b0b0b', borderWidth: 1, borderColor: T.border,
    flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  leaderRank: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: `${T.lime}1A`, borderWidth: 1, borderColor: `${T.lime}33`,
    alignItems: 'center', justifyContent: 'center',
  },
  leaderRankText: { fontFamily: T.mono, fontSize: 13, color: T.lime, fontWeight: '700' },
  leaderTitle: { fontSize: 13, fontWeight: '600', color: T.text, letterSpacing: -0.2, marginBottom: 2 },
  leaderSub: { fontFamily: T.mono, fontSize: 10, color: T.dim, letterSpacing: 0.4 },
});
