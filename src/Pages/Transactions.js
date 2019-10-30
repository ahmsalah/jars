import React from 'react';
import Summary from '../components/Summary';
import TransactionsList from '../components/TransactionsList';
import Filters from '../components/Filters';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
	root: {
		maxWidth: spacing(52),
		margin: `${spacing(8)}px auto ${spacing(6)}px`,
		flex: 1,
		[breakpoints.up('sm')]: {
			maxWidth: spacing(70)
		},
		[breakpoints.up('md')]: {
			maxWidth: spacing(82)
		},
		[breakpoints.up('lg')]: {
			transform: 'translateX(-60px)'
		}
	},
	content: {
		overflow: 'hidden'
	}
}));

function Transactions() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Summary />

			<Paper className={classes.content}>
				<Filters />
				<TransactionsList />
			</Paper>
		</div>
	);
}

export default Transactions;
