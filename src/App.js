import React, { useEffect, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import Transactions from './pages/Transactions';
import Categories from './pages/Categories';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { CategoriesProvider } from './context/categories.context';
import { TransactionsProvider } from './context/transactions.context';
import PrivateRoute from './PrivateRoute';
import theme from './muiTheme';
import { AuthContext } from './context/auth.context';

function App({ hideLoader }) {
	useEffect(() => hideLoader(), [ hideLoader ]);
	const currentUser = useContext(AuthContext);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<CategoriesProvider>
				<TransactionsProvider>
					{currentUser && <Navbar />}
					<div style={{ display: 'flex' }}>
						{currentUser && <Sidebar />}
						<Switch>
							<PrivateRoute exact path="/" component={Transactions} />
							<Route exact path="/login" component={Login} />
							<PrivateRoute exact path="/categories" component={Categories} />
							<PrivateRoute
								exact
								path="/budget"
								component={() => (
									<div
										style={{
											height: '100vh',
											margin: '30vh auto 20px'
										}}>
										<Typography align="center" variant="h1" component="h2">
											Coming Soon!
										</Typography>
									</div>
								)}
							/>
							<PrivateRoute
								exact
								path="/reports"
								component={() => (
									<div
										style={{
											height: '100vh',
											margin: '30vh auto 20px'
										}}>
										<Typography align="center" variant="h1">
											Coming Soon!
										</Typography>
									</div>
								)}
							/>
						</Switch>
					</div>
				</TransactionsProvider>
			</CategoriesProvider>
		</ThemeProvider>
	);
}

export default App;
