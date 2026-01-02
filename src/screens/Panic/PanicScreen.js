import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useTheme } from '../../context/ThemeContext';
import { spacing, borderRadius } from '../../styles/spacing';
import Button from '../../components/Button';
import Card from '../../components/Card';

const PanicScreen = () => {
    const navigation = useNavigation();
    const { colors } = useTheme();

    // State: 'breathing' | 'locating' | 'found'
    const [phase, setPhase] = useState('breathing');
    const [nearestHaven, setNearestHaven] = useState(null);

    // Animations
    const breatheAnim = useRef(new Animated.Value(1)).current;

    // Phase 1: Breathing Animation
    useEffect(() => {
        if (phase === 'breathing') {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(breatheAnim, { toValue: 1.2, duration: 2000, useNativeDriver: true }),
                    Animated.timing(breatheAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
                ])
            ).start();

            const timer = setTimeout(() => {
                setPhase('locating');
            }, 4000); // 4 seconds breathing
            return () => clearTimeout(timer);
        }
    }, [phase]);

    // Phase 2: Locating
    useEffect(() => {
        if (phase === 'locating') {
            findNearestHaven();
        }
    }, [phase]);

    const findNearestHaven = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission denied', 'Cannot find nearest haven without location.');
                // Fallback or exit
                return;
            }

            // Mock finding logic (simulate API delay)
            setTimeout(() => {
                setNearestHaven({
                    name: "Riverside Park",
                    type: "Park",
                    distance: "0.2 mi",
                    walkTime: "4 min",
                });
                setPhase('found');
            }, 2000);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: phase === 'found' ? colors.background : '#4ECDC4' }]}>
            {phase === 'breathing' && (
                <View style={styles.centerContent}>
                    <Animated.View style={[styles.circle, { transform: [{ scale: breatheAnim }] }]}>
                        <Text style={styles.breatheText}>Breathe In...</Text>
                    </Animated.View>
                </View>
            )}

            {phase === 'locating' && (
                <View style={styles.centerContent}>
                    <Text style={styles.statusText}>Locating nearest safe haven...</Text>
                    <Text style={styles.subText}>Stay calm, we are searching.</Text>
                </View>
            )}

            {phase === 'found' && nearestHaven && (
                <View style={styles.foundContainer}>
                    <Text style={[styles.header, { color: colors.text }]}>Safe Haven Found</Text>

                    <Card style={styles.resultCard} padding="xl">
                        <Text style={styles.havenName}>{nearestHaven.name}</Text>
                        <Text style={styles.havenDetails}>{nearestHaven.type} • {nearestHaven.distance}</Text>
                        <Text style={styles.walkTime}>{nearestHaven.walkTime} walk</Text>
                    </Card>

                    <View style={styles.actions}>
                        <Button title="Navigate Now" size="lg" onPress={() => Alert.alert('Navigating...')} style={{ marginBottom: spacing.md }} />
                        <Button title="I'm feeling better" variant="outline" onPress={() => navigation.goBack()} />
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    circle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    breatheText: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
    statusText: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    subText: { color: 'rgba(255,255,255,0.8)', fontSize: 16 },

    foundContainer: { flex: 1, padding: spacing.xl, justifyContent: 'center' },
    header: { fontSize: 32, fontWeight: 'bold', marginBottom: spacing.xl, textAlign: 'center' },
    resultCard: { alignItems: 'center', marginBottom: spacing.xxl },
    havenName: { fontSize: 28, fontWeight: 'bold', marginBottom: spacing.sm },
    havenDetails: { fontSize: 18, color: '#718096', marginBottom: spacing.md },
    walkTime: { fontSize: 24, color: '#4ECDC4', fontWeight: 'bold' },
    actions: { width: '100%' },
});

export default PanicScreen;
