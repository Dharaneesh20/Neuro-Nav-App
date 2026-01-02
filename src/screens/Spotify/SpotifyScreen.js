import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useTheme } from '../../context/ThemeContext';
import { spacing } from '../../styles/spacing';

const SpotifyScreen = () => {
    const { colors } = useTheme();
    const [isLoading, setIsLoading] = useState(true);

    // Using a Spotify Embed URL for better mobile display
    // Note: Spotify embeds often require user interaction to play due to browser policies
    const spotifyUrl = 'https://open.spotify.com/embed/playlist/37i9dQZF1DWZqd5JICZI0u?utm_source=generator';

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {isLoading && (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            )}
            <WebView
                source={{ uri: spotifyUrl }}
                style={styles.webview}
                onLoadEnd={() => setIsLoading(false)}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    loader: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
});

export default SpotifyScreen;
