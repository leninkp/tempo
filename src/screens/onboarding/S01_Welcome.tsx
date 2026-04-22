import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { T } from '../../constants/theme';

interface Props {
  onCreateAccount: () => void;
}

export function S01_Welcome({ onCreateAccount }: Props) {
  return (
    <View style={styles.screen}>
      {/* Striped hero background */}
      <View style={styles.heroBg}>
        <Text style={styles.heroLabel}>[ hero/athlete_photo.jpg ]</Text>
        <LinearGradient
          colors={['transparent', '#000']}
          style={styles.heroFade}
        />
      </View>

      <SafeAreaView style={styles.safe}>
        <View style={styles.topLabel}>
          <Text style={styles.brand}>— Tempo</Text>
        </View>

        <View style={{ flex: 1 }} />

        <View style={styles.copy}>
          <Text style={styles.headline}>Train with{'\n'}intention.</Text>
          <Text style={styles.sub}>
            Personal coaching, adaptive programs, and weekly check-ins — built around how you actually live.
          </Text>
        </View>

        <View style={styles.ctas}>
          <TouchableOpacity style={styles.primary} onPress={onCreateAccount} activeOpacity={0.85}>
            <Text style={styles.primaryLabel}>Create account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondary} activeOpacity={0.7}>
            <Text style={styles.secondaryLabel}>I already have an account</Text>
          </TouchableOpacity>
          <Text style={styles.legal}>By continuing, you agree to our Terms & Privacy.</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: T.bg,
  },
  heroBg: {
    position: 'absolute',
    inset: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0a0a0a',
  },
  heroLabel: {
    position: 'absolute',
    top: 100,
    left: 24,
    fontFamily: T.mono,
    fontSize: 10,
    color: 'rgba(255,255,255,0.28)',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  heroFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '55%',
  },
  safe: {
    flex: 1,
  },
  topLabel: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  brand: {
    fontFamily: T.mono,
    fontSize: 11,
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase',
  },
  copy: {
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  headline: {
    fontSize: 44,
    fontWeight: '600',
    letterSpacing: -2,
    lineHeight: 44,
    color: T.text,
    marginBottom: 14,
  },
  sub: {
    fontSize: 16,
    color: T.muted,
    letterSpacing: -0.2,
    lineHeight: 23,
    maxWidth: 320,
    marginBottom: 44,
  },
  ctas: {
    paddingHorizontal: 24,
    paddingBottom: 22,
  },
  primary: {
    height: 56,
    borderRadius: 16,
    backgroundColor: T.text,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  primaryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    letterSpacing: -0.2,
  },
  secondary: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: T.text,
    letterSpacing: -0.2,
  },
  legal: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
    color: T.dim,
    letterSpacing: -0.1,
  },
});
