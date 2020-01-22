import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TransactionsContext } from '../context/transactions.context';
import BudgetItem from '../components/BudgetItem';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ThisMonthBudgetContext, BudgetsContext } from '../context/budgets.context';
import useSorting from '../hooks/useSorting';
import BudgetSummary from '../components/BudgetSummary';
import Collapse from '@material-ui/core/Collapse';
import Loader from '../components/Loader';
import { TipsContext, DispatchTipsContext } from '../context/tips.context';
import Layout from '../components/Layout';

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
	const budgets = useContext(BudgetsContext);
	const showTips = useContext(TipsContext);
	const dispatchTips = useContext(DispatchTipsContext);

	const { onBudgetsDragEnd } = useSorting();
	const initialTips = {
		0: false,
		1: false,
		2: false,
		3: false,
		4: false,
		5: false,
		6: false
	};
	const tips = [
		'These are your budgets',
		'Jars initially comes with 6 budgets: Others, Shopping, Transportation, Bills & Utilities, Personal, Home.',
		'You can add more, delete or adjust these budgets as you wish.',
		'Each budget contains expense categories that are similar to one another.',
		'They are draggable, meaning that you can drag and drop a category from/to other budgets.',
		'Set the planned amount for each budget from here',
		'This is the overall summary of your budgets, the left side is the total of your income and expenses transactions, and the right side is what you plan for them.'
	];
	const [ tipOpen, setTipOpen ] = useState(initialTips);

	useEffect(
		() => {
			!!showTips.budgets && setTipOpen(tipOpen => ({ ...tipOpen, 0: true }));
		},
		[ showTips.budgets ]
	);

	const handleNextTip = (i, ref) => e => {
		setTipOpen(tipOpen => ({ ...tipOpen, [i]: false, [i + 1]: true }));

		!!ref && ref.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
		i === 5 && window.scroll({ top: 0, behavior: 'smooth' });

		// if the tip is the last one, set showTips to false for budgets
		if (i === tips.length - 1) {
			dispatchTips({ type: 'SET_SECTION_TIPS', section: 'budgets', open: false });
		}
	};

	return (
		<Layout>
			{!!Object.keys(budgets).length ? (
				<div className={classes.root}>
					<BudgetSummary tipOpen={tipOpen} tips={tips} handleNextTip={handleNextTip} />
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
												const budgetItem =
													thisMonthBudget.allBudgets[budgetId];

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

												const ref = React.createRef();

												return (
													<BudgetItem
														ref={ref}
														index={i}
														key={budgetId}
														budgetId={budgetId}
														budgetItem={budgetItem}
														categories={categoriesList}
														actual={totalActual}
														pMonth={thisMonthBudget.pMonth}
														tipOpen={tipOpen}
														tips={tips}
														handleNextTip={handleNextTip}
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
			) : (
				<Loader />
			)}
		</Layout>
	);
}

export default Budgets;
