import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, ScrollView, Image, Switch,
    TouchableOpacity, Alert, ActivityIndicator
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { spacing } from '../../styles/spacing';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { Ionicons } from '@expo/vector-icons';
import {
    getPreferences,
    updatePreference,
    resetPreferences,
    subscribeToPreferences
} from '../../services/firebase/preferencesService';

const ProfileScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const { user, logout } = useAuth();
    const [preferences, setPreferences] = useState({
        mapProvider: 'google',
        theme: 'light',
        notifications: true,
        defaultZoom: 15,
        voiceGuidance: true,
        autoSaveRoutes: true,
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadPreferences();

        // Subscribe to real-time preference updates
        const unsubscribe = subscribeToPreferences((prefs) => {
            setPreferences(prefs);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const loadPreferences = async () => {
        try {
            setLoading(true);
            const prefs = await getPreferences();
            setPreferences(prefs);
        } catch (error) {
            console.error('Failed to load preferences:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePreferenceChange = async (key, value) => {
        try {
            setSaving(true);
            // Optimistic update
            setPreferences(prev => ({ ...prev, [key]: value }));

            // Save to Firestore
            await updatePreference(key, value);
        } catch (error) {
            console.error('Failed to update preference:', error);
            // Revert on error
            loadPreferences();
            Alert.alert('Error', 'Failed to save preference');
        } finally {
            setSaving(false);
        }
    };

    const handleResetPreferences = () => {
        Alert.alert(
            'Reset Preferences',
            'Are you sure you want to reset all preferences to default values?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            setSaving(true);
                            await resetPreferences();
                            await loadPreferences();
                            Alert.alert('Success', 'Preferences reset to defaults');
                        } catch (error) {
                            Alert.alert('Error', 'Failed to reset preferences');
                        } finally {
                            setSaving(false);
                        }
                    }
                }
            ]
        );
    };

    const handleSignOut = () => {
        Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Sign Out',
                    style: 'destructive',
                    onPress: logout
                }
            ]
        );
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.centered, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={[styles.loadingText, { color: colors.muted }]}>Loading preferences...</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* User Header */}
                <View style={styles.header}>
                    <View style={[styles.avatarContainer, { backgroundColor: colors.primary + '20' }]}>
                        {user?.photoURL ? (
                            <Image source={{ uri: user.photoURL }} style={styles.avatar} />
                        ) : (
                            <Ionicons name="person" size={50} color={colors.primary} />
                        )}
                    </View>
                    <Text style={[styles.name, { color: colors.text }]}>
                        {user?.displayName || 'Neuro-Nav User'}
                    </Text>
                    <Text style={[styles.email, { color: colors.muted }]}>
                        {user?.email || 'user@neuronav.com'}
                    </Text>
                </View>

                {/* Map Settings */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Map Settings</Text>
                    <Card style={[styles.card, { backgroundColor: colors.card }]} padding="none">
                        <TouchableOpacity
                            style={[styles.settingRow, { borderBottomColor: colors.border }]}
                            onPress={() => {
                                const providers = ['google', 'leaflet', 'osm'];
                                const currentIndex = providers.indexOf(preferences.mapProvider);
                                const nextProvider = providers[(currentIndex + 1) % providers.length];
                                handlePreferenceChange('mapProvider', nextProvider);
                            }}
                        >
                            <View style={styles.settingLeft}>
                                <Ionicons name="map-outline" size={24} color={colors.primary} />
                                <View style={styles.settingText}>
                                    <Text style={[styles.settingLabel, { color: colors.text }]}>Map Provider</Text>
                                    <Text style={[styles.settingValue, { color: colors.muted }]}>
                                        {preferences.mapProvider === 'google' ? 'Google Maps' :
                                            preferences.mapProvider === 'leaflet' ? 'Leaflet (OSM)' : 'OpenStreetMap'}
                                    </Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color={colors.muted} />
                        </TouchableOpacity>

                        <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
                            <View style={styles.settingLeft}>
                                <Ionicons name="search-outline" size={24} color={colors.primary} />
                                <View style={styles.settingText}>
                                    <Text style={[styles.settingLabel, { color: colors.text }]}>Default Zoom</Text>
                                    <Text style={[styles.settingValue, { color: colors.muted }]}>
                                        Level {preferences.defaultZoom}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.settingRight}>
                                <TouchableOpacity
                                    onPress={() => handlePreferenceChange('defaultZoom', Math.max(10, preferences.defaultZoom - 1))}
                                    style={styles.zoomButton}
                                >
                                    <Ionicons name="remove" size={20} color={colors.text} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handlePreferenceChange('defaultZoom', Math.min(20, preferences.defaultZoom + 1))}
                                    style={styles.zoomButton}
                                >
                                    <Ionicons name="add" size={20} color={colors.text} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Card>
                </View>

                {/* App Preferences */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>App Preferences</Text>
                    <Card style={[styles.card, { backgroundColor: colors.card }]} padding="none">
                        <View style={[styles.settingRow, { borderBottomColor: colors.border }]}>
                            <View style={styles.settingLeft}>
                                <Ionicons name="contrast-outline" size={24} color={colors.primary} />
                                <View style={styles.settingText}>
                                    <Text style={[styles.settingLabel, { color: colors.text }]}>Theme</Text>
                                    <Text style={[styles.settingValue, { color: colors.muted }]}>
                                        {preferences.theme === 'light' ? 'Light' :
                                            preferences.theme === 'dark' ? 'Dark' : 'Auto'}
                                    </Text>
                                </View>
                            </View>
                            <Switch
                                value={preferences.theme === 'dark'}
                                onValueChange={(value) => handlePreferenceChange('theme', value ? 'dark' : 'light')}
                                trackColor={{ false: colors.border, true: colors.primary }}
                                thumbColor="#fff"
                            />
                        </View>

                        <View style={[styles.settingRow, { borderBottomColor: colors.border }]}>
                            <View style={styles.settingLeft}>
                                <Ionicons name="notifications-outline" size={24} color={colors.primary} />
                                <Text style={[styles.settingLabel, { color: colors.text }]}>Notifications</Text>
                            </View>
                            <Switch
                                value={preferences.notifications}
                                onValueChange={(value) => handlePreferenceChange('notifications', value)}
                                trackColor={{ false: colors.border, true: colors.primary }}
                                thumbColor="#fff"
                            />
                        </View>

                        <View style={[styles.settingRow, { borderBottomColor: colors.border }]}>
                            <View style={styles.settingLeft}>
                                <Ionicons name="volume-high-outline" size={24} color={colors.primary} />
                                <Text style={[styles.settingLabel, { color: colors.text }]}>Voice Guidance</Text>
                            </View>
                            <Switch
                                value={preferences.voiceGuidance}
                                onValueChange={(value) => handlePreferenceChange('voiceGuidance', value)}
                                trackColor={{ false: colors.border, true: colors.primary }}
                                thumbColor="#fff"
                            />
                        </View>

                        <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
                            <View style={styles.settingLeft}>
                                <Ionicons name="save-outline" size={24} color={colors.primary} />
                                <Text style={[styles.settingLabel, { color: colors.text }]}>Auto-Save Routes</Text>
                            </View>
                            <Switch
                                value={preferences.autoSaveRoutes}
                                onValueChange={(value) => handlePreferenceChange('autoSaveRoutes', value)}
                                trackColor={{ false: colors.border, true: colors.primary }}
                                thumbColor="#fff"
                            />
                        </View>
                    </Card>
                </View>

                {/* Actions */}
                <View style={styles.section}>
                    <Button
                        title="Reset to Defaults"
                        variant="outline"
                        onPress={handleResetPreferences}
                        disabled={saving}
                        style={{ marginBottom: spacing.md }}
                        icon={<Ionicons name="refresh" size={20} color={colors.primary} style={{ marginRight: 8 }} />}
                    />
                    <Button
                        title="Clear Trip History"
                        variant="outline"
                        onPress={() => navigation.navigate('History')}
                        style={{ marginBottom: spacing.md }}
                        icon={<Ionicons name="trash-outline" size={20} color={colors.error} style={{ marginRight: 8 }} />}
                    />
                    <Button
                        title="Sign Out"
                        variant="secondary"
                        onPress={handleSignOut}
                        icon={<Ionicons name="log-out-outline" size={20} color="#fff" style={{ marginRight: 8 }} />}
                    />
                </View>

                {saving && (
                    <View style={styles.savingIndicator}>
                        <ActivityIndicator size="small" color={colors.primary} />
                        <Text style={[styles.savingText, { color: colors.muted }]}>Saving...</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    centered: { justifyContent: 'center', alignItems: 'center' },
    scrollContent: { padding: spacing.lg, paddingBottom: spacing.xl * 2 },
    loadingText: { marginTop: spacing.md, fontSize: 16 },

    header: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
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
    card: {
        overflow: 'hidden',
    },

    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.md,
        borderBottomWidth: 1,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingText: {
        marginLeft: spacing.md,
        flex: 1,
    },
    settingLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    settingValue: {
        fontSize: 14,
        marginTop: 2,
    },
    settingRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    zoomButton: {
        padding: spacing.xs,
        marginLeft: spacing.sm,
    },

    savingIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.md,
    },
    savingText: {
        marginLeft: spacing.sm,
        fontSize: 14,
    },
});

export default ProfileScreen;
