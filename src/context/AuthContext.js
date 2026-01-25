import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    signInWithGoogle,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    getCurrentUser
} from '../services/firebase/authService';

const AuthContext = createContext({});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Subscribe to auth state changes
        const unsubscribe = onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const loginWithGoogle = async () => {
        try {
            setError(null);
            setLoading(true);
            const firebaseUser = await signInWithGoogle();
            setUser(firebaseUser);

            // Auto-sync local history to Firestore after login
            try {
                const { syncLocalHistoryToFirestore } = require('../services/tripHistoryService');
                await syncLocalHistoryToFirestore();
            } catch (syncError) {
                console.log('History sync skipped:', syncError.message);
            }

            return firebaseUser;
        } catch (err) {
            setError(err.message);
            console.error('Login error:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setError(null);
            setLoading(true);
            await firebaseSignOut();
            setUser(null);
        } catch (err) {
            setError(err.message);
            console.error('Logout error:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        loading,
        error,
        loginWithGoogle,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
