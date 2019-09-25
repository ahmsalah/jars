import React, { Component } from 'react';
import Transaction from './Transaction';
import './TransactionsList.css';

export class TransactionsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			transactions: [
				{
					name: 'Salary',
					amount: 3000,
					date: '2019-09-26',
					note: ''
				},
				{
					name: 'Savings',
					amount: 200,
					date: '2019-09-26',
					note: ''
				}
			]
		};
	}

	render() {
		return (
			<div className="TransactionsList">
				{this.state.transactions.map(tr => (
					<Transaction name={tr.name} amount={tr.amount} date={tr.date} note={tr.note} />
				))}
			</div>
		);
	}
}

export default TransactionsList;
