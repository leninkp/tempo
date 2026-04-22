import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { T } from "../../constants/theme";
import { TopBar } from "../../components/TopBar";
import { Heading } from "../../components/Heading";
import { PrimaryButton } from "../../components/PrimaryButton";
import { SelectRow } from "../../components/SelectRow";

const LEVELS = [
  { k: "N", label: "New to training", hint: "I haven't been consistent" },
  { k: "S", label: "Some experience", hint: "On and off for a while" },
  { k: "R", label: "Regular lifter", hint: "2+ years, know my way around" },
  { k: "A", label: "Advanced", hint: "Competed or coached before" },
];

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export function S03_Experience({ onNext, onBack }: Props) {
  const [selected, setSelected] = useState("Some experience");

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <TopBar step={2} total={6} onBack={onBack} />
        <Heading
          eyebrow="Step 02 · Experience"
          title="Where are you at now?"
          sub="Honest answers make for honest programming."
        />
        <View style={styles.list}>
          {LEVELS.map((l) => (
            <SelectRow
              key={l.k}
              label={l.label}
              hint={l.hint}
              icon={l.k}
              selected={selected === l.label}
              onPress={() => setSelected(l.label)}
            />
          ))}
        </View>
        <View style={{ flex: 1 }} />
        <PrimaryButton label="Continue" trailing onPress={onNext} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: T.bg },
  list: { paddingHorizontal: 24, gap: 10 },
});
