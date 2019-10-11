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
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
	palette: {
		background: { default: 'rgb(232, 232, 232)' },
		primary: { main: '#1aa333' },
		secondary: { main: '#de474e' },
		tertiary: { main: '#334960', sub: '#68788d' },
		grey: {
			light: {
				1: 'rgb(245,245,245)',
				2: 'rgb(242,242,242)',
				3: 'rgb(240, 240, 240)',
				4: 'rgb(238, 238, 238)',
				5: 'rgb(232, 232, 232)'
			},
			dark: {
				1: '#333',
				2: '#777',
				3: '#999'
			}
		}
	},
	overrides: {
		MuiCssBaseline: {
			'@global': {
				body: {
					backgroundColor: 'rgb(232, 232, 232)'
				}
			}
		}
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
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<div>
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
