import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Transactions from './Pages/Transactions';
import Categories from './Pages/Categories';
import Sidebar from './Components/Sidebar';
import arrayMove from 'array-move';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { pushToArrays } from './helpers';
import { initialCategories } from './initialData';

const theme = createMuiTheme({
	palette: {
		primary: { main: '#1aa333' },
		secondary: { main: '#de474e' }
	}
});

function App() {
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
			<div style={{ displau: 'flex' }}>
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
