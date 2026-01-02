import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius } from '../styles/spacing';
import Card from './Card';

const SafeHavensPreview = ({ places = [], loading = false }) => {
    const { colors } = useTheme();

    const renderItem = ({ item }) => (
        <Card style={styles.card} padding="sm">
            <View style={styles.header}>
                <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
                <View style={[styles.badge, { backgroundColor: colors.success }]}>
                    <Text style={styles.score}>{item.score}</Text>
                </View>
            </View>
            <Text style={[styles.details, { color: colors.muted }]}>{item.type}</Text>
        </Card>
    );

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={[styles.title, { color: colors.text }]}>Finding Safe Places...</Text>
            </View>
        );
    }

    if (!places || places.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={[styles.title, { color: colors.text }]}>Nearby Safe Havens</Text>
                <Text style={{ marginLeft: 20, color: colors.muted }}>No safe places found nearby.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: colors.text }]}>Nearby Safe Havens</Text>
            <FlatList
                data={places}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.lg,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: spacing.lg,
        marginBottom: spacing.sm,
    },
    list: {
        paddingHorizontal: spacing.md,
    },
    card: {
        width: 160,
        marginHorizontal: spacing.xs,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    name: {
        flex: 1,
        fontWeight: '600',
        fontSize: 14,
        marginRight: 4,
    },
    badge: {
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
    },
    score: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 12,
    },
});

export default SafeHavensPreview;
