import { useEffect, useReducer, useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import firebase from '../firebase/firebase';
import { initialBudgets } from '../initialData';

function useBudgetsReducer(budgetsReducer) {
	const currentUser = useContext(AuthContext);
	const [ budgets, dispatch ] = useReducer(budgetsReducer, initialBudgets);

	return {
		budgets,
		dispatch
	};
}

export default useBudgetsReducer;
