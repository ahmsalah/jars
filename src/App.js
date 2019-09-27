import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Summary from './Summary';
import TransactionsList from './TransactionsList';

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
			exp: [],
			total: ''
		};
	}
	addTransaction = newTransaction => {
		this.setState({ transactions: [ ...this.state.transactions, newTransaction ] });
	};

	addAmount = (newAmount, type) => {
		if (type === 'exp') {
			this.setState({ exp: [ ...this.state.exp, newAmount ] });
		} else if (type === 'inc') {
			this.setState({ inc: [ ...this.state.inc, newAmount ] });
		}
	};

	removeTransaction = id => {
		this.setState({
			transactions: this.state.transactions.filter(tr => tr.id !== id)
		});
	};

	render() {
		return (
			<div className="App">
				<Navbar addTransaction={this.addTransaction} addAmount={this.addAmount} />
				<div className="App__content">
					<Summary />
					<TransactionsList
						transactions={this.state.transactions}
						removeTransaction={this.removeTransaction}
					/>
				</div>
			</div>
		);
	}
}

export default App;
