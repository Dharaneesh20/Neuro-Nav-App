import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { spacing, borderRadius } from '../../styles/spacing';
import Button from '../../components/Button';
import Card from '../../components/Card';

const PREF_LABELS = {
    loudNoises: { label: 'Loud Noises', icon: '🔊' },
    flashingLights: { label: 'Bright/Flashing Lights', icon: '💡' },
    denseCrowds: { label: 'Dense Crowds', icon: '👥' },
    strongSmells: { label: 'Strong Odors', icon: '👃' },
};

const ProfileScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const { user, logout } = useAuth();
    const [preferences, setPreferences] = useState({});

    useEffect(() => {
        loadPreferences();
    }, []);

    const loadPreferences = async () => {
        try {
            const storedPrefs = await AsyncStorage.getItem('neuro-nav-preferences');
            if (storedPrefs) {
                setPreferences(JSON.parse(storedPrefs));
            }
        } catch (e) {
            console.error("Failed to load preferences", e);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Image
                        source={{ uri: user?.photoURL || 'https://via.placeholder.com/150' }}
                        style={styles.avatar}
                    />
                    <Text style={[styles.name, { color: colors.text }]}>{user?.displayName || 'Neuro-Nav User'}</Text>
                    <Text style={[styles.email, { color: colors.muted }]}>{user?.email || 'user@example.com'}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Sensory Preferences</Text>
                    <Card style={styles.card} padding="md">
                        {Object.entries(preferences).map(([key, value]) => {
                            if (!value) return null; // Only show what they want to avoid
                            const info = PREF_LABELS[key];
                            return (
                                <View key={key} style={styles.prefRow}>
                                    <Text style={styles.prefIcon}>{info?.icon || '⚠️'}</Text>
                                    <Text style={[styles.prefLabel, { color: colors.text }]}>Avoids {info?.label}</Text>
                                </View>
                            );
                        })}
                        {Object.values(preferences).every(v => !v) && (
                            <Text style={{ color: colors.muted, fontStyle: 'italic' }}>No specific sensitivities set.</Text>
                        )}
                    </Card>
                </View>

                <View style={styles.section}>
                    <Button
                        title="Edit Preferences"
                        variant="outline"
                        onPress={() => navigation.navigate('ProfileSetup')}
                        style={{ marginBottom: spacing.md }}
                    />
                    <Button
                        title="Sign Out"
                        variant="secondary"
                        onPress={logout}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { padding: spacing.lg },
    header: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: spacing.md,
        backgroundColor: '#e0e0e0',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    email: {
        fontSize: 16,
    },
    section: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: spacing.md,
    },
    prefRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    prefIcon: {
        fontSize: 20,
        marginRight: spacing.sm,
    },
    prefLabel: {
        fontSize: 16,
    },
});

export default ProfileScreen;
