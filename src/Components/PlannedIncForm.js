import React, { memo } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useInputState from '../hooks/useInputState';

function PlannedIncForm({ dialogOpen, setDialogOpen, plannedInc, setPlannedInc }) {
	const [ income, handleIncomeChange ] = useInputState(plannedInc || 0);

	const handleSubmit = evt => {
		evt.preventDefault();
		setDialogOpen(false);
		setPlannedInc(parseInt(income));
	};

	return (
		<Dialog
			open={dialogOpen}
			onClose={() => setDialogOpen(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description">
			<DialogTitle id="form-dialog-title">Planned Income</DialogTitle>
			<DialogContent>
				<TextField
					type="number"
					variant="outlined"
					label="Income"
					name="income"
					value={income}
					onChange={handleIncomeChange}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setDialogOpen(false)} color="primary" autoFocus>
					Cancel
				</Button>
				<Button
					disabled={!income.toString().length || parseInt(income) < 0}
					onClick={handleSubmit}
					variant="contained"
					color="primary">
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default memo(PlannedIncForm);
