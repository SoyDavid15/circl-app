import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

export const TopBar = () => {
    return (
        <ThemedView style={styles.outerContainer}>
            <SafeAreaView edges={['top']} style={styles.container}>
                <ThemedText type="title" style={styles.title}>CIRCL</ThemedText>
            </SafeAreaView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: '#2b2b2b',
    },
    container: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#ccc",
    },
});

