import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius } from '../styles/spacing';

const CalmScoreHeader = ({ score = 7.2, location = "Downtown Area" }) => {
    const { colors } = useTheme();

    const getScoreColor = (s) => {
        if (s >= 7) return colors.success;
        if (s >= 4) return colors.warning;
        return colors.accent;
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View>
                <Text style={[styles.label, { color: colors.muted }]}>Current Location</Text>
                <Text style={[styles.location, { color: colors.text }]}>{location}</Text>
            </View>
            <View style={styles.scoreContainer}>
                <View style={[styles.scoreCircle, { borderColor: getScoreColor(score) }]}>
                    <Text style={[styles.score, { color: getScoreColor(score) }]}>{score}</Text>
                </View>
                <Text style={[styles.scoreLabel, { color: colors.muted }]}>Calm Score</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.md,
        margin: spacing.md,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    label: { fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 },
    location: { fontSize: 18, fontWeight: 'bold' },
    scoreContainer: { alignItems: 'center' },
    scoreCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    score: { fontSize: 18, fontWeight: 'bold' },
    scoreLabel: { fontSize: 10 },
});

export default CalmScoreHeader;
