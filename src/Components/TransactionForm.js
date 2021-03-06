import React, { memo, useState, useEffect, useContext } from 'react';
import { CategoriesContext } from '../context/categories.context';
import { MonthContext } from '../context/month.context';
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
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import InputAdornment from '@material-ui/core/InputAdornment';
import TipsExpansionPanel from './TipsExpansionPanel';
import { useSnackbar } from 'notistack';
import Tip from './Tip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import HelpIcon from '@material-ui/icons/Help';
import { TipsContext, DispatchTipsContext } from '../context/tips.context';

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
	const month = useContext(MonthContext);
	const dispatch = useContext(DispatchContext);
	const showTips = useContext(TipsContext);
	const dispatchTips = useContext(DispatchTipsContext);

	const [ category, handleCategoryChange, resetCategory ] = useInputState(
		!!edit_category ? edit_category.name : ''
	);
	const [ description, handleDescriptionChange, resetDescription ] = useInputState(
		edit_description || ''
	);
	const [ amount, handleAmountChange, resetAmount ] = useInputState(edit_amount || '');
	const [ isExpense, toggleIsExpense ] = useToggleState(edit_type === 'inc' ? false : true);
	const [ date, setDate ] = useState(edit_date || month);
	const { enqueueSnackbar } = useSnackbar();

	const initialTips = {
		0: false,
		1: false,
		2: false,
		3: false,
		4: false,
		5: false
	};
	const tips = [
		"Toggle transaction type between 'Expense' and 'Income'",
		`${isExpense ? 'What did you spend it on?' : 'How did you receive it?'}
			 You can add, delete and reorder these categories in the categories tab`,
		'If needed, you can enter a brief description of your transaction',
		`How much did you ${isExpense ? 'spend' : 'receive'}?`,
		"By default Jars captures today's date, tap to change it",
		'To show these instructions anytime again, tap the question mark icon'
	];
	const [ tipOpen, setTipOpen ] = useState(initialTips);

	useEffect(
		() => {
			!edit_date && setDate(month);
		},
		[ month, edit_date ]
	);

	useEffect(
		() => {
			!!showTips.transactionsForm &&
				!edit_id &&
				setTipOpen(tipOpen => ({ ...tipOpen, 0: true }));
		},
		[ showTips.transactionsForm, edit_id ]
	);

	const handleNextTip = i => {
		setTipOpen(tipOpen => ({ ...tipOpen, [i]: false, [i + 1]: true }));
		// if the tip is the last one, set showTips to false for transactionsForm
		if (i === tips.length - 1) {
			dispatchTips({ type: 'SET_SECTION_TIPS', section: 'transactionsForm', open: false });
		}
	};

	const handleToggleIsExpense = () => {
		toggleIsExpense();
		resetCategory();
	};

	const handleSubmit = evt => {
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
			setDate(month);
		}

		setDialogOpen(false);
	};

	const theme = createMuiTheme({
		palette: {
			primary: { main: isExpense ? '#de474e' : '#1aa333' }
		}
	});

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
						<DialogTitle
							className={classes.dialogTitle}
							disableTypography
							id="form-dialog-title">
							<Typography variant="h6">
								{!!edit_id ? 'Edit' : 'New'} Transaction
							</Typography>
							<Tip
								modal
								title={tips[5]}
								open={tipOpen[5]}
								badge={`6/${tips.length}`}
								buttonLabel="got it"
								handleClose={() => handleNextTip(5)}>
								<IconButton
									className={classes.helpIconButton}
									onClick={() =>
										setTipOpen(tipOpen => ({ ...tipOpen, 0: true }))}>
									<HelpIcon />
								</IconButton>
							</Tip>
						</DialogTitle>

						<DialogContent className={classes.dialogContent}>
							<div className={classes.expansionPanelContainer}>
								<TipsExpansionPanel
									title="Tips"
									message="To add a new transaction, choose the transaction type and fill in the fields below. If the category you want is not listed, you can list a new category in the cateogries page."
								/>
							</div>

							<Tip
								buttonTop
								modal
								title={tips[0]}
								open={tipOpen[0]}
								badge={`1/${tips.length}`}
								buttonLabel="next"
								handleClose={() => handleNextTip(0)}>
								<div className={classes.switch}>
									<BtnSwitch
										toggleExpense={handleToggleIsExpense}
										isExpense={isExpense}
									/>
								</div>
							</Tip>
							<div className={classes.inputsContainer}>
								<Tip
									buttonTop
									modal
									title={tips[1]}
									open={tipOpen[1]}
									badge={`2/${tips.length}`}
									buttonLabel="next"
									handleClose={() => handleNextTip(1)}>
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
										onChange={handleCategoryChange}
										value={category}>
										{categories.lists &&
											categories.lists[
												categoryType
											].categoriesIds.map(ctID => {
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
								</Tip>
								<Tip
									buttonTop
									modal
									title={tips[2]}
									open={tipOpen[2]}
									badge={`3/${tips.length}`}
									buttonLabel="next"
									handleClose={() => handleNextTip(2)}>
									<TextField
										className={clsx(classes.margin, classes.textField)}
										variant="outlined"
										label={
											<span>
												Description{' '}
												<span style={{ fontSize: '0.9rem' }}>
													(optional)
												</span>
											</span>
										}
										name="description"
										value={description}
										onChange={handleDescriptionChange}
									/>
								</Tip>
								<Tip
									buttonTop
									modal
									title={tips[3]}
									open={tipOpen[3]}
									badge={`4/${tips.length}`}
									placement="top"
									buttonLabel="next"
									handleClose={() => handleNextTip(3)}>
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
								</Tip>
								<Tip
									buttonTop
									modal
									title={tips[4]}
									open={tipOpen[4]}
									badge={`5/${tips.length}`}
									placement="top"
									buttonLabel="next"
									handleClose={() => handleNextTip(4)}>
									<DatePicker
										margin="normal"
										className={clsx(
											classes.margin,
											classes.textField,
											classes.datePicker
										)}
										showTodayButton
										id="date-picker-dialog"
										label="Choose Date"
										format="dd/MM/yyyy"
										inputVariant="outlined"
										value={date}
										onChange={d => setDate(d)}
									/>
								</Tip>
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
									parseInt(amount) < 1 ||
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

export default memo(TransactionForm);
