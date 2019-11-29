import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TransactionsContext } from '../context/transactions.context';
import BudgetItem from '../components/BudgetItem';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { BudgetsContext } from '../context/budgets.context';
import useSorting from '../hooks/useSorting';
import BudgetSummary from '../components/BudgetSummary';

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
	root: {
		flex: 1,
		margin: spacing(5, 3, 3),
		[breakpoints.up('sm')]: {
			maxWidth: spacing(70)
		},
		[breakpoints.up('md')]: {
			maxWidth: spacing(75)
		},
		[breakpoints.up('lg')]: {
			marginRight: spacing(18)
		}
	},
	budgetList: {
		margin: '40px auto 0',
		flex: 1,
		[breakpoints.up('sm')]: {
			flex: 'none',
			minWidth: spacing(50),
			maxWidth: spacing(50)
		}
	}
}));

function Budgets() {
	const classes = useStyles();
	const transactions = useContext(TransactionsContext);
	const budgets = useContext(BudgetsContext);
	const { onBudgetsDragEnd } = useSorting();

	return (
		<div className={classes.root}>
			<BudgetSummary />
			<DragDropContext onDragEnd={onBudgetsDragEnd}>
				<Droppable droppableId="all-lists" type="list">
					{provided => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							className={classes.budgetList}>
							{!!transactions.length &&
								budgets.budgetsOrder.map((budgetId, i) => {
									const budgetItem = budgets.allBudgets[budgetId];

									const categoriesList = budgetItem.categoriesIds.map(
										ctID =>
											budgetItem.categories.filter(ct => ct.id === ctID)[0]
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
		</div>
	);
}

export default Budgets;
