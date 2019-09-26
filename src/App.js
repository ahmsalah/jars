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
			]
		};
	}
	addTransaction = newTransaction => {
		this.setState({ transactions: [ ...this.state.transactions, newTransaction ] });
	};

	render() {
		return (
			<div className="App">
				<Navbar addTransaction={this.addTransaction} />
				<div className="App__content">
					<Summary />
					<TransactionsList transactions={this.state.transactions} />
				</div>
			</div>
		);
	}
}

export default App;
