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
import { TabBar } from "../../components/TabBar";

interface ProfileRow {
  label: string;
  value?: string;
  avatar?: boolean;
  tag?: string;
  danger?: boolean;
}

const STATS = [
  { k: "Sessions", v: "17" },
  { k: "Streak", v: "12d" },
  { k: "Level", v: "07" },
];

const SECTIONS: { title: string; rows: ProfileRow[] }[] = [
  {
    title: "Training",
    rows: [
      { label: "Program", value: "Recomp · Moderate" },
      { label: "Schedule", value: "Mon · Wed · Fri · Sat" },
      { label: "Coach", value: "Jordan P.", avatar: true },
      { label: "Equipment", value: "Full gym" },
    ],
  },
  {
    title: "Account",
    rows: [
      { label: "Email", value: "alex@tempo.app" },
      { label: "Units", value: "Metric (kg · cm)" },
      { label: "Notifications", value: "Daily · 7:00 AM" },
      { label: "Apple Health", value: "Connected", tag: T.mint },
    ],
  },
  {
    title: "Support",
    rows: [
      { label: "Help center" },
      { label: "Terms & Privacy" },
      { label: "Sign out", danger: true },
    ],
  },
];

export function S14_Profile() {
  return (
    <View style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <Text style={styles.topBarLabel}>Profile</Text>
          <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
            <Circle cx={9} cy={9} r={2.2} stroke={T.text} strokeWidth={1.5} />
            <Path
              d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.5 3.5l1.4 1.4M13.1 13.1l1.4 1.4M3.5 14.5l1.4-1.4M13.1 4.9l1.4-1.4"
              stroke={T.text}
              strokeWidth={1.4}
              strokeLinecap="round"
            />
          </Svg>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Identity */}
          <View style={styles.identity}>
            <View style={styles.avatarWrap}>
              <Text style={styles.avatarText}>AM</Text>
              <View style={styles.levelBadge}>
                <View style={styles.levelBadgeInner}>
                  <Text style={styles.levelBadgeText}>07</Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={styles.name}>Alex Morgan</Text>
              <Text style={styles.since}>Member since Apr 2026</Text>
              <View style={styles.rankChip}>
                <Text style={styles.rankText}>Challenger</Text>
              </View>
            </View>
          </View>

          {/* Stats strip */}
          <View style={styles.statsStrip}>
            {STATS.map((s, i) => (
              <View
                key={s.k}
                style={[styles.statCell, i > 0 && styles.statCellBorder]}
              >
                <Text style={styles.statVal}>{s.v}</Text>
                <Text style={styles.statKey}>{s.k}</Text>
              </View>
            ))}
          </View>

          {/* Sections */}
          <View style={styles.sections}>
            {SECTIONS.map((sec) => (
              <View key={sec.title} style={styles.sectionBlock}>
                <Text style={styles.sectionTitle}>{sec.title}</Text>
                <View style={styles.sectionList}>
                  {sec.rows.map((r, i) => (
                    <TouchableOpacity
                      key={r.label}
                      style={[
                        styles.row,
                        i < sec.rows.length - 1 && styles.rowBorder,
                      ]}
                      activeOpacity={0.7}
                    >
                      {r.avatar && (
                        <View style={styles.coachAvatar}>
                          <Text style={styles.coachAvatarText}>JP</Text>
                        </View>
                      )}
                      <Text
                        style={[
                          styles.rowLabel,
                          r.danger && { color: T.coral },
                        ]}
                      >
                        {r.label}
                      </Text>
                      {r.value && (
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          {r.tag && (
                            <View
                              style={[
                                styles.tagDot,
                                { backgroundColor: r.tag },
                              ]}
                            />
                          )}
                          <Text style={styles.rowValue}>{r.value}</Text>
                        </View>
                      )}
                      {!r.danger && (
                        <Svg
                          width={7}
                          height={12}
                          viewBox="0 0 7 12"
                          fill="none"
                        >
                          <Path
                            d="M1 1l5 5-5 5"
                            stroke={T.dim}
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </Svg>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}

            <Text style={styles.version}>TEMPO · v0.1.4 · build 284</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      <TabBar active="Profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: T.bg },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 18,
  },
  topBarLabel: {
    fontFamily: T.mono,
    fontSize: 10,
    color: T.dim,
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  identity: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  avatarWrap: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#1d1d1d",
    borderWidth: 1,
    borderColor: T.border,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "600",
    color: T.text,
    letterSpacing: -0.5,
  },
  levelBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: T.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  levelBadgeInner: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: T.lime,
    alignItems: "center",
    justifyContent: "center",
  },
  levelBadgeText: {
    fontFamily: T.mono,
    fontSize: 10,
    color: "#000",
    fontWeight: "700",
  },
  name: {
    fontSize: 26,
    fontWeight: "600",
    color: T.text,
    letterSpacing: -0.8,
    lineHeight: 30,
    marginBottom: 4,
  },
  since: {
    fontFamily: T.mono,
    fontSize: 10,
    color: T.dim,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  rankChip: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: `${T.lime}14`,
    borderWidth: 1,
    borderColor: `${T.lime}33`,
  },
  rankText: {
    fontFamily: T.mono,
    fontSize: 10,
    color: T.lime,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  statsStrip: {
    flexDirection: "row",
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#0b0b0b",
    borderWidth: 1,
    borderColor: T.border,
  },
  statCell: {
    flex: 1,
    padding: 16,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  statCellBorder: { borderLeftWidth: 1, borderLeftColor: T.border },
  statVal: {
    fontSize: 22,
    fontWeight: "600",
    color: T.text,
    letterSpacing: -0.6,
    lineHeight: 26,
    marginBottom: 6,
  },
  statKey: {
    fontFamily: T.mono,
    fontSize: 10,
    color: T.dim,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  sections: { paddingHorizontal: 24, gap: 22, paddingBottom: 16 },
  sectionBlock: {},
  sectionTitle: {
    fontFamily: T.mono,
    fontSize: 10,
    color: T.dim,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  sectionList: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#0b0b0b",
    borderWidth: 1,
    borderColor: T.border,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    paddingHorizontal: 16,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: T.border },
  coachAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#222",
    borderWidth: 1,
    borderColor: T.border,
    alignItems: "center",
    justifyContent: "center",
  },
  coachAvatarText: { fontFamily: T.mono, fontSize: 9, color: T.muted },
  rowLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: T.text,
    letterSpacing: -0.2,
  },
  tagDot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
  rowValue: { fontSize: 13, color: T.muted, letterSpacing: -0.1 },
  version: {
    paddingVertical: 14,
    textAlign: "center",
    fontFamily: T.mono,
    fontSize: 10,
    color: T.dim,
    letterSpacing: 0.6,
  },
});
