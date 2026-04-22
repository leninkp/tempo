import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { T } from "../../constants/theme";
import { TopBar } from "../../components/TopBar";
import { Heading } from "../../components/Heading";
import { PrimaryButton } from "../../components/PrimaryButton";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export function S04_Schedule({ onNext, onBack }: Props) {
  const [selected, setSelected] = useState([
    true,
    false,
    true,
    false,
    true,
    true,
    false,
  ]);

  const toggle = (i: number) => {
    setSelected((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  const count = selected.filter(Boolean).length;
  const [duration, setDuration] = useState(45);

  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <TopBar step={3} total={6} onBack={onBack} />
        <Heading
          eyebrow="Step 03 · Schedule"
          title="When can you train?"
          sub="Pick the days you can realistically show up."
        />

        <View style={styles.section}>
          <View style={styles.dayRow}>
            {DAYS.map((d, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => toggle(i)}
                style={[
                  styles.dayBtn,
                  selected[i] ? styles.dayBtnOn : styles.dayBtnOff,
                ]}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.dayLabel,
                    { color: selected[i] ? "#000" : T.muted },
                  ]}
                >
                  {d}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.dayCount}>{count} days selected</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sliderLabel}>Session length</Text>
          <View style={styles.sliderCard}>
            <View style={styles.sliderHeader}>
              <Text style={styles.perSession}>Per session</Text>
              <Text style={styles.durationVal}>
                {duration}
                <Text style={styles.durationUnit}> min</Text>
              </Text>
            </View>
            {/* Static slider visual */}
            <View style={styles.track}>
              <View
                style={[
                  styles.fill,
                  { width: `${((duration - 15) / 75) * 100}%` },
                ]}
              />
              <View
                style={[
                  styles.thumb,
                  { left: `${((duration - 15) / 75) * 100}%` },
                ]}
              />
            </View>
            <View style={styles.trackLabels}>
              <Text style={styles.trackTick}>15 MIN</Text>
              <Text style={styles.trackTick}>90 MIN</Text>
            </View>
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
  section: { paddingHorizontal: 24, paddingBottom: 24 },
  dayRow: { flexDirection: "row", gap: 8 },
  dayBtn: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  dayBtnOn: { backgroundColor: T.text },
  dayBtnOff: { backgroundColor: "#111", borderWidth: 1, borderColor: T.border },
  dayLabel: { fontSize: 15, fontWeight: "600", letterSpacing: -0.2 },
  dayCount: {
    marginTop: 10,
    fontFamily: T.mono,
    fontSize: 12,
    color: T.dim,
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  sliderLabel: {
    fontFamily: T.mono,
    fontSize: 13,
    color: T.dim,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 14,
  },
  sliderCard: {
    padding: 22,
    borderRadius: 16,
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: T.border,
  },
  sliderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  perSession: { fontSize: 15, color: T.muted },
  durationVal: {
    fontSize: 34,
    fontWeight: "600",
    color: T.text,
    letterSpacing: -1,
  },
  durationUnit: { fontSize: 14, color: T.muted, fontWeight: "500" },
  track: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 4,
    position: "relative",
  },
  fill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: T.text,
    borderRadius: 4,
  },
  thumb: {
    position: "absolute",
    top: -10,
    marginLeft: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: T.text,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  trackLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  trackTick: {
    fontFamily: T.mono,
    fontSize: 11,
    color: T.dim,
    letterSpacing: 0.8,
  },
});
