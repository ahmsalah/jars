import React from 'react';
import TransactionItem from './TransactionItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette, spacing }) => ({
	root: {},
	noTransactions: {
		padding: spacing(15, 2),
		backgroundColor: palette.grey.light[2],
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
}));

function TransactionsList({ transactions, removeTransaction }) {
	const classes = useStyles();
	return transactions.length !== 0 ? (
		<List className={classes.root}>
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
	) : (
		<div className={classes.noTransactions}>
			<Typography variant="h2">{`No transactions :)`}</Typography>
		</div>
	);
}

export default TransactionsList;
