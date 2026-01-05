import React, { useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

const GoogleMap = ({
    latitude,
    longitude,
    zoom = 13, // Mapped to rough delta values for Google Maps
    markers = [],
    routeCoordinates = [],
    style
}) => {
    const mapRef = useRef(null);

    // Initial Region
    const initialRegion = {
        latitude: latitude || 37.78825,
        longitude: longitude || -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    useEffect(() => {
        if (mapRef.current) {
            // Animate to new location when props change
            if (latitude && longitude) {
                mapRef.current.animateToRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }, 1000);
            }

            // Fit markers or route if available
            if (routeCoordinates.length > 0) {
                mapRef.current.fitToCoordinates(routeCoordinates, {
                    edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                    animated: true,
                });
            } else if (markers.length > 0) {
                // Extract coordinates from markers
                const markerCoords = markers.map(m => ({
                    latitude: m.latitude,
                    longitude: m.longitude
                }));
                mapRef.current.fitToCoordinates(markerCoords, {
                    edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                    animated: true,
                });
            }
        }
    }, [latitude, longitude, markers, routeCoordinates]);

    return (
        <View style={[styles.container, style]}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={initialRegion}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude
                        }}
                        title={marker.title}
                        description={marker.description}
                    />
                ))}

                {routeCoordinates.length > 0 && (
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeColor="#6200EE"
                        strokeWidth={5}
                    />
                )}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: '#e0e0e0',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default GoogleMap;
