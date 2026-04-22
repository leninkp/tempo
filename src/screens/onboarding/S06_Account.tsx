import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { T } from '../../constants/theme';
import { TopBar } from '../../components/TopBar';
import { Heading } from '../../components/Heading';
import { PrimaryButton } from '../../components/PrimaryButton';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export function S06_Account({ onNext, onBack }: Props) {
  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <TopBar step={5} total={6} onBack={onBack} />
        <Heading
          eyebrow="Step 05 · Account"
          title="Create your account."
          sub="We'll use this to sync your program across devices."
        />

        <View style={styles.fields}>
          {/* Name */}
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Full name</Text>
            <Text style={styles.fieldValue}>Alex Morgan</Text>
          </View>

          {/* Email – focused state */}
          <View style={[styles.field, styles.fieldFocused]}>
            <Text style={[styles.fieldLabel, { color: T.text }]}>Email</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.fieldValue}>alex@tempo.</Text>
              <View style={styles.cursor} />
            </View>
          </View>

          {/* Password */}
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Password</Text>
            <Text style={[styles.fieldValue, { letterSpacing: 2 }]}>••••••••••</Text>
          </View>

          {/* Checkbox */}
          <View style={styles.checkRow}>
            <View style={styles.checkbox}>
              <Svg width={10} height={8} viewBox="0 0 10 8" fill="none">
                <Path d="M1 4l3 3 5-6" stroke="#000" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </View>
            <Text style={styles.checkLabel}>Email me weekly progress summaries</Text>
          </View>
        </View>

        <View style={{ flex: 1 }} />
        <PrimaryButton label="Create account" trailing onPress={onNext} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: T.bg },
  fields: { paddingHorizontal: 24, gap: 12 },
  field: {
    padding: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: T.border,
  },
  fieldFocused: {
    backgroundColor: '#141414',
    borderColor: 'rgba(255,255,255,0.35)',
  },
  fieldLabel: {
    fontFamily: T.mono,
    fontSize: 11,
    color: T.dim,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  fieldValue: {
    fontSize: 17,
    color: T.text,
    letterSpacing: -0.3,
  },
  cursor: {
    width: 2,
    height: 20,
    backgroundColor: T.text,
    marginLeft: 2,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: T.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkLabel: { fontSize: 13, color: T.muted, flex: 1 },
});
