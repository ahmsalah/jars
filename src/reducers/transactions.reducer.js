// import { TransactionsContext } from '../context/transactions.context';
// import React, { useContext } from 'react';
// const { isReversed } = useContext(TransactionsContext);

const transactionsReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TRANSACTION':
			// return isReversed ? [ ...state, action.transaction ] : [ action.transaction, ...state ];
			return [ action.transaction, ...state ];
		case 'REMOVE_TRANSACTION':
			return state.filter(tr => tr.id !== action.id);
		default:
			return state;
	}
};

export default transactionsReducer;
