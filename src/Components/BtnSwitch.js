import React from 'react';
import './BtnSwitch.css';

function BtnSwitch({ toggleExpense, isExpense }) {
	return (
		<label className="BtnSwitch">
			<input type="checkbox" onChange={toggleExpense} defaultChecked={isExpense} />
			<span data-on="Expense" data-off="Income" />
		</label>
	);
}

export default BtnSwitch;
