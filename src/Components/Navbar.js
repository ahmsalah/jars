import React from 'react';
import NewTransactionForm from './NewTransactionForm';
import NewCategoryForm from './NewCategoryForm';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useStyles from '../styles/NavbarStyles';

function Navbar({ display, expCategories, incCategories, addTransaction, addCategory }) {
	const classes = useStyles();
	return (
		<AppBar color="inherit" className={classes.root}>
			<Toolbar>
				{display === 'categories' ? (
					<NewCategoryForm addCategory={addCategory} />
				) : (
					<NewTransactionForm
						addTransaction={addTransaction}
						expCategories={expCategories}
						incCategories={incCategories}
					/>
				)}
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
