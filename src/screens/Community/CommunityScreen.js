import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useTheme } from '../../context/ThemeContext';

const CommunityScreen = () => {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <WebView
                source={{ uri: 'https://smart-campus-manager.web.app' }}
                style={styles.webview}
                startInLoadingState={true}
                renderLoading={() => (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={colors.primary} />
                    </View>
                )}
                // Enable JavaScript
                javaScriptEnabled={true}
                // Enable DOM storage for Firebase
                domStorageEnabled={true}
                // Allow third-party cookies for Firebase Auth
                thirdPartyCookiesEnabled={true}
                // Enable media playback
                mediaPlaybackRequiresUserAction={false}
                // Bounce effect on scroll
                bounces={true}
                // Allow scrolling
                scrollEnabled={true}
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
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CommunityScreen;
