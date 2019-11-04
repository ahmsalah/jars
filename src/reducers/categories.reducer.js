import firebase from '../firebase/firebase';
import { filterObjectByKey } from '../helpers';

const userID =
	JSON.parse(window.localStorage.getItem('user')) &&
	JSON.parse(window.localStorage.getItem('user')).uid;

const categoriesReducer = (state, action) => {
	switch (action.type) {
		case 'SET_CATEGORIES':
			return action.categories;

		case 'ADD_CATEGORY':
			return (
				firebase.firestore().collection('users').doc(userID).update({
					[`categories.allCategories.${action.id}`]: action.category,

					[`categories.lists.${action.categoryType}.categoriesIds`]: firebase.firestore.FieldValue.arrayUnion(
						action.id
					)
				}),
				(state = {
					...state,
					allCategories: {
						...state.allCategories,
						[action.id]: action.category
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
				})
			);

		case 'REMOVE_CATEGORY':
			return (
				firebase.firestore().collection('users').doc(userID).update({
					[`categories.allCategories.${action.id}`]: firebase.firestore.FieldValue.delete(),

					[`categories.lists.${action.categoryType}.categoriesIds`]: firebase.firestore.FieldValue.arrayRemove(
						action.id
					)
				}),
				(state = {
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
				})
			);
		case 'MOVE_CATEGORIES':
			return (
				firebase.firestore().collection('users').doc(userID).update({
					[`categories.lists.${action.categoryType}.categoriesIds`]: action.categoryList
				}),
				(state = {
					...state,
					lists: {
						...state.lists,
						[action.categoryType]: {
							...state.lists[action.categoryType],
							categoriesIds: action.categoryList
						}
					}
				})
			);
		default:
			return state;
	}
};

export default categoriesReducer;
