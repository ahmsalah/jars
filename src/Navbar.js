import React, { Component } from 'react';
import NewTransactionForm from './NewTransactionForm';
import './Navbar.css';

export class Navbar extends Component {
	render() {
		return (
			<div className="Navbar">
				<NewTransactionForm addTransaction={this.props.addTransaction} />
			</div>
		);
	}
}

export default Navbar;
