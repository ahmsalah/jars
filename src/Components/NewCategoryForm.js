import React from 'react';
import uuid from 'uuid/v4';
import BtnSwitch from './BtnSwitch';
import './NewCategoryForm.css';
import useInputState from '../hooks/useInputState';
import useToggleState from '../hooks/useToggleState';

function NewCategoryForm({ addCategory }) {
	const [ name, handleChange, reset ] = useInputState('');
	const [ isExpense, toggleIsExpense ] = useToggleState(true);

	const handleSubmit = evt => {
		evt.preventDefault();
		const type = isExpense ? 'exp' : 'inc';
		const newCategory = { name: name, id: uuid(), type: type };
		addCategory(newCategory);
		reset();
	};

	return (
		<form className="NewCategoryForm" onSubmit={handleSubmit}>
			<label htmlFor="name">New Category </label>
			<input
				type="text"
				placeholder="Category Name"
				id="name"
				value={name}
				onChange={handleChange}
				required
			/>
			<BtnSwitch toggleExpense={() => toggleIsExpense()} />
			<button>Add</button>
		</form>
	);
}

export default NewCategoryForm;
