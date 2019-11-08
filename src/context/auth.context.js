import React, { useState, useEffect, createContext } from 'react';
import firebase from '../firebase/firebase';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [ currentUser, setCurrentUser ] = useState(
		JSON.parse(window.localStorage.getItem('user') || null)
	);

	useEffect(() => {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				window.localStorage.setItem('user', JSON.stringify(user));
				setCurrentUser(user);
			} else {
				window.localStorage.removeItem('user');
				setCurrentUser(null);
			}
		});
	}, []);
	return <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>;
}
