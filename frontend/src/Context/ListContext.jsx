import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../Login/firebase-config';
import { onAuthStateChanged } from "firebase/auth";
import { getUserData, saveUserData } from '../Login/firestoreFunctions';

export const ListContext = createContext();

export function ListProvider({ children }) {
    const [list, setList] = useState([]);
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
                // Update the list state with the fetched data or an empty array
                setList(userData.items || []);
                // Cache the list data in local storage
                localStorage.setItem('myList', JSON.stringify(userData.items || []));
            } else {
                // If no user is authenticated, clear the user state
                setUser(null);
                // Retrieve the cached list from local storage, if available
                const cachedList = localStorage.getItem('myList');
                if (cachedList) {
                    // Update the list state with the cached data
                    setList(JSON.parse(cachedList));
                }
            }
        });
        // Cleanup function to unsubscribe from authentication state changes
        return () => unsubscribe();
    }, []);
    
    // Function to update the list state, cache it in local storage, and save it to Firestore
    async function updateList(newList) {
        setList(newList);
        localStorage.setItem('myList', JSON.stringify(newList));
        if (user) {
            await saveUserData(user.uid, { items: newList });
        }
    };

    // Function to handle user logout, clear the user state and list state, and remove the cached list
    async function handleLogout(){
        setUser(null);
        setList([]);
        localStorage.removeItem('myList');
    };
    return (
        <ListContext.Provider value={{ list, updateList, handleLogout }}>
            {children}
        </ListContext.Provider>
    );
}
