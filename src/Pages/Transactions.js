import React, { useState, useEffect } from 'react';

import Navbar from '../Components/Navbar';
import Summary from '../Components/Summary';
import TransactionsList from '../Components/TransactionsList';
import Filters from '../Components/Filters';

import useToggleState from '../hooks/useToggleState';
import { sortList, pushToArrays, sumTotal } from '../helpers';
import { Paper } from '@material-ui/core';
import { initialTransactions } from '../initialData';

function Transactions({ expCategories, incCategories }) {
	const [ transactions, setTransactions ] = useState(initialTransactions);
	const [ displayTransactions, setDisplayTransactions ] = useState(transactions);
	const [ expTransactions, setExpTransactions ] = useState([]);
	const [ incTransactions, setIncTransactions ] = useState([]);
	const [ orderBy, setOrderBy ] = useState('date');
	const [ isReversed, toggleIsReversed ] = useToggleState(false);

	useEffect(
		() => {
			const sortedTransactions = sortList(transactions, orderBy, isReversed);
			setDisplayTransactions(sortedTransactions);
		},
		[ orderBy, transactions, isReversed ]
	);

	useEffect(
		() => {
			const [ incArray, expArray ] = pushToArrays(transactions, 'amount');
			setExpTransactions(expArray);
			setIncTransactions(incArray);
		},
		[ transactions ]
	);

	//------ Adding & Removing Transactions -----//
	const addTransaction = newTransaction => {
		console.log(newTransaction);
		isReversed
			? setTransactions([ ...transactions, newTransaction ])
			: setTransactions([ newTransaction, ...transactions ]);
	};

	const removeTransaction = id => {
		const updatedTransactions = transactions.filter(tr => tr.id !== id);
		setTransactions(updatedTransactions);
	};
	//-------------------------------------------//

	//--------- Sorting Transactions ------------//
	const handleChange = evt => {
		setOrderBy(evt.target.value);
	};
	//-------------------------------------------//

	const [ totalInc, totalExp ] = [
		sumTotal(incTransactions),
		sumTotal(expTransactions)
	];
	return (
		<React.Fragment>
			<Navbar
				addTransaction={addTransaction}
				expCategories={expCategories}
				incCategories={incCategories}
			/>

			<div
				style={{
					maxWidth: '650px',
					margin: '120px auto 50px',
					flex: 1
				}}>
				<Summary totalInc={totalInc} totalExp={totalExp} />

				<Paper
					style={{
						overflow: 'hidden'
					}}>
					<Filters
						toggleListReverse={() => {
							toggleIsReversed();
						}}
						isReversed={isReversed}
						handleChange={handleChange}
						orderBy={orderBy}
					/>

					<TransactionsList
						transactions={displayTransactions}
						removeTransaction={removeTransaction}
					/>
				</Paper>
			</div>
		</React.Fragment>
	);
}

export default Transactions;
