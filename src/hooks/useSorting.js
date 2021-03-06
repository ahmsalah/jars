import { useContext } from 'react';
import {
	ThisMonthBudgetContext,
	DispatchContext as DispatchBudgetsContext
} from '../context/budgets.context';
import {
	CategoriesContext,
	DispatchContext as DispatchCategoriesContext
} from '../context/categories.context';
import { ParsedMonthContext } from '../context/month.context';

function useSorting() {
	const thisMonthBudget = useContext(ThisMonthBudgetContext);
	const pMonth = useContext(ParsedMonthContext);
	const dispatchBudgets = useContext(DispatchBudgetsContext);
	const categories = useContext(CategoriesContext);
	const dispatchCategories = useContext(DispatchCategoriesContext);

	const onBudgetsDragEnd = result => {
		const { destination, source, draggableId, type } = result;

		if (!destination) return;
		if (destination.droppableId === source.droppableId && destination.index === source.index)
			return;

		if (type === 'list') {
			const newBudgetsOrder = Array.from(thisMonthBudget.budgetsOrder);
			newBudgetsOrder.splice(source.index, 1);
			newBudgetsOrder.splice(destination.index, 0, draggableId);

			const newBudgets = {
				...thisMonthBudget,
				budgetsOrder: newBudgetsOrder
			};
			dispatchBudgets({ type: 'SET_BUDGETS', budgets: newBudgets, pMonth });
			return;
		}

		const start = thisMonthBudget.allBudgets[source.droppableId];
		const finish = thisMonthBudget.allBudgets[destination.droppableId];
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
				...thisMonthBudget,
				allBudgets: {
					...thisMonthBudget.allBudgets,
					[newList.id]: newList
				}
			};
			dispatchBudgets({ type: 'SET_BUDGETS', budgets: newBudgets, pMonth });
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
			...thisMonthBudget,
			allBudgets: {
				...thisMonthBudget.allBudgets,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish
			}
		};

		dispatchBudgets({ type: 'SET_BUDGETS', budgets: newBudgets, pMonth });
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
