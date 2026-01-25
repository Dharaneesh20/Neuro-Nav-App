import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Linking
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Markdown from 'react-native-markdown-display';
import axios from 'axios';
import Constants from 'expo-constants';
import { useNavigation } from "@react-navigation/native";

const API_KEY = Constants.expoConfig?.extra?.geminiApiKey;

const GeminiChatScreen = () => {
    const [messages, setMessages] = useState([
        {
            role: "model",
            parts: [{ text: "Hello! I am your Gemini AI assistant. I can help you find calming and safe haven routes." }]
        }
    ]);
    const [inputText, setInputText] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollViewRef = useRef();
    const navigation = useNavigation();
    const handleSend = async () => {
        if (!inputText.trim()) return;

        const userMessage = { role: "user", parts: [{ text: inputText }] };
        setMessages((prev) => [...prev, userMessage]);
        setInputText("");
        setLoading(true);
        Keyboard.dismiss();
        try {
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
            console.log("GeminiChat: Requesting URL:", apiUrl);

            const response = await axios.post(
                apiUrl,
                {
                    contents: [
                        {
                            role: "user",
                            parts: [{
                                text: `Pre-prompt: I am a Gemini AI assistant. I am here to provide calmest and more safe haven route. I need to provide direction with google maps link that opens directly route planner. Suggest less noisy and safe haven areas. 
                
                User Request: ${inputText}`
                            }]
                        }
                    ]
                }
            );

            const botContent = response.data.candidates[0].content;
            setMessages((prev) => [...prev, botContent]);
        } catch (error) {
            console.error("Gemini API Error:", error);
            if (error.response) {
                console.error("Gemini Error Details:", JSON.stringify(error.response.data, null, 2));
            }
            let errorMessage = "Sorry, I encountered an error. Please try again.";

            if (error.response && error.response.status === 429) {
                errorMessage = "You have hit the rate limit. Please wait a moment before trying again.";
            }

            setMessages((prev) => [
                ...prev,
                { role: "model", parts: [{ text: errorMessage }] }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleLinkPress = (url) => {
        // Check if it's a map link or route planner
        if (url.includes('google.com/maps')) {
            Linking.openURL(url);
        } else {
            // Fallback or specific logic
            Linking.openURL(url);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Gemini AI Guide</Text>
            </View>

            <ScrollView
                ref={scrollViewRef}
                style={styles.chatContainer}
                contentContainerStyle={{ paddingBottom: 20 }}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
                {messages.map((msg, index) => (
                    <View
                        key={index}
                        style={[
                            styles.messageBubble,
                            msg.role === "user" ? styles.userBubble : styles.botBubble,
                        ]}
                    >
                        {msg.role === "model" && (
                            <View style={styles.botHeader}>
                                <Ionicons name="sparkles" size={16} color="#4A90E2" />
                                <Text style={styles.botName}>Gemini</Text>
                            </View>
                        )}

                        {msg.parts.map((part, partIndex) => (
                            <Markdown
                                key={partIndex}
                                style={markdownStyles}
                                onLinkPress={handleLinkPress}
                            >
                                {part.text}
                            </Markdown>
                        ))}
                    </View>
                ))}
                {loading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color="#4A90E2" />
                        <Text style={styles.loadingText}>Thinking...</Text>
                    </View>
                )}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Ask for a quiet route..."
                    value={inputText}
                    onChangeText={setInputText}
                    multiline
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend} disabled={loading}>
                    <Ionicons name="send" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.plannerButton}
                onPress={() => navigation.navigate('Routes')}
            >
                <Ionicons name="map" size={20} color="#fff" />
                <Text style={styles.plannerButtonText}>Go to Route Planner</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 15,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        elevation: 2
    },
    backButton: {
        marginRight: 15
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    chatContainer: {
        flex: 1,
        padding: 15,
    },
    messageBubble: {
        maxWidth: "85%",
        padding: 12,
        borderRadius: 15,
        marginBottom: 10,
    },
    userBubble: {
        alignSelf: "flex-end",
        backgroundColor: "#4A90E2",
        borderBottomRightRadius: 2,
    },
    botBubble: {
        alignSelf: "flex-start",
        backgroundColor: "#fff",
        borderBottomLeftRadius: 2,
        borderWidth: 1,
        borderColor: '#eee'
    },
    botHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    botName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#888',
        marginLeft: 5
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },
    input: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        maxHeight: 100,
    },
    sendButton: {
        backgroundColor: "#4A90E2",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginBottom: 10
    },
    loadingText: {
        marginLeft: 10,
        color: '#888',
        fontSize: 12
    },
    plannerButton: {
        flexDirection: 'row',
        backgroundColor: '#34C759',
        padding: 12,
        margin: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    plannerButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 8
    }
});

const markdownStyles = {
    body: {
        color: '#333',
        fontSize: 14,
    },
    link: {
        color: '#007AFF',
        textDecorationLine: 'underline',
    },
    // User bubble text override
    // We handle user text differently usually, but since markdown renderer is used for both...
    // We can conditionally style if we needed to, but here we just keep it simple.
    // Note: React Native Markdown Display styling is global for the instance.
};


export default GeminiChatScreen;
