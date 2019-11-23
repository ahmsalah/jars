import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TransactionsContext } from '../context/transactions.context';
import BudgetItem from '../components/BudgetItem';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { BudgetsContext } from '../context/budgets.context';
import useSorting from '../hooks/useSorting';

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

function Budgets() {
	const classes = useStyles();
	const { transactions } = useContext(TransactionsContext);
	const budgets = useContext(BudgetsContext);
	const { onBudgetsDragEnd } = useSorting();

	return (
		<DragDropContext onDragEnd={onBudgetsDragEnd}>
			<Droppable droppableId="all-lists" type="list">
				{provided => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className={classes.root}>
						{!!transactions.length &&
							budgets.budgetsOrder.map((budgetId, i) => {
								const budgetItem = budgets.allBudgets[budgetId];

								const categoriesList = budgetItem.categoriesIds.map(
									ctID => budgetItem.categories.filter(ct => ct.id === ctID)[0]
								);

								const actual = transactions.filter(tr =>
									budgetItem.categories.some(ct => ct.id === tr.category.id)
								);
								const totalActual = actual.reduce(
									(acc, curr) => acc + curr.amount,
									0
								);
								return (
									<BudgetItem
										index={i}
										key={budgetId}
										budgetId={budgetId}
										budgetItem={budgetItem}
										categories={categoriesList}
										actual={totalActual}
									/>
								);
							})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}

export default Budgets;
