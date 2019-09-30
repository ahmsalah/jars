import React from 'react';
import TransactionItem from './TransactionItem';
import './TransactionsList.css';

function TransactionsList({ transactions, removeTransaction }) {
	return (
		<div className="TransactionsList">
			{transactions.map(tr => (
				<TransactionItem
					key={tr.id}
					id={tr.id}
					type={tr.type}
					category={tr.category}
					description={tr.description}
					amount={tr.amount}
					date={tr.date}
					removeTransaction={removeTransaction}
				/>
			))}
		</div>
	);
}

export default TransactionsList;
