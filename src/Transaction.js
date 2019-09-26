import React, { Component } from 'react';
import './Transaction.css';

export class Transaction extends Component {
	render() {
		const { name, date, amount, note } = this.props;
		return (
			<p className="Transaction">
				<span className="Transaction-name">{name}</span>
				<span className="Transaction-date">{date}</span>
				<span className="Transaction-amount">{amount}</span>
			</p>
		);
	}
}

export default Transaction;
