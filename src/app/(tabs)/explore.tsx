import { TopBar } from '@/components/topBar';
import { router } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const H_PAD = 16;
const GAP = 12;

// Available width after horizontal padding
const AVAILABLE = SCREEN_WIDTH - H_PAD * 2;

// Right column = 1/3, Left column = 2/3 (with gap between them)
const SMALL_W = (AVAILABLE - GAP) / 3;
const LARGE_W = AVAILABLE - SMALL_W - GAP;

const CARD_H = 130;

export default function TabTwoScreen() {

  return (
    <View style={styles.container}>
      <TopBar />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>

        <View style={styles.grid}>
          {/* Fila 1: Weather + Noticias */}
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.card, styles.cardCenter, { width: LARGE_W, height: CARD_H }]}
              activeOpacity={0.75}
              onPress={() => router.push('/weather')}
            >
              <Text style={styles.cardEmoji}>☀️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.card, styles.cardCenter, { width: SMALL_W, height: CARD_H }]}
              activeOpacity={0.75}
            >
              <Text style={styles.cardEmoji}>📰</Text>
            </TouchableOpacity>
          </View>

          {/* Fila 2: Análisis (mismo tamaño que Noticias, alineado izquierda) */}
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.card, styles.cardCenter, { width: SMALL_W, height: CARD_H }]}
              activeOpacity={0.75}
            >
              <Text style={styles.cardEmoji}>📈</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const CARD_RADIUS = 14;
const CARD_BG = '#1A1B1E';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111213',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#111213',
  },
  content: {
    paddingBottom: 32,
  },
  grid: {
    flexDirection: 'column',
    paddingHorizontal: H_PAD,
    paddingTop: H_PAD,
    gap: GAP,
  },
  row: {
    flexDirection: 'row',
    gap: GAP,
  },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
  },
  cardCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardEmoji: {
    fontSize: 36,
  },
});
