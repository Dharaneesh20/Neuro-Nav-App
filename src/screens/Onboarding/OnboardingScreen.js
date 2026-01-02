import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { spacing } from '../../styles/spacing';
import Button from '../../components/Button';
import Card from '../../components/Card';

const STEPS = [
    {
        id: 0,
        icon: '🧠',
        title: 'Understanding Your Needs',
        message: 'Neuro-Nav helps you avoid sensory overload by finding quieter, less crowded routes tailored to you.',
    },
    {
        id: 1,
        icon: '🗺️',
        title: 'How It Works',
        message: 'We use real-time data to calculate "Calm Scores" for every route, integrating noise, lighting, and crowd levels.',
    },
    {
        id: 2,
        icon: '🛡️',
        title: 'Your Privacy Matters',
        message: 'Your sensory data is stored locally on your device. You are in control of what you share with the community.',
    },
];

const { width } = Dimensions.get('window');

const OnboardingScreen = () => {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const [currentStep, setCurrentStep] = useState(0);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Animate on step change
    useEffect(() => {
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [currentStep]);

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            navigation.navigate('ProfileSetup');
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const stepData = STEPS[currentStep];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                {STEPS.map((step, index) => (
                    <View
                        key={step.id}
                        style={[
                            styles.dot,
                            {
                                backgroundColor: index <= currentStep ? colors.primary : colors.border,
                                width: index === currentStep ? 24 : 8
                            }
                        ]}
                    />
                ))}
            </View>

            <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                <Card style={styles.card} padding="xl">
                    <Text style={styles.icon}>{stepData.icon}</Text>
                    <Text style={[styles.title, { color: colors.text }]}>{stepData.title}</Text>
                    <Text style={[styles.message, { color: colors.muted }]}>{stepData.message}</Text>
                </Card>
            </Animated.View>

            <View style={styles.footer}>
                <Button
                    title="Back"
                    variant="outline"
                    onPress={handleBack}
                    disabled={currentStep === 0}
                    style={styles.navButton}
                />
                <Button
                    title={currentStep === STEPS.length - 1 ? "Create Profile" : "Next"}
                    onPress={handleNext}
                    style={styles.navButton}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: spacing.lg,
        paddingTop: spacing.xxl
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: spacing.xl,
    },
    dot: {
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        alignItems: 'center',
        minHeight: 300,
        justifyContent: 'center',
    },
    icon: {
        fontSize: 64,
        marginBottom: spacing.lg,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: spacing.md,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing.xl,
        gap: spacing.md,
    },
    navButton: {
        flex: 1,
    },
});

export default OnboardingScreen;
