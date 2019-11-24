import firebase from '../firebase/firebase';
import { filterObjectByKey } from '../helpers';

const categoriesReducer = (state, action) => {
	const userID =
		JSON.parse(window.localStorage.getItem('user')) !== null &&
		JSON.parse(window.localStorage.getItem('user')).uid;
	switch (action.type) {
		case 'SET_CATEGORIES':
			return action.categories;

		case 'ADD_CATEGORY':
			const categoryIdNums = state.lists[action.categoryType].categoriesIds.map(bdID =>
				parseInt(bdID.match(/\d/g).join(''))
			);
			const newCategoryId = `ctg-${Math.max(...categoryIdNums) + 1}`;
			const newCategory = {
				id: newCategoryId,
				name: action.name,
				icon: action.icon,
				type: action.categoryType
			};
			return (
				userID &&
					firebase.firestore().collection('users').doc(userID).update({
						[`categories.allCategories.${newCategoryId}`]: newCategory,

						[`categories.lists.${action.categoryType}.categoriesIds`]: firebase.firestore.FieldValue.arrayUnion(
							newCategoryId
						)
					}),
				(state = {
					...state,
					allCategories: {
						...state.allCategories,
						[newCategoryId]: newCategory
					},
					lists: {
						...state.lists,
						[action.categoryType]: {
							...state.lists[action.categoryType],
							categoriesIds: [
								...state.lists[action.categoryType].categoriesIds,
								newCategoryId
							]
						}
					}
				})
			);

		case 'REMOVE_CATEGORY':
			return (
				userID &&
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
				userID &&
					firebase.firestore().collection('users').doc(userID).update({
						[`categories.lists.${action.listId}.categoriesIds`]: action.newCategoriesIds
					}),
				action.newCategories
			);
		default:
			return state;
	}
};

export default categoriesReducer;
