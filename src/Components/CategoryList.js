import React from 'react';
import './CategoryItem.css';
import CategoryItem from './CategoryItem';
import { SortableContainer } from 'react-sortable-hoc';

const CategoryList = SortableContainer(({ categoryList, removeCategory, type }) => {
	return (
		<div className={`CategoryList__list CategoryList__list--${type}`}>
			<h3 className="CategoryList__title">
				{type === 'exp' ? 'Expenses' : 'Income'}
			</h3>
			{categoryList.map((ct, i) => (
				<CategoryItem
					index={i}
					key={ct.id}
					id={ct.id}
					name={ct.name}
					type={ct.type}
					removeCategory={removeCategory}
					collection={type}
				/>
			))}
		</div>
	);
});

export default CategoryList;
