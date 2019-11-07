import React, { useContext } from 'react';
import { TransactionsContext } from '../context/transactions.context';
import TransactionItem from './TransactionItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette, spacing, breakpoints }) => ({
	root: {},
	noTransactions: {
		padding: spacing(3, 2),
		backgroundColor: palette.grey.light[2],
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		'& img': {
			filter: 'grayscale(50%)',
			opacity: 0.9,
			width: spacing(25),
			marginTop: spacing(1)
		},
		'& > h4': {
			fontSize: '1.5rem',
			color: 'rgba(0,0,0,0.5)',
			textAlign: 'center',
			marginBottom: spacing(1),
			[breakpoints.up('sm')]: {
				fontSize: '2.125rem'
			}
		}
	}
}));

function TransactionsList() {
	const classes = useStyles();
	const { transactions } = useContext(TransactionsContext);

	return transactions.length !== 0 ? (
		<List component="div" className={classes.root}>
			{transactions.map((tr, i) => (
				<React.Fragment key={tr.id}>
					<TransactionItem
						id={tr.id}
						type={tr.type}
						category={tr.category}
						icon={tr.icon}
						description={tr.description}
						amount={tr.amount}
						date={tr.date}
					/>
					{i < transactions.length - 1 && <Divider />}
				</React.Fragment>
			))}
		</List>
	) : (
		<div className={classes.noTransactions}>
			<Typography variant="h4">No transactions here</Typography>
			<Typography variant="h4">start adding now</Typography>
			<img src={require(`../assets/sad-jar.png`)} alt="No Transactions" />
		</div>
	);
}

export default TransactionsList;
