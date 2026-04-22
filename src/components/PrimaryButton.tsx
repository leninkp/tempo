import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { T } from '../constants/theme';

interface Props {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  trailing?: boolean;
}

export function PrimaryButton({ label, onPress, disabled, trailing }: Props) {
  const bg = disabled ? 'rgba(255,255,255,0.12)' : T.text;
  const fg = disabled ? T.dim : '#000';
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={styles.wrapper} activeOpacity={0.85}>
      <View style={[styles.btn, { backgroundColor: bg }]}>
        <Text style={[styles.label, { color: fg }]}>{label}</Text>
        {trailing && (
          <Svg width={14} height={14} viewBox="0 0 14 14" fill="none" style={{ marginLeft: 8 }}>
            <Path d="M1 7h12M8 2l5 5-5 5" stroke={fg} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 24,
    marginBottom: 34,
  },
  btn: {
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
});
