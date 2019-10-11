import React, { useState, useEffect } from 'react';

import Navbar from '../Components/Navbar';
import Summary from '../Components/Summary';
import TransactionsList from '../Components/TransactionsList';
import Filters from '../Components/Filters';

import useToggleState from '../hooks/useToggleState';
import { sortList, pushToArrays, sumTotal, filterArrayByDate } from '../helpers';
import { Paper } from '@material-ui/core';
import { initialTransactions } from '../initialData';
import useInputState from '../hooks/useInputState';

function Transactions({ expCategories, incCategories }) {
	const [ transactions, setTransactions ] = useState(initialTransactions);
	const [ sortedTransactions, setSortedTransactions ] = useState(transactions);
	const [ filteredTransactions, setFilteredTransactions ] = useState(sortedTransactions);
	const [ expTransactions, setExpTransactions ] = useState([]);
	const [ incTransactions, setIncTransactions ] = useState([]);
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
		[ sortBy, filteredTransactions, isReversed ]
	);

	useEffect(
		() => {
			const [ incArray, expArray ] = pushToArrays(filteredTransactions, 'amount');
			setExpTransactions(expArray);
			setIncTransactions(incArray);
		},
		[ filteredTransactions ]
	);

	//------ Adding & Removing Transactions -----//
	const addTransaction = newTransaction => {
		isReversed
			? setTransactions([ ...transactions, newTransaction ])
			: setTransactions([ newTransaction, ...transactions ]);
	};

	const removeTransaction = id => {
		const updatedTransactions = transactions.filter(tr => tr.id !== id);
		setTransactions(updatedTransactions);
	};
	//-------------------------------------------//

	const [ totalInc, totalExp ] = [ sumTotal(incTransactions), sumTotal(expTransactions) ];

	return (
		<React.Fragment>
			<Navbar
				addTransaction={addTransaction}
				expCategories={expCategories}
				incCategories={incCategories}
				selectedDate={selectedDate}
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
						handleChange={handleSortByChange}
						sortBy={sortBy}
						selectedDate={selectedDate}
						handleDateChange={handleDateChange}
					/>

					<TransactionsList
						transactions={sortedTransactions}
						removeTransaction={removeTransaction}
					/>
				</Paper>
			</div>
		</React.Fragment>
	);
}

export default Transactions;
