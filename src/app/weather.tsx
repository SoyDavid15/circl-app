import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const CARD_BG = "#262626";

export default function WeatherScreen() {
  const [clima, setClima] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [headerHeight, setHeaderHeight] = useState(350);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchClima = async () => {
      try {
        const response = await fetch(
          "https://circl-backend-production.up.railway.app/weather",
        );
        const data = await response.json();
        setClima(data);
      } catch (e: any) {
        console.error("Error fetching weather:", e);
        setError(e?.message ?? "Error al cargar el clima");
      }
    };
    fetchClima();
  }, []);

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View
        style={[styles.fixedHeaderContainer, { paddingTop: insets.top + 16 }]}
        onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
      >
        {/* Error state */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Main Info */}
        <View style={styles.header}>
          {clima ? (
            <>
              <Text style={styles.temperature}>{clima.main.temp}°C</Text>
              <Text style={styles.weatherMain}>{clima.weather[0].main}</Text>
              <Text style={styles.condition}>
                {clima.weather[0].description}
              </Text>
              <View style={styles.locationContainer}>
                <Ionicons name="location-outline" size={14} color="#FFF" />
                <Text style={styles.location}>{clima.name.toUpperCase()}</Text>
              </View>
            </>
          ) : (
            <Text style={styles.loadingText}>Cargando...</Text>
          )}
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: headerHeight }} />

        <View style={styles.cardsContainer}>
          {clima && (
            <>
              {/* Forecast Card */}
              <View style={styles.forecastCard}>
                <View style={styles.forecastHeader}>
                  <Text style={styles.forecastLabel}>Pronóstico</Text>
                  <Text style={styles.forecastLabelRight}>Mañana</Text>
                </View>
                <View style={styles.forecastBody}>
                  <Text style={styles.forecastValue}>Soleado</Text>
                  <Feather name="sun" size={24} color="#FFF" />
                </View>
              </View>

              {/* Alerts Card */}
              <View style={styles.alertsCard}>
                <View style={styles.alertIconContainer}>
                  <MaterialCommunityIcons
                    name="snowflake"
                    size={24}
                    color="#FFF"
                  />
                </View>
                <View style={styles.alertContent}>
                  <Text style={styles.alertTitle}>Alertas</Text>
                  <Text style={styles.alertText}>
                    No hay ninguna alerta activa para tu zona.
                  </Text>
                </View>
              </View>

              {/* Details Grid */}
              <View style={styles.detailsGrid}>
                {/* Humidity */}
                <View style={styles.detailCard}>
                  <MaterialCommunityIcons
                    name="water-percent"
                    size={28}
                    color="#B0B4BA"
                  />
                  <Text style={styles.detailValue}>{clima.main.humidity}%</Text>
                  <Text style={styles.detailLabel}>Humedad</Text>
                </View>

                {/* Feels Like */}
                <View style={styles.detailCard}>
                  <Ionicons
                    name="thermometer-outline"
                    size={28}
                    color="#B0B4BA"
                  />
                  <Text style={styles.detailValue}>
                    {clima.main.feels_like}°C
                  </Text>
                  <Text style={styles.detailLabel}>Sensación Térmica</Text>
                </View>

                {/* Probability of Rain */}
                <View style={styles.detailCard}>
                  <Ionicons name="umbrella-outline" size={28} color="#B0B4BA" />
                  <Text style={styles.detailValue}>
                    {clima.pop !== undefined
                      ? `${Math.round(clima.pop * 100)}%`
                      : "0%"}
                  </Text>
                  <Text style={styles.detailLabel}>Probabilidad de lluvia</Text>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111213",
  },
  errorContainer: {
    padding: 20,
    alignItems: "center",
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 16,
  },
  loadingText: {
    color: "#FFF",
    marginTop: 40,
  },
  fixedHeaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    zIndex: 0,
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  scrollContent: {
    paddingBottom: 15,
  },
  cardsContainer: {
    backgroundColor: "#111213",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  header: {
    alignItems: "center",
    marginVertical: 32,
  },
  temperature: {
    fontSize: 72,
    fontWeight: "800",
    color: "#FFF",
    letterSpacing: -2,
  },
  weatherMain: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFF",
    marginTop: 8,
  },
  condition: {
    fontSize: 16,
    color: "#B0B4BA",
    marginTop: 4,
    textTransform: "capitalize",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    gap: 4,
  },
  location: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFF",
    letterSpacing: 0.5,
  },
  forecastCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  forecastHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  forecastLabel: {
    color: "#B0B4BA",
    fontSize: 13,
    fontWeight: "500",
  },
  forecastLabelRight: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "600",
  },
  forecastBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forecastValue: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "700",
  },
  alertsCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#FFF",
  },
  alertIconContainer: {
    marginRight: 16,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  alertText: {
    color: "#B0B4BA",
    fontSize: 14,
    lineHeight: 20,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  detailCard: {
    width: (SCREEN_WIDTH - 32 - 12) / 2,
    backgroundColor: CARD_BG,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  detailValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFF",
    marginTop: 12,
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 13,
    color: "#B0B4BA",
    textAlign: "center",
    fontWeight: "500",
  },
});
