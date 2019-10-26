import React, { createContext, useState, useEffect, useReducer } from 'react';
import categoriesReducer from '../reducers/categories.reducer';
import arrayMove from 'array-move';
import { initialCategories } from '../initialData';
import { pushToArrays } from '../helpers';

export const CategoriesContext = createContext();
export const DispatchContext = createContext();

export function CategoriesProvider(props) {
	// const [ allCategories, setAllCategories ] = useState(initialCategories);
	const [ allCategories, dispatch ] = useReducer(categoriesReducer, initialCategories);
	const [ expCategories, setExpCategories ] = useState([]);
	const [ incCategories, setIncCategories ] = useState([]);

	useEffect(
		() => {
			const splitCategories = () => {
				let [ incArray, expArray ] = pushToArrays(allCategories);
				setExpCategories(expArray);
				setIncCategories(incArray);
			};
			splitCategories();
		},
		[ allCategories ]
	);

	//------ Dragging Categories -----//
	const onSortEnd = ({ oldIndex, newIndex, collection }) => {
		collection === 'exp'
			? setExpCategories(expCategories => arrayMove(expCategories, oldIndex, newIndex))
			: setIncCategories(incCategories => arrayMove(incCategories, oldIndex, newIndex));
	};

	return (
		<CategoriesContext.Provider
			value={{
				expCategories,
				incCategories,
				onSortEnd
			}}>
			<DispatchContext.Provider value={dispatch}>{props.children}</DispatchContext.Provider>
		</CategoriesContext.Provider>
	);
}
