import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../Login/firebase-config';
import { onAuthStateChanged } from "firebase/auth";
import { getUserData, saveUserData } from '../Login/firestoreFunctions';
export const ScoreContext = createContext();

export function ScoreProvider({ children }) {
    const [storedScore, setStoredScore] = useState({tests: 0, wordsTested: 0, wordsCorrect: 0});
    const [user, setUser] = useState(null);
    
    // useEffect hook to monitor authentication state changes
    useEffect(() => {
        // Subscribe to authentication state changes
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // If a user is authenticated, set the user state
                setUser(currentUser);
                // Fetch user data from Firestore
                const userData = await getUserData(currentUser.uid);
                // Update the score state with the fetched data or an empty data
                setStoredScore(userData.score || { tests: 0, wordsTested: 0, wordsCorrect: 0 });
                // Cache the score data in local storage
                localStorage.setItem('myScore', JSON.stringify(userData.score || { tests: 0, wordsTested: 0, wordsCorrect: 0 }));
            } else {
                // If no user is authenticated, clear the user state
                setUser(null);
                // Retrieve the cached score from local storage, if available
                const cachedScore = localStorage.getItem('myScore');
                if (cachedScore) {
                    // Update the score state with the cached data
                    setStoredScore(JSON.parse(cachedScore));
                }
            }
        });
        // Cleanup function to unsubscribe from authentication state changes
        return () => unsubscribe();
    }, []);

    // Function to update the list state, cache it in local storage, and save it to Firestore
    async function updateStoredScore(newScore) {
        setStoredScore(newScore);
        localStorage.setItem('myScore', JSON.stringify(newScore));
        if (user) {
            await saveUserData(user.uid, { score: newScore });
        }
    };
    
    // Function to handle user logout, clear the user state and list state, and remove the cached list
    async function handleLogout(){
        setUser(null);
        setStoredScore({ tests: 0, wordsTested: 0, wordsCorrect: 0 });
        localStorage.removeItem('myScore'); 
    };

    return (
        <ScoreContext.Provider value={{ storedScore, updateStoredScore, handleLogout }}>
            {children}
        </ScoreContext.Provider>
    );
}
