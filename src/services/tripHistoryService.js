// Trip History Service - Firestore Sync
import {
    getFirestore,
    collection,
    doc,
    setDoc,
    getDocs,
    deleteDoc,
    query,
    orderBy,
    limit as firestoreLimit,
    onSnapshot,
    serverTimestamp,
    writeBatch
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import app from './firebase/config';
import { getCurrentUser } from './firebase/authService';

const firestore = getFirestore(app);

/**
 * Save a trip to history (both Firestore and AsyncStorage)
 * @param {Object} trip - Trip object
 * @returns {Promise<void>}
 */
export const saveTripToHistory = async (trip) => {
    try {
        const user = getCurrentUser();

        // Always save to AsyncStorage for offline support
        const existingHistory = await AsyncStorage.getItem('trip_history');
        const history = existingHistory ? JSON.parse(existingHistory) : [];
        history.push(trip);
        await AsyncStorage.setItem('trip_history', JSON.stringify(history));

        // If user is authenticated, also save to Firestore
        if (user) {
            const tripRef = doc(collection(firestore, 'users', user.uid, 'tripHistory'));
            await setDoc(tripRef, {
                ...trip,
                timestamp: serverTimestamp(),
            });
            console.log('Trip saved to Firestore');
        }
    } catch (error) {
        console.error('Error saving trip to history:', error);
        throw error;
    }
};

/**
 * Get trip history (from Firestore if authenticated, else AsyncStorage)
 * @param {number} limitCount - Maximum number of trips to fetch
 * @returns {Promise<Array>} Array of trips
 */
export const getTripHistory = async (limitCount = 50) => {
    try {
        const user = getCurrentUser();

        // If user is authenticated, fetch from Firestore
        if (user) {
            const q = query(
                collection(firestore, 'users', user.uid, 'tripHistory'),
                orderBy('timestamp', 'desc'),
                firestoreLimit(limitCount)
            );

            const snapshot = await getDocs(q);
            const trips = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            // Update AsyncStorage with Firestore data for offline access
            await AsyncStorage.setItem('trip_history', JSON.stringify(trips));

            return trips;
        } else {
            // Fall back to AsyncStorage if not authenticated
            const storedHistory = await AsyncStorage.getItem('trip_history');
            return storedHistory ? JSON.parse(storedHistory) : [];
        }
    } catch (error) {
        console.error('Error fetching trip history:', error);
        // Fall back to AsyncStorage on error
        const storedHistory = await AsyncStorage.getItem('trip_history');
        return storedHistory ? JSON.parse(storedHistory) : [];
    }
};

/**
 * Listen to real-time trip history updates
 * @param {Function} callback - Callback with trips array
 * @param {number} limitCount - Maximum number of trips
 * @returns {Function} Unsubscribe function
 */
export const subscribeToTripHistory = (callback, limitCount = 50) => {
    const user = getCurrentUser();
    if (!user) {
        console.log('User not authenticated, using AsyncStorage only');
        return () => { };
    }

    const q = query(
        collection(firestore, 'users', user.uid, 'tripHistory'),
        orderBy('timestamp', 'desc'),
        firestoreLimit(limitCount)
    );

    return onSnapshot(q, (snapshot) => {
        const trips = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        // Update AsyncStorage for offline access
        AsyncStorage.setItem('trip_history', JSON.stringify(trips));

        callback(trips);
    }, (error) => {
        console.error('Error in trip history subscription:', error);
    });
};

/**
 * Clear all trip history (both Firestore and AsyncStorage)
 * @returns {Promise<void>}
 */
export const clearTripHistory = async () => {
    try {
        // Clear AsyncStorage
        await AsyncStorage.removeItem('trip_history');

        const user = getCurrentUser();

        // If authenticated, clear Firestore
        if (user) {
            const snapshot = await getDocs(collection(firestore, 'users', user.uid, 'tripHistory'));

            const batch = writeBatch(firestore);
            snapshot.docs.forEach(document => {
                batch.delete(document.ref);
            });

            await batch.commit();
            console.log('Trip history cleared from Firestore');
        }
    } catch (error) {
        console.error('Error clearing trip history:', error);
        throw error;
    }
};

/**
 * Sync local AsyncStorage history to Firestore
 * (Used when user signs in to upload their offline history)
 * @returns {Promise<void>}
 */
export const syncLocalHistoryToFirestore = async () => {
    try {
        const user = getCurrentUser();
        if (!user) {
            console.log('User not authenticated, cannot sync');
            return;
        }

        // Get local history
        const storedHistory = await AsyncStorage.getItem('trip_history');
        if (!storedHistory) {
            console.log('No local history to sync');
            return;
        }

        const localTrips = JSON.parse(storedHistory);

        // Upload each trip to Firestore
        const batch = writeBatch(firestore);
        localTrips.forEach(trip => {
            const tripRef = doc(collection(firestore, 'users', user.uid, 'tripHistory'));
            batch.set(tripRef, {
                ...trip,
                timestamp: serverTimestamp(),
            });
        });

        await batch.commit();
        console.log(`Synced ${localTrips.length} trips to Firestore`);
    } catch (error) {
        console.error('Error syncing local history:', error);
    }
};
