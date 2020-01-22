import React from 'react';
import { AuthProvider } from './context/auth.context';
import { CategoriesProvider } from './context/categories.context';
import { TransactionsProvider } from './context/transactions.context';
import { CurrencyProvider } from './context/currency.context';
import { BudgetsProvider } from './context/budgets.context';
import { JarsProvider } from './context/jars.context';
import { MonthProvider } from './context/month.context';
import { TipsProvider } from './context/tips.context';
import theme from './muiTheme';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function Providers({ children }) {
	const up600 = useMediaQuery('(min-width:600px)');

	return (
		<ThemeProvider theme={theme}>
			<SnackbarProvider maxSnack={up600 ? 3 : 1}>
				<AuthProvider>
					<CategoriesProvider>
						<MonthProvider>
							<CurrencyProvider>
								<TransactionsProvider>
									<BudgetsProvider>
										<JarsProvider>
											<TipsProvider>{children}</TipsProvider>
										</JarsProvider>
									</BudgetsProvider>
								</TransactionsProvider>
							</CurrencyProvider>
						</MonthProvider>
					</CategoriesProvider>
				</AuthProvider>
			</SnackbarProvider>
		</ThemeProvider>
	);
}

export default Providers;
