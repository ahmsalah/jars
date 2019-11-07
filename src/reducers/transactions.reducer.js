import firebase from '../firebase/firebase';

const userID =
	JSON.parse(window.localStorage.getItem('user')) &&
	JSON.parse(window.localStorage.getItem('user')).uid;

const transactionsReducer = (state, action) => {
	switch (action.type) {
		case 'SET_TRANSACTIONS':
			return action.transactions;
		case 'ADD_TRANSACTION':
			return (
				userID &&
				firebase
					.firestore()
					.collection('users')
					.doc(userID)
					.collection('transactions')
					.add(action.transaction)
			);
		case 'REMOVE_TRANSACTION':
			return (
				userID &&
				firebase
					.firestore()
					.collection('users')
					.doc(userID)
					.collection('transactions')
					.doc(action.id)
					.delete()
			);
		default:
			return state;
	}
};

export default transactionsReducer;
