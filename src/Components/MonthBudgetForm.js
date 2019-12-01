import React, { useContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useInputState from '../hooks/useInputState';
import { ParsedMonthContext } from '../context/month.context';
import { DispatchContext, BudgetsContext } from '../context/budgets.context';
import clsx from 'clsx';
import format from 'date-fns/format';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import subMonths from 'date-fns/subMonths';
import startOfMonth from 'date-fns/startOfMonth';
import getUnixTime from 'date-fns/getUnixTime';
import { useSnackbar } from 'notistack';

const TransitionGrow = React.forwardRef(function Transition(props, ref) {
	return <Grow {...props} />;
});

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
	formLabel: {
		lineHeight: 1.5,
		[breakpoints.up('sm')]: {
			marginBottom: spacing(1)
		}
	},
	formGroup: {
		'& > label': {
			marginTop: spacing(1),
			marginRight: 0,
			[breakpoints.up('sm')]: {
				marginTop: 0
			},
			'& > span:last-child': {
				fontSize: '.96rem',
				[breakpoints.up('sm')]: {
					fontSize: '1rem'
				}
			}
		}
	},
	textField: {
		margin: spacing(2, 0, 1)
	}
}));

function MonthBudgetForm({ dialogOpen, setDialogOpen }) {
	const classes = useStyles();
	const budgets = useContext(BudgetsContext);
	const dispatch = useContext(DispatchContext);
	const pMonth = useContext(ParsedMonthContext);
	const { enqueueSnackbar } = useSnackbar();

	const [ value, handleValueChange ] = useInputState('default');
	const [ month, handleMonthChange ] = useInputState('');
	const lastMonth = getUnixTime(startOfMonth(subMonths(new Date(pMonth * 1000), 1)));

	const handleSubmit = () => {
		if (value === 'default') {
			dispatch({
				type: 'COPY_DEFAULT',
				pMonth
			});
		} else if (value === 'last-month') {
			dispatch({
				type: 'COPY_FROM_LAST_MONTH',
				lastMonth,
				pMonth
			});
		} else if (value === 'specific-month') {
			dispatch({
				type: 'COPY_FROM_SPECIFIC_MONTH',
				month,
				pMonth
			});
		}
		setDialogOpen(false);
		enqueueSnackbar('Budgets for this month has been set');
	};

	return (
		<Dialog
			open={dialogOpen}
			onClose={() => setDialogOpen(false)}
			aria-labelledby="form-dialog-title"
			TransitionComponent={TransitionGrow}>
			<DialogTitle id="form-dialog-title">This month budgets</DialogTitle>
			<DialogContent>
				<div>
					<FormControl component="fieldset">
						<FormLabel component="legend" className={classes.formLabel}>
							How do you want to setup this month's budgets?
						</FormLabel>
						<RadioGroup
							className={classes.formGroup}
							aria-label="budgets"
							name="budgets"
							value={value}
							onChange={handleValueChange}>
							<FormControlLabel
								value="default"
								control={<Radio color="primary" />}
								label="Setup default budgets"
							/>
							<FormControlLabel
								value="last-month"
								control={<Radio color="primary" />}
								label="Copy budgets from last month"
								disabled={!budgets.hasOwnProperty(lastMonth)}
							/>
							<FormControlLabel
								value="specific-month"
								control={<Radio color="primary" />}
								label="Copy from a specific month"
							/>
						</RadioGroup>
					</FormControl>
				</div>
				{value === 'specific-month' && (
					<TextField
						fullWidth
						select
						className={clsx(
							classes.margin,
							classes.textField,
							classes.textFieledSelect
						)}
						variant="outlined"
						label="Select Month"
						name="month"
						value={month}
						onChange={handleMonthChange}>
						{budgets &&
							Object.keys(budgets).slice(1).map(pMonth => (
								<MenuItem key={pMonth} value={pMonth}>
									{format(new Date(pMonth * 1000), 'MMMM yyyy')}
								</MenuItem>
							))}
					</TextField>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setDialogOpen(false)} color="primary" autoFocus>
					Cancel
				</Button>
				<Button
					disabled={value === 'specific-month' && !month.length}
					onClick={handleSubmit}
					color="primary">
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default MonthBudgetForm;
