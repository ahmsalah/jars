import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import './CategoryList.css';

const CategoryItem = SortableElement(({ id, type, name, removeCategory }) => {
	const handleRemove = () => {
		removeCategory(id);
	};

	return (
		<div className="CategoryItem">
			<div className="CategoryItem__inner">
				<span>{name}</span>
				<button className="CategoryItem__remove-btn" onClick={handleRemove}>
					<i className="fas fa-trash" />
				</button>
			</div>
		</div>
	);
});

export default CategoryItem;
