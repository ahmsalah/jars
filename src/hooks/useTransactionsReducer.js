import { useState, useEffect, useReducer, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { MonthContext } from '../context/month.context';
import firebase from '../firebase/firebase';
import useToggleState from '../hooks/useToggleState';
import useInputState from '../hooks/useInputState';
import { filterArrayByMonth } from '../helpers';

function useTransactionsReducer(transactionsReducer) {
	const currentUser = useContext(AuthContext);
	const month = useContext(MonthContext);
	const [ transactions, dispatch ] = useReducer(transactionsReducer, []);
	const [ filteredTransactions, setFilteredTransactions ] = useState(transactions);
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
						const transactions = snapshot.docs.map(doc => ({
							id: doc.id,
							date: doc.data().dateTimestamp.toDate(),
							...doc.data()
						}));
						dispatch({ type: 'SET_CATEGORIES', transactions });
						setFilteredTransactions(filterArrayByMonth(transactions, month));
						setIsTrLoading(false);
					});
				return () => unsubscribe();
			}
		},
		[ currentUser, sortBy, isReversed, month ]
	);

	return {
		transactions: filteredTransactions,
		isTrLoading,
		dispatch,
		isReversed,
		toggleIsReversed,
		sortBy,
		setSortBy
	};
}

export default useTransactionsReducer;
