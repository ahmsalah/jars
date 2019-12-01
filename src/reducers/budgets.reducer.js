import firebase from '../firebase/firebase';
import { filterObjectByKey } from '../helpers';

const budgetsReducer = (state, action) => {
	const userID =
		JSON.parse(window.localStorage.getItem('user')) !== null &&
		JSON.parse(window.localStorage.getItem('user')).uid;

	switch (action.type) {
		case 'SET_MONTH_BUDGETS':
			return action.monthBudgets;

		case 'COPY_DEFAULT':
			return {
				...state,
				[action.pMonth]: {
					...state[0],
					pMonth: action.pMonth
				}
			};

		case 'COPY_FROM_LAST_MONTH':
			return {
				...state,
				[action.pMonth]: {
					...state[action.lastMonth],
					pMonth: action.pMonth
				}
			};

		case 'COPY_FROM_SPECIFIC_MONTH':
			return {
				...state,
				[action.pMonth]: {
					...state[action.month],
					pMonth: action.pMonth
				}
			};

		case 'EDIT_MONTH_INCOME':
			return {
				...state,
				[action.pMonth]: {
					...state[action.pMonth],
					plannedInc: action.income
				}
			};

		case 'SET_BUDGETS':
			return {
				...state,
				[action.pMonth]: action.budgets
			};

		case 'ADD_BUDGET':
			const budgetIdNums = state[action.pMonth].budgetsOrder.map(bdID =>
				parseInt(bdID.match(/\d/g).join(''))
			);
			const newBudgetId = `budget-${Math.max(...budgetIdNums) + 1}`;
			return {
				...state,
				[action.pMonth]: {
					...state[action.pMonth],
					allBudgets: {
						...state[action.pMonth].allBudgets,
						[newBudgetId]: {
							id: newBudgetId,
							title: action.title,
							planned: action.planned,
							categories: [],
							categoriesIds: []
						}
					},
					budgetsOrder: [ newBudgetId, ...state[action.pMonth].budgetsOrder ]
				}
			};

		case 'EDIT_BUDGET':
			return {
				...state,
				[action.pMonth]: {
					...state[action.pMonth],
					allBudgets: {
						...state[action.pMonth].allBudgets,
						[action.id]: {
							...state[action.pMonth].allBudgets[action.id],
							id: action.id,
							title: action.title,
							planned: action.planned
						}
					}
				}
			};

		case 'REMOVE_BUDGET':
			// move categories from deleted budget to others
			const newState = {
				...state,
				[action.pMonth]: {
					...state[action.pMonth],
					allBudgets: {
						...state[action.pMonth].allBudgets,
						'budget-0': {
							...state[action.pMonth].allBudgets['budget-0'],
							categoriesIds: [
								...state[action.pMonth].allBudgets['budget-0'].categoriesIds,
								...state[action.pMonth].allBudgets[action.budgetId].categoriesIds
							],
							categories: [
								...state[action.pMonth].allBudgets['budget-0'].categories,
								...state[action.pMonth].allBudgets[action.budgetId].categories
							]
						}
					}
				}
			};
			return {
				...state,
				[action.pMonth]: {
					...state[action.pMonth],
					allBudgets: filterObjectByKey(
						newState[action.pMonth].allBudgets,
						action.budgetId
					),
					budgetsOrder: state[action.pMonth].budgetsOrder.filter(
						budgetId => budgetId !== action.budgetId
					)
				}
			};

		case 'ADD_CATEGORY_TO_BUDGETS':
			return Object.fromEntries(
				Object.entries(state).map(([ key, val ], i) => [
					key,
					(val = {
						...val,
						allBudgets: {
							...val.allBudgets,
							'budget-0': {
								...val.allBudgets['budget-0'],
								categories: [
									...val.allBudgets['budget-0'].categories,
									action.newCategory
								],
								categoriesIds: [
									...val.allBudgets['budget-0'].categoriesIds,
									action.id
								]
							}
						}
					})
				])
			);

		case 'REMOVE_CATEGORY_FROM_BUDGETS':
			return Object.fromEntries(
				Object.entries(state).map(([ key, val ], i) => [
					key,
					(val = {
						...val,
						allBudgets: Object.fromEntries(
							Object.entries(val.allBudgets).map(([ k, v ], i) => [
								k,
								(v = {
									...v,
									categories: v.categories.filter(ct => ct.id !== action.id),
									categoriesIds: v.categoriesIds.filter(
										ctId => ctId !== action.id
									)
								})
							])
						)
					})
				])
			);

		default:
			return state;
	}
};

export default budgetsReducer;
