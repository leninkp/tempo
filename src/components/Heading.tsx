import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { T } from '../constants/theme';

interface Props {
  eyebrow?: string;
  title: string;
  sub?: string;
}

export function Heading({ eyebrow, title, sub }: Props) {
  return (
    <View style={styles.container}>
      {eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}
      <Text style={styles.title}>{title}</Text>
      {sub && <Text style={styles.sub}>{sub}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 28,
  },
  eyebrow: {
    fontFamily: T.mono,
    fontSize: 11,
    color: T.dim,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: T.text,
    letterSpacing: -1.1,
    lineHeight: 35,
    marginBottom: 12,
  },
  sub: {
    fontSize: 15,
    color: T.muted,
    lineHeight: 22,
    letterSpacing: -0.1,
  },
});
