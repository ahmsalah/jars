import { useEffect, useReducer, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import firebase from '../firebase/firebase';

function useCategoriesReducer(categoriesReducer) {
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

	return {
		categories,
		dispatch
	};
}
export default useCategoriesReducer;
