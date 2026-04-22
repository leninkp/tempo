import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { T } from '../constants/theme';

interface Props {
  label: string;
  hint?: string;
  selected?: boolean;
  icon?: string;
  onPress?: () => void;
}

export function SelectRow({ label, hint, selected, icon, onPress }: Props) {
  const bg = selected ? T.text : T.card;
  const fg = selected ? '#000' : T.text;
  const hintCol = selected ? 'rgba(0,0,0,0.55)' : T.muted;
  const borderColor = selected ? 'transparent' : T.border;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.row, { backgroundColor: bg, borderColor }]}>
      {icon && (
        <View style={[styles.icon, { backgroundColor: selected ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)' }]}>
          <Text style={[styles.iconText, { color: fg }]}>{icon}</Text>
        </View>
      )}
      <View style={styles.content}>
        <Text style={[styles.label, { color: fg }]}>{label}</Text>
        {hint && <Text style={[styles.hint, { color: hintCol }]}>{hint}</Text>}
      </View>
      <View style={[styles.radio, {
        borderColor: selected ? 'transparent' : 'rgba(255,255,255,0.25)',
        backgroundColor: selected ? '#000' : 'transparent',
        borderWidth: 1.5,
      }]}>
        {selected && (
          <Svg width={10} height={8} viewBox="0 0 10 8" fill="none">
            <Path d="M1 4l3 3 5-6" stroke={T.text} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontFamily: T.mono,
    fontSize: 13,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.3,
    marginBottom: 3,
  },
  hint: {
    fontSize: 13,
    letterSpacing: -0.1,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
