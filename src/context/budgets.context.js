import React, { createContext } from 'react';
import useBudgetsReducer from '../hooks/useBudgetsReducer';
import budgetsReducer from '../reducers/budgets.reducer';

export const BudgetsContext = createContext();
export const DispatchContext = createContext();

export function BudgetsProvider(props) {
	const { budgets, dispatch } = useBudgetsReducer(budgetsReducer);

	return (
		<BudgetsContext.Provider value={budgets}>
			<DispatchContext.Provider value={dispatch}>{props.children}</DispatchContext.Provider>
		</BudgetsContext.Provider>
	);
}
