import React from 'react';
import NewTransactionForm from './NewTransactionForm';
import './Navbar.css';
import NewCategoryForm from './NewCategoryForm';

function Navbar({ display, expCategories, incCategories, addTransaction, addCategory }) {
	return (
		<div className="Navbar">
			{display === 'categories' ? (
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

export default Navbar;
