import React from 'react';
import TransactionItem from './TransactionItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

function TransactionsList({ transactions, removeTransaction }) {
	return (
		<List>
			{transactions.map((tr, i) => (
				<React.Fragment key={tr.id}>
					<TransactionItem
						id={tr.id}
						type={tr.type}
						category={tr.category}
						description={tr.description}
						amount={tr.amount}
						date={tr.date}
						removeTransaction={removeTransaction}
					/>
					{i < transactions.length - 1 && <Divider />}
				</React.Fragment>
			))}
		</List>
	);
}

export default TransactionsList;
