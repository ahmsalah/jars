import firebase from '../firebase/firebase';
import { filterObjectByKey } from '../helpers';

const budgetsReducer = (state, action) => {
	const userID =
		JSON.parse(window.localStorage.getItem('user')) !== null &&
		JSON.parse(window.localStorage.getItem('user')).uid;
	switch (action.type) {
		case 'SET_BUDGETS':
			return action.budgets;
		case 'ADD_BUDGET':
			return (state = {
				...state,
				allBudgets: {
					...state.allBudgets,
					[action.budgetId]: action.budget
				},
				budgetsOrder: [ ...state.budgetsOrder, action.budget ]
			});
		case 'REMOVE_BUDGET':
			return (state = {
				...state,
				allBudgets: filterObjectByKey(state.allBudgets, action.id),
				budgetsOrder: state.budgetsOrder.filter(budgetId => budgetId !== action.budgetId)
			});

		default:
			return state;
	}
};

export default budgetsReducer;
