import React, { createContext, useEffect, useReducer, useContext } from 'react';
import categoriesReducer from '../reducers/categories.reducer';
import { AuthContext } from '../context/auth.context';
import firebase from '../firebase/firebase';

export const CategoriesContext = createContext();
export const DispatchContext = createContext();

export function CategoriesProvider(props) {
	const currentUser = useContext(AuthContext);
	const [ categories, dispatch ] = useReducer(categoriesReducer, []);

	useEffect(
		() => {
			if (currentUser) {
				firebase.firestore().collection('users').doc(currentUser.uid).get().then(doc => {
					let categories;
					if (doc.exists) {
						categories = doc.data().categories;
					} else {
						categories = [];
					}
					dispatch({
						type: 'SET_CATEGORIES',
						categories
					});
				});
				// const unsubscribe = firebase
				// 	.firestore()
				// 	.collection('users')
				// 	.doc(currentUser.uid)
				// 	.onSnapshot(doc => {
				// 		const categories = doc.data().categories;
				// 		dispatch({
				// 			type: 'SET_CATEGORIES',
				// 			categories
				// 		});
				// 		setIsLoading(false);
				// 	});
				// return () => unsubscribe();
			}
		},
		[ currentUser ]
	);

	return (
		<CategoriesContext.Provider value={categories}>
			<DispatchContext.Provider value={dispatch}>{props.children}</DispatchContext.Provider>
		</CategoriesContext.Provider>
	);
}
