import { useEffect, useState } from "react";
import {
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.52;

// --- Skeleton Card ---
const SkeletonCard = () => {
  const opacity = new Animated.Value(0.3);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.card, { opacity }]}>
      <View style={styles.skeletonTag} />
      <View style={styles.skeletonLine} />
      <View style={[styles.skeletonLine, { width: "60%" }]} />
    </Animated.View>
  );
};

// --- News Component ---
const News = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://circl-backend-production.up.railway.app/news",
        );
        const data = await response.json();
        setArticles(Array.isArray(data) ? data : (data.results ?? []));
      } catch (e: any) {
        setError(e?.message ?? "Error al cargar las noticias");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerLabel}>NOTICIAS DESTACADAS</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Error State */}
        {error && (
          <View style={styles.card}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Skeleton Loader */}
        {loading && !error && [0, 1, 2].map((i) => <SkeletonCard key={i} />)}

        {/* Articles */}
        {!loading &&
          articles.map((article: any, index: number) => (
            <View key={article.id ?? article.url ?? index} style={styles.card}>
              <Text style={styles.title} numberOfLines={4}>
                {article.title}
              </Text>
              {article.source && (
                <Text style={styles.source} numberOfLines={1}>
                  {article.source}
                </Text>
              )}
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#2A2A2A",
    backgroundColor: "#000000",
  },

  // --- Header ---
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    gap: 10,
  },
  headerLabel: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2.5,
    color: "#FFFFFF",
  },
  headerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#333",
  },

  // --- Scroll ---
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 10,
  },

  // --- Card ---
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#1C1C1E",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 16,
    justifyContent: "center",
    gap: 8,
    height: 100, // Fixed height to match mockup
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    color: "#F0F0F0",
    lineHeight: 19,
    letterSpacing: 0.1,
  },
  source: {
    fontSize: 10,
    fontWeight: "500",
    color: "#555",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  // --- Error ---
  errorText: {
    fontSize: 13,
    color: "#888",
    fontStyle: "italic",
  },

  // --- Skeleton ---
  skeletonTag: {
    width: 24,
    height: 8,
    backgroundColor: "#2A2A2A",
    borderRadius: 2,
  },
  skeletonLine: {
    width: "90%",
    height: 10,
    backgroundColor: "#2A2A2A",
    borderRadius: 2,
  },

  // --- Pagination ---
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    gap: 6,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#444",
  },
  dotActive: {
    backgroundColor: "#FFFFFF",
  },
});
