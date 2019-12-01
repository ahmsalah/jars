import React, { memo, useContext, useState, Fragment } from 'react';
import { TransactionsContext } from '../context/transactions.context';
import { ThisMonthBudgetContext } from '../context/budgets.context';
import { getPercentageOfTwoNumbers, calcExpInc, formatAmount } from '../helpers';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SelectedMonth from './SelectedMonth';
import LinearProgress from '@material-ui/core/LinearProgress';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import EditIcon from '@material-ui/icons/Edit';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PlannedIncForm from './PlannedIncForm';
import useStyles from './styles/budgetSummary.styles';
import MonthBudgetForm from './MonthBudgetForm';
import Tooltip from '@material-ui/core/Tooltip';

function BudgetSummary() {
	const classes = useStyles();
	const [ anchorEl, setAnchorEl ] = useState(null);
	const popoverOpen = Boolean(anchorEl);
	const id = popoverOpen ? 'simple-popover' : undefined;

	const [ plannedIncDialogOpen, setPlannedIncDialogOpen ] = useState(false);
	const [ monthBudgetDialog, setMonthBudgetDialog ] = useState(false);
	const transactions = useContext(TransactionsContext);
	const thisMonthBudget = useContext(ThisMonthBudgetContext);

	const matches = useMediaQuery('(max-width:600px)');

	const [ actualExp, actualInc ] = calcExpInc(transactions);
	const totalActual = actualExp + actualInc;
	const plannedInc = !thisMonthBudget ? 0 : thisMonthBudget.plannedInc;
	const plannedExp = !thisMonthBudget
		? 0
		: Object.values(thisMonthBudget.allBudgets).reduce((acc, curr) => acc + curr.planned, 0) *
			-1;
	const totalPlanned = plannedInc + plannedExp;

	const percentage = totalPlanned > 0 ? `(${parseInt(totalActual / totalPlanned * 100)}%)` : '';
	const [ incBarWidth, expBarWidth ] = getPercentageOfTwoNumbers(
		plannedInc,
		plannedExp * -1,
		true
	);
	return (
		<Fragment>
			<Popover
				id={id}
				open={popoverOpen}
				anchorEl={anchorEl}
				onClose={() => setAnchorEl(null)}>
				<div className={classes.morePopover}>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {
							setMonthBudgetDialog(true);
							setAnchorEl(null);
						}}>
						Reset this months's budgets
					</Button>
				</div>
			</Popover>
			<PlannedIncForm
				plannedInc={plannedInc}
				dialogOpen={plannedIncDialogOpen}
				setDialogOpen={setPlannedIncDialogOpen}
			/>
			<MonthBudgetForm dialogOpen={monthBudgetDialog} setDialogOpen={setMonthBudgetDialog} />
			<Paper className={classes.root}>
				<LinearProgress
					variant="determinate"
					className={classes.progressBar}
					value={!thisMonthBudget ? 0 : totalActual / totalPlanned * 100}
				/>
				<List className={classes.list}>
					<div className={classes.monthContainer}>
						<div className={classes.flexGrow}>
							<SelectedMonth />
						</div>
						{!!thisMonthBudget && (
							<Tooltip title="Reset Budgets" placement="top" arrow>
								<IconButton
									onClick={e => setAnchorEl(e.currentTarget)}
									className={classes.moreButton}
									aria-label="more options">
									<MoreHorizIcon fontSize="large" />
								</IconButton>
							</Tooltip>
						)}
					</div>
					<Divider />
					<Collapse in={!!thisMonthBudget} timeout={700}>
						<ListItem className={classes.titleContainer}>
							<Typography
								variant="h6"
								align="center"
								className={clsx(classes.title, classes.marginRightAuto)}>
								Planned
							</Typography>
							<Typography variant="h6" align="center" className={classes.title}>
								Actual
							</Typography>
						</ListItem>
						<ListItem className={classes.incContainer}>
							<ListItemText
								className={clsx(
									classes.listItemText,
									classes.width,
									classes.marginRightAuto
								)}
								primary={'Income'}
								secondary={
									plannedInc > 0 ? (
										<span className={classes.plannedIncomeWrapper}>
											<span>{formatAmount(plannedInc, '£', 0)}</span>
											<Tooltip
												title="Edit Planned Income"
												placement="top"
												arrow>
												<IconButton
													onClick={() => setPlannedIncDialogOpen(true)}>
													<EditIcon />
												</IconButton>
											</Tooltip>
										</span>
									) : (
										<Button
											variant="contained"
											color="primary"
											size="small"
											onClick={() => setPlannedIncDialogOpen(true)}>
											Plan
										</Button>
									)
								}
							/>

							{!matches && (
								<div
									className={clsx(classes.barContainer, classes.expBarContainer)}>
									<LinearProgress
										variant="determinate"
										style={{ width: `${incBarWidth}%` }}
										className={clsx(classes.incBar, classes.bar)}
										value={actualInc / plannedInc * 100}
									/>
								</div>
							)}
							<ListItemText
								className={clsx(
									classes.listItemText,
									classes.width,
									classes.alignRight
								)}
								primary="Income"
								secondary={formatAmount(actualInc, '£', 0)}
							/>
						</ListItem>
						{matches && (
							<ListItem className={classes.incMobOnlyBar}>
								<div
									className={clsx(classes.barContainer, classes.expBarContainer)}>
									<LinearProgress
										variant="determinate"
										style={{ width: `${incBarWidth}%` }}
										className={clsx(classes.incBar, classes.bar)}
										value={actualInc / plannedInc * 100}
									/>
								</div>
							</ListItem>
						)}
						<ListItem className={classes.expContainer}>
							<ListItemText
								className={clsx(
									classes.listItemText,
									classes.width,
									classes.marginRightAuto
								)}
								primary="Expenses"
								secondary={formatAmount(plannedExp, '£', 0)}
							/>
							{!matches && (
								<div
									className={clsx(classes.barContainer, classes.expBarContainer)}>
									<LinearProgress
										variant="determinate"
										style={{ width: `${expBarWidth}%` }}
										className={clsx(classes.expBar, classes.bar)}
										value={actualExp / plannedExp * 100}
									/>
								</div>
							)}
							<ListItemText
								className={clsx(
									classes.listItemText,
									classes.width,
									classes.alignRight
								)}
								primary="Expenses"
								secondary={formatAmount(actualExp, '£', 0)}
							/>
						</ListItem>
						{matches && (
							<ListItem className={classes.expMobOnlyBar}>
								<div
									className={clsx(classes.barContainer, classes.expBarContainer)}>
									<LinearProgress
										variant="determinate"
										style={{ width: `${expBarWidth}%` }}
										className={clsx(classes.expBar, classes.bar)}
										value={actualExp / plannedExp * 100}
									/>
								</div>
							</ListItem>
						)}
						<Divider variant="middle" />
						<ListItem className={classes.totalContainer}>
							<ListItemText
								className={clsx(
									classes.listItemText,
									classes.marginRightAuto,
									classes.totalItemText
								)}
								primary="Planning to save"
								secondary={formatAmount(totalPlanned, '£', 0)}
							/>

							<ListItemText
								className={clsx(
									classes.listItemText,
									classes.alignRight,
									classes.totalItemText
								)}
								primary="Saved"
								secondary={formatAmount(totalActual, '£', 0) + ' ' + percentage}
							/>
						</ListItem>
					</Collapse>
					<Collapse in={!thisMonthBudget} timeout={700}>
						<div className={classes.setupBudgetsButton}>
							<Button
								variant="contained"
								color="primary"
								onClick={() => setMonthBudgetDialog(true)}>
								Setup this month's budgets
							</Button>
						</div>
					</Collapse>
				</List>
			</Paper>
		</Fragment>
	);
}

export default memo(BudgetSummary);
