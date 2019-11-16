import React, { createContext } from 'react';
import useTransactionsReducer from '../hooks/useTransactionsReducer';
import transactionsReducer from '../reducers/transactions.reducer';

export const TransactionsContext = createContext();
export const DispatchContext = createContext();

export function TransactionsProvider(props) {
	const {
		transactions,
		dispatch,
		isLoading,
		isReversed,
		toggleIsReversed,
		sortBy,
		handleSortByChange,
		selectedDate,
		handleDateChange
	} = useTransactionsReducer(transactionsReducer);

	return (
		<TransactionsContext.Provider
			value={{
				transactions,
				isLoading,
				toggleIsReversed,
				isReversed,
				handleSortByChange,
				sortBy,
				selectedDate,
				handleDateChange
			}}>
			<DispatchContext.Provider value={dispatch}>{props.children}</DispatchContext.Provider>
		</TransactionsContext.Provider>
	);
}
