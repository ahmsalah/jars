import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Summary from './Summary';
import TransactionsList from './TransactionsList';

/**
|--------------------------------------------------
| -- add transaction type
| -- implement deleteTransaction
| -- change amount in newTransactionForm from string to number

| -- calculate all incomes and expenses and display with the total in Summary
| -- 
|--------------------------------------------------
*/

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			transactions: [
				// {
				// 	name: 'Salary',
				// 	amount: 3000,
				// 	date: '2019-09-26',
				// 	note: ''
				// },
				// {
				// 	name: 'Savings',
				// 	amount: 200,
				// 	date: '2019-09-26',
				// 	note: ''
				// }
			],
			inc: [],
			exp: []
		};
	}

	addTransaction = newTransaction => {
		this.setState({ transactions: [ ...this.state.transactions, newTransaction ] }, () =>
			this.calcTotal()
		);
	};

	calcTotal = () => {
		let totalInc = [];
		let totalExp = [];
		this.state.transactions.map(tr => {
			if (tr.type === 'inc') {
				totalInc.push(tr.amount);
			} else if (tr.type === 'exp') {
				totalExp.push(tr.amount);
			}
		});
		// console.log(totalInc, totalExp);
		this.setState({ inc: totalInc, exp: totalExp });
	};

	// addAmount = (newAmount, type) => {
	// 	if (type === 'exp') {
	// 		this.setState({ exp: [ ...this.state.exp, newAmount ] });
	// 	} else if (type === 'inc') {
	// 		this.setState({ inc: [ ...this.state.inc, newAmount ] });
	// 	}
	// };

	removeTransaction = id => {
		this.setState(
			{
				transactions: this.state.transactions.filter(tr => tr.id !== id)
			},
			() => this.calcTotal()
		);
	};

	sumTotal = arr => {
		const reducer = (acc, curr) => acc + curr;
		return arr.length > 0 ? arr.reduce(reducer) : 0;
	};

	render() {
		const { transactions, exp, inc } = this.state;
		return (
			<div className="App">
				<Navbar addTransaction={this.addTransaction} calcTotal={this.calcTotal} />
				<div className="App__content">
					<Summary exp={exp} inc={inc} sumTotal={this.sumTotal} />
					<TransactionsList
						transactions={transactions}
						removeTransaction={this.removeTransaction}
					/>
				</div>
			</div>
		);
	}
}

export default App;
