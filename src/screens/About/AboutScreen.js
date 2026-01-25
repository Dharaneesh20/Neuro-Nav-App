import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { spacing } from '../../styles/spacing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const AboutScreen = () => {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const openLink = async (url) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            console.log(`Don't know how to open this URL: ${url}`);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
            {/* Header */}
            <View style={[styles.header, { borderBottomColor: colors.border }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>About</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* App Info Header */}
                <View style={styles.appInfoSection}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../../assets/icon.png')}
                            style={{ width: 80, height: 80, borderRadius: 16 }}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={[styles.appName, { color: colors.text }]}>Neuro-Nav</Text>
                    <Text style={[styles.version, { color: colors.muted }]}>Version 4.0.0</Text>
                </View>

                {/* Developer Info */}
                <View style={[styles.section, { backgroundColor: colors.card }]}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Developer</Text>

                    <TouchableOpacity
                        style={[styles.linkRow, { borderBottomColor: colors.border }]}
                        onPress={() => openLink('https://github.com/Dharaneesh20')}
                    >
                        <View style={styles.linkIcon}>
                            <FontAwesome5 name="github" size={20} color={colors.text} />
                        </View>
                        <View style={styles.linkInfo}>
                            <Text style={[styles.linkLabel, { color: colors.text }]}>GitHub</Text>
                            <Text style={[styles.linkValue, { color: colors.primary }]}>@Dharaneesh20</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={colors.muted} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.linkRow, { borderBottomColor: colors.border }]}
                        onPress={() => openLink('mailto:dharaneeshrs@proton.me')}
                    >
                        <View style={styles.linkIcon}>
                            <Ionicons name="mail" size={20} color={colors.text} />
                        </View>
                        <View style={styles.linkInfo}>
                            <Text style={[styles.linkLabel, { color: colors.text }]}>Contact</Text>
                            <Text style={[styles.linkValue, { color: colors.primary }]}>dharaneeshrs@proton.me</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={colors.muted} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.linkRow}
                        onPress={() => openLink('https://rsdportfolio.vercel.app/')}
                    >
                        <View style={styles.linkIcon}>
                            <Ionicons name="briefcase" size={20} color={colors.text} />
                        </View>
                        <View style={styles.linkInfo}>
                            <Text style={[styles.linkLabel, { color: colors.text }]}>Portfolio</Text>
                            <Text style={[styles.linkValue, { color: colors.primary }]}>rsdportfolio.vercel.app</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={colors.muted} />
                    </TouchableOpacity>
                </View>

                {/* Project Links */}
                <View style={[styles.section, { backgroundColor: colors.card }]}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Links</Text>

                    <TouchableOpacity
                        style={[styles.linkRow, { borderBottomColor: colors.border }]}
                        onPress={() => openLink('https://github.com/Dharaneesh20/Neuro-Nav-App')}
                    >
                        <View style={styles.linkIcon}>
                            <FontAwesome5 name="code-branch" size={18} color={colors.text} />
                        </View>
                        <View style={styles.linkInfo}>
                            <Text style={[styles.linkLabel, { color: colors.text }]}>Source Code</Text>
                            <Text style={[styles.linkValue, { color: colors.primary }]}>Neuro-Nav-App Repository</Text>
                        </View>
                        <Ionicons name="open-outline" size={20} color={colors.muted} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.linkRow}
                        onPress={() => openLink('https://neuro-nav-327583870558.us-central1.run.app/')}
                    >
                        <View style={styles.linkIcon}>
                            <Ionicons name="laptop-outline" size={20} color={colors.text} />
                        </View>
                        <View style={styles.linkInfo}>
                            <Text style={[styles.linkLabel, { color: colors.text }]}>PC / Web Version</Text>
                            <Text style={[styles.linkValue, { color: colors.primary }]}>neuro-nav...run.app</Text>
                        </View>
                        <Ionicons name="open-outline" size={20} color={colors.muted} />
                    </TouchableOpacity>
                </View>

                {/* Roadmap */}
                <View style={[styles.section, { backgroundColor: colors.card }]}>
                    <View style={styles.roadmapHeader}>
                        <Ionicons name="restaurant-outline" size={22} color={colors.text} style={{ marginRight: 8 }} />
                        <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: 0 }]}>What we are cooking 🍳</Text>
                    </View>
                    <Text style={[styles.sectionSubtitle, { color: colors.muted }]}>Future Updates & Roadmap</Text>

                    <View style={styles.roadmapItem}>
                        <Ionicons name="ear-outline" size={20} color="#FF9800" style={styles.roadmapIcon} />
                        <Text style={[styles.roadmapText, { color: colors.text }]}>Real-time Sensory Alerts (Decibels)</Text>
                    </View>
                    <View style={styles.roadmapItem}>
                        <Ionicons name="watch-outline" size={20} color="#2196F3" style={styles.roadmapIcon} />
                        <Text style={[styles.roadmapText, { color: colors.text }]}>Wear OS / Watch Integration</Text>
                    </View>
                    <View style={styles.roadmapItem}>
                        <Ionicons name="map" size={20} color="#4CAF50" style={styles.roadmapIcon} />
                        <Text style={[styles.roadmapText, { color: colors.text }]}>Offline Navigation Mode</Text>
                    </View>
                    <View style={styles.roadmapItem}>
                        <Ionicons name="hardware-chip-outline" size={20} color="#9C27B0" style={styles.roadmapIcon} />
                        <Text style={[styles.roadmapText, { color: colors.text }]}>AI-Powered Route Comfort Scoring</Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={[styles.footerText, { color: colors.muted }]}>Made with ❤️ by Dharaneesh20</Text>
                    <Text style={[styles.footerSubText, { color: colors.muted }]}>© 2026 Neuro-Nav Open Source</Text>
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.md,
        borderBottomWidth: 1,
    },
    backButton: {
        padding: spacing.xs,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        padding: spacing.md,
    },
    appInfoSection: {
        alignItems: 'center',
        marginBottom: spacing.xl,
        marginTop: spacing.md,
    },
    logoContainer: {
        width: 100,
        height: 100,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.md,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    appName: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    version: {
        fontSize: 16,
    },
    section: {
        borderRadius: 16,
        padding: spacing.md,
        marginBottom: spacing.lg,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: spacing.md,
    },
    sectionSubtitle: {
        fontSize: 14,
        marginBottom: spacing.md,
        marginTop: -spacing.sm,
    },
    linkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: 'transparent', // Default transparent
    },
    linkIcon: {
        width: 32,
        alignItems: 'center',
        marginRight: spacing.md,
    },
    linkInfo: {
        flex: 1,
    },
    linkLabel: {
        fontSize: 14,
        fontWeight: '600',
    },
    linkValue: {
        fontSize: 12,
        marginTop: 2,
    },
    roadmapHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    roadmapItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
        paddingVertical: 4,
    },
    roadmapIcon: {
        marginRight: spacing.md,
        width: 24,
        textAlign: 'center',
    },
    roadmapText: {
        fontSize: 15,
        flex: 1,
    },
    footer: {
        alignItems: 'center',
        marginTop: spacing.md,
        marginBottom: spacing.xl,
    },
    footerText: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    footerSubText: {
        fontSize: 12,
        opacity: 0.6,
    },
});

export default AboutScreen;
