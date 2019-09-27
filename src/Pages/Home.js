import React, { Component } from 'react';
import './Home.css';
import Navbar from '../Components/Navbar';
import Summary from '../Components/Summary';
import TransactionsList from '../Components/TransactionsList';

export class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			transactions: [],
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
		this.setState({ inc: totalInc, exp: totalExp });
	};

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
			<div className="Home">
				<Navbar addTransaction={this.addTransaction} />
				<div className="Home__content">
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

export default Home;
