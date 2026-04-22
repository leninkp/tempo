import React from 'react';
import { View, StyleSheet } from 'react-native';
import { T } from '../constants/theme';

interface Props {
  step: number;
  total?: number;
}

export function ProgressDots({ step, total = 6 }: Props) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[styles.dot, { backgroundColor: i < step ? T.text : 'rgba(255,255,255,0.18)' }]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 24,
    marginBottom: 28,
  },
  dot: {
    flex: 1,
    height: 3,
    borderRadius: 2,
  },
});
