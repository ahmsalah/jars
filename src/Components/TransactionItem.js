import React from 'react';
import './TransactionItem.css';

function TransactionItem({ id, category, date, amount, type, removeTransaction }) {
	const handleRemove = () => {
		removeTransaction(id);
	};
	return (
		<p className="TransactionItem">
			<span className="TransactionItem__name">{category}</span>
			<span className="TransactionItem__date">{date}</span>
			<span className={`TransactionItem__amount ${type === 'exp' ? 'exp' : 'inc'}`}>
				{amount}
			</span>
			<button className="TransactionItem__remove-btn" onClick={handleRemove}>
				<i className="fas fa-trash" />
			</button>
		</p>
	);
}

export default TransactionItem;
