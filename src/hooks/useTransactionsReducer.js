import { useState, useEffect, useReducer, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import firebase from '../firebase/firebase';
import useToggleState from '../hooks/useToggleState';
import useInputState from '../hooks/useInputState';
import { filterArrayByMonth } from '../helpers';

function useTransactionsReducer(transactionsReducer) {
	const currentUser = useContext(AuthContext);
	const [ transactions, dispatch ] = useReducer(transactionsReducer, []);
	const [ filteredTransactions, setFilteredTransactions ] = useState(transactions);
	const [ sortBy, handleSortByChange ] = useInputState('dateTimestamp');
	const [ isReversed, toggleIsReversed ] = useToggleState(false);
	const [ selectedDate, handleDateChange ] = useState(new Date());
	const [ isLoading, setIsLoading ] = useState(true);

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
						setFilteredTransactions(filterArrayByMonth(transactions, selectedDate));
						setIsLoading(false);
					});
				return () => unsubscribe();
			}
		},
		[ currentUser, sortBy, isReversed, selectedDate ]
	);

	return {
		transactions: filteredTransactions,
		isLoading,
		dispatch,
		isReversed,
		toggleIsReversed,
		sortBy,
		handleSortByChange,
		selectedDate,
		handleDateChange
	};
}

export default useTransactionsReducer;
