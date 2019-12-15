import React, { useEffect, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import Transactions from './pages/Transactions';
import Categories from './pages/Categories';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { CategoriesProvider } from './context/categories.context';
import { TransactionsProvider } from './context/transactions.context';
import { CurrencyProvider } from './context/currency.context';
import { BudgetsProvider } from './context/budgets.context';
import { JarsProvider } from './context/jars.context';
import { MonthProvider } from './context/month.context';
import { TipsProvider } from './context/tips.context';
import PrivateRoute from './PrivateRoute';
import theme from './muiTheme';
import { AuthContext } from './context/auth.context';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Budgets from './pages/Budgets';
import Jars from './pages/Jars';
import Reports from './pages/Reports';
import { SnackbarProvider } from 'notistack';

function App({ hideLoader }) {
	useEffect(() => hideLoader(), [ hideLoader ]);
	const currentUser = useContext(AuthContext);
	const up600 = useMediaQuery('(min-width:600px)');

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<CategoriesProvider>
				<MonthProvider>
					<CurrencyProvider>
						<TransactionsProvider>
							<BudgetsProvider>
								<JarsProvider>
									<TipsProvider>
										<SnackbarProvider maxSnack={up600 ? 3 : 1}>
											{currentUser && <Navbar />}
											<div
												style={
													currentUser && {
														display: 'flex',
														justifyContent: 'center'
													}
												}>
												{up600 && currentUser && <Sidebar />}

												<Switch>
													<PrivateRoute
														exact
														path="/"
														component={Transactions}
													/>
													<Route exact path="/login" component={Login} />
													<PrivateRoute
														exact
														path="/categories"
														component={Categories}
													/>
													<PrivateRoute
														exact
														path="/budgets"
														component={Budgets}
													/>
													<PrivateRoute
														exact
														path="/jars"
														component={Jars}
													/>
													<PrivateRoute
														exact
														path="/reports"
														component={Reports}
													/>
												</Switch>
											</div>
										</SnackbarProvider>
									</TipsProvider>
								</JarsProvider>
							</BudgetsProvider>
						</TransactionsProvider>
					</CurrencyProvider>
				</MonthProvider>
			</CategoriesProvider>
		</ThemeProvider>
	);
}

export default App;
