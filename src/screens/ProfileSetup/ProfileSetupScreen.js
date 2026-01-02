import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';
import { spacing } from '../../styles/spacing';
import Button from '../../components/Button';
import Card from '../../components/Card';

const PREFERENCES = [
  { id: 'loudNoises', icon: '🔊', label: 'Loud Noises', description: 'Avoid construction sites and busy traffic.' },
  { id: 'flashingLights', icon: '💡', label: 'Bright/Flashing Lights', description: 'Avoid strobe lights and intense signage.' },
  { id: 'denseCrowds', icon: '👥', label: 'Dense Crowds', description: 'Avoid events and peak transit hours.' },
  { id: 'strongSmells', icon: '👃', label: 'Strong Odors', description: 'Avoid industrial areas and waste management sites.' },
];

const ProfileSetupScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [prefs, setPrefs] = useState({
    loudNoises: true,
    flashingLights: false,
    denseCrowds: true,
    strongSmells: false,
  });

  const toggleSwitch = (key) => {
    setPrefs(previousState => ({ ...previousState, [key]: !previousState[key] }));
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('neuro-nav-preferences', JSON.stringify(prefs));
      // In a real app, also sync to Firebase here
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    } catch (e) {
      console.error("Failed to save preferences", e);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Sensory Profile</Text>
        <Text style={[styles.headerSubtitle, { color: colors.muted }]}>
          Customize your experience by selecting what you want to avoid.
        </Text>

        <View style={styles.list}>
          {PREFERENCES.map((pref) => (
            <Card key={pref.id} style={styles.card} padding="md">
              <View style={styles.row}>
                <View style={styles.info}>
                  <Text style={[styles.label, { color: colors.text }]}>
                    {pref.icon}  {pref.label}
                  </Text>
                  <Text style={[styles.description, { color: colors.muted }]}>
                    {pref.description}
                  </Text>
                </View>
                <Switch
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={prefs[pref.id] ? "#fff" : "#f4f3f4"}
                  ios_backgroundColor={colors.border}
                  onValueChange={() => toggleSwitch(pref.id)}
                  value={prefs[pref.id]}
                />
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
        <Button title="Save & Continue" onPress={handleSave} size="lg" />
        <Button
          title="Skip for now"
          variant="secondary"
          onPress={() => navigation.navigate('Dashboard')}
          style={{ marginTop: spacing.sm }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: spacing.lg, paddingBottom: 100 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: spacing.sm },
  headerSubtitle: { fontSize: 16, marginBottom: spacing.xl },
  list: { gap: spacing.md },
  card: { marginBottom: spacing.sm },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  info: { flex: 1, paddingRight: spacing.md },
  label: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  description: { fontSize: 14 },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
    borderTopWidth: 1,
  },
});

export default ProfileSetupScreen;
