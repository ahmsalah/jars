import firebase from '../firebase/firebase';

const transactionsReducer = (state, action) => {
	const userID =
		JSON.parse(window.localStorage.getItem('user')) !== null &&
		JSON.parse(window.localStorage.getItem('user')).uid;

	const userRef = firebase.firestore().collection('users').doc(userID);

	switch (action.type) {
		case 'SET_TRANSACTIONS':
			return action.transactions;

		case 'ADD_TRANSACTION':
			userID && userRef.collection('transactions').add(action.transaction);
			break;

		case 'EDIT_TRANSACTION':
			userID && userRef.collection('transactions').doc(action.id).update(action.transaction);
			break;

		case 'REMOVE_TRANSACTION':
			userID && userRef.collection('transactions').doc(action.id).delete();
			break;
		default:
			return state;
	}
};

export default transactionsReducer;
