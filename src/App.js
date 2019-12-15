import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Transactions from './Pages/Transactions';
import Categories from './Pages/Categories';
import Login from './Pages/Login';
import Sidebar from './Components/Sidebar';
import arrayMove from 'array-move';
import { ThemeProvider } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { pushToArrays } from './helpers';
import { initialCategories } from './initialData';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute';
import theme from './muiTheme';

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

	//------ Dragging Categories -----//
	const onSortEnd = ({ oldIndex, newIndex, collection }) => {
		collection === 'exp'
			? setExpCategories(expCategories =>
					arrayMove(expCategories, oldIndex, newIndex)
				)
			: setIncCategories(incCategories =>
					arrayMove(incCategories, oldIndex, newIndex)
				);
	};

	//------ Adding & Removing Categories -----//
	const removeCategory = id => {
		const updatedCategories = allCategories.filter(ct => ct.id !== id);
		setAllCategories(updatedCategories);
	};

	const addCategory = newCategory => {
		setAllCategories([ ...allCategories, newCategory ]);
	};
	//-------------------------------------------//

	return (
		<AuthProvider>
			<ThemeProvider theme={theme}>
				<CssBaseline />

				<div>
					<Switch>
						<PrivateRoute
							exact
							path="/"
							component={props => (
								<Transactions
									{...props}
									expCategories={expCategories}
									incCategories={incCategories}
								/>
							)}
							// component={Transactions}
						/>
						<Route exact path="/login" component={Login} />
						<PrivateRoute
							exact
							path="/categories"
							component={() => (
								<Categories
									expCategories={expCategories}
									incCategories={incCategories}
									addCategory={addCategory}
									removeCategory={removeCategory}
									onSortEnd={onSortEnd}
								/>
							)}
						/>
						<PrivateRoute
							exact
							path="/budget"
							component={() => (
								<div
									style={{
										height: '100vh',
										marginTop: '30vh'
									}}>
									<Sidebar />

									<Typography
										align="center"
										variant="h1"
										component="h2">
										Coming Soon!
									</Typography>
								</div>
							)}
						/>{' '}
						<PrivateRoute
							exact
							path="/reports"
							component={() => (
								<div
									style={{
										height: '100vh',
										marginTop: '30vh'
									}}>
									<Sidebar />

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
		</AuthProvider>
	);
}

export default App;
