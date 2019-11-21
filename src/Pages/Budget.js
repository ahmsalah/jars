import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { initialBudgets } from '../initialData';
import { CategoriesContext } from '../context/categories.context';
import { TransactionsContext } from '../context/transactions.context';
import BudgetItem from '../components/BudgetItem';

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
	root: {
		margin: `${spacing(5)}px auto ${spacing(2)}px`,
		[breakpoints.up('sm')]: {
			minWidth: spacing(50)
		},
		[breakpoints.up('lg')]: {
			transform: 'translateX(-60px)'
		}
	}
}));

function Budget() {
	const classes = useStyles();
	const [ budgets, setBudgets ] = useState(initialBudgets);
	const categories = useContext(CategoriesContext);
	const { transactions } = useContext(TransactionsContext);

	return (
		<div className={classes.root}>
			{categories.allCategories &&
				budgets.listOrder.map(listID => {
					const list = budgets.lists[listID];
					const categoriesList = list.categoriesIds.map(
						ctID => categories.allCategories[ctID]
					);
					const actual = transactions.filter(tr =>
						list.categories.some(ct => ct.id === tr.category.id)
					);
					const totalActual = actual.reduce((acc, curr) => acc + curr.amount, 0);
					return (
						<BudgetItem
							key={listID}
							id={listID}
							list={list}
							categories={list.categories}
							actual={totalActual}
						/>
					);
				})}
		</div>
	);
}

export default Budget;
