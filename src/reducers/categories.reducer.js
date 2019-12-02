import firebase from '../firebase/firebase';
import { filterObjectByKey } from '../helpers';

const categoriesReducer = (state, action) => {
	const userID =
		JSON.parse(window.localStorage.getItem('user')) !== null &&
		JSON.parse(window.localStorage.getItem('user')).uid;

	const userRef = firebase.firestore().collection('users').doc(userID);

	switch (action.type) {
		case 'SET_CATEGORIES':
			return action.categories;

		case 'ADD_CATEGORY':
			userID &&
				userRef.update({
					[`categories.allCategories.${action.id}`]: action.newCategory,

					[`categories.lists.${action.categoryType}.categoriesIds`]: firebase.firestore.FieldValue.arrayUnion(
						action.id
					)
				});
			return {
				...state,
				allCategories: {
					...state.allCategories,
					[action.id]: action.newCategory
				},
				lists: {
					...state.lists,
					[action.categoryType]: {
						...state.lists[action.categoryType],
						categoriesIds: [
							...state.lists[action.categoryType].categoriesIds,
							action.id
						]
					}
				}
			};

		case 'REMOVE_CATEGORY':
			userID &&
				userRef.update({
					[`categories.allCategories.${action.id}`]: firebase.firestore.FieldValue.delete(),

					[`categories.lists.${action.categoryType}.categoriesIds`]: firebase.firestore.FieldValue.arrayRemove(
						action.id
					)
				});
			return {
				...state,
				allCategories: filterObjectByKey(state.allCategories, action.id),
				lists: {
					...state.lists,
					[action.categoryType]: {
						...state.lists[action.categoryType],
						categoriesIds: state.lists[action.categoryType].categoriesIds.filter(
							ctID => ctID !== action.id
						)
					}
				}
			};

		case 'MOVE_CATEGORIES':
			userID &&
				userRef.update({
					[`categories.lists.${action.listId}.categoriesIds`]: action.newCategoriesIds
				});
			return action.newCategories;
		default:
			return state;
	}
};

export default categoriesReducer;
