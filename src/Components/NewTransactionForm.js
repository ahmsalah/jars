import React from 'react';
import uuid from 'uuid/v4';
import './NewTransactionForm.css';
import BtnSwitch from './BtnSwitch';
import useInputState from '../hooks/useInputState';
import useToggleState from '../hooks/useToggleState';

function NewTransactionForm({ expCategories, incCategories, addTransaction }) {
	const d = new Date();
	const month = (d.getMonth() + 1).toString().padStart(2, '0');
	const day = d.getDate().toString().padStart(2, '0');
	const year = d.getFullYear();
	const curDate = `${year}-${month}-${day}`;

	const [ category, handleCategoryChange ] = useInputState('');
	const [ description, handleDescriptionChange, resetDescription ] = useInputState('');
	const [ amount, handleAmountChange, resetAmount ] = useInputState('');
	const [ date, handleDateChange ] = useInputState(curDate);
	const [ isExpense, toggleIsExpense ] = useToggleState(true);

	const handleSubmit = evt => {
		evt.preventDefault();
		let newAmount = parseInt(amount);
		let type;
		if (isExpense) {
			newAmount = newAmount * -1;
			type = 'exp';
		} else {
			type = 'inc';
		}
		const transaction = {
			category: category,
			description: description,
			amount: newAmount,
			date: date,
			id: uuid(),
			type: type
		};

		// resetCategory();
		addTransaction(transaction);
		resetDescription();
		resetAmount();
	};

	return (
		<form className="NewTransactionForm" onSubmit={handleSubmit}>
			<BtnSwitch toggleExpense={() => toggleIsExpense()} />
			<select
				name="category"
				value={category}
				onChange={handleCategoryChange}
				required>
				<option value="">Choose Category</option>
				{isExpense ? (
					expCategories.map(ct => (
						<option key={ct.id} value={ct.name}>
							{ct.name}
						</option>
					))
				) : (
					incCategories.map(ct => (
						<option key={ct.id} value={ct.name}>
							{ct.name}
						</option>
					))
				)}
			</select>
			<label htmlFor="description">Description </label>
			<input
				type="text"
				placeholder="Description"
				id="description"
				name="description"
				value={description}
				onChange={handleDescriptionChange}
			/>
			<label htmlFor="amount">Amount </label>
			<input
				type="number"
				placeholder="Amount"
				id="amount"
				name="amount"
				value={amount}
				onChange={handleAmountChange}
				required
			/>
			<label htmlFor="date">Date </label>
			<input
				type="date"
				id="date"
				name="date"
				value={date}
				onChange={handleDateChange}
				required
			/>
			<button>Add</button>
		</form>
	);
}

export default NewTransactionForm;
