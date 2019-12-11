import firebase from '../firebase/firebase';

const tipsReducer = (state, action) => {
	const userID =
		JSON.parse(window.localStorage.getItem('user')) !== null &&
		JSON.parse(window.localStorage.getItem('user')).uid;

	switch (action.type) {
		case 'SET_TIPS':
			return action.showTips;
		case 'SET_SECTION_TIPS':
			firebase
				.firestore()
				.collection('users')
				.doc(userID)
				.update({ [`showTips.${action.section}`]: action.open });
			return {
				...state,
				[action.section]: action.boolean
			};
		default:
			return state;
	}
};

export default tipsReducer;
