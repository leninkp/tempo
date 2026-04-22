import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Circle } from "react-native-svg";
import { T } from "../../constants/theme";

const EXERCISES = [
  {
    n: "01",
    name: "Goblet squat",
    meta: "3 × 10",
    load: "16 kg",
    tag: "Warm-up",
  },
  { n: "02", name: "Back squat", meta: "4 × 6", load: "70 kg", tag: "Main" },
  {
    n: "03",
    name: "Romanian deadlift",
    meta: "3 × 8",
    load: "60 kg",
    tag: "Main",
  },
  {
    n: "04",
    name: "Walking lunge",
    meta: "3 × 20 st",
    load: "12 kg",
    tag: "Accessory",
  },
  {
    n: "05",
    name: "Standing calf raise",
    meta: "3 × 15",
    load: "BW+20",
    tag: "Accessory",
  },
  { n: "06", name: "Plank", meta: "3 × 45 s", load: "BW", tag: "Finisher" },
];

interface Props {
  onStart: () => void;
}

export function S09_StartTraining({ onStart }: Props) {
  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeBtn}>
            <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <Path
                d="M2 2l12 12M14 2L2 14"
                stroke={T.text}
                strokeWidth={1.6}
                strokeLinecap="round"
              />
            </Svg>
          </TouchableOpacity>
          <Text style={styles.headerLabel}>Mon · Week 01 / 08</Text>
          <View style={{ width: 36 }}>
            <Svg width={20} height={4} viewBox="0 0 20 4">
              <Circle cx={2} cy={2} r={2} fill={T.muted} />
              <Circle cx={10} cy={2} r={2} fill={T.muted} />
              <Circle cx={18} cy={2} r={2} fill={T.muted} />
            </Svg>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
        >
          {/* Hero */}
          <View style={styles.hero}>
            <Text style={styles.heroEyebrow}>Today's session</Text>
            <Text style={styles.heroTitle}>Lower{"\n"}+ Push</Text>
            <View style={styles.stats}>
              {[
                { k: "Duration", v: "45", u: "min" },
                { k: "Volume", v: "12", u: "sets" },
                { k: "Effort", v: "Mod", u: "" },
              ].map((s, i) => (
                <View
                  key={s.k}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  {i > 0 && <View style={styles.statDivider} />}
                  <View>
                    <Text style={styles.statKey}>{s.k}</Text>
                    <Text style={styles.statVal}>
                      {s.v}
                      <Text style={styles.statUnit}>
                        {s.u ? ` ${s.u}` : ""}
                      </Text>
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Coach note */}
          <View style={styles.coachNote}>
            <View style={styles.coachAvatar}>
              <Text style={styles.coachAvatarText}>JP</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.coachLabel}>Coach · Jordan P.</Text>
              <Text style={styles.coachText}>
                First session — go light on the back squat. We're calibrating,
                not maxing. Rest 90s between sets.
              </Text>
            </View>
          </View>

          {/* Exercise list */}
          <View style={styles.listHeader}>
            <Text style={styles.listEyebrow}>Exercises · 6</Text>
            <Text style={styles.listHint}>Tap to preview</Text>
          </View>
          <View style={styles.exerciseList}>
            {EXERCISES.map((e, i) => (
              <View
                key={e.n}
                style={[
                  styles.exerciseRow,
                  i < EXERCISES.length - 1 && styles.exerciseBorder,
                ]}
              >
                <Text style={styles.exerciseNum}>{e.n}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.exerciseName} numberOfLines={1}>
                    {e.name}
                  </Text>
                  <Text style={styles.exerciseMeta}>
                    {e.meta} · {e.load}
                  </Text>
                </View>
                <View style={styles.exerciseTag}>
                  <Text style={styles.exerciseTagText}>{e.tag}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* CTA */}
        <View style={styles.cta}>
          <TouchableOpacity style={styles.ctaAux}>
            <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
              <Path
                d="M10 2v16M2 10h16"
                stroke={T.text}
                strokeWidth={1.6}
                strokeLinecap="round"
              />
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ctaMain}
            onPress={onStart}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaLabel}>Start training</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Text style={styles.ctaTimer}>45:00</Text>
              <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
                <Path
                  d="M1 7h12M8 2l5 5-5 5"
                  stroke="#000"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: T.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 22,
  },
  closeBtn: { width: 36, height: 36, justifyContent: "center" },
  headerLabel: {
    fontFamily: T.mono,
    fontSize: 11,
    color: T.dim,
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  hero: { paddingHorizontal: 24, paddingBottom: 22 },
  heroEyebrow: {
    fontFamily: T.mono,
    fontSize: 12,
    color: T.dim,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    marginBottom: 14,
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: "600",
    color: T.text,
    letterSpacing: -1.6,
    lineHeight: 40,
    marginBottom: 16,
  },
  stats: { flexDirection: "row", alignItems: "center", gap: 22 },
  statDivider: {
    width: 1,
    height: 26,
    backgroundColor: T.border,
    marginRight: 22,
  },
  statKey: {
    fontFamily: T.mono,
    fontSize: 10,
    color: T.dim,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  statVal: {
    fontSize: 20,
    fontWeight: "600",
    color: T.text,
    letterSpacing: -0.4,
  },
  statUnit: { fontSize: 12, color: T.muted, fontWeight: "500" },
  coachNote: {
    marginHorizontal: 24,
    marginBottom: 20,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: T.border,
    flexDirection: "row",
    gap: 14,
    alignItems: "flex-start",
  },
  coachAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: T.border,
    alignItems: "center",
    justifyContent: "center",
  },
  coachAvatarText: { fontFamily: T.mono, fontSize: 10, color: T.dim },
  coachLabel: {
    fontFamily: T.mono,
    fontSize: 10,
    color: T.dim,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  coachText: {
    fontSize: 13.5,
    color: "rgba(255,255,255,0.82)",
    lineHeight: 20,
    letterSpacing: -0.1,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingHorizontal: 26,
    marginBottom: 12,
  },
  listEyebrow: {
    fontFamily: T.mono,
    fontSize: 11,
    color: T.dim,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  listHint: { fontSize: 12, color: T.muted, letterSpacing: -0.1 },
  exerciseList: {
    marginHorizontal: 24,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: T.border,
    backgroundColor: "#0b0b0b",
  },
  exerciseRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 14,
  },
  exerciseBorder: { borderBottomWidth: 1, borderBottomColor: T.border },
  exerciseNum: {
    fontFamily: T.mono,
    fontSize: 11,
    color: T.dim,
    letterSpacing: 0.6,
    width: 22,
  },
  exerciseName: {
    fontSize: 15,
    fontWeight: "500",
    color: T.text,
    letterSpacing: -0.2,
    marginBottom: 2,
  },
  exerciseMeta: {
    fontFamily: T.mono,
    fontSize: 11,
    color: T.muted,
    letterSpacing: 0.2,
  },
  exerciseTag: {
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  exerciseTagText: {
    fontFamily: T.mono,
    fontSize: 9.5,
    color: T.muted,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  cta: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 24,
    paddingBottom: 16,
    paddingTop: 22,
  },
  ctaAux: {
    width: 56,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: T.border,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  ctaMain: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    backgroundColor: T.text,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
  },
  ctaLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    letterSpacing: -0.2,
  },
  ctaTimer: {
    fontFamily: T.mono,
    fontSize: 11,
    color: "rgba(0,0,0,0.5)",
    letterSpacing: 0.4,
  },
});
