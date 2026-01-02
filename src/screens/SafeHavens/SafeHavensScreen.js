import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { spacing, borderRadius } from '../../styles/spacing';
import Card from '../../components/Card';
import Button from '../../components/Button';

const HAVENS = [
    { id: '1', name: 'Riverside Park', type: 'Park', distance: '0.2 mi', rating: 4.8, score: 9.2, features: ['Benches', 'Nature'] },
    { id: '2', name: 'Central Library', type: 'Library', distance: '0.5 mi', rating: 4.9, score: 9.0, features: ['Quiet Zones', 'WiFi'] },
    { id: '3', name: 'Quiet Cafe', type: 'Cafe', distance: '0.8 mi', rating: 4.5, score: 7.5, features: ['Coffee', 'AC'] },
    { id: '4', name: 'City Museum', type: 'Museum', distance: '1.2 mi', rating: 4.7, score: 8.5, features: ['Exhibits', 'Low Light'] },
    { id: '5', name: 'Botanic Garden', type: 'Park', distance: '1.5 mi', rating: 4.9, score: 9.5, features: ['Flowers', 'Peaceful'] },
];

const SafeHavensScreen = () => {
    const { colors } = useTheme();

    const renderItem = ({ item }) => (
        <Card style={styles.card} padding="md">
            <View style={styles.header}>
                <View>
                    <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
                    <Text style={[styles.type, { color: colors.muted }]}>{item.type} • {item.distance}</Text>
                </View>
                <View style={[styles.scoreBadge, { backgroundColor: colors.success }]}>
                    <Text style={styles.score}>{item.score}</Text>
                </View>
            </View>

            <View style={styles.features}>
                {item.features.map((feature, index) => (
                    <View key={index} style={[styles.tag, { backgroundColor: colors.background, borderColor: colors.border }]}>
                        <Text style={[styles.tagText, { color: colors.muted }]}>{feature}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.actions}>
                <Button title="Navigate" size="sm" onPress={() => { }} style={{ flex: 1, marginRight: spacing.sm }} />
                <Button title="Details" size="sm" variant="outline" onPress={() => { }} style={{ flex: 1 }} />
            </View>
        </Card>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.headerContainer}>
                <Text style={[styles.title, { color: colors.text }]}>Safe Havens</Text>
                {/* Placeholder for Filters */}
                <Text style={{ color: colors.primary }}>Filter</Text>
            </View>

            <FlatList
                data={HAVENS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.md,
    },
    title: { fontSize: 24, fontWeight: 'bold' },
    list: { padding: spacing.md },
    card: { marginBottom: spacing.md },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.sm,
    },
    name: { fontSize: 18, fontWeight: 'bold' },
    type: { fontSize: 14, marginTop: 2 },
    scoreBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: borderRadius.sm,
    },
    score: { color: '#FFF', fontWeight: 'bold' },
    features: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: spacing.md,
    },
    tag: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        borderWidth: 1,
        marginRight: 4,
        marginBottom: 4,
    },
    tagText: { fontSize: 12 },
    actions: { flexDirection: 'row' },
});

export default SafeHavensScreen;
