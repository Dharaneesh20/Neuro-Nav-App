// Firebase Authentication Service (Expo Go Compatible)
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged as firebaseOnAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    collection,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    serverTimestamp
} from 'firebase/firestore';
import app from './config';

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);

/**
 * Sign in with Google (Demo mode for Expo Go)
 * For production, use native Google Sign-In after building APK
 * @returns {Promise<Object>} User object
 */
export const signInWithGoogle = async () => {
    try {
        // DEMO MODE: Use email/password for testing in Expo Go
        const email = "demouser@neuronav.com";  // Changed to avoid conflict
        const password = "neuronav123";

        let userCredential;

        // First, try to sign in with existing account
        try {
            userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Signed in with existing demo account');
        } catch (signInError) {
            // If sign in fails, try to create the account
            if (signInError.code === 'auth/user-not-found' ||
                signInError.code === 'auth/invalid-credential' ||
                signInError.code === 'auth/wrong-password') {
                try {
                    console.log('Creating new demo user account...');
                    userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    console.log('Demo account created successfully');
                } catch (createError) {
                    // If account already exists but password was wrong, that's the real error
                    if (createError.code === 'auth/email-already-in-use') {
                        throw new Error('Demo account exists but password is incorrect. Please check Firebase Console.');
                    }
                    throw createError;
                }
            } else {
                throw signInError;
            }
        }

        // Save/update user profile in Firestore
        await saveUserProfile(userCredential.user);

        return userCredential.user;
    } catch (error) {
        console.error('Sign-In Error:', error);
        throw new Error(error.message || 'Failed to sign in');
    }
};

/**
 * Sign out the current user
 * @returns {Promise<void>}
 */
export const signOut = async () => {
    try {
        await firebaseSignOut(auth);
        console.log('User signed out successfully');
    } catch (error) {
        console.error('Sign Out Error:', error);
        throw error;
    }
};

/**
 * Get the current authenticated user
 * @returns {Object|null} Current user or null
 */
export const getCurrentUser = () => {
    return auth.currentUser;
};

/**
 * Listen to authentication state changes
 * @param {Function} callback - Callback function with user parameter
 * @returns {Function} Unsubscribe function
 */
export const onAuthStateChanged = (callback) => {
    return firebaseOnAuthStateChanged(auth, callback);
};

/**
 * Save or update user profile in Firestore
 * @param {Object} user - Firebase user object
 * @returns {Promise<void>}
 */
const saveUserProfile = async (user) => {
    try {
        const userRef = doc(firestore, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        const userData = {
            email: user.email || 'demo@neuronav.com',
            displayName: user.displayName || 'Demo User',
            photoURL: user.photoURL || '',
            updatedAt: serverTimestamp(),
        };

        if (!userDoc.exists()) {
            // New user - create profile
            await setDoc(userRef, {
                ...userData,
                createdAt: serverTimestamp(),
            });

            // Create default preferences document
            const prefsRef = doc(firestore, 'users', user.uid, 'preferences', 'settings');
            await setDoc(prefsRef, {
                mapProvider: 'google',
                theme: 'light',
                notifications: true,
                defaultZoom: 15,
                voiceGuidance: true,
                autoSaveRoutes: true,
                createdAt: serverTimestamp(),
            });

            console.log('New user profile created');
        } else {
            // Existing user - update profile
            await updateDoc(userRef, userData);
            console.log('User profile updated');
        }
    } catch (error) {
        console.error('Error saving user profile:', error);
        throw error;
    }
};

/**
 * Check if user is signed in
 * @returns {boolean}
 */
export const isSignedIn = () => {
    return auth.currentUser !== null;
};
