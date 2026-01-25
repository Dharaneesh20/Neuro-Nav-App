import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Alert
} from 'react-native';
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
    const { loginWithGoogle, loading, error } = useAuth();
    const [isSigningIn, setIsSigningIn] = useState(false);

    const handleGoogleSignIn = async () => {
        try {
            setIsSigningIn(true);
            await loginWithGoogle();
            // Navigation will be handled by auth state change
        } catch (error) {
            Alert.alert(
                'Sign In Failed',
                error.message || 'Please try again later',
                [{ text: 'OK' }]
            );
        } finally {
            setIsSigningIn(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* App Logo/Icon */}
                <View style={styles.logoContainer}>
                    <Text style={styles.logo}>🧠</Text>
                    <Text style={styles.appName}>Neuro-Nav</Text>
                    <Text style={styles.tagline}>Smart Navigation Assistant</Text>
                </View>

                {/* Welcome Text */}
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcomeTitle}>Welcome!</Text>
                    <Text style={styles.welcomeSubtitle}>
                        Sign in to sync your routes and preferences across all your devices
                    </Text>
                </View>

                {/* Google Sign-In Button */}
                <TouchableOpacity
                    style={styles.googleButton}
                    onPress={handleGoogleSignIn}
                    disabled={isSigningIn || loading}
                >
                    {isSigningIn || loading ? (
                        <ActivityIndicator color="#fff" size="small" />
                    ) : (
                        <>
                            <Image
                                source={{ uri: 'https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png' }}
                                style={styles.googleIcon}
                            />
                            <Text style={styles.googleButtonText}>Sign in with Google</Text>
                        </>
                    )}
                </TouchableOpacity>

                {/* Error Message */}
                {error && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                )}

                {/* Features List */}
                <View style={styles.featuresContainer}>
                    <Text style={styles.featuresTitle}>Why sign in?</Text>
                    <View style={styles.feature}>
                        <Text style={styles.featureIcon}>🔄</Text>
                        <Text style={styles.featureText}>Sync routes across devices</Text>
                    </View>
                    <View style={styles.feature}>
                        <Text style={styles.featureIcon}>⚙️</Text>
                        <Text style={styles.featureText}>Save your preferences</Text>
                    </View>
                    <View style={styles.feature}>
                        <Text style={styles.featureIcon}>👥</Text>
                        <Text style={styles.featureText}>Join the community</Text>
                    </View>
                    <View style={styles.feature}>
                        <Text style={styles.featureIcon}>📍</Text>
                        <Text style={styles.featureText}>Access recent destinations</Text>
                    </View>
                </View>

                {/* Skip Button */}
                <TouchableOpacity
                    style={styles.skipButton}
                    onPress={() => navigation.replace('Main')}
                >
                    <Text style={styles.skipText}>Skip for now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 48,
    },
    logo: {
        fontSize: 80,
        marginBottom: 16,
    },
    appName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    tagline: {
        fontSize: 16,
        color: '#666',
    },
    welcomeContainer: {
        marginBottom: 32,
    },
    welcomeTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    welcomeSubtitle: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4285F4',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    googleIcon: {
        width: 24,
        height: 24,
        marginRight: 12,
        backgroundColor: '#fff',
        borderRadius: 2,
    },
    googleButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    errorContainer: {
        backgroundColor: '#ffebee',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    errorText: {
        color: '#c62828',
        fontSize: 14,
        textAlign: 'center',
    },
    featuresContainer: {
        marginTop: 32,
        marginBottom: 24,
    },
    featuresTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 16,
    },
    feature: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    featureIcon: {
        fontSize: 24,
        marginRight: 12,
    },
    featureText: {
        fontSize: 16,
        color: '#444',
    },
    skipButton: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    skipText: {
        fontSize: 16,
        color: '#4285F4',
        fontWeight: '500',
    },
});

export default LoginScreen;
