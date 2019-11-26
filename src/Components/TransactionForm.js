import React, { useState, useEffect, useContext } from 'react';
import { CategoriesContext } from '../context/categories.context';
import { TransactionsContext } from '../context/transactions.context';
import { DispatchContext } from '../context/transactions.context';
import { getExactTime } from '../helpers';
import useStyles from './styles/transactionForm.styles';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import isValid from 'date-fns/isValid';
import BtnSwitch from './BtnSwitch';
import useInputState from '../hooks/useInputState';
import useToggleState from '../hooks/useToggleState';
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
import TipsExpansionPanel from './TipsExpansionPanel';
import { useSnackbar } from 'notistack';

const TransitionGrow = React.forwardRef(function Transition(props, ref) {
	return <Grow {...props} />;
});

function TransactionForm({
	dialogOpen,
	setDialogOpen,
	edit_id,
	edit_category,
	edit_description,
	edit_amount,
	edit_date,
	edit_type
}) {
	const classes = useStyles();
	const categories = useContext(CategoriesContext);
	const { selectedDate } = useContext(TransactionsContext);
	const dispatch = useContext(DispatchContext);
	const [ category, handleCategoryChange, resetCategory ] = useInputState(
		!!edit_category ? edit_category.name : ''
	);
	const [ description, handleDescriptionChange, resetDescription ] = useInputState(
		edit_description || ''
	);
	const [ amount, handleAmountChange, resetAmount ] = useInputState(edit_amount || '');
	const [ isExpense, toggleIsExpense ] = useToggleState(edit_type === 'inc' ? false : true);
	const [ date, setDate ] = useState(!!edit_date ? edit_date : selectedDate);
	const { enqueueSnackbar } = useSnackbar();

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

		const newAmount = isExpense ? amount * -1 : parseFloat(amount);
		const displayIcon = !categories.allCategories
			? []
			: Object.values(categories.allCategories).filter(ct => ct.name === category)[0].icon;

		const categoryID = !categories.allCategories
			? []
			: Object.values(categories.allCategories).filter(ct => ct.name === category)[0].id;

		const transaction = {
			category: {
				id: categoryID,
				icon: displayIcon,
				name: category,
				type: categoryType
			},
			description,
			amount: newAmount,
			dateTimestamp: getExactTime(date),
			type: categoryType
		};

		if (!!edit_id) {
			const editedTransaction = {
				...transaction,
				id: edit_id
			};
			dispatch({ type: 'EDIT_TRANSACTION', transaction: editedTransaction, id: edit_id });
			enqueueSnackbar('Transaction Edited');
		} else {
			dispatch({ type: 'ADD_TRANSACTION', transaction });
			enqueueSnackbar('New Transaction Added');
			resetCategory();
			resetDescription();
			resetAmount();
			setDate(selectedDate);
		}

		setDialogOpen(false);
	};

	const categoryType = isExpense ? 'exp' : 'inc';

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<React.Fragment>
				<ThemeProvider theme={theme}>
					<Dialog
						className={classes.dialog}
						open={dialogOpen}
						onClose={() => setDialogOpen(false)}
						TransitionComponent={TransitionGrow}
						aria-labelledby="form-dialog-title">
						<DialogTitle id="form-dialog-title">
							{!!edit_id ? 'Edit' : 'New'} Transaction
						</DialogTitle>

						<DialogContent className={classes.dialogContent}>
							<div className={classes.expansionPanelContainer}>
								<TipsExpansionPanel
									title="Help me!"
									message="To add a new transaction, choose the transaction type and fill in the fields below. If the category you want is not listed, you can list a new category in the cateogries tab."
								/>
							</div>

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
									{categories.lists &&
										categories.lists[categoryType].categoriesIds.map(ctID => {
											const ct = categories.allCategories[ctID];
											return (
												<MenuItem
													key={ct.id}
													value={ct.name}
													className={classes.menuItem}>
													<Avatar
														className={classes.avatar}
														src={require(`../assets/icons/${ct.icon}.png`)}
													/>
													{ct.name}
												</MenuItem>
											);
										})}
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
									onChange={d => setDate(d)}
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
								{!!edit_id ? 'Edit' : 'Add'}
							</Button>
						</DialogActions>
					</Dialog>
				</ThemeProvider>
			</React.Fragment>
		</MuiPickersUtilsProvider>
	);
}

export default TransactionForm;
