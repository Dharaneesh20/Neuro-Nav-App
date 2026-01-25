import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius } from '../styles/spacing';

const Card = ({ children, style, onPress, padding = 'md', variant = 'default' }) => {
    const { colors } = useTheme();

    const getPadding = () => {
        return spacing[padding] || spacing.md;
    };

    const getBackgroundStyle = () => {
        if (variant === 'glass') {
            return {
                backgroundColor: colors.glass,
                borderColor: colors.glassBorder,
                borderWidth: 1,
                shadowColor: colors.neon,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 0, // Disable Android elevation for glass
            };
        }
        return {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderWidth: 1,
        };
    };

    const cardStyle = [
        styles.card,
        getBackgroundStyle(),
        {
            padding: getPadding(),
        },
        style
    ];

    if (onPress) {
        return (
            <TouchableOpacity
                style={cardStyle}
                onPress={onPress}
                activeOpacity={0.7}
            >
                {children}
            </TouchableOpacity>
        );
    }

    return (
        <View style={cardStyle}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 2, // Android shadow
    },
});

export default Card;
