import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ScreenWrapper = ({ children, style }) => {
    const { colors, theme } = useTheme();

    const containerStyle = {
        backgroundColor: colors.background,
        flex: 1,
    };

    return (
        <View style={[containerStyle, style]}>
            <StatusBar
                barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={colors.background}
            />

            {/* Ambient Background Glows */}
            {theme === 'dark' && (
                <>
                    <View style={{
                        position: 'absolute',
                        top: -100,
                        right: -100,
                        width: 300,
                        height: 300,
                        backgroundColor: 'rgba(0, 255, 136, 0.08)',
                        borderRadius: 150,
                    }} />
                    <View style={{
                        position: 'absolute',
                        bottom: -50,
                        left: -50,
                        width: 250,
                        height: 250,
                        backgroundColor: 'rgba(58, 171, 163, 0.05)',
                        borderRadius: 125,
                    }} />
                </>
            )}
            <SafeAreaView style={{ flex: 1 }}>
                {children}
            </SafeAreaView>
        </View>
    );
};

export default ScreenWrapper;
