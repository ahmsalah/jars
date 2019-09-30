import React, { Component } from 'react';
import './TransactionItem.css';

export class TransactionItem extends Component {
	handleRemove = () => {
		this.props.removeTransaction(this.props.id);
	};

	render() {
		const { category, date, amount, type } = this.props;
		return (
			<p className="TransactionItem">
				<span className="TransactionItem__name">{category}</span>
				<span className="TransactionItem__date">{date}</span>
				<span
					className={`TransactionItem__amount ${type === 'exp'
						? 'exp'
						: 'inc'}`}>
					{amount}
				</span>
				<button
					className="TransactionItem__remove-btn"
					onClick={this.handleRemove}>
					<i className="fas fa-trash" />
				</button>
			</p>
		);
	}
}

export default TransactionItem;
