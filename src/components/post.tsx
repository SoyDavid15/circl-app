import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PostProps {
    descripcion: string;
    barrio: string;
    fecha: string;
}

// Simulates "HACE X MIN" for the mock
const formatTimeAgo = (fechaStr: string): string => {
    // For visual parity with design, we will just say HACE 5 MIN
    // You could implement actual time logic here
    return 'HACE 5 MIN';
};

export const Post = ({ descripcion, barrio, fecha }: PostProps) => {
    // We'll use the first word of the description as a short title, or the whole thing if it's short
    const title = descripcion.length > 20 ? descripcion.split(' ')[0] : descripcion;

    return (
        <View style={styles.container}>
            {/* Left side: Text content */}
            <View style={styles.leftContent}>
                <Text style={styles.titleText} numberOfLines={1}>{title}</Text>
                <Text style={styles.subtitleText}>
                    {barrio.toUpperCase()} • {formatTimeAgo(fecha)}
                </Text>
            </View>

            {/* Right side: Icons */}
            <View style={styles.rightContent}>
                <View style={styles.iconWrapper}>
                    <Ionicons name="heart-outline" size={16} color="#888" />
                    <Text style={styles.iconText}>12</Text>
                </View>
                <View style={styles.iconWrapper}>
                    <Ionicons name="chatbubble-outline" size={16} color="#888" />
                    <Text style={styles.iconText}>4</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#1C1C1E',
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12, // Spacing between posts
    },

    // --- Left Content ---
    leftContent: {
        flex: 1,
        gap: 6,
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    subtitleText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#888',
        letterSpacing: 0.5,
    },

    // --- Right Content ---
    rightContent: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
    },
    iconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    iconText: {
        fontSize: 12,
        color: '#888',
        fontWeight: '500',
    },
});