import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import './CategoryList.css';

const Category = SortableElement(({ id, type, name, removeCategory }) => {
	const handleRemove = () => {
		removeCategory(id);
	};

	return (
		<div className="CategoryList__category">
			<div className="CategoryList__category-inner">
				<span>{name}</span>
				<button className="CategoryList__remove-btn" onClick={handleRemove}>
					<i className="fas fa-trash" />
				</button>
			</div>
		</div>
	);
});

export default Category;
