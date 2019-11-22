import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { initialBudgets } from '../initialData';
import { TransactionsContext } from '../context/transactions.context';
import BudgetItem from '../components/BudgetItem';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

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
	const { transactions } = useContext(TransactionsContext);

	const onBudgetsDragEnd = result => {
		const { destination, source, draggableId, type } = result;

		if (!destination) return;
		if (destination.droppableId === source.droppableId && destination.index === source.index)
			return;

		if (type === 'list') {
			const newListOrder = Array.from(budgets.listOrder);
			newListOrder.splice(source.index, 1);
			newListOrder.splice(destination.index, 0, draggableId);

			const newBudgets = {
				...budgets,
				listOrder: newListOrder
			};
			setBudgets(newBudgets);
			return;
		}

		const start = budgets.lists[source.droppableId];
		const finish = budgets.lists[destination.droppableId];
		const draggedItem = start.categories.filter(ct => ct.id === draggableId)[0];

		//moving within the same list
		if (start === finish) {
			const newCategoriesIds = Array.from(start.categoriesIds);
			newCategoriesIds.splice(source.index, 1);
			newCategoriesIds.splice(destination.index, 0, draggableId);
			const newCategories = Array.from(start.categories);
			newCategories.splice(source.index, 1);
			newCategories.splice(destination.index, 0, draggedItem);

			const newList = {
				...start,
				categoriesIds: newCategoriesIds,
				categories: newCategories
			};

			const newBudgets = {
				...budgets,
				lists: {
					...budgets.lists,
					[newList.id]: newList
				}
			};
			setBudgets(newBudgets);
			return;
		}

		// Moving from one line to another
		const startCategoriesIds = Array.from(start.categoriesIds);
		const startCategories = Array.from(start.categories);
		startCategoriesIds.splice(source.index, 1);
		startCategories.splice(source.index, 1);

		const newStart = {
			...start,
			categoriesIds: startCategoriesIds,
			categories: startCategories
		};

		const finishCategoriesIds = Array.from(finish.categoriesIds);
		const finishCategories = Array.from(finish.categories);
		finishCategoriesIds.splice(destination.index, 0, draggableId);
		finishCategories.splice(destination.index, 0, draggedItem);

		const newFinish = {
			...finish,
			categoriesIds: finishCategoriesIds,
			categories: finishCategories
		};

		const newBudgets = {
			...budgets,
			lists: {
				...budgets.lists,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish
			}
		};

		setBudgets(newBudgets);
	};

	return (
		<DragDropContext onDragEnd={onBudgetsDragEnd}>
			<Droppable droppableId="all-lists" type="list">
				{provided => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className={classes.root}>
						{!!transactions.length &&
							budgets.listOrder.map((listID, i) => {
								const list = budgets.lists[listID];

								const categoriesList = list.categoriesIds.map(
									ctID => list.categories.filter(ct => ct.id === ctID)[0]
								);

								const actual = transactions.filter(tr =>
									list.categories.some(ct => ct.id === tr.category.id)
								);
								const totalActual = actual.reduce(
									(acc, curr) => acc + curr.amount,
									0
								);
								return (
									<BudgetItem
										index={i}
										key={listID}
										id={listID}
										list={list}
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

export default Budget;
