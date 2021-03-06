import React, { memo, useContext } from 'react';
import { DispatchContext, ThisMonthBudgetContext } from '../context/budgets.context';
import useInputState from '../hooks/useInputState';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import { useSnackbar } from 'notistack';
import InputAdornment from '@material-ui/core/InputAdornment';
import TipsExpansionPanel from './TipsExpansionPanel';
import { ParsedMonthContext } from '../context/month.context';
import Typography from '@material-ui/core/Typography';

const TransitionGrow = React.forwardRef(function Transition(props, ref) {
	return <Grow {...props} />;
});

const useStyles = makeStyles(({ spacing, palette, breakpoints }) => ({
	dialogContent: {
		maxWidth: spacing(44),
		margin: spacing(0, 1)
	},

	budgetNameContainer: {
		marginBottom: spacing(3)
	},
	expansionPanelContainer: {
		marginBottom: spacing(5)
	},
	noMonthBudgetDialogActions: {
		justifyContent: 'center'
	}
}));

function BudgetForm({
	dialogOpen,
	setDialogOpen,
	edit_id,
	edit_title,
	edit_planned,
	editPlannedForm
}) {
	const [ budgetName, handleBudgetNameChange, resetBudgetName ] = useInputState(edit_title || '');
	const [ planned, handlePlannedChange, resetPlanned ] = useInputState(edit_planned || '');
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useContext(DispatchContext);
	const classes = useStyles();
	const pMonth = useContext(ParsedMonthContext);
	const thisMonthBudget = useContext(ThisMonthBudgetContext);

	const handleSubmit = evt => {
		evt.preventDefault();

		if (!!edit_id) {
			dispatch({
				type: 'EDIT_BUDGET',
				title: budgetName,
				planned: parseInt(planned),
				id: edit_id,
				pMonth
			});
			enqueueSnackbar('Budget Edited');
		} else {
			dispatch({
				type: 'ADD_BUDGET',
				title: budgetName,
				planned: parseInt(planned),
				pMonth
			});
			enqueueSnackbar('New Budget Added');
			resetBudgetName();
			resetPlanned();
		}

		setDialogOpen(false);
	};

	return thisMonthBudget ? (
		<Dialog
			maxWidth="xs"
			open={dialogOpen}
			onClose={() => setDialogOpen(false)}
			TransitionComponent={TransitionGrow}
			aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">{!!edit_id ? 'Edit' : 'New'} Budget</DialogTitle>

			<DialogContent className={classes.dialogContent}>
				{!edit_id && (
					<div className={classes.expansionPanelContainer}>
						<TipsExpansionPanel
							title="Help me!"
							message="To add a new budget, enter budget name and planned amount and hit add, then start dragging categories from other budgets and drop them into your new budget."
						/>
					</div>
				)}
				{!editPlannedForm && (
					<div className={classes.budgetNameContainer}>
						<TextField
							variant="outlined"
							label="Budget name"
							name="budgetName"
							value={budgetName}
							onChange={handleBudgetNameChange}
							fullWidth
						/>
					</div>
				)}
				<div>
					<TextField
						fullWidth
						variant="outlined"
						label="Planned amount"
						type="number"
						name="planned"
						value={planned}
						onChange={handlePlannedChange}
						InputProps={{
							startAdornment: <InputAdornment position="start">£</InputAdornment>
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
						!budgetName.length || !planned.toString().length || parseInt(planned) < 0
					}
					onClick={handleSubmit}
					color="primary">
					{!!edit_id ? 'Edit' : 'Add'}
				</Button>
			</DialogActions>
		</Dialog>
	) : (
		<Dialog
			maxWidth="xs"
			open={dialogOpen}
			onClose={() => setDialogOpen(false)}
			TransitionComponent={TransitionGrow}
			aria-labelledby="form-dialog-title">
			<DialogContent className={classes.dialogContent}>
				<Typography>You need to setup budgets for this month first</Typography>
			</DialogContent>
			<DialogActions className={classes.noMonthBudgetDialogActions}>
				<Button onClick={() => setDialogOpen(false)} color="primary">
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default memo(BudgetForm);
