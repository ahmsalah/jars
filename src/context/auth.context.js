import React, { useState, useEffect, createContext } from 'react';
import firebase from '../firebase/firebase';
import { initialCategories, initialTransactions } from '../initialData';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [ currentUser, setCurrentUser ] = useState(null);

	useEffect(() => {
		firebase.auth().onAuthStateChanged(user => {
			setCurrentUser(user);
			console.log(user);
			if (user != null) {
				const userRef = firebase.firestore().collection('users').doc(user.uid);
				userRef.set({
					email: user.email,
					name: user.displayName,
					photoUrl: user.photoURL
				});
				userRef.get().then(doc => {
					if (doc.exists) {
						userRef.collection('categories').get().then(subCollection => {
							subCollection.docs.length === 0 &&
								initialCategories.map(ct => {
									userRef.collection('categories').add({
										name: ct.name,
										type: ct.type,
										icon: ct.icon
									});
								});
						});
					}
				});
			}
		});
	}, []);
	return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
}
