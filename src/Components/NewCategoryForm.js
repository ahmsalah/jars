import React from 'react';
import uuid from 'uuid/v4';
import BtnSwitch from './BtnSwitch';
import useInputState from '../hooks/useInputState';
import useToggleState from '../hooks/useToggleState';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import SnackbarFeedback from './SnackbarFeedback';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const TransitionGrow = React.forwardRef(function Transition(props, ref) {
	return <Grow {...props} />;
});

const useStyles = makeStyles(({ spacing }) => ({
	switch: {
		margin: spacing(4, 0, 1),
		display: 'flex',
		justifyContent: 'center'
	},
	inputText: {
		margin: spacing(2, 0, 2),
		display: 'flex',
		justifyContent: 'center'
	}
}));

function NewCategoryForm({ addCategory }) {
	const classes = useStyles();
	const [ name, handleChange, reset ] = useInputState('');
	const [ isExpense, toggleIsExpense ] = useToggleState(true);
	const [ dialogOpen, setDialogOpen ] = React.useState(false);
	const [ snackbarOpen, setSnackbarOpen ] = React.useState(false);
	const theme = createMuiTheme({
		palette: {
			primary: { main: isExpense ? '#de474e' : '#1aa333' }
		}
	});

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
	};

	const handleDialogClickOpen = () => {
		setDialogOpen(true);
	};

	const handleDialogClose = () => {
		setDialogOpen(false);
	};

	const handleSubmit = evt => {
		evt.preventDefault();
		const type = isExpense ? 'exp' : 'inc';
		const newCategory = { name: name, id: uuid(), type: type };
		addCategory(newCategory);
		reset();
		setDialogOpen(false);
		setSnackbarOpen(true);
	};

	return (
		<React.Fragment>
			<Button variant="contained" color="primary" onClick={handleDialogClickOpen}>
				Create Category
			</Button>
			<ThemeProvider theme={theme}>
				<Dialog
					open={dialogOpen}
					onClose={handleDialogClose}
					TransitionComponent={TransitionGrow}
					aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Create Category</DialogTitle>

					<DialogContent>
						<DialogContentText>
							To add a new category, please <br />choose category name and
							type.
						</DialogContentText>
						<div className={classes.switch}>
							<BtnSwitch
								toggleExpense={() => toggleIsExpense()}
								isExpense={isExpense}
							/>
						</div>
						<div className={classes.inputText}>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="New Category"
								type="text"
								value={name}
								onChange={handleChange}
								required
								variant="outlined"
							/>
						</div>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleDialogClose} color="primary">
							Cancel
						</Button>
						<Button onClick={handleSubmit} color="primary">
							Add
						</Button>
					</DialogActions>
				</Dialog>
			</ThemeProvider>

			<SnackbarFeedback
				snackbarOpen={snackbarOpen}
				handleSnackbarClose={handleSnackbarClose}
				message={'New Category has been added successfully'}
			/>
		</React.Fragment>
	);
}

export default NewCategoryForm;
