import firebase from '../firebase/firebase';

const userID = JSON.parse(window.localStorage.getItem('user')).uid;

const categoriesReducer = (state, action) => {
	switch (action.type) {
		case 'SET_CATEGORIES':
			return action.categories;
		case 'ADD_CATEGORY':
			return firebase
				.firestore()
				.collection('users')
				.doc(userID)
				.collection('categories')
				.add(action.category);
		case 'REMOVE_CATEGORY':
			return firebase
				.firestore()
				.collection('users')
				.doc(userID)
				.collection('categories')
				.doc(action.id)
				.delete();
		default:
			return state;
	}
};

export default categoriesReducer;
