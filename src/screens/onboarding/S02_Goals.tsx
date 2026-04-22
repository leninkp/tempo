import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { T } from '../../constants/theme';
import { TopBar } from '../../components/TopBar';
import { Heading } from '../../components/Heading';
import { PrimaryButton } from '../../components/PrimaryButton';
import { SelectRow } from '../../components/SelectRow';

const GOALS = [
  { label: 'Build strength', hint: 'Progressive overload, heavy lifts', icon: '01' },
  { label: 'Lose fat', hint: 'Cut + cardio, sustainable pace', icon: '02' },
  { label: 'Gain muscle', hint: 'Hypertrophy, volume-focused', icon: '03' },
  { label: 'Improve endurance', hint: 'Cardio base + intervals', icon: '04' },
  { label: 'Move better', hint: 'Mobility, posture, recovery', icon: '05' },
];

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export function S02_Goals({ onNext, onBack }: Props) {
  const [selected, setSelected] = useState('Lose fat');

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <TopBar step={1} total={6} onBack={onBack} />
        <Heading
          eyebrow="Step 01 · Goals"
          title="What brings you here?"
          sub="Pick one — you can adjust later. Your program will be built around this."
        />
        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
          {GOALS.map((g) => (
            <SelectRow
              key={g.label}
              label={g.label}
              hint={g.hint}
              icon={g.icon}
              selected={selected === g.label}
              onPress={() => setSelected(g.label)}
            />
          ))}
        </ScrollView>
        <PrimaryButton label="Continue" trailing onPress={onNext} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: T.bg },
  list: { paddingHorizontal: 24, gap: 10, paddingBottom: 16 },
});
