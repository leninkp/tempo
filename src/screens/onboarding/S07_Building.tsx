import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { T } from '../../constants/theme';
import { TopBar } from '../../components/TopBar';
import { Heading } from '../../components/Heading';

const LINES = [
  { text: '✓ analyzing goals', done: true },
  { text: '✓ matching experience profile', done: true },
  { text: '✓ balancing 4-day split', done: true },
  { text: 'assigning starting loads…', done: false, active: true },
  { text: '  calibrating recovery', done: false },
  { text: '  generating week 01', done: false },
];

interface Props {
  onDone: () => void;
}

export function S07_Building({ onDone }: Props) {
  const pulse = useRef(new Animated.Value(1)).current;
  const progress = useRef(new Animated.Value(0.62)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 0.3, duration: 600, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    ).start();

    const timer = setTimeout(onDone, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <TopBar step={6} total={6} />
        <Heading
          eyebrow="Step 06 · Building"
          title="Designing your program."
          sub="Cross-referencing your goals, schedule, and experience."
        />

        <View style={styles.terminal}>
          {LINES.map((l, i) => (
            <View key={i} style={styles.termLine}>
              {l.active && (
                <Animated.View style={[styles.dot, { opacity: pulse }]} />
              )}
              <Text style={[styles.termText, l.done && styles.termDone, !l.done && !l.active && styles.termFaded]}>
                {l.text}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.hint}>Usually takes 5 – 10 seconds</Text>

        <View style={{ flex: 1 }} />

        {/* Progress bar */}
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, { width: '62%' }]} />
        </View>
        <View style={{ height: 34 }} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: T.bg },
  terminal: {
    marginHorizontal: 24,
    padding: 24,
    borderRadius: 20,
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: T.border,
    gap: 4,
  },
  termLine: { flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: 26 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: T.text,
  },
  termText: {
    fontFamily: T.mono,
    fontSize: 13,
    color: T.muted,
    letterSpacing: 0.2,
    lineHeight: 26,
  },
  termDone: { color: T.text },
  termFaded: { opacity: 0.4 },
  hint: {
    textAlign: 'center',
    marginTop: 24,
    fontFamily: T.mono,
    fontSize: 12,
    color: T.dim,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  progressTrack: {
    marginHorizontal: 24,
    height: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: T.text,
    borderRadius: 4,
  },
});
