import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { spacing, typography } from '../../styles/spacing';
import Button from '../../components/Button';
import Card from '../../components/Card';

const FEATURES = [
    { id: '1', icon: '🧠', title: 'Sensory-Safe Routing', description: 'Avoid loud, bright, or crowded areas.' },
    { id: '2', icon: '📊', title: 'Real-Time Calm Scores', description: 'Live data on noise and crowd levels.' },
    { id: '3', icon: '🌳', title: 'Emergency Safe Havens', description: 'Instantly find quiet places nearby.' },
];

const LandingScreen = () => {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const renderFeatureItem = ({ item }) => (
        <Card style={styles.featureCard} padding="md">
            <Text style={styles.featureIcon}>{item.icon}</Text>
            <Text style={[styles.featureTitle, { color: colors.text }]}>{item.title}</Text>
            <Text style={[styles.featureDesc, { color: colors.muted }]}>{item.description}</Text>
        </Card>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <Text style={[styles.logo, { color: colors.primary }]}>Neuro-Nav</Text>
                <Button
                    title="Login"
                    variant="outline"
                    size="sm"
                    onPress={() => navigation.navigate('Login')}
                />
            </View>

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Animated.View style={[styles.hero, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                    <Text style={[styles.heroTitle, { color: colors.text }]}>
                        Navigate the City with <Text style={{ color: colors.primary }}>Confidence</Text>
                    </Text>
                    <Text style={[styles.heroSubtitle, { color: colors.muted }]}>
                        Sensory-safe routing and real-time calm scores for a stress-free journey.
                    </Text>
                    <View style={styles.heroButtons}>
                        <Button
                            title="Start Journey"
                            onPress={() => navigation.navigate('Onboarding')}
                            style={styles.heroBtn}
                        />
                        <Button
                            title="Learn More"
                            variant="secondary"
                            onPress={() => { }}
                            style={styles.heroBtn}
                        />
                    </View>
                </Animated.View>

                {FEATURES.map(item => (
                    <View key={item.id}>
                        {renderFeatureItem({ item })}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    brand: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.xl,
    },
    hero: {
        marginVertical: spacing.xl,
        alignItems: 'center',
    },
    heroTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: spacing.md,
    },
    heroSubtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: spacing.lg,
        lineHeight: 26,
    },
    heroButtons: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    heroBtn: {
        minWidth: 140,
    },
    featureCard: {
        marginBottom: spacing.md,
        alignItems: 'center',
    },
    featureIcon: {
        fontSize: 32,
        marginBottom: spacing.sm,
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: spacing.xs,
    },
    featureDesc: {
        textAlign: 'center',
        fontSize: 14,
    },
});

export default LandingScreen;
