import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import News from "@/components/news";
import { Post } from "@/components/post";
import { ReportForm } from "@/components/ReportForm";
import { ThemedView } from "@/components/themed-view";
import { TopBar } from "@/components/topBar";
import { supabase } from "@/supabase";

export default function HomeScreen() {
  const [incidentes, setIncidentes] = useState<any[]>([]);
  const [clima, setClima] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchIncidentes = async () => {
    const { data } = await supabase
      .from("incidentes")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setIncidentes(data);
  };

  const fetchClima = async () => {
    try {
      const response = await fetch(
        "https://circl-backend-production.up.railway.app/weather",
      );
      const data = await response.json();
      setClima(data);
    } catch (e) {
      console.error("Error fetching weather:", e);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([fetchIncidentes(), fetchClima()]).then(() =>
      setRefreshing(false),
    );
  }, []);

  useEffect(() => {
    fetchIncidentes();
    fetchClima();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <TopBar />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
          />
        }
      >
        {/* Greeting Section */}
        <View style={styles.sectionPadding}>
          <Text style={styles.greetingSmall}>BUEN DÍA,</Text>
          <Text style={styles.greetingLarge}>Bienvenido, Samuel</Text>
        </View>

        {/* Stats Section */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statsScrollContent}
        >
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name="shield-half-outline" size={20} color="#fff" />
              <Text style={styles.statValue}>25%</Text>
            </View>
            <View style={styles.statFooter}>
              <Text style={styles.statLabel}>PROBABILIDAD DE ROBO</Text>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: "25%" }]} />
              </View>
            </View>
          </View>

          {/* Dummy second card partially visible */}
          <View style={[styles.statCard, { width: 140 }]}>
            <View style={styles.statHeader}>
              <Ionicons name="warning-outline" size={20} color="#fff" />
            </View>
            <View style={styles.statFooter}>
              <Text style={styles.statLabel}>HURTOS HOY</Text>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: "10%" }]} />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Weather Pill Section */}
        <View style={styles.sectionPadding}>
          <Link href="/weather" asChild>
            <TouchableOpacity style={styles.weatherPill} activeOpacity={0.8}>
              {clima ? (
                <>
                  <View style={styles.weatherLeft}>
                    <Text style={styles.weatherTemp}>
                      {Math.round(clima.main.temp)}°C
                    </Text>
                    <Text style={styles.weatherDesc}>
                      {clima.weather[0].description.toUpperCase()}
                    </Text>
                  </View>
                  <Image
                    source={{
                      uri: `https://openweathermap.org/img/wn/${clima.weather[0].icon}.png`,
                    }}
                    style={{ width: 40, height: 40 }}
                  />
                </>
              ) : (
                <>
                  <View style={styles.weatherLeft}>
                    <Text style={styles.weatherTemp}>--°C</Text>
                    <Text style={styles.weatherDesc}>CARGANDO...</Text>
                  </View>
                  <Ionicons name="sunny-outline" size={32} color="#000" />
                </>
              )}
            </TouchableOpacity>
          </Link>
        </View>

        <News />

        {/* Alertas Recientes Section Header */}
        <View style={[styles.sectionPadding, styles.alertsHeader]}>
          <Text style={styles.alertsTitle}>Alertas Recientes</Text>
        </View>

        {/* Posts List */}
        <View style={styles.postsContainer}>
          {incidentes.map((item) => (
            <Post
              key={item.id}
              descripcion={item.descripcion}
              barrio={item.barrio}
              fecha={item.fecha_y_hora}
            />
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => setIsModalVisible(true)}
      >
        <Ionicons name="add" size={32} color="#000" />
      </TouchableOpacity>

      {/* Report Form Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setIsModalVisible(false)}
          />
          <View style={styles.modalContent}>
            <ReportForm
              onSubmit={async (category) => {
                setIsModalVisible(false);
                const { error } = await supabase.from("incidentes").insert([
                  {
                    descripcion: category,
                    barrio: "Reporte ciudadano",
                    fecha_y_hora: new Date().toISOString(),
                  },
                ]);
                if (!error) {
                  fetchIncidentes();
                } else {
                  console.error("Error al guardar reporte:", error);
                }
              }}
              onCancel={() => setIsModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionPadding: {
    paddingHorizontal: 20,
  },

  // Greeting
  greetingSmall: {
    fontSize: 10,
    fontWeight: "700",
    color: "#888",
    letterSpacing: 1,
    marginTop: 20,
    marginBottom: 4,
  },
  greetingLarge: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: -0.5,
    marginBottom: 20,
  },

  // Stats
  statsScrollContent: {
    paddingHorizontal: 20,
    gap: 16,
    paddingBottom: 24,
  },
  statCard: {
    width: 220,
    backgroundColor: "#222224",
    borderRadius: 24,
    padding: 20,
    justifyContent: "space-between",
    minHeight: 130,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  statFooter: {
    gap: 8,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#aaa",
    letterSpacing: 0.5,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: "#333",
    borderRadius: 2,
    width: "100%",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 2,
  },

  // Weather Pill
  weatherPill: {
    backgroundColor: "#fff",
    borderRadius: 32,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
    marginBottom: 24,
  },
  weatherLeft: {
    alignItems: "center",
  },
  weatherTemp: {
    fontSize: 20,
    fontWeight: "900",
    color: "#000",
    letterSpacing: -0.5,
  },
  weatherDesc: {
    fontSize: 10,
    fontWeight: "800",
    color: "#000",
    letterSpacing: 1,
  },

  // Alerts
  alertsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  alertsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  alertsAction: {
    fontSize: 10,
    fontWeight: "700",
    color: "#888",
    letterSpacing: 1,
  },
  postsContainer: {
    paddingHorizontal: 20,
  },

  // FAB
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContent: {
    backgroundColor: "#171717",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 8,
    paddingHorizontal: 8,
    paddingBottom: 40,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
});
