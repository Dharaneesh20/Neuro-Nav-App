import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themeColors } from '../styles/colors';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const systemScheme = useColorScheme();
    const [theme, setTheme] = useState(systemScheme || 'dark');

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem('neuro-nav-theme');
                if (savedTheme) {
                    setTheme(savedTheme);
                } else if (systemScheme) {
                    setTheme(systemScheme);
                }
            } catch (error) {
                console.error('Failed to load theme:', error);
            }
        };
        loadTheme();
    }, [systemScheme]);

    const toggleTheme = async () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        try {
            await AsyncStorage.setItem('neuro-nav-theme', newTheme);
        } catch (error) {
            console.error('Failed to save theme:', error);
        }
    };

    const colors = theme === 'dark' ? themeColors.dark : themeColors.light;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
            {children}
        </ThemeContext.Provider>
    );
};
