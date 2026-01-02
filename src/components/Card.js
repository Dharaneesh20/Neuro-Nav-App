import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius } from '../styles/spacing';

const Card = ({ children, style, onPress, padding = 'md' }) => {
    const { colors } = useTheme();

    const getPadding = () => {
        return spacing[padding] || spacing.md;
    };

    const cardStyle = [
        styles.card,
        {
            backgroundColor: colors.card,
            borderColor: colors.border,
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
