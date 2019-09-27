import React, { Component } from 'react';
import './Transaction.css';

export class Transaction extends Component {
	handleRemove = () => {
		this.props.removeTransaction(this.props.id);
	};

	render() {
		const { name, date, amount, note } = this.props;
		return (
			<p className="Transaction">
				<span className="Transaction__name">{name}</span>
				<span className="Transaction__date">{date}</span>
				<span className="Transaction__amount">{amount}</span>
				<a className="Transaction__remove-btn" onClick={this.handleRemove}>
					<i className="fas fa-trash" />
				</a>
			</p>
		);
	}
}

export default Transaction;
