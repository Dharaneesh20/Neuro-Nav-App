import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { spacing } from '../../styles/spacing';
import Button from '../../components/Button';
import Card from '../../components/Card';

const LoginScreen = () => {
    const { loginWithGoogle, loading } = useAuth();
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
                <View style={styles.logoContainer}>
                    <Text style={[styles.logo, { color: colors.primary }]}>Neuro-Nav</Text>
                    <Text style={[styles.tagline, { color: colors.muted }]}>Find your calm in the chaos.</Text>
                </View>

                <Card style={styles.loginCard} padding="lg">
                    <Text style={[styles.welcome, { color: colors.text }]}>Welcome Back</Text>
                    <Text style={[styles.instruction, { color: colors.muted }]}>Sign in to continue your journey</Text>

                    <Button
                        title="Sign in with Google"
                        onPress={loginWithGoogle}
                        loading={loading}
                        style={styles.googleBtn}
                        variant="outline"
                    />
                </Card>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    keyboardView: { flex: 1, justifyContent: 'center', padding: spacing.lg },
    logoContainer: { alignItems: 'center', marginBottom: spacing.xl },
    logo: { fontSize: 42, fontWeight: 'bold', marginBottom: spacing.sm },
    tagline: { fontSize: 18 },
    loginCard: { width: '100%' },
    welcome: { fontSize: 24, fontWeight: 'bold', marginBottom: spacing.sm, textAlign: 'center' },
    instruction: { fontSize: 16, marginBottom: spacing.xl, textAlign: 'center' },
    googleBtn: { marginTop: spacing.md },
});

export default LoginScreen;
