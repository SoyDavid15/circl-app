import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export const TopBar = () => {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={[styles.outerContainer, { paddingTop: insets.top }]}>
      <View style={styles.container}>
        <View style={styles.innerRow}>
          <View style={styles.spacer} />

          <ThemedText type="title" style={styles.title}>
            CIRCL
          </ThemedText>

          <View style={styles.spacer} />
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#2b2b2b",
    backgroundColor: "#1d1d1d",
  },
  container: {
    width: "100%",
    paddingBottom: 10,
    paddingTop: 10,
  },
  innerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 1,
  },
  spacer: {
    width: 38,
  },
});

