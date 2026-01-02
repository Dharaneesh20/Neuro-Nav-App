import React, { createContext, useContext, useState, useEffect } from 'react';
// import auth from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { auth } from '../services/firebase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Simulate loading User
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const loginWithGoogle = async () => {
        try {
            setLoading(true);
            // SIMULATED LOGIN FOR DEMO
            console.log("Simulating Login...");
            await new Promise(resolve => setTimeout(resolve, 1500));
            setUser({
                uid: 'demo-user-123',
                displayName: 'Demo User',
                email: 'user@neuronav.com',
                photoURL: 'https://via.placeholder.com/150'
            });
            setLoading(false);
        } catch (error) {
            console.error("Login Failed", error);
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setUser(null);
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
