import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { T } from '../../constants/theme';
import { TopBar } from '../../components/TopBar';
import { Heading } from '../../components/Heading';
import { PrimaryButton } from '../../components/PrimaryButton';

const FIELDS = [
  { label: 'Height', value: '178', unit: 'cm' },
  { label: 'Weight', value: '74.5', unit: 'kg' },
  { label: 'Age', value: '28', unit: 'yrs' },
];

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export function S05_Metrics({ onNext, onBack }: Props) {
  const [unit, setUnit] = useState<'Metric' | 'Imperial'>('Metric');

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <TopBar step={4} total={6} onBack={onBack} />
        <Heading
          eyebrow="Step 04 · Body"
          title="A few stats."
          sub="Used to set starting loads and calorie targets. Private by default."
        />

        {/* Unit toggle */}
        <View style={styles.toggleWrapper}>
          <View style={styles.toggle}>
            {(['Metric', 'Imperial'] as const).map((u) => (
              <TouchableOpacity
                key={u}
                onPress={() => setUnit(u)}
                style={[styles.toggleOption, unit === u && styles.toggleActive]}
                activeOpacity={0.8}
              >
                <Text style={[styles.toggleLabel, { color: unit === u ? '#000' : T.muted }]}>{u}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Fields */}
        <View style={styles.fields}>
          {FIELDS.map((f) => (
            <View key={f.label} style={styles.field}>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>{f.label}</Text>
                <Text style={styles.fieldValue}>
                  {f.value}
                  <Text style={styles.fieldUnit}> {f.unit}</Text>
                </Text>
              </View>
              <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
                <Path d="M7 1v12M1 7h12" stroke={T.muted} strokeWidth={1.5} strokeLinecap="round" />
              </Svg>
            </View>
          ))}

          <View style={styles.privacyNote}>
            <Text style={styles.privacyText}>
              Your data is encrypted and never shared with third parties.
            </Text>
          </View>
        </View>

        <View style={{ flex: 1 }} />
        <PrimaryButton label="Continue" trailing onPress={onNext} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: T.bg },
  toggleWrapper: { paddingHorizontal: 24, paddingBottom: 18 },
  toggle: {
    flexDirection: 'row',
    padding: 4,
    backgroundColor: '#111',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: T.border,
    alignSelf: 'flex-start',
  },
  toggleOption: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 9,
  },
  toggleActive: { backgroundColor: T.text },
  toggleLabel: { fontSize: 13, fontWeight: '600', letterSpacing: -0.2 },
  fields: { paddingHorizontal: 24, gap: 12 },
  field: {
    padding: 18,
    borderRadius: 16,
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: T.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldLabel: {
    fontFamily: T.mono,
    fontSize: 11,
    color: T.dim,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 24,
    fontWeight: '600',
    color: T.text,
    letterSpacing: -0.6,
  },
  fieldUnit: { fontSize: 14, color: T.muted, fontWeight: '500', letterSpacing: 0 },
  privacyNote: {
    marginTop: 8,
    padding: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  privacyText: { fontSize: 12, color: T.muted, lineHeight: 18, letterSpacing: -0.1 },
});
