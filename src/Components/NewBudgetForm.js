import React, { useState, useContext } from 'react';
import { DispatchContext } from '../context/budgets.context';
import useInputState from '../hooks/useInputState';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import AddIcon from '@material-ui/icons/Add';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSnackbar } from 'notistack';
import InputAdornment from '@material-ui/core/InputAdornment';
import TipsExpansionPanel from './TipsExpansionPanel';

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
	}
}));

function NewBudgetForm() {
	const [ dialogOpen, setDialogOpen ] = useState(false);
	const [ budgetName, handleBudgetNameChange, resetBudgetName ] = useInputState('');
	const [ planned, handlePlannedChange, resetPlanned ] = useInputState('');
	const matches = useMediaQuery('(min-width:370px)');
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useContext(DispatchContext);
	const classes = useStyles();

	const handleSubmit = () => {
		dispatch({
			type: 'ADD_BUDGET',
			title: budgetName,
			planned: parseInt(planned)
		});
		setDialogOpen(false);
		resetBudgetName();
		resetPlanned();
		enqueueSnackbar('New Budget Added');
	};

	return (
		<React.Fragment>
			<Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
				{matches ? 'Create Budget' : <AddIcon />}
			</Button>

			<Dialog
				maxWidth="xs"
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				TransitionComponent={TransitionGrow}
				aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">New Budget</DialogTitle>

				<DialogContent className={classes.dialogContent}>
					<div className={classes.expansionPanelContainer}>
						<TipsExpansionPanel
							title="Help me!"
							message="To add a new budget, enter budget name and planned amount and hit add, then start dragging categories from other budgets and drop them into your new budget."
						/>
					</div>
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
						disabled={!budgetName.length || planned < 1}
						onClick={handleSubmit}
						color="primary">
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}

export default NewBudgetForm;
