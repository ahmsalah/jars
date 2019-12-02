import React, { createContext, useEffect, useReducer, useContext } from 'react';
import budgetsReducer from '../reducers/budgets.reducer';
import { ParsedMonthContext } from '../context/month.context';
import { AuthContext } from '../context/auth.context';
import firebase from '../firebase/firebase';

export const BudgetsContext = createContext();
export const ThisMonthBudgetContext = createContext();
export const DispatchContext = createContext();

export function BudgetsProvider(props) {
	const [ budgets, dispatch ] = useReducer(budgetsReducer, {});
	const currentUser = useContext(AuthContext);
	const parsedMonth = useContext(ParsedMonthContext);
	const thisMonthBudget = budgets[parsedMonth];

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

	return (
		<BudgetsContext.Provider value={budgets}>
			<ThisMonthBudgetContext.Provider value={thisMonthBudget}>
				<DispatchContext.Provider value={dispatch}>
					{props.children}
				</DispatchContext.Provider>
			</ThisMonthBudgetContext.Provider>
		</BudgetsContext.Provider>
	);
}
