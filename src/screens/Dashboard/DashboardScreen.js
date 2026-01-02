import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, TouchableOpacity, Image } from 'react-native';
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

    useEffect(() => {
        let isMounted = true;

        (async () => {
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

                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Image
                            source={{ uri: 'https://via.placeholder.com/150' }}
                            style={styles.profileImage}
                        />
                    </TouchableOpacity>
                </View>

                <CalmScoreHeader score={7.2} location={address} />

                <View style={styles.mapContainer}>
                    {loading || !location ? (
                        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
                    ) : (
                        <LeafletMap
                            latitude={location.latitude}
                            longitude={location.longitude}
                            style={styles.map}
                        />
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
