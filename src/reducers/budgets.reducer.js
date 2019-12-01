import firebase from '../firebase/firebase';
import { filterObjectByKey } from '../helpers';

const budgetsReducer = (state, action) => {
	const userID =
		JSON.parse(window.localStorage.getItem('user')) !== null &&
		JSON.parse(window.localStorage.getItem('user')).uid;

	const budgetsRef = firebase.firestore().collection('users').doc(userID).collection('budgets');

	switch (action.type) {
		case 'SET_MONTH_BUDGETS':
			return action.newBudgets;

		case 'COPY_DEFAULT':
			return (
				budgetsRef.doc(`${action.pMonth}`).set({ ...state[0], pMonth: action.pMonth }),
				{
					...state,
					[action.pMonth]: {
						...state[0],
						pMonth: action.pMonth
					}
				}
			);

		case 'COPY_FROM_LAST_MONTH':
			return (
				budgetsRef
					.doc(`${action.pMonth}`)
					.set({ ...state[action.lastMonth], pMonth: action.pMonth }),
				{
					...state,
					[action.pMonth]: {
						...state[action.lastMonth],
						pMonth: action.pMonth
					}
				}
			);

		case 'COPY_FROM_SPECIFIC_MONTH':
			return (
				budgetsRef
					.doc(`${action.pMonth}`)
					.set({ ...state[action.month], pMonth: action.pMonth }),
				{
					...state,
					[action.pMonth]: {
						...state[action.month],
						pMonth: action.pMonth
					}
				}
			);

		case 'EDIT_MONTH_INCOME':
			return (
				budgetsRef.doc(`${action.pMonth}`).update({ plannedInc: action.income }),
				{
					...state,
					[action.pMonth]: {
						...state[action.pMonth],
						plannedInc: action.income
					}
				}
			);

		case 'SET_BUDGETS':
			return (
				budgetsRef.doc(`${action.pMonth}`).set(action.budgets),
				{
					...state,
					[action.pMonth]: action.budgets
				}
			);

		case 'ADD_BUDGET':
			const budgetIdNums = state[action.pMonth].budgetsOrder.map(bdID =>
				parseInt(bdID.match(/\d/g).join(''))
			);
			const newBudgetId = `budget-${Math.max(...budgetIdNums) + 1}`;
			const newBudget = {
				id: newBudgetId,
				title: action.title,
				planned: action.planned,
				categories: [],
				categoriesIds: []
			};

			return (
				budgetsRef.doc(`${action.pMonth}`).update({
					[`allBudgets.${newBudgetId}`]: newBudget,
					[`budgetsOrder`]: firebase.firestore.FieldValue.arrayUnion(newBudgetId)
				}),
				{
					...state,
					[action.pMonth]: {
						...state[action.pMonth],
						allBudgets: {
							...state[action.pMonth].allBudgets,
							[newBudgetId]: newBudget
						},
						budgetsOrder: [ ...state[action.pMonth].budgetsOrder, newBudgetId ]
					}
				}
			);

		case 'EDIT_BUDGET':
			return (
				budgetsRef.doc(`${action.pMonth}`).update({
					[`allBudgets.${action.id}.title`]: action.title,
					[`allBudgets.${action.id}.planned`]: action.planned
				}),
				{
					...state,
					[action.pMonth]: {
						...state[action.pMonth],
						allBudgets: {
							...state[action.pMonth].allBudgets,
							[action.id]: {
								...state[action.pMonth].allBudgets[action.id],
								title: action.title,
								planned: action.planned
							}
						}
					}
				}
			);

		case 'REMOVE_BUDGET':
			// move categories from deleted budget to others (default budget)
			const newAllBudgets = {
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
			};

			const filteredAllBudgets = filterObjectByKey(newAllBudgets, action.budgetId);

			return (
				budgetsRef.doc(`${action.pMonth}`).update({
					[`allBudgets`]: filteredAllBudgets,
					[`budgetsOrder`]: firebase.firestore.FieldValue.arrayRemove(action.budgetId)
				}),
				{
					...state,
					[action.pMonth]: {
						...state[action.pMonth],
						allBudgets: filteredAllBudgets,
						budgetsOrder: state[action.pMonth].budgetsOrder.filter(
							budgetId => budgetId !== action.budgetId
						)
					}
				}
			);

		case 'ADD_CATEGORY_TO_BUDGETS':
			// When a user adds a category, it gets added to the default budget for all months.
			return (
				Object.keys(state).map(pMonth =>
					budgetsRef.doc(`${pMonth}`).update({
						[`allBudgets.budget-0.categories`]: firebase.firestore.FieldValue.arrayUnion(
							action.newCategory
						),
						[`allBudgets.budget-0.categoriesIds`]: firebase.firestore.FieldValue.arrayUnion(
							action.id
						)
					})
				),
				Object.fromEntries(
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
				)
			);

		case 'REMOVE_CATEGORY_FROM_BUDGETS':
			// When a user deletes a category, it gets deleted from budgets (from all months)
			return (
				Object.keys(state).map(pMonth =>
					budgetsRef.doc(`${pMonth}`).update({
						[`allBudgets`]: Object.fromEntries(
							Object.entries(state[pMonth].allBudgets).map(([ k, v ], i) => [
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
				),
				Object.fromEntries(
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
				)
			);

		default:
			return state;
	}
};

export default budgetsReducer;
