import { useEffect, useReducer, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import firebase from '../firebase/firebase';

function useBudgetsReducer(budgetsReducer) {
	const currentUser = useContext(AuthContext);
	const [ budgets, dispatch ] = useReducer(budgetsReducer, {});

	useEffect(
		() => {
			if (currentUser) {
				firebase
					.firestore()
					.collection('users')
					.doc(currentUser.uid)
					.collection('budgets')
					.get()
					.then(querySnapshot => {
						let newBudgets = {};
						querySnapshot.forEach(doc => {
							newBudgets = { ...newBudgets, [doc.id]: doc.data() };
						});
						dispatch({ type: 'SET_MONTH_BUDGETS', newBudgets });
					});
			}
		},
		[ currentUser ]
	);

	return {
		budgets,
		dispatch
	};
}

export default useBudgetsReducer;
