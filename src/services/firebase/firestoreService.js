// Firestore User Data Service (Expo Go Compatible)
import {
    getFirestore,
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    deleteDoc,
    query,
    orderBy,
    limit as firestoreLimit,
    onSnapshot,
    serverTimestamp,
    writeBatch
} from 'firebase/firestore';
import app from './config';
import { getCurrentUser } from './authService';

const firestore = getFirestore(app);

/**
 * Save a destination to user's recent history
 * @param {Object} destination - Destination object
 * @returns {Promise<void>}
 */
export const saveRecentDestination = async (destination) => {
    try {
        const user = getCurrentUser();
        if (!user) throw new Error('User not authenticated');

        const destRef = doc(collection(firestore, 'users', user.uid, 'recentDestinations'));

        await setDoc(destRef, {
            name: destination.name,
            latitude: destination.latitude,
            longitude: destination.longitude,
            address: destination.address || '',
            timestamp: serverTimestamp(),
        });

        console.log('Recent destination saved');
    } catch (error) {
        console.error('Error saving recent destination:', error);
        throw error;
    }
};

/**
 * Get user's recent destinations
 * @param {number} limitCount - Maximum number of destinations to fetch
 * @returns {Promise<Array>} Array of recent destinations
 */
export const getRecentDestinations = async (limitCount = 10) => {
    try {
        const user = getCurrentUser();
        if (!user) throw new Error('User not authenticated');

        const q = query(
            collection(firestore, 'users', user.uid, 'recentDestinations'),
            orderBy('timestamp', 'desc'),
            firestoreLimit(limitCount)
        );

        const snapshot = await getDocs(q);
        const destinations = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return destinations;
    } catch (error) {
        console.error('Error fetching recent destinations:', error);
        throw error;
    }
};

/**
 * Listen to real-time updates of recent destinations
 * @param {Function} callback - Callback with destinations array
 * @param {number} limitCount - Maximum number of destinations
 * @returns {Function} Unsubscribe function
 */
export const subscribeToRecentDestinations = (callback, limitCount = 10) => {
    const user = getCurrentUser();
    if (!user) {
        console.error('User not authenticated');
        return () => { };
    }

    const q = query(
        collection(firestore, 'users', user.uid, 'recentDestinations'),
        orderBy('timestamp', 'desc'),
        firestoreLimit(limitCount)
    );

    return onSnapshot(q, (snapshot) => {
        const destinations = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        callback(destinations);
    }, (error) => {
        console.error('Error in recent destinations subscription:', error);
    });
};

/**
 * Delete a recent destination
 * @param {string} destinationId - ID of the destination to delete
 * @returns {Promise<void>}
 */
export const deleteRecentDestination = async (destinationId) => {
    try {
        const user = getCurrentUser();
        if (!user) throw new Error('User not authenticated');

        await deleteDoc(doc(firestore, 'users', user.uid, 'recentDestinations', destinationId));

        console.log('Recent destination deleted');
    } catch (error) {
        console.error('Error deleting recent destination:', error);
        throw error;
    }
};

/**
 * Clear all recent destinations
 * @returns {Promise<void>}
 */
export const clearRecentDestinations = async () => {
    try {
        const user = getCurrentUser();
        if (!user) throw new Error('User not authenticated');

        const snapshot = await getDocs(collection(firestore, 'users', user.uid, 'recentDestinations'));

        const batch = writeBatch(firestore);
        snapshot.docs.forEach(document => {
            batch.delete(document.ref);
        });

        await batch.commit();
        console.log('All recent destinations cleared');
    } catch (error) {
        console.error('Error clearing recent destinations:', error);
        throw error;
    }
};

/**
 * Get user profile data
 * @returns {Promise<Object>} User profile object
 */
export const getUserProfile = async () => {
    try {
        const user = getCurrentUser();
        if (!user) throw new Error('User not authenticated');

        const docSnap = await getDoc(doc(firestore, 'users', user.uid));

        if (!docSnap.exists()) {
            throw new Error('User profile not found');
        }

        return {
            uid: user.uid,
            ...docSnap.data(),
        };
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};
