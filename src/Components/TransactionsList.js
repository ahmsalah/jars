import React, { Component } from 'react';
import Transaction from './Transaction';
import './TransactionsList.css';

export class TransactionsList extends Component {
	render() {
		return (
			<div className="TransactionsList">
				{this.props.transactions.map(tr => (
					<Transaction
						key={tr.id}
						id={tr.id}
						type={tr.type}
						category={tr.category}
						description={tr.description}
						amount={tr.amount}
						date={tr.date}
						removeTransaction={this.props.removeTransaction}
					/>
				))}
			</div>
		);
	}
}

export default TransactionsList;
