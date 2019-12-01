import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TransactionsContext } from '../context/transactions.context';
import BudgetItem from '../components/BudgetItem';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ThisMonthBudgetContext } from '../context/budgets.context';
import useSorting from '../hooks/useSorting';
import BudgetSummary from '../components/BudgetSummary';
import Collapse from '@material-ui/core/Collapse';

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
	const thisMonthBudget = useContext(ThisMonthBudgetContext);
	const { onBudgetsDragEnd } = useSorting();

	return (
		<div className={classes.root}>
			<BudgetSummary />
			<Collapse in={!!thisMonthBudget} timeout={700}>
				<DragDropContext onDragEnd={onBudgetsDragEnd}>
					<Droppable droppableId="all-lists" type="list">
						{provided => (
							<div
								ref={provided.innerRef}
								{...provided.droppableProps}
								className={classes.budgetList}>
								{!!thisMonthBudget &&
									thisMonthBudget.budgetsOrder.map((budgetId, i) => {
										const budgetItem = thisMonthBudget.allBudgets[budgetId];

										const categoriesList = budgetItem.categoriesIds.map(
											ctID =>
												budgetItem.categories.filter(
													ct => ct.id === ctID
												)[0]
										);
										const actual = !!transactions.length
											? transactions.filter(tr =>
													budgetItem.categories.some(
														ct => ct.id === tr.category.id
													)
												)
											: [];
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
												pMonth={thisMonthBudget.pMonth}
											/>
										);
									})}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</Collapse>
		</div>
	);
}

export default Budgets;
