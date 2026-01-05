import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { spacing } from '../../styles/spacing';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import QuickActionGrid from '../../components/QuickActionGrid';
import SafeHavensPreview from '../../components/SafeHavensPreview';
import CalmScoreHeader from '../../components/CalmScoreHeader';
import PanicButton from '../../components/PanicButton';

import LeafletMap from '../../components/LeafletMap';
import GoogleMapWebView from '../../components/GoogleMapWebView';
import { fetchNearbyPlaces } from '../../services/places';

const DashboardScreen = () => {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState("Locating...");
    const [places, setPlaces] = useState([]);
    const [placesLoading, setPlacesLoading] = useState(true);
    const insets = useSafeAreaInsets();

    // Map Settings State
    const [mapProvider, setMapProvider] = useState('leaflet'); // 'leaflet' or 'google'
    const [googleApiKey, setGoogleApiKey] = useState('');
    const [showMapSettings, setShowMapSettings] = useState(false);
    const [tempApiKey, setTempApiKey] = useState('');

    useEffect(() => {
        loadMapSettings();
    }, []);

    const loadMapSettings = async () => {
        try {
            const savedProvider = await AsyncStorage.getItem('mapProvider');
            const savedKey = await AsyncStorage.getItem('googleMapsApiKey');
            if (savedProvider) setMapProvider(savedProvider);
            if (savedKey) {
                setGoogleApiKey(savedKey);
                setTempApiKey(savedKey);
            }
        } catch (e) {
            console.log('Failed to load map settings');
        }
    };

    const saveGoogleMapsKey = async () => {
        if (!tempApiKey.trim()) {
            Alert.alert('Error', 'Please enter a valid API Key');
            return;
        }
        try {
            await AsyncStorage.setItem('googleMapsApiKey', tempApiKey.trim());
            await AsyncStorage.setItem('mapProvider', 'google');
            setGoogleApiKey(tempApiKey.trim());
            setMapProvider('google');
            setShowMapSettings(false);
            Alert.alert('Success', 'Switched to Google Maps!');
        } catch (e) {
            Alert.alert('Error', 'Failed to save settings');
        }
    };

    const switchToLeaflet = async () => {
        try {
            await AsyncStorage.setItem('mapProvider', 'leaflet');
            setMapProvider('leaflet');
            setShowMapSettings(false);
            Alert.alert('Success', 'Switched to Open Source Maps (Leaflet)!');
        } catch (e) {
            Alert.alert('Error', 'Failed to save settings');
        }
    };

    useEffect(() => {
        let isMounted = true;

        (async () => {
            // ... existing location initialization ...
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (!isMounted) return;

                if (status !== 'granted') {
                    Alert.alert('Permission denied', 'Allow location access to find safe havens.');
                    setLoading(false);
                    setPlacesLoading(false);
                    return;
                }

                let currentLocation = await Location.getCurrentPositionAsync({});
                if (!isMounted) return;

                const { latitude, longitude } = currentLocation.coords;

                setLocation({
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });

                // Fetch Nearby Safe Places (Async - doesn't block UI)
                fetchNearbyPlaces(latitude, longitude).then(data => {
                    if (isMounted) {
                        setPlaces(data);
                        setPlacesLoading(false);
                    }
                });

                // Reverse Geocode
                let addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });
                if (isMounted && addressResponse.length > 0) {
                    let addr = addressResponse[0];
                    let locationParts = [];
                    if (addr.street) locationParts.push(addr.street);
                    if (addr.city) locationParts.push(addr.city);
                    setAddress(locationParts.join(', ') || "Unknown Location");
                }

            } catch (error) {
                console.warn("Location Error:", error);
                if (isMounted) {
                    setAddress("Unavailable");
                    setPlacesLoading(false);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        })();

        return () => { isMounted = false; };
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent} removeClippedSubviews={true}>
                {/* APP HEADER */}
                <View style={[styles.header, { borderBottomColor: colors.border, paddingTop: insets.top + 10 }]}>
                    <TouchableOpacity onPress={() => Alert.alert('Menu', 'Open Drawer Navigation')}>
                        <Ionicons name="menu" size={28} color={colors.text} />
                    </TouchableOpacity>

                    <Text style={[styles.appTitle, { color: colors.text }]}>Neuro-Nav</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => setShowMapSettings(true)} style={{ marginRight: 15 }}>
                            <Ionicons name="map-outline" size={28} color={colors.text} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={{ marginRight: 15 }}>
                            <Ionicons name="chatbubbles-outline" size={28} color={colors.text} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                            <Image
                                source={{ uri: 'https://via.placeholder.com/150' }}
                                style={styles.profileImage}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Map Settings Modal */}
                <Modal
                    visible={showMapSettings}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setShowMapSettings(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
                            <Text style={[styles.modalTitle, { color: colors.text }]}>Map Settings</Text>

                            <Text style={[styles.modalSubtitle, { color: colors.text }]}>Google Maps API Key</Text>
                            <TextInput
                                style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                                placeholder="Paste your API Key here"
                                placeholderTextColor={colors.muted}
                                value={tempApiKey}
                                onChangeText={setTempApiKey}
                            />

                            <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.primary }]} onPress={saveGoogleMapsKey}>
                                <Text style={styles.buttonText}>Save & Use Google Maps</Text>
                            </TouchableOpacity>

                            <View style={styles.divider} />

                            <TouchableOpacity style={[styles.outlineButton, { borderColor: colors.primary }]} onPress={switchToLeaflet}>
                                <Text style={[styles.outlineButtonText, { color: colors.primary }]}>Go Open Source (Leaflet)</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.closeButton} onPress={() => setShowMapSettings(false)}>
                                <Text style={{ color: colors.muted }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <CalmScoreHeader score={7.2} location={address} />

                <View style={styles.mapContainer}>
                    {loading || !location ? (
                        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
                    ) : (
                        mapProvider === 'google' && googleApiKey ? (
                            <GoogleMapWebView
                                latitude={location.latitude}
                                longitude={location.longitude}
                                apiKey={googleApiKey}
                                style={styles.map}
                            />
                        ) : (
                            <LeafletMap
                                latitude={location.latitude}
                                longitude={location.longitude}
                                style={styles.map}
                            />
                        )
                    )}
                    <View style={styles.panicContainer}>
                        <PanicButton />
                    </View>
                </View>

                <View style={{ width: '100%', marginTop: 20 }}>
                    <QuickActionGrid />
                    <SafeHavensPreview places={places} loading={placesLoading} />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { paddingBottom: 80 },
    mapContainer: {
        height: 300,
        marginHorizontal: spacing.md,
        marginBottom: spacing.md,
        marginTop: spacing.md,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        position: 'relative',
        backgroundColor: '#f5f5f5' // placeholder bg
    },
    map: {
        width: '100%',
        height: '100%',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    panicContainer: {
        position: 'absolute',
        bottom: -10,
        right: -10,
        zIndex: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        // paddingTop handled dynamically
        marginBottom: spacing.sm,
    },
    appTitle: {
        fontSize: 24, // Slightly smaller to fit with icons
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    profileImage: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#ccc',
    },
    text: { fontSize: 24, fontWeight: 'bold' },
});

export default DashboardScreen;
