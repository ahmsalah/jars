import React, { createContext, useContext } from 'react';
import useBudgetsReducer from '../hooks/useBudgetsReducer';
import budgetsReducer from '../reducers/budgets.reducer';
import { ParsedMonthContext } from '../context/month.context';

export const BudgetsContext = createContext();
export const ThisMonthBudgetContext = createContext();
export const DispatchContext = createContext();

export function BudgetsProvider(props) {
	const { budgets, dispatch } = useBudgetsReducer(budgetsReducer);
	const parsedMonth = useContext(ParsedMonthContext);
	const thisMonthBudget = budgets[parsedMonth];

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
