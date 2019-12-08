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
				firebase.firestore().collection('users').doc(user.uid).get().then(doc => {
					const isNewUser = doc.data().isNewUser;
					setCurrentUser({ ...user, isNewUser });
				});
			} else {
				window.localStorage.clear();
				setCurrentUser(null);
			}
		});
	}, []);
	return <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>;
}
