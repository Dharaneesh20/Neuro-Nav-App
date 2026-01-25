import axios from 'axios';
import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig?.extra?.geminiApiKey || 'YOUR_GEMINI_API_KEY_HERE';
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

console.log("GeminiService: Using URL:", BASE_URL); // Debug url

export const GeminiService = {
    /**
     * Generates a route suggestion based on user input, focusing on safety and quietness.
     * @param {string} userQuery - The user's destination or route request.
     * @returns {Promise<string>} - The markdown response from Gemini.
     */
    getRouteSuggestion: async (userQuery) => {
        try {
            const systemPrompt = `
You are an intelligent assistant for Neuro-Nav, an app designed to help users find less noisy and "safe haven" routes.
Your goal is to suggest walking or travel routes that prioritize low noise levels, green spaces, and safe areas (safe havens).
When a user asks for a route, provide a step-by-step guide or a general direction that adheres to these principles.
Generate the response in Markdown format.
Include a specific call-to-action link or button text like "[Plan this Route]" that the app can recognize to navigate the user to the route planning screen.
Ignore standard "fastest route" logic if it compromises quietness or safety.

User Input: ${userQuery}
`;

            const response = await axios.post(`${BASE_URL}?key=${API_KEY}`, {
                contents: [{
                    parts: [{
                        text: systemPrompt
                    }]
                }]
            });

            if (response.data && response.data.candidates && response.data.candidates.length > 0) {
                return response.data.candidates[0].content.parts[0].text;
            } else {
                return "Sorry, I couldn't generate a safe route suggestion at this time.";
            }
        } catch (error) {
            console.error("Gemini API Error:", error);
            if (error.response) {
                console.error("Gemini Error Details:", JSON.stringify(error.response.data, null, 2));
            }
            return "An error occurred while communicating with the AI. Please try again.";
        }
    }
};
