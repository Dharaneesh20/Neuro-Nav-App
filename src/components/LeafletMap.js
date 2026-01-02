import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const LeafletMap = ({
    latitude,
    longitude,
    zoom = 13,
    markers = [],
    routeCoordinates = [],
    onMapReady,
    style
}) => {
    const webViewRef = useRef(null);

    // Initial HTML content with Leaflet loaded from CDN
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
            <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
            <style>
                body { margin: 0; padding: 0; }
                #map { height: 100vh; width: 100vw; }
                .leaflet-control-attribution { font-size: 8px; }
            </style>
        </head>
        <body>
            <div id="map"></div>
            <script>
                var map = L.map('map', { zoomControl: false }).setView([${latitude}, ${longitude}], ${zoom});
                
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: 'OpenStreetMap'
                }).addTo(map);

                const markers = {};
                let routeLine = null;

                // Function to update map state
                window.updateMap = (data) => {
                    const { lat, lng, markers: newMarkers, route } = JSON.parse(data);
                    
                    if (lat && lng) {
                        map.panTo([lat, lng]);
                    }

                    // Clear existing markers
                    Object.values(markers).forEach(m => map.removeLayer(m));
                    
                    // Add new markers
                    if (newMarkers) {
                        newMarkers.forEach(m => {
                            const marker = L.marker([m.latitude, m.longitude]).addTo(map);
                            if (m.title) marker.bindPopup(m.title);
                            markers[m.id || Math.random()] = marker;
                        });
                    }

                    // Draw Route
                    if (routeLine) map.removeLayer(routeLine);
                    if (route && route.length > 0) {
                        const latLngs = route.map(c => [c.latitude, c.longitude]);
                        routeLine = L.polyline(latLngs, {color: '#6200EE', weight: 5}).addTo(map);
                        map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });
                    }
                }
            </script>
        </body>
        </html>
    `;

    // Effect to update map when props change
    useEffect(() => {
        if (webViewRef.current) {
            const data = JSON.stringify({
                lat: latitude,
                lng: longitude,
                zoom,
                markers,
                route: routeCoordinates
            });
            webViewRef.current.injectJavaScript(`window.updateMap('${data}'); true;`);
        }
    }, [latitude, longitude, markers, routeCoordinates]);

    return (
        <View style={[styles.container, style]}>
            <WebView
                ref={webViewRef}
                originWhitelist={['*']}
                source={{ html: htmlContent }}
                style={{ flex: 1 }}
                scrollEnabled={false}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                renderLoading={() => <ActivityIndicator size="large" color="#6200EE" style={styles.loader} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: '#e0e0e0',
    },
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -18,
        marginTop: -18,
    }
});

export default LeafletMap;
