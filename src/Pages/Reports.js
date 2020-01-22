import React, { useState, useContext, useEffect } from 'react';
import useStyles from '../components/styles/reports.styles';
import Typography from '@material-ui/core/Typography';
import DoughnutChart from '../components/DoughnutChart';
import LineChart from '../components/LineChart';
import Paper from '@material-ui/core/Paper';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import useChartData from '../hooks/useChartData';
import { formatAmount } from '../helpers';
import BarChart from '../components/BarChart';
import SelectedMonth from '../components/SelectedMonth';
import Loader from '../components/Loader';
import Collapse from '@material-ui/core/Collapse';
import {
	TransactionsContext,
	AllTransactionsContext,
	IsTrLoadingContext
} from '../context/transactions.context';
import ChartWrapper from '../components/ChartWrapper';
import Layout from '../components/Layout';

function Reports() {
	const classes = useStyles();
	const [ value, setValue ] = useState(0);
	const allTransactions = useContext(AllTransactionsContext);
	const transactions = useContext(TransactionsContext);
	const isTrLoading = useContext(IsTrLoadingContext);

	const { charts, colors, totalExpIncByMonth, cashFlow } = useChartData(
		transactions,
		allTransactions
	);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = index => {
		setValue(index);
	};

	const noExp = !charts[0].chartData.length;
	const noInc = !charts[1].chartData.length;

	useEffect(
		() => {
			noExp && !noInc && setValue(1);
		},
		[ noExp, noInc ]
	);

	return (
		<Layout>
			<div className={classes.root}>
				<Collapse in={!!allTransactions.length} timeout={800}>
					<div className={classes.flex}>
						<Paper className={classes.chartContainer}>
							<div className={classes.titleContainer}>
								<Typography className={classes.title}>
									Expenses and Income Structure
								</Typography>
								<Divider />
							</div>
							<Tabs
								classes={{ indicator: classes.tabIndicator }}
								className={classes.tabsButtons}
								value={value}
								onChange={handleChange}
								indicatorColor="primary"
								textColor="primary"
								variant="fullWidth"
								aria-label="full width tabs example">
								{charts.map(ch => (
									<Tab
										key={ch.type}
										disabled={!ch.chartData.length}
										classes={{ selected: classes.selectedButton }}
										className={classes.tabButton}
										label={ch.type === 'exp' ? 'Expenses' : 'Income'}
									/>
								))}
							</Tabs>
							<div className={classes.selectedMonth}>
								<SelectedMonth />
							</div>
							<SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
								{charts.map(ch => (
									<Collapse key={ch.type} in={!!ch.chartData.length}>
										<div className={classes.padding}>
											<Typography className={classes.total}>
												{formatAmount(ch.total)}
											</Typography>
											<DoughnutChart
												chartData={ch.chartData}
												colors={colors}
											/>
										</div>
									</Collapse>
								))}
							</SwipeableViews>
							<Collapse in={noExp && noInc}>
								<Typography align="center" className={classes.padding}>
									You haven't added any transactions this month.
								</Typography>
							</Collapse>
						</Paper>

						<Paper className={classes.chartContainer}>
							<div className={classes.titleContainer}>
								<Typography className={classes.title}>Cash Flow</Typography>
								<Divider />
							</div>
							<div className={classes.padding}>
								<LineChart chartData={cashFlow} />
							</div>
						</Paper>
						<Paper className={classes.chartContainer}>
							<div className={classes.titleContainer}>
								<Typography className={classes.title}>
									Income to Expense Comparison
								</Typography>
								<Divider />
							</div>
							<div className={classes.padding}>
								<BarChart chartData={totalExpIncByMonth} />
							</div>
						</Paper>
					</div>
				</Collapse>
				<Collapse in={isTrLoading}>
					<Loader />
				</Collapse>
				<Collapse in={!allTransactions.length && !isTrLoading}>
					<div className={classes.flex}>
						<div className={classes.chartContainer}>
							<Typography className={classes.typography}>
								Add your first transaction to enable reports!
							</Typography>
							<img
								className={classes.jarsImg}
								src={require(`../assets/all-jars.png`)}
								alt="No Transactions"
							/>
						</div>
					</div>
				</Collapse>
			</div>
		</Layout>
	);
}

export default Reports;
