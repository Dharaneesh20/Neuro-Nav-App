import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius } from '../styles/spacing';

const Button = ({
    title,
    onPress,
    variant = 'primary', // primary, secondary, outline, danger
    size = 'md', // sm, md, lg
    loading = false,
    disabled = false,
    style
}) => {
    const { colors } = useTheme();

    const getBackgroundColor = () => {
        if (disabled) return colors.muted;
        switch (variant) {
            case 'primary': return colors.primary;
            case 'secondary': return colors.secondary;
            case 'danger': return colors.accent;
            case 'outline': return 'transparent';
            case 'glass': return colors.glass;
            case 'neon': return colors.neon;
            default: return colors.primary;
        }
    };

    const getTextColor = () => {
        if (variant === 'outline') return colors.primary;
        if (variant === 'glass') return colors.text;
        if (variant === 'neon') return '#000000'; // Black text on neon green
        return '#FFFFFF'; // Contrast text for filled buttons
    };

    const getBorder = () => {
        if (variant === 'outline') return { borderWidth: 2, borderColor: colors.primary };
        if (variant === 'glass') return { borderWidth: 1, borderColor: colors.glassBorder };
        return {};
    };

    const getSizeStyles = () => {
        switch (size) {
            case 'sm': return { paddingVertical: spacing.xs, paddingHorizontal: spacing.sm };
            case 'lg': return { paddingVertical: spacing.md, paddingHorizontal: spacing.xl };
            default: return { paddingVertical: spacing.sm, paddingHorizontal: spacing.md }; // md
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: getBackgroundColor(), borderRadius: borderRadius.md },
                getBorder(),
                getSizeStyles(),
                style,
                disabled && { opacity: 0.6 }
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <Text style={[styles.text, { color: getTextColor(), fontSize: 16, fontWeight: '600' }]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    text: {
        textAlign: 'center',
    },
});

export default Button;
