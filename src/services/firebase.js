// MOCK FIREBASE SERVICE FOR EXPO GO DEMO
// Real Native Firebase requires a Development Build (npx expo run:android)
// or switching to the JS SDK with valid API keys.

const auth = {
    currentUser: null,
    onAuthStateChanged: (callback) => {
        // Simulate checking auth state
        setTimeout(() => callback(null), 1000);
        return () => { }; // unsubscribe function
    },
    signInWithCredential: () => Promise.resolve({ user: { uid: '123', email: 'demo@neuro-nav.com' } }),
    signOut: () => Promise.resolve(),
};

const firestore = {
    // Mock firestore methods as needed
    collection: () => ({
        doc: () => ({
            set: () => Promise.resolve(),
            get: () => Promise.resolve({ exists: true, data: () => ({}) }),
        }),
    }),
};

export { auth, firestore };
