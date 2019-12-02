import firebase from '../firebase/firebase';

const jarsReducer = (state, action) => {
	const userID =
		JSON.parse(window.localStorage.getItem('user')) !== null &&
		JSON.parse(window.localStorage.getItem('user')).uid;

	const userRef = firebase.firestore().collection('users').doc(userID);

	switch (action.type) {
		case 'SET_JARS':
			return action.jars;

		case 'EDIT_PERCENTAGE':
			return userRef.update({ [`allJars.${action.jar}.percentage`]: action.percentage });

		case 'ADD_CATEGORY_TO_JARS':
			// When a user adds a category, it gets added to jar-1 if its type is exp, and jar-0 if income.
			const jar = action.categoryType === 'exp' ? 'jar-1' : 'jar-0';
			userRef.update({
				[`jars.allJars.${jar}.categories`]: firebase.firestore.FieldValue.arrayUnion(
					action.newCategory
				),
				[`jars.allJars.${jar}.categoriesIds`]: firebase.firestore.FieldValue.arrayUnion(
					action.id
				)
			});
			return state;

		case 'REMOVE_CATEGORY_FROM_JARS':
			// When a user deletes a category, it gets deleted from jars
			Object.keys(state.allJars).map(jar =>
				userRef.update({
					[`jars.allJars.${jar}.categories`]: state.allJars[jar].categories.filter(
						ct => ct.id !== action.id
					),
					[`jars.allJars.${jar}.categoriesIds`]: firebase.firestore.FieldValue.arrayRemove(
						action.id
					)
				})
			);
			return state;
		default:
			return state;
	}
};

export default jarsReducer;
