import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../../context/ThemeContext';
import { spacing } from '../../styles/spacing';
import Button from '../../components/Button';
import { Ionicons } from '@expo/vector-icons';

const ReportScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const takePhoto = async () => {
        // Request Camera Permissions
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const submitReport = () => {
        if (!description && !image) {
            Alert.alert("Empty Report", "Please add a photo or a description.");
            return;
        }

        setSubmitting(true);

        // Mock API call
        setTimeout(() => {
            setSubmitting(false);
            Alert.alert(
                "Report Submitted",
                "Thank you for helping keep our community safe!",
                [{ text: "OK", onPress: () => navigation.goBack() }]
            );
        }, 1500);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={[styles.title, { color: colors.text }]}>Report an Issue</Text>
                <Text style={[styles.subtitle, { color: colors.muted }]}>
                    Found a noisy area, broken infrastructure, or a safety hazard? Let us know.
                </Text>

                {/* Photo Section */}
                <TouchableOpacity onPress={takePhoto} style={[styles.imageContainer, { borderColor: colors.border }]}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.image} />
                    ) : (
                        <View style={styles.placeholder}>
                            <Ionicons name="camera-outline" size={40} color={colors.primary} />
                            <Text style={[styles.placeholderText, { color: colors.muted }]}>Tap to Take Photo</Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* Description Input */}
                <Text style={[styles.label, { color: colors.text }]}>Description</Text>
                <TextInput
                    style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                    placeholder="Describe the issue (e.g. Construction noise, crowded area)..."
                    placeholderTextColor={colors.muted}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    value={description}
                    onChangeText={setDescription}
                />

                <Button
                    title={submitting ? "Submitting..." : "Submit Report"}
                    onPress={submitReport}
                    disabled={submitting}
                    style={{ marginTop: spacing.lg }}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { padding: spacing.lg },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: spacing.xs,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: spacing.xl,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: spacing.sm,
        marginTop: spacing.md,
    },
    imageContainer: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        borderWidth: 1,
        borderStyle: 'dashed',
        overflow: 'hidden',
        marginBottom: spacing.md,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.02)',
    },
    placeholderText: {
        marginTop: spacing.sm,
    },
    input: {
        borderRadius: 12,
        borderWidth: 1,
        padding: spacing.md,
        fontSize: 16,
        minHeight: 100,
    },
});

export default ReportScreen;
