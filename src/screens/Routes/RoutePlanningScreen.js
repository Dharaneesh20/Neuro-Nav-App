import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Alert, Keyboard, Linking } from 'react-native';
import LeafletMap from '../../components/LeafletMap';
import GoogleMapWebView from '../../components/GoogleMapWebView';
import { useTheme } from '../../context/ThemeContext';
import { spacing } from '../../styles/spacing';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { geocodeAddress, getSafeRoute } from '../../services/osrm';

const RoutePlanningScreen = () => {
    const { colors } = useTheme();
    const mapRef = useRef(null);
    const [startQuery, setStartQuery] = useState('');
    const [endQuery, setEndQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [routeData, setRouteData] = useState(null);
    const [markers, setMarkers] = useState({ start: null, end: null });
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const [mapProvider, setMapProvider] = useState('leaflet');
    const [googleApiKey, setGoogleApiKey] = useState('');

    useEffect(() => {
        loadMapSettings();
    }, []);

    const loadMapSettings = async () => {
        try {
            const savedProvider = await AsyncStorage.getItem('mapProvider');
            const savedKey = await AsyncStorage.getItem('googleMapsApiKey');
            if (savedProvider) setMapProvider(savedProvider);
            if (savedKey) setGoogleApiKey(savedKey);
        } catch (e) {
            console.log('Failed to load map settings');
        }
    };

    const handlePlanRoute = async () => {
        Keyboard.dismiss();
        setLoading(true);
        setRouteData(null);

        try {
            // 1. Determine Start Location
            let startLoc = null;
            if (!startQuery || startQuery.trim().toLowerCase() === 'current location') {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status === 'granted') {
                    const loc = await Location.getCurrentPositionAsync({});
                    startLoc = {
                        latitude: loc.coords.latitude,
                        longitude: loc.coords.longitude,
                        name: "Current Location"
                    };
                }
            } else {
                startLoc = await geocodeAddress(startQuery);
            }

            // 2. Determine End Location
            if (!endQuery) {
                Alert.alert("Error", "Please enter a destination.");
                setLoading(false);
                return;
            }
            const endLoc = await geocodeAddress(endQuery);

            if (!startLoc || !endLoc) {
                Alert.alert("Location Not Found", "Could not find one of the locations. Try a more specific address.");
                setLoading(false);
                return;
            }

            setMarkers({ start: startLoc, end: endLoc });

            // 3. Get Route from OSRM
            const route = await getSafeRoute(startLoc, endLoc);

            if (route) {
                setRouteData(route);

                // Save to History
                try {
                    const newTrip = {
                        start: startLoc.name || startQuery || "Current Location",
                        destination: endLoc.name || endQuery,
                        distance: route.distance,
                        quietScore: route.quietScore,
                        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    };
                    const existingHistory = await AsyncStorage.getItem('trip_history');
                    const history = existingHistory ? JSON.parse(existingHistory) : [];
                    history.push(newTrip);
                    await AsyncStorage.setItem('trip_history', JSON.stringify(history));
                } catch (e) {
                    console.error("Failed to save history", e);
                }

                // Auto-fit is handled inside LeafletMap via routeCoordinates prop update
            } else {
                Alert.alert("Route Error", "Could not calculate a route between these points.");
            }

        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Something went wrong while planning.");
        } finally {
            setLoading(false);
        }
    };

    const openGoogleMaps = () => {
        if (markers.start && markers.end) {
            const url = `https://www.google.com/maps/dir/?api=1&origin=${markers.start.latitude},${markers.start.longitude}&destination=${markers.end.latitude},${markers.end.longitude}&travelmode=walking`;
            Linking.openURL(url);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Input Overlay */}
            <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.title, { color: colors.text }]}>Plan Safe Route</Text>

                <View style={[styles.inputRow, { backgroundColor: colors.background }]}>
                    <Ionicons name="location-outline" size={20} color={colors.primary} />
                    <TextInput
                        style={[styles.input, { color: colors.text }]}
                        placeholder="Start (Default: Current Location)"
                        placeholderTextColor={colors.muted}
                        value={startQuery}
                        onChangeText={setStartQuery}
                    />
                </View>

                <View style={[styles.inputRow, { backgroundColor: colors.background }]}>
                    <Ionicons name="flag-outline" size={20} color={colors.primary} />
                    <TextInput
                        style={[styles.input, { color: colors.text }]}
                        placeholder="Destination (e.g. Central Park)"
                        placeholderTextColor={colors.muted}
                        value={endQuery}
                        onChangeText={setEndQuery}
                    />
                </View>

                <Button
                    title={loading ? "Calculating Quiet Route..." : "Find Quietest Route"}
                    onPress={handlePlanRoute}
                    disabled={loading}
                    style={{ marginTop: spacing.sm }}
                />
            </View>

            {/* Results Overlay */}
            {routeData && (
                <View style={styles.resultContainer}>
                    <Card style={{ backgroundColor: colors.card }}>
                        <View style={styles.resultHeader}>
                            <View style={styles.statBox}>
                                <Text style={[styles.resultLabel, { color: colors.muted }]}>Distance</Text>
                                <Text style={[styles.resultValue, { color: colors.text }]}>{routeData.distance}</Text>
                            </View>
                            <View style={styles.statBox}>
                                <Text style={[styles.resultLabel, { color: colors.muted }]}>Quiet Score</Text>
                                <Text style={[styles.resultValue, { color: colors.success, fontSize: 24 }]}>{routeData.quietScore}</Text>
                            </View>
                            <View style={styles.statBox}>
                                <Text style={[styles.resultLabel, { color: colors.muted }]}>Acoustics</Text>
                                <Text style={[styles.resultValue, { color: colors.text }]}>{routeData.acoustics}</Text>
                            </View>
                        </View>

                        <Button
                            title="Start Navigation (Google Maps)"
                            variant="secondary"
                            onPress={openGoogleMaps}
                            style={{ marginTop: spacing.md }}
                            icon={<Ionicons name="navigate-circle" size={20} color="#fff" style={{ marginRight: 8 }} />}
                        />
                    </Card>
                </View>
            )}

            {/* Map Area */}
            {/* Map Area */}
            {mapProvider === 'google' && googleApiKey ? (
                <GoogleMapWebView
                    latitude={region.latitude}
                    longitude={region.longitude}
                    apiKey={googleApiKey}
                    style={styles.map}
                    markers={[
                        markers.start && { ...markers.start, title: 'Start' },
                        markers.end && { ...markers.end, title: 'Destination' }
                    ].filter(Boolean)}
                    routeCoordinates={routeData?.coordinates}
                />
            ) : (
                <LeafletMap
                    latitude={region.latitude}
                    longitude={region.longitude}
                    style={styles.map}
                    markers={[
                        markers.start && { ...markers.start, title: 'Start' },
                        markers.end && { ...markers.end, title: 'Destination' }
                    ].filter(Boolean)}
                    routeCoordinates={routeData?.coordinates}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { width: '100%', height: '100%' },
    inputContainer: {
        position: 'absolute',
        top: 60,
        left: 20,
        right: 20,
        padding: spacing.md,
        borderRadius: 16,
        zIndex: 10,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    resultContainer: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
        zIndex: 10,
    },
    resultHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statBox: {
        alignItems: 'center',
    },
    resultLabel: {
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    resultValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: spacing.md,
        textAlign: 'center',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: 8,
        marginBottom: spacing.sm,
    },
    input: {
        flex: 1,
        padding: spacing.md,
        fontSize: 16,
    },
});

export default RoutePlanningScreen;
