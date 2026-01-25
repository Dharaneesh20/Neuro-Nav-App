// User Preferences Service (Expo Go Compatible)
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    onSnapshot,
    serverTimestamp
} from 'firebase/firestore';
import app from './config';
import { getCurrentUser } from './authService';

const firestore = getFirestore(app);

/**
 * Get user preferences
 * @returns {Promise<Object>} Preferences object
 */
export const getPreferences = async () => {
    try {
        const user = getCurrentUser();
        if (!user) throw new Error('User not authenticated');

        const docSnap = await getDoc(doc(firestore, 'users', user.uid, 'preferences', 'settings'));

        if (!docSnap.exists()) {
            return getDefaultPreferences();
        }

        return docSnap.data();
    } catch (error) {
        console.error('Error fetching preferences:', error);
        throw error;
    }
};

/**
 * Update user preferences
 * @param {Object} preferences - Preferences object to update
 * @returns {Promise<void>}
 */
export const updatePreferences = async (preferences) => {
    try {
        const user = getCurrentUser();
        if (!user) throw new Error('User not authenticated');

        await updateDoc(doc(firestore, 'users', user.uid, 'preferences', 'settings'), {
            ...preferences,
            updatedAt: serverTimestamp(),
        });

        console.log('Preferences updated successfully');
    } catch (error) {
        console.error('Error updating preferences:', error);
        throw error;
    }
};

/**
 * Update a single preference field
 * @param {string} key - Preference key
 * @param {*} value - Preference value
 * @returns {Promise<void>}
 */
export const updatePreference = async (key, value) => {
    try {
        const user = getCurrentUser();
        if (!user) throw new Error('User not authenticated');

        await updateDoc(doc(firestore, 'users', user.uid, 'preferences', 'settings'), {
            [key]: value,
            updatedAt: serverTimestamp(),
        });

        console.log(`Preference ${key} updated to:`, value);
    } catch (error) {
        console.error(`Error updating preference ${key}:`, error);
        throw error;
    }
};

/**
 * Listen to real-time preference updates
 * @param {Function} callback - Callback with preferences object
 * @returns {Function} Unsubscribe function
 */
export const subscribeToPreferences = (callback) => {
    const user = getCurrentUser();
    if (!user) {
        console.error('User not authenticated');
        return () => { };
    }

    return onSnapshot(
        doc(firestore, 'users', user.uid, 'preferences', 'settings'),
        (docSnap) => {
            if (docSnap.exists()) {
                callback(docSnap.data());
            } else {
                callback(getDefaultPreferences());
            }
        },
        (error) => {
            console.error('Error in preferences subscription:', error);
        }
    );
};

/**
 * Reset preferences to default
 * @returns {Promise<void>}
 */
export const resetPreferences = async () => {
    try {
        const user = getCurrentUser();
        if (!user) throw new Error('User not authenticated');

        const defaults = getDefaultPreferences();

        await setDoc(doc(firestore, 'users', user.uid, 'preferences', 'settings'), {
            ...defaults,
            updatedAt: serverTimestamp(),
        });

        console.log('Preferences reset to default');
    } catch (error) {
        console.error('Error resetting preferences:', error);
        throw error;
    }
};

/**
 * Get default preferences
 * @returns {Object} Default preferences object
 */
const getDefaultPreferences = () => {
    return {
        mapProvider: 'google',
        theme: 'light',
        notifications: true,
        defaultZoom: 15,
        voiceGuidance: true,
        autoSaveRoutes: true,
    };
};

export { getDefaultPreferences };
