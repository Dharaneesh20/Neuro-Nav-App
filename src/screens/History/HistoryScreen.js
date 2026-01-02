import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';
import { spacing } from '../../styles/spacing';
import Card from '../../components/Card';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

const HistoryScreen = () => {
    const { colors } = useTheme();
    const [history, setHistory] = useState([]);
    const isFocused = useIsFocused(); // Reload when screen comes into focus

    useEffect(() => {
        if (isFocused) {
            loadHistory();
        }
    }, [isFocused]);

    const loadHistory = async () => {
        try {
            const storedHistory = await AsyncStorage.getItem('trip_history');
            if (storedHistory) {
                setHistory(JSON.parse(storedHistory).reverse()); // Show newest first
            }
        } catch (error) {
            console.error("Failed to load history:", error);
        }
    };

    const clearHistory = async () => {
        try {
            await AsyncStorage.removeItem('trip_history');
            setHistory([]);
        } catch (error) {
            console.error("Failed to clear history:", error);
        }
    };

    const confirmClear = () => {
        Alert.alert(
            "Clear History",
            "Are you sure you want to delete all trip history?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: clearHistory }
            ]
        );
    };

    const renderItem = ({ item }) => (
        <Card style={[styles.card, { backgroundColor: colors.card }]} padding="md">
            <View style={styles.cardHeader}>
                <View style={[styles.iconBox, { backgroundColor: colors.background }]}>
                    <Ionicons name="navigate" size={20} color={colors.primary} />
                </View>
                <View style={styles.routeInfo}>
                    <Text style={[styles.dest, { color: colors.text }]} numberOfLines={1}>{item.destination}</Text>
                    <Text style={[styles.from, { color: colors.muted }]} numberOfLines={1}>From: {item.start}</Text>
                </View>
                <Text style={[styles.date, { color: colors.muted }]}>{item.date}</Text>
            </View>

            <View style={[styles.statsRow, { borderTopColor: colors.border }]}>
                <Text style={[styles.stat, { color: colors.text }]}>{item.distance}</Text>
                <Text style={[styles.stat, { color: colors.success }]}> Quiet Score: {item.quietScore}</Text>
            </View>
        </Card>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>Trip History</Text>
                {history.length > 0 && (
                    <TouchableOpacity onPress={confirmClear}>
                        <Text style={[styles.clearBtn, { color: colors.error }]}>Clear</Text>
                    </TouchableOpacity>
                )}
            </View>

            {history.length === 0 ? (
                <View style={styles.emptyState}>
                    <Ionicons name="time-outline" size={64} color={colors.muted + '40'} />
                    <Text style={[styles.emptyText, { color: colors.muted }]}>No recent trips found.</Text>
                    <Text style={[styles.emptySub, { color: colors.muted }]}>Plan a trip to see it here.</Text>
                </View>
            ) : (
                <FlatList
                    data={history}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: spacing.lg },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    clearBtn: {
        fontSize: 16,
        fontWeight: '600',
    },
    list: {
        paddingBottom: spacing.xl,
    },
    card: {
        marginBottom: spacing.md,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.sm,
    },
    routeInfo: {
        flex: 1,
    },
    dest: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    from: {
        fontSize: 12,
    },
    date: {
        fontSize: 12,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: spacing.sm,
        borderTopWidth: 1,
    },
    stat: {
        fontWeight: '600',
        fontSize: 14,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    emptyText: {
        marginTop: spacing.md,
        fontSize: 18,
        fontWeight: '600',
    },
    emptySub: {
        marginTop: spacing.xs,
        fontSize: 14,
    },
});

export default HistoryScreen;
