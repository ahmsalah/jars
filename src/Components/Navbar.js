import React, { Component } from 'react';
import NewTransactionForm from './NewTransactionForm';
import './Navbar.css';
import NewCategoryForm from './NewCategoryForm';

export class Navbar extends Component {
	render() {
		return (
			<div className="Navbar">
				{this.props.display === 'categories' ? (
					<NewCategoryForm addCategory={this.props.addCategory} />
				) : (
					<NewTransactionForm addTransaction={this.props.addTransaction} />
				)}
			</div>
		);
	}
}

export default Navbar;
