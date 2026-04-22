import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { T } from '../constants/theme';
import { ProgressDots } from './ProgressDots';
import Svg, { Path } from 'react-native-svg';

interface Props {
  step: number;
  total: number;
  onBack?: () => void;
}

export function TopBar({ step, total, onBack }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Svg width={11} height={18} viewBox="0 0 11 18" fill="none">
              <Path d="M9.5 1.5L1.5 9l8 7.5" stroke={T.text} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </TouchableOpacity>
        ) : (
          <View style={styles.backBtn} />
        )}
        <Text style={styles.counter}>{step} / {total}</Text>
        <View style={styles.skipArea}>
          <Text style={styles.skip}>Skip</Text>
        </View>
      </View>
      <ProgressDots step={step} total={total} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 56,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 24,
  },
  backBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
  },
  counter: {
    fontFamily: T.mono,
    fontSize: 13,
    color: T.muted,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  skipArea: {
    width: 36,
    alignItems: 'flex-end',
  },
  skip: {
    fontSize: 15,
    color: T.muted,
  },
});
