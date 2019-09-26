import React, { Component } from 'react';
import Transaction from './Transaction';
import './TransactionsList.css';

export class TransactionsList extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="TransactionsList">
				{this.props.transactions.map(tr => (
					<Transaction
						key={tr.id}
						name={tr.name}
						amount={tr.amount}
						date={tr.date}
						note={tr.note}
						addTransaction={this.props.addTransaction}
					/>
				))}
			</div>
		);
	}
}

export default TransactionsList;
