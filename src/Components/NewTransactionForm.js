import React, { useState, useEffect, useContext } from 'react';
import { CategoriesContext } from '../context/categories.context';
import { TransactionsContext } from '../context/transactions.context';
import { DispatchContext } from '../context/transactions.context';
import { getExactTime } from '../helpers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import isValid from 'date-fns/isValid';
import BtnSwitch from './BtnSwitch';
import useInputState from '../hooks/useInputState';
import useToggleState from '../hooks/useToggleState';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import clsx from 'clsx';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import InputAdornment from '@material-ui/core/InputAdornment';
import HelpMeExpansionPanel from './HelpMeExpansionPanel';
import { SnackbarActionContext } from '../context/snackbar.context';

const TransitionGrow = React.forwardRef(function Transition(props, ref) {
	return <Grow {...props} />;
});

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
	dialog: {
		'& > div > div': {
			maxWidth: 320,
			[breakpoints.up('sm')]: {
				maxWidth: 600
			}
		}
	},
	switch: {
		margin: spacing(2.5, 0, 1),
		display: 'flex',
		justifyContent: 'center',
		width: '100%'
	},
	margin: {
		margin: spacing(1)
	},
	inputsContainer: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		maxWidth: 440
	},
	textField: {
		width: 200,
		minWidth: 180,
		maxHeight: 56,
		'& div': {
			maxHeight: 56,
			'& img': {
				height: '90%',
				width: '90%'
			}
		}
	},
	textFieledSelect: {
		'& div': {
			display: 'flex',
			alignItems: 'center'
		}
	},
	menuItem: {
		padding: spacing(0.5, 2)
	},
	avatar: {
		margin: spacing(0, 2, 0, 0)
	}
}));

function NewTransactionForm() {
	const classes = useStyles();

	const { expCategories, incCategories } = useContext(CategoriesContext);
	const { selectedDate } = useContext(TransactionsContext);
	const dispatch = useContext(DispatchContext);

	const [ category, handleCategoryChange, resetCategory ] = useInputState('');
	const [ description, handleDescriptionChange, resetDescription ] = useInputState('');
	const [ amount, handleAmountChange, resetAmount ] = useInputState('');
	const [ isExpense, toggleIsExpense ] = useToggleState(true);
	const [ dialogOpen, setDialogOpen ] = useState(false);
	const [ date, setDate ] = useState(selectedDate);
	const { snackbarAddTransaction } = useContext(SnackbarActionContext);

	const theme = createMuiTheme({
		palette: {
			primary: { main: isExpense ? '#de474e' : '#1aa333' }
		}
	});

	useEffect(
		() => {
			setDate(selectedDate);
		},
		[ selectedDate ]
	);

	const handleToggleIsExpense = () => {
		toggleIsExpense();
		resetCategory();
	};

	const handleSubmit = evt => {
		evt.preventDefault();

		let type, displayIcon, newAmount;
		if (isExpense) {
			type = 'exp';
			newAmount = amount * -1;
			displayIcon = expCategories.filter(ct => ct.name === category)[0].icon;
		} else {
			type = 'inc';
			newAmount = parseFloat(amount);
			displayIcon = incCategories.filter(ct => ct.name === category)[0].icon;
		}

		const transaction = {
			category: category,
			icon: displayIcon,
			description: description,
			amount: newAmount,
			dateTimestamp: getExactTime(date),
			type: type
		};
		dispatch({ type: 'ADD_TRANSACTION', transaction });
		resetCategory();
		resetDescription();
		resetAmount();
		setDialogOpen(false);
		setDate(selectedDate);
		snackbarAddTransaction();
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<React.Fragment>
				<Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
					Add Transaction
				</Button>
				<ThemeProvider theme={theme}>
					<Dialog
						className={classes.dialog}
						open={dialogOpen}
						onClose={() => setDialogOpen(false)}
						TransitionComponent={TransitionGrow}
						aria-labelledby="form-dialog-title">
						<DialogTitle id="form-dialog-title">Add Transaction</DialogTitle>

						<DialogContent>
							<HelpMeExpansionPanel />

							<div className={classes.inputsContainer}>
								<div className={classes.switch}>
									<BtnSwitch
										toggleExpense={handleToggleIsExpense}
										isExpense={isExpense}
									/>
								</div>
								<TextField
									select
									className={clsx(
										classes.margin,
										classes.textField,
										classes.textFieledSelect
									)}
									variant="outlined"
									label="Select Category"
									name="category"
									value={category}
									onChange={handleCategoryChange}>
									{isExpense ? (
										expCategories.map(ct => (
											<MenuItem
												key={ct.id}
												value={ct.name}
												className={classes.menuItem}>
												<Avatar
													className={classes.avatar}
													src={require(`../icons/${ct.icon}.png`)}
												/>
												{ct.name}
											</MenuItem>
										))
									) : (
										incCategories.map(ct => (
											<MenuItem
												key={ct.id}
												value={ct.name}
												className={classes.menuItem}>
												<Avatar
													className={classes.avatar}
													src={require(`../icons/${ct.icon}.png`)}
												/>
												{ct.name}
											</MenuItem>
										))
									)}
								</TextField>
								<TextField
									className={clsx(classes.margin, classes.textField)}
									variant="outlined"
									label="Description"
									name="description"
									value={description}
									onChange={handleDescriptionChange}
								/>
								<br />
								<TextField
									className={clsx(classes.margin, classes.textField)}
									variant="outlined"
									label="Amount"
									type="number"
									name="amount"
									value={amount}
									onChange={handleAmountChange}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">£</InputAdornment>
										)
									}}
								/>
								<KeyboardDatePicker
									margin="normal"
									className={clsx(classes.margin, classes.textField)}
									id="date-picker-dialog"
									label="Choose Date"
									format="dd/MM/yyyy"
									inputVariant="outlined"
									value={date}
									onChange={() => setDate(date)}
									KeyboardButtonProps={{
										'aria-label': 'change date'
									}}
								/>
							</div>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => setDialogOpen(false)} color="primary">
								Cancel
							</Button>
							<Button
								disabled={
									category.length === 0 ||
									amount.length === 0 ||
									amount === '0' ||
									!isValid(date)
								}
								onClick={handleSubmit}
								color="primary">
								Add
							</Button>
						</DialogActions>
					</Dialog>
				</ThemeProvider>
			</React.Fragment>
		</MuiPickersUtilsProvider>
	);
}

export default NewTransactionForm;
