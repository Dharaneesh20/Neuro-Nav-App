import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const GoogleMapWebView = ({ latitude, longitude, apiKey, routeCoordinates = [], markers = [], style }) => {
  // Google Maps Embed API HTML
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>
          body { margin: 0; padding: 0; }
          #map { width: 100%; height: 100vh; }
        </style>
        <script>
          function initMap() {
            var location = { lat: ${latitude}, lng: ${longitude} };
            var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 15,
              center: location,
              disableDefaultUI: true,
              zoomControl: true,
            });
            var marker = new google.maps.Marker({
              position: location,
              map: map,
              title: "You are here"
            });

            // Route
            var routeCoords = ${JSON.stringify(routeCoordinates || [])};
            if (routeCoords.length > 0) {
              var path = routeCoords.map(c => ({ lat: c.latitude, lng: c.longitude }));
              var flightPath = new google.maps.Polyline({
                path: path,
                geodesic: true,
                strokeColor: "#6200EE",
                strokeOpacity: 1.0,
                strokeWeight: 4
              });
              flightPath.setMap(map);
              
              // Fit Bounds
              var bounds = new google.maps.LatLngBounds();
              path.forEach(function(coord) {
                bounds.extend(coord);
              });
              map.fitBounds(bounds);
            }
          }
        </script>
        <script async defer
          src="https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap">
        </script>
      </head>
      <body>
        <div id="map"></div>
      </body>
    </html>
  `;

  return (
    <View style={[styles.container, style]}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webview}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4285F4" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default GoogleMapWebView;
