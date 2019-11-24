import { useContext } from 'react';
import {
	BudgetsContext,
	DispatchContext as DispatchBudgetsContext
} from '../context/budgets.context';
import {
	CategoriesContext,
	DispatchContext as DispatchCategoriesContext
} from '../context/categories.context';

function useSorting() {
	const budgets = useContext(BudgetsContext);
	const dispatchBudgets = useContext(DispatchBudgetsContext);
	const categories = useContext(CategoriesContext);
	const dispatchCategories = useContext(DispatchCategoriesContext);

	const onBudgetsDragEnd = result => {
		const { destination, source, draggableId, type } = result;

		if (!destination) return;
		if (destination.droppableId === source.droppableId && destination.index === source.index)
			return;

		if (type === 'list') {
			const newBudgetsOrder = Array.from(budgets.budgetsOrder);
			newBudgetsOrder.splice(source.index, 1);
			newBudgetsOrder.splice(destination.index, 0, draggableId);

			const newBudgets = {
				...budgets,
				budgetsOrder: newBudgetsOrder
			};
			dispatchBudgets({ type: 'SET_BUDGETS', budgets: newBudgets });
			return;
		}

		const start = budgets.allBudgets[source.droppableId];
		const finish = budgets.allBudgets[destination.droppableId];
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
				allBudgets: {
					...budgets.allBudgets,
					[newList.id]: newList
				}
			};
			dispatchBudgets({ type: 'SET_BUDGETS', budgets: newBudgets });
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
			allBudgets: {
				...budgets.allBudgets,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish
			}
		};

		dispatchBudgets({ type: 'SET_BUDGETS', budgets: newBudgets });
	};

	const onCategoriesDragEnd = result => {
		const { destination, source, draggableId } = result;

		if (!destination) return;
		if (destination.droppableId === source.droppableId && destination.index === source.index)
			return;

		const list = categories.lists[source.droppableId];
		const newCategoriesIds = Array.from(list.categoriesIds);
		newCategoriesIds.splice(source.index, 1);
		newCategoriesIds.splice(destination.index, 0, draggableId);

		const newList = {
			...list,
			categoriesIds: newCategoriesIds
		};

		const newCategories = {
			...categories,
			lists: {
				...categories.lists,
				[newList.id]: newList
			}
		};

		dispatchCategories({
			type: 'MOVE_CATEGORIES',
			newCategories,
			newCategoriesIds,
			listId: list.id
		});
	};

	return { onBudgetsDragEnd, onCategoriesDragEnd };
}

export default useSorting;
