import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius } from '../styles/spacing';

const ACTIONS = [
    { id: 'panic', label: 'Panic Mode', icon: '🚨', route: 'Panic', color: '#FF6B6B' },
    { id: 'report', label: 'Report', icon: '📸', route: 'Community Report', color: '#4ECDC4' },
    { id: 'community', label: 'Community', icon: '👥', route: 'Community', color: '#7C3AED' },
    { id: 'history', label: 'History', icon: '📊', route: 'History', color: '#B8A8D6' },
    { id: 'plan', label: 'Plan Trip', icon: '🗺️', route: 'Routes', color: '#FFD93D' },
    { id: 'spotify', label: 'Music Player', icon: '🎵', route: 'Spotify', color: '#1DB954' },
    { id: 'gemini', label: 'Gemini AI', icon: '✨', route: 'GeminiChat', color: '#4A90E2' },
];

const QuickActionGrid = () => {
    const navigation = useNavigation();
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            {ACTIONS.map((action) => (
                <TouchableOpacity
                    key={action.id}
                    style={[styles.item, { backgroundColor: colors.card, borderColor: colors.border }]}
                    onPress={() => navigation.navigate(action.route)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.icon}>{action.icon}</Text>
                    <Text style={[styles.label, { color: colors.text }]}>{action.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: spacing.md,
    },
    item: {
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        marginBottom: spacing.md,
        borderRadius: borderRadius.md,
        borderWidth: 1,
        // Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    icon: {
        fontSize: 24,
        marginRight: spacing.sm,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
    },
});

export default QuickActionGrid;
