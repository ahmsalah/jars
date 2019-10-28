import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Transactions from './pages/Transactions';
import Categories from './pages/Categories';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import { ThemeProvider } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AuthProvider } from './context/auth.context';
import PrivateRoute from './PrivateRoute';
import theme from './muiTheme';
import { CategoriesProvider } from './context/categories.context';
import { TransactionsProvider } from './context/transactions.context';

function App() {
	return (
		<AuthProvider>
			<ThemeProvider theme={theme}>
				<CssBaseline />

				<div>
					<Switch>
						<CategoriesProvider>
							<TransactionsProvider>
								<PrivateRoute exact path="/" component={Transactions} />
							</TransactionsProvider>
							<Route exact path="/login" component={Login} />
							<PrivateRoute exact path="/categories" component={Categories} />
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

										<Typography align="center" variant="h1" component="h2">
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
						</CategoriesProvider>
					</Switch>
				</div>
			</ThemeProvider>
		</AuthProvider>
	);
}

export default App;
