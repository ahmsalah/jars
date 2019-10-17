import React from 'react';
import NewTransactionForm from './NewTransactionForm';
import NewCategoryForm from './NewCategoryForm';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../firebase/firebase';

const useStyles = makeStyles(({ spacing }) => ({
	root: {
		zIndex: 280,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'flex-end',
		padding: spacing(0, 15, 0, 4),
		boxShadow:
			'0px 2px 2px -1px rgba(0,0,0,0.1), 0px 4px 2px 0px rgba(0,0,0,0.04), 0px 1px 4px 0px rgba(0,0,0,0.1)'
	}
}));

function Navbar({
	display,
	expCategories,
	incCategories,
	addTransaction,
	addCategory,
	selectedDate
}) {
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
						selectedDate={selectedDate}
					/>
				)}
				<button
					style={{ marginLeft: '20px' }}
					onClick={() => firebase.auth().signOut()}>
					Sign Out
				</button>
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
