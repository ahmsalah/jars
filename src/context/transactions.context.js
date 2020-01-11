import React, { createContext, useState, useEffect, useReducer, useContext } from 'react';
import transactionsReducer from '../reducers/transactions.reducer';
import { AuthContext } from '../context/auth.context';
import { MonthContext } from '../context/month.context';
import firebase from '../firebase/firebase';
import useToggleState from '../hooks/useToggleState';
import useInputState from '../hooks/useInputState';
import { filterArrayByMonth } from '../helpers';

export const TransactionsContext = createContext();
export const AllTransactionsContext = createContext();
export const DispatchContext = createContext();
export const TransactionFiltersContext = createContext();
export const IsTrLoadingContext = createContext();

export function TransactionsProvider(props) {
	const currentUser = useContext(AuthContext);
	const month = useContext(MonthContext);
	const [ allTransactions, dispatch ] = useReducer(transactionsReducer, []);
	const [ transactions, setTransactions ] = useState(allTransactions);
	const [ sortBy, setSortBy ] = useInputState('dateTimestamp');
	const [ isReversed, toggleIsReversed ] = useToggleState(false);
	const [ isTrLoading, setIsTrLoading ] = useState(true);

	useEffect(
		() => {
			if (currentUser) {
				const orderDirection =
					sortBy === 'dateTimestamp'
						? isReversed ? 'asc' : 'desc'
						: isReversed ? 'desc' : 'asc';
				const unsubscribe = firebase
					.firestore()
					.collection('users')
					.doc(currentUser.uid)
					.collection('transactions')
					.orderBy(sortBy, orderDirection)
					.onSnapshot(snapshot => {
						const allTransactions = snapshot.docs.map(doc => ({
							id: doc.id,
							date: doc.data().dateTimestamp.toDate(),
							...doc.data()
						}));
						dispatch({ type: 'SET_TRANSACTIONS', transactions: allTransactions });
						setTransactions(filterArrayByMonth(allTransactions, month));
						setIsTrLoading(false);
					});
				return () => unsubscribe();
			}
		},
		[ currentUser, sortBy, isReversed, month ]
	);

	return (
		<TransactionsContext.Provider value={transactions}>
			<AllTransactionsContext.Provider value={allTransactions}>
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
			</AllTransactionsContext.Provider>
		</TransactionsContext.Provider>
	);
}
