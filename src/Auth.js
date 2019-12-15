import React, { useState, useEffect } from 'react';
import firebase from './firebase/firebase';

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
	const [ currentUser, setCurrentUser ] = useState(null);

	useEffect(() => {
		firebase.auth().onAuthStateChanged(user => {
			setCurrentUser(user);
			console.log(user);
			if (user != null) {
				firebase.firestore().collection('users').doc(user.uid).set({
					email: user.email,
					name: user.displayName,
					photoUrl: user.photoURL
				});
			}
		});
	}, []);
	return (
		<AuthContext.Provider value={{ currentUser }}>
			{children}
		</AuthContext.Provider>
	);
}
