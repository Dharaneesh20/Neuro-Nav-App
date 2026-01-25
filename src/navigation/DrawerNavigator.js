import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import HistoryScreen from '../screens/History/HistoryScreen';
import SafeHavensScreen from '../screens/SafeHavens/SafeHavensScreen';
import RoutePlanningScreen from '../screens/Routes/RoutePlanningScreen';
import ReportScreen from '../screens/Community/ReportScreen';
import CommunityScreen from '../screens/Community/CommunityScreen';
import SpotifyScreen from '../screens/Spotify/SpotifyScreen';
import PanicScreen from '../screens/Panic/PanicScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    const { colors } = useTheme();

    return (
        <Drawer.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                drawerActiveTintColor: colors.primary,
                drawerInactiveTintColor: colors.text,
                drawerStyle: {
                    backgroundColor: colors.background,
                    width: 280,
                },
                drawerLabelStyle: {
                    marginLeft: -20,
                    fontSize: 16,
                },
            })}
        >
            <Drawer.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    drawerIcon: ({ color }) => <Ionicons name="person-outline" size={22} color={color} />
                }}
            />
            <Drawer.Screen
                name="History"
                component={HistoryScreen}
                options={{
                    drawerIcon: ({ color }) => <Ionicons name="time-outline" size={22} color={color} />
                }}
            />
            <Drawer.Screen
                name="Safe Havens"
                component={SafeHavensScreen}
                options={{
                    drawerIcon: ({ color }) => <Ionicons name="cafe-outline" size={22} color={color} />
                }}
            />
            <Drawer.Screen
                name="Plan Trip"
                component={RoutePlanningScreen}
                options={{
                    drawerIcon: ({ color }) => <Ionicons name="map-outline" size={22} color={color} />
                }}
            />
            <Drawer.Screen
                name="Community Report"
                component={ReportScreen}
                options={{
                    drawerIcon: ({ color }) => <Ionicons name="camera-outline" size={22} color={color} />
                }}
            />
            <Drawer.Screen
                name="Community"
                component={CommunityScreen}
                options={{
                    drawerIcon: ({ color }) => <Ionicons name="people-outline" size={22} color={color} />
                }}
            />
            <Drawer.Screen
                name="Music"
                component={SpotifyScreen}
                options={{
                    drawerIcon: ({ color }) => <Ionicons name="musical-notes-outline" size={22} color={color} />
                }}
            />
            <Drawer.Screen
                name="Panic Mode"
                component={PanicScreen}
                options={{
                    drawerIcon: ({ color }) => <Ionicons name="alert-circle-outline" size={22} color={color} />,
                    drawerItemStyle: { marginTop: 20, borderTopWidth: 1, borderTopColor: '#eee' },
                    drawerLabelStyle: { color: 'red', marginLeft: -20, fontWeight: 'bold' }
                }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
