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
			const budgetIdNums = state.budgetsOrder.map(bdID =>
				parseInt(bdID.match(/\d/g).join(''))
			);
			const newBudgetId = `budget-${Math.max(...budgetIdNums) + 1}`;
			return {
				...state,
				allBudgets: {
					...state.allBudgets,
					[newBudgetId]: {
						id: newBudgetId,
						title: action.title,
						planned: action.planned,
						categories: [],
						categoriesIds: []
					}
				},
				budgetsOrder: [ newBudgetId, ...state.budgetsOrder ]
			};

		case 'EDIT_BUDGET':
			return {
				...state,
				allBudgets: {
					...state.allBudgets,
					[action.id]: {
						...state.allBudgets[action.id],
						id: action.id,
						title: action.title,
						planned: action.planned
					}
				}
			};

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
			return {
				...state,
				allBudgets: filterObjectByKey(newState.allBudgets, action.budgetId),
				budgetsOrder: state.budgetsOrder.filter(budgetId => budgetId !== action.budgetId)
			};

		default:
			return state;
	}
};

export default budgetsReducer;
