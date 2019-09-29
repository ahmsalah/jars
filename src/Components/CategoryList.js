import React from 'react';
import './CategoryList.css';
import Category from './Category';
import { SortableContainer } from 'react-sortable-hoc';

const CategoryList = SortableContainer(({ categoryList, removeCategory, type }) => {
	return (
		<div className={`CategoryList__list CategoryList__list--${type}`}>
			<h3 className="CategoryList__title">{type === 'exp' ? 'Expenses' : 'Income'}</h3>
			{categoryList.map((ct, i) => (
				<Category
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
