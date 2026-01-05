import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { GeminiService } from '../../services/GeminiService';
import { spacing } from '../../styles/spacing';

const ChatScreen = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { colors } = useTheme();
    const navigation = useNavigation();

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        const responseText = await GeminiService.getRouteSuggestion(input);
        const aiMsg = { id: Date.now() + 1, text: responseText, sender: 'ai' };

        setMessages(prev => [...prev, aiMsg]);
        setLoading(false);
    };

    const handleRoutePlan = () => {
        navigation.navigate('Routes'); // Assuming 'Routes' is the key for RoutePlanningScreen
    };

    const renderMessageText = (text, sender) => {
        // Simple parser for the Call to Action
        if (sender === 'ai' && text.includes('[Plan this Route]')) {
            const parts = text.split('[Plan this Route]');
            return (
                <View>
                    <Text style={[styles.msgText, { color: colors.text }]}>{parts[0]}</Text>
                    <TouchableOpacity onPress={handleRoutePlan} style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>Plan this Route ➔</Text>
                    </TouchableOpacity>
                    <Text style={[styles.msgText, { color: colors.text }]}>{parts[1]}</Text>
                </View>
            );
        }
        return <Text style={[styles.msgText, { color: sender === 'user' ? '#fff' : colors.text }]}>{text}</Text>;
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView style={styles.chatContainer} contentContainerStyle={{ paddingBottom: 100 }}>
                {messages.map(msg => (
                    <View key={msg.id} style={[
                        styles.messageBubble,
                        {
                            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                            backgroundColor: msg.sender === 'user' ? colors.primary : colors.card
                        }
                    ]}>
                        {renderMessageText(msg.text, msg.sender)}
                    </View>
                ))}
                {loading && <ActivityIndicator size="small" color={colors.primary} style={{ margin: spacing.md }} />}
            </ScrollView>

            <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <TextInput
                    style={[styles.input, { color: colors.text }]}
                    value={input}
                    onChangeText={setInput}
                    placeholder="Ask for a quiet route..."
                    placeholderTextColor={colors.muted}
                />
                <TouchableOpacity onPress={handleSend} style={[styles.sendButton, { backgroundColor: colors.primary }]}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    chatContainer: { flex: 1, padding: spacing.md },
    messageBubble: {
        maxWidth: '80%',
        padding: spacing.md,
        borderRadius: 16,
        marginBottom: spacing.md,
    },
    msgText: { fontSize: 16 },
    inputContainer: {
        flexDirection: 'row',
        padding: spacing.md,
        borderTopWidth: 1,
        alignItems: 'center',
    },
    input: { flex: 1, height: 40, borderWidth: 1, borderRadius: 20, paddingHorizontal: spacing.md, borderColor: 'transparent', backgroundColor: 'rgba(0,0,0,0.05)' },
    sendButton: { marginLeft: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: 20 },
    sendButtonText: { color: '#fff', fontWeight: 'bold' },
    actionButton: { marginTop: spacing.sm, backgroundColor: '#4CAF50', padding: spacing.sm, borderRadius: 8, alignSelf: 'flex-start' },
    actionButtonText: { color: '#fff', fontWeight: 'bold' }
});

export default ChatScreen;
