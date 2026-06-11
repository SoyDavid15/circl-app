import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ThemedText } from './themed-text';

interface PostProps {
    descripcion: string;
    barrio: string;
    fecha: string;
}

// Formatea la fecha a algo legible: "9 jun · 21:05"
const formatFecha = (fechaStr: string): string => {
    try {
        const date = new Date(fechaStr);
        const day = date.getDate();
        const month = date.toLocaleString('es', { month: 'short' });
        const hours = String(date.getHours()).padStart(2, '0');
        const mins = String(date.getMinutes()).padStart(2, '0');
        return `${day} ${month} · ${hours}:${mins}`;
    } catch {
        return fechaStr;
    }
};

export const Post = ({ descripcion, barrio, fecha }: PostProps) => {
    return (
        <View style={styles.container}>

            {/* Metadata row: barrio + fecha */}
            <View style={styles.metaRow}>
                <View style={styles.barrioTag}>
                    <Text style={styles.barrioText}>{barrio.toUpperCase()}</Text>
                </View>
                <Text style={styles.fechaText}>{formatFecha(fecha)}</Text>
            </View>

            {/* Descripción */}
            <ThemedText style={styles.descripcion}>{descripcion}</ThemedText>

            {/* Divider + Acciones */}
            <View style={styles.divider} />
            <View style={styles.buttons}>
                {/* Botón: Útil */}
                <TouchableOpacity style={styles.actionButton} activeOpacity={0.6}>
                    <Text style={styles.actionIcon}>▲</Text>
                    <Text style={styles.actionLabel}>Útil</Text>
                </TouchableOpacity>

                {/* Botón: Comentar */}
                <TouchableOpacity style={styles.actionButton} activeOpacity={0.6}>
                    <Text style={styles.actionIcon}>◯</Text>
                    <Text style={styles.actionLabel}>Comentar</Text>
                </TouchableOpacity>

                {/* Botón: Compartir */}
                <TouchableOpacity style={styles.actionButton} activeOpacity={0.6}>
                    <Text style={styles.actionIcon}>↗</Text>
                    <Text style={styles.actionLabel}>Compartir</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#0F0F0F',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 12,
        gap: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#2A2A2A',
    },

    // --- Metadata ---
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    barrioTag: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#3A3A3A',
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
    barrioText: {
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 1.5,
        color: '#AAAAAA',
    },
    fechaText: {
        fontSize: 11,
        color: '#555',
        letterSpacing: 0.3,
    },

    // --- Descripción ---
    descripcion: {
        fontSize: 15,
        lineHeight: 22,
        color: '#ECECEC',
        fontWeight: '400',
        letterSpacing: 0.1,
    },

    // --- Divider ---
    divider: {
        width: '100%',
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#222',
        marginTop: 2,
    },

    // --- Acciones ---
    buttons: {
        flexDirection: 'row',
        gap: 20,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingVertical: 4,
    },
    actionIcon: {
        fontSize: 18,
        color: '#555',
    },
    actionLabel: {
        fontSize: 11,
        fontWeight: '500',
        color: '#555',
        letterSpacing: 0.3,
    },
});