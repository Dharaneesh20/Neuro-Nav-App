import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { spacing } from '../styles/spacing';

const PanicButton = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Panic')}
            activeOpacity={0.8}
        >
            <Text style={styles.text}>SOS</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: spacing.xl,
        right: spacing.lg,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#FF6B6B', // Accent Coral
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        zIndex: 100,
    },
    text: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PanicButton;
