import React, { createContext, useState, useEffect, useReducer } from 'react';
import transactionsReducer from '../reducers/transactions.reducer';
import { initialTransactions } from '../initialData';
import { sortList, filterArrayByDate } from '../helpers';
import useToggleState from '../hooks/useToggleState';
import useInputState from '../hooks/useInputState';

export const TransactionsContext = createContext();
export const DispatchContext = createContext();

export function TransactionsProvider(props) {
	const [ transactions, dispatch ] = useReducer(transactionsReducer, initialTransactions);
	const [ filteredTransactions, setFilteredTransactions ] = useState(transactions);
	const [ sortedTransactions, setSortedTransactions ] = useState(filteredTransactions);
	const [ sortBy, handleSortByChange ] = useInputState('date');
	const [ isReversed, toggleIsReversed ] = useToggleState(false);
	const [ selectedDate, handleDateChange ] = useState(new Date());

	useEffect(
		() => {
			const updatedTransactions = filterArrayByDate(transactions, selectedDate);
			setFilteredTransactions(updatedTransactions);
		},
		[ transactions, selectedDate ]
	);

	useEffect(
		() => {
			const updatedTransactions = sortList(filteredTransactions, sortBy, isReversed);
			setSortedTransactions(updatedTransactions);
		},
		[ filteredTransactions, sortBy, isReversed ]
	);

	return (
		<TransactionsContext.Provider
			value={{
				transactions: sortedTransactions,
				toggleListReverse: toggleIsReversed,
				isReversed: isReversed,
				handleSortByChange: handleSortByChange,
				sortBy: sortBy,
				selectedDate: selectedDate,
				handleDateChange: handleDateChange
			}}>
			<DispatchContext.Provider value={dispatch}>{props.children}</DispatchContext.Provider>
		</TransactionsContext.Provider>
	);
}
