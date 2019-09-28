import React, { Component } from 'react';
import NewTransactionForm from './NewTransactionForm';
import './Navbar.css';
import NewCategoryForm from './NewCategoryForm';

export class Navbar extends Component {
	render() {
		const { expCategories, incCategories, addTransaction, addCategory } = this.props;
		return (
			<div className="Navbar">
				{this.props.display === 'categories' ? (
					<NewCategoryForm addCategory={addCategory} />
				) : (
					<NewTransactionForm
						addTransaction={addTransaction}
						expCategories={expCategories}
						incCategories={incCategories}
					/>
				)}
			</div>
		);
	}
}

export default Navbar;
