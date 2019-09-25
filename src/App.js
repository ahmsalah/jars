import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Summary from './Summary';
import TransactionsList from './TransactionsList';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			expenses: [],
			income: [],
			total: 0
		};
	}

	render() {
		return (
			<div className="App">
				<Navbar />
				<div className="App__content">
					<Summary />
					<TransactionsList />
				</div>
			</div>
		);
	}
}

export default App;
