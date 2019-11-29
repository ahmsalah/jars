import React, { createContext } from 'react';
import useTransactionsReducer from '../hooks/useTransactionsReducer';
import transactionsReducer from '../reducers/transactions.reducer';

export const TransactionsContext = createContext();
export const DispatchContext = createContext();
export const TransactionFiltersContext = createContext();
export const IsTrLoadingContext = createContext();

export function TransactionsProvider(props) {
	const {
		transactions,
		dispatch,
		isTrLoading,
		isReversed,
		toggleIsReversed,
		sortBy,
		setSortBy
	} = useTransactionsReducer(transactionsReducer);

	return (
		<TransactionsContext.Provider value={transactions}>
			<IsTrLoadingContext.Provider value={isTrLoading}>
				<TransactionFiltersContext.Provider
					value={{
						isReversed,
						toggleIsReversed,
						sortBy,
						setSortBy
					}}>
					<DispatchContext.Provider value={dispatch}>
						{props.children}
					</DispatchContext.Provider>
				</TransactionFiltersContext.Provider>
			</IsTrLoadingContext.Provider>
		</TransactionsContext.Provider>
	);
}
