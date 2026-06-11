import { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_BG = '#1A1B1E';
const ACCENT_COLOR = '#208AEF';

export default function WeatherScreen() {

    const [clima, setClima] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchClima = async () => {
            try {
                const response = await fetch('https://circl-backend-production.up.railway.app/weather')
                const data = await response.json()
                setClima(data)
            } catch (e: any) {
                console.error('Error fetching weather:', e)
                setError(e?.message ?? 'Error al cargar el clima')
            }
        }
        fetchClima()
    }, [])



    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Error state */}
            {error && (
                <View style={{ padding: 20, alignItems: 'center' }}>
                    <Text style={{ color: '#FF6B6B', fontSize: 16 }}>{error}</Text>
                </View>
            )}
            {/* Header Info */}
            <View style={styles.header}>
                {clima && (
                    <>
                        <Image source={{ uri: `https://openweathermap.org/img/wn/${clima.weather[0].icon}.png` }} style={{ width: 100, height: 100 }} />
                        <Text style={styles.temperature}>{clima.main.temp}°C</Text>
                        <Text style={styles.weatherMain}>{clima.weather[0].main}</Text>
                        <Text style={styles.condition}>{clima.weather[0].description}</Text>
                        <Text style={styles.location}>{clima.name}</Text>
                    </>
                )}
            </View>

            {/* Grid of Details */}
            <View style={styles.detailsGrid}>

            </View>

            {/* Hourly Forecast */}
            <View style={styles.section}>

            </View>

            {/* 5-Day Forecast */}
            <View style={styles.section}>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111213',
    },
    content: {
        padding: 16,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginVertical: 24,
    },
    location: {
        fontSize: 20,
        fontWeight: '600',
        color: '#B0B4BA',
        marginBottom: 8,
    },
    mainIcon: {
        marginVertical: 12,
    },
    temperature: {
        fontSize: 64,
        fontWeight: '700',
        color: '#FFF',
    },

    weatherMain: {
        fontSize: 16,
        fontWeight: '600',
        color: '#B0B4BA',
        marginTop: 4,
    },

    condition: {
        fontSize: 16,
        color: '#B0B4BA',
        marginTop: 4,
    },
    detailsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
    },
    detailCard: {
        width: (SCREEN_WIDTH - 32 - 12) / 2,
        backgroundColor: CARD_BG,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    detailValue: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFF',
        marginTop: 8,
    },
    detailLabel: {
        fontSize: 12,
        color: '#B0B4BA',
        marginTop: 4,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFF',
        marginBottom: 12,
    },
    hourlyList: {
        gap: 12,
    },
    hourCard: {
        backgroundColor: CARD_BG,
        borderRadius: 12,
        padding: 16,
        width: 80,
        alignItems: 'center',
    },
    hourTime: {
        fontSize: 12,
        color: '#B0B4BA',
    },
    hourIcon: {
        marginVertical: 8,
    },
    hourTemp: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
    },
    dailyCard: {
        backgroundColor: CARD_BG,
        borderRadius: 12,
        paddingHorizontal: 16,
    },
    dailyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#222326',
    },
    noBorder: {
        borderBottomWidth: 0,
    },
    dailyDay: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FFF',
        width: 80,
    },
    dailyConditionGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flex: 1,
        paddingHorizontal: 8,
    },
    dailyConditionText: {
        fontSize: 14,
        color: '#B0B4BA',
    },
    dailyTemp: {
        fontSize: 14,
        color: '#FFF',
        textAlign: 'right',
    },
});
