import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';

import ReferenceScreen from '../screens/PlaceholderScreen'; // For missing routes
import PanicScreen from '../screens/Panic/PanicScreen';
import SafeHavensScreen from '../screens/SafeHavens/SafeHavensScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import GeminiChatScreen from '../screens/Chat/GeminiChatScreen';

import LandingScreen from '../screens/Landing/LandingScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import ProfileSetupScreen from '../screens/ProfileSetup/ProfileSetupScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import RoutePlanningScreen from '../screens/Routes/RoutePlanningScreen';
import SpotifyScreen from '../screens/Spotify/SpotifyScreen';
import ReportScreen from '../screens/Community/ReportScreen';
import CommunityScreen from '../screens/Community/CommunityScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import HistoryScreen from '../screens/History/HistoryScreen';
import AboutScreen from '../screens/About/AboutScreen';
import { View } from 'react-native';

const Stack = createStackNavigator();

const RootNavigator = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <View style={{ flex: 1, backgroundColor: '#fff' }} />;
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                <>
                    <Stack.Screen name="Dashboard" component={DashboardScreen} />
                    <Stack.Screen name="Panic" component={PanicScreen} />
                    <Stack.Screen name="SafeHavens" component={SafeHavensScreen} />
                    {/* Phase 2 Placeholders */}
                    <Stack.Screen name="Community Report" component={ReportScreen} />
                    <Stack.Screen name="Community" component={CommunityScreen} />
                    <Stack.Screen name="History" component={HistoryScreen} />
                    <Stack.Screen name="Routes" component={RoutePlanningScreen} />
                    <Stack.Screen name="Spotify" component={SpotifyScreen} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                    <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
                    <Stack.Screen name="Chat" component={ChatScreen} />
                    <Stack.Screen name="GeminiChat" component={GeminiChatScreen} />
                    <Stack.Screen name="About" component={AboutScreen} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Landing" component={LandingScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                    <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default RootNavigator;
