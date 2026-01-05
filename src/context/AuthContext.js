import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'; // JS SDK imports
import { auth } from '../services/firebaseConfig'; // Import initialized auth instance

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Handle user state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (usr) => {
            setUser(usr);
            if (loading) setLoading(false);
        });
        return unsubscribe; // unsubscribe on unmount
    }, []);

    const loginWithGoogle = async () => {
        try {
            setLoading(true);
            console.log("Attempting demo login...");
            const email = "demo@neuronav.com";
            const password = "password123";

            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
                // If user doesn't exist or other issue, try creating
                console.log("Login failed, attempting to create demo user...", error.code);
                await createUserWithEmailAndPassword(auth, email, password);
            }
        } catch (error) {
            console.error("Authentication Error", error);
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout Failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loginWithGoogle, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
