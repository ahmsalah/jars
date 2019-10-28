import { useState, useEffect, useReducer, useContext } from 'react';
import arrayMove from 'array-move';
import { AuthContext } from '../context/auth.context';
import firebase from '../firebase/firebase';

function useCategoriesReducer(categoriesReducer) {
	const currentUser = useContext(AuthContext);
	const [ allCategories, dispatch ] = useReducer(categoriesReducer, []);
	const [ expCategories, setExpCategories ] = useState([]);
	const [ incCategories, setIncCategories ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(
		() => {
			if (currentUser) {
				const unsubscribe = firebase
					.firestore()
					.collection('users')
					.doc(currentUser.uid)
					.collection('categories')
					.onSnapshot(snapshot => {
						const categories = snapshot.docs.map(doc => ({
							id: doc.id,
							...doc.data()
						}));
						dispatch({ type: 'SET_CATEGORIES', categories });
					});
				return () => unsubscribe();
			}
		},
		[ currentUser ]
	);

	useEffect(
		() => {
			if (currentUser) {
				const categoriesRef = firebase
					.firestore()
					.collection('users')
					.doc(currentUser.uid)
					.collection('categories');

				const unsubscribe1 = categoriesRef
					.where('type', '==', 'inc')
					.onSnapshot(snapshot => {
						const categories = snapshot.docs.map(doc => ({
							id: doc.id,
							...doc.data()
						}));
						setIncCategories(categories);
					});

				const unsubscribe2 = categoriesRef
					.where('type', '==', 'exp')
					.onSnapshot(snapshot => {
						const categories = snapshot.docs.map(doc => ({
							id: doc.id,
							...doc.data()
						}));
						setExpCategories(categories);
						setIsLoading(false);
					});
				return () => {
					unsubscribe1();
					unsubscribe2();
				};
			}
		},
		[ allCategories, currentUser ]
	);

	//------ Dragging Categories -----//
	const onSortEnd = ({ oldIndex, newIndex, collection }) => {
		collection === 'exp'
			? setExpCategories(expCategories => arrayMove(expCategories, oldIndex, newIndex))
			: setIncCategories(incCategories => arrayMove(incCategories, oldIndex, newIndex));
	};

	return { expCategories, incCategories, dispatch, onSortEnd, isLoading };
}
export default useCategoriesReducer;
