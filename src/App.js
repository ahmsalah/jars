import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import uuid from 'uuid/v4';
import './App.css';
import Transactions from './Pages/Transactions';
import Categories from './Pages/Categories';
import Sidebar from './Components/Sidebar';
import arrayMove from 'array-move';
import { pushToArrays } from './helpers';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const theme = createMuiTheme({
	palette: {
		primary: { main: '#1aa333' },
		secondary: { main: '#de474e' }
	}
});

function App() {
	const initialCategories = [
		{ id: uuid(), name: 'Groceries', type: 'exp' },
		{ id: uuid(), name: 'Internet', type: 'exp' },
		{ id: uuid(), name: 'Phone', type: 'exp' },
		{ id: uuid(), name: 'Transportation', type: 'exp' },
		{ id: uuid(), name: 'Gas', type: 'exp' },
		{ id: uuid(), name: 'Electricity', type: 'exp' },
		{ id: uuid(), name: 'Shopping', type: 'exp' },

		{ id: uuid(), name: 'Salary', type: 'inc' },
		{ id: uuid(), name: 'Savings', type: 'inc' },
		{ id: uuid(), name: 'Bonus', type: 'inc' },
		{ id: uuid(), name: 'Others', type: 'inc' },
		{ id: uuid(), name: 'Gifts', type: 'inc' },
		{ id: uuid(), name: 'Interest Money', type: 'inc' }
	];

	const [ allCategories, setAllCategories ] = useState(initialCategories);
	const [ expCategories, setExpCategories ] = useState([]);
	const [ incCategories, setIncCategories ] = useState([]);

	useEffect(
		() => {
			const splitCategories = () => {
				let [ incArray, expArray ] = pushToArrays(allCategories);
				setExpCategories(expArray);
				setIncCategories(incArray);
			};
			splitCategories();
		},
		[ allCategories ]
	);

	const onSortEnd = ({ oldIndex, newIndex, collection }) => {
		collection === 'exp'
			? setExpCategories(expCategories =>
					arrayMove(expCategories, oldIndex, newIndex)
				)
			: setIncCategories(incCategories =>
					arrayMove(incCategories, oldIndex, newIndex)
				);
	};

	const removeCategory = id => {
		const updatedCategories = allCategories.filter(ct => ct.id !== id);
		setAllCategories(updatedCategories);
	};

	const addCategory = newCategory => {
		setAllCategories([ ...allCategories, newCategory ]);
	};

	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<Sidebar />
				<Switch>
					<Route
						exact
						path="/"
						render={() => (
							<Transactions
								expCategories={expCategories}
								incCategories={incCategories}
							/>
						)}
					/>
					<Route
						exact
						path="/categories"
						render={() => (
							<Categories
								expCategories={expCategories}
								incCategories={incCategories}
								addCategory={addCategory}
								removeCategory={removeCategory}
								onSortEnd={onSortEnd}
							/>
						)}
					/>
					<Route
						exact
						path="/budget"
						render={() => (
							<div
								style={{
									height: '100vh',
									marginTop: '30vh'
								}}>
								<Typography align="center" variant="h1" component="h2">
									Coming Soon!
								</Typography>
							</div>
						)}
					/>{' '}
					<Route
						exact
						path="/reports"
						render={() => (
							<div
								style={{
									height: '100vh',
									marginTop: '30vh'
								}}>
								<Typography align="center" variant="h1">
									Coming Soon!
								</Typography>
							</div>
						)}
					/>
					<Redirect to="/" />
				</Switch>
			</div>
		</ThemeProvider>
	);
}

export default App;
