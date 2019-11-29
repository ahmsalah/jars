import React, { useContext } from 'react';
import Summary from '../components/Summary';
import TransactionsList from '../components/TransactionsList';
import Filters from '../components/Filters';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../components/Loader';
import { IsTrLoadingContext } from '../context/transactions.context';

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
	root: {
		maxWidth: '93vw',
		margin: spacing(8, 2, 6),
		flex: 1,
		[breakpoints.up('sm')]: {
			maxWidth: spacing(70)
		},
		[breakpoints.up('md')]: {
			maxWidth: spacing(82)
		},
		[breakpoints.up('lg')]: {
			marginRight: spacing(16)
		}
	},
	content: {
		overflow: 'hidden'
	}
}));

function Transactions() {
	const classes = useStyles();
	const isTrLoading = useContext(IsTrLoadingContext);

	return (
		<div className={classes.root}>
			{isTrLoading ? (
				<Loader />
			) : (
				<React.Fragment>
					<Summary />
					<Paper className={classes.content}>
						<Filters />
						<TransactionsList />
					</Paper>
				</React.Fragment>
			)}
		</div>
	);
}

export default Transactions;
