import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius } from '../styles/spacing';

const Input = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    error,
    keyboardType = 'default',
    autoCapitalize = 'none',
    style
}) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, style]}>
            {label && (
                <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
            )}
            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: colors.card,
                        color: colors.text,
                        borderColor: error ? colors.accent : colors.border,
                    }
                ]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.muted}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
            />
            {error && (
                <Text style={[styles.error, { color: colors.accent }]}>{error}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.md,
        width: '100%',
    },
    label: {
        marginBottom: spacing.xs,
        fontSize: 14,
        fontWeight: '500',
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.md,
        fontSize: 16,
    },
    error: {
        marginTop: spacing.xs,
        fontSize: 12,
    },
});

export default Input;
