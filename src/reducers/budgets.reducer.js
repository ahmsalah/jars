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
			return ({
				...state,
				allBudgets: {
					...state.allBudgets,
					[action.budgetId]: action.budget
				},
				budgetsOrder: [ ...state.budgetsOrder, action.budget ]
			});
		case 'REMOVE_BUDGET':
			// move categories from deleted budget to others
			const newState = {
				...state,
				allBudgets: {
					...state.allBudgets,
					'budget-0': {
						...state.allBudgets['budget-0'],
						categoriesIds: [
							...state.allBudgets['budget-0'].categoriesIds,
							...state.allBudgets[action.budgetId].categoriesIds
						],
						categories: [
							...state.allBudgets['budget-0'].categories,
							...state.allBudgets[action.budgetId].categories
						]
					}
				}
			};
			return ({
				...state,
				allBudgets: filterObjectByKey(newState.allBudgets, action.budgetId),
				budgetsOrder: state.budgetsOrder.filter(budgetId => budgetId !== action.budgetId)
			});

		default:
			return state;
	}
};

export default budgetsReducer;
