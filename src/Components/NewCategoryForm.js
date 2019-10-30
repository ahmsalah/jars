import React, { useState, useContext } from 'react';
import { DispatchContext } from '../context/categories.context';
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
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import SelectIconDialog from './SelectIconDialog';
import { SnackbarActionContext } from '../context/snackbar.context';

const TransitionGrow = React.forwardRef(function Transition(props, ref) {
	return <Grow {...props} />;
});

const inputsHeight = '56px';
const useStyles = makeStyles(({ spacing, palette }) => ({
	switch: {
		margin: spacing(3, 0),
		display: 'flex',
		justifyContent: 'center'
	},
	dialogText: {
		padding: spacing(1.5, 3, 1.5),
		backgroundColor: 'rgba(0, 0, 0, .03)',
		'& > p': {
			color: palette.text.secondary,
			marginBottom: 0
		}
	},
	inputsContainer: {
		margin: spacing(2, 0, 2),
		display: 'flex',
		justifyContent: 'center',
		'& > *': {
			height: inputsHeight
		}
	},
	textField: {
		margin: spacing(0, 0, 0, 2),
		flex: 1
	},
	input: {
		height: inputsHeight,
		padding: '0 14px'
	}
}));

function NewCategoryForm() {
	const classes = useStyles();
	const dispatch = useContext(DispatchContext);
	const { snackbarAddCategory } = useContext(SnackbarActionContext);
	const [ name, handleChange, reset ] = useInputState('');
	const [ isExpense, toggleIsExpense ] = useToggleState(true);
	const [ dialogOpen, setDialogOpen ] = useState(false);
	const [ iconDialogOpen, setIconDialogOpen ] = useState(false);
	const [ icon, setIcon ] = useState('icon_not_selected');

	const theme = createMuiTheme({
		palette: {
			primary: { main: isExpense ? '#de474e' : '#1aa333' }
		}
	});

	const handleCloseCategoryDialog = newValue => {
		setIconDialogOpen(false);
		if (newValue) {
			setIcon(newValue);
		}
	};

	const handleSubmit = evt => {
		evt.preventDefault();
		const type = isExpense ? 'exp' : 'inc';
		const newCategory = { name: name, type: type, icon: icon };
		dispatch({ type: 'ADD_CATEGORY', category: newCategory });
		reset();
		setDialogOpen(false);
		snackbarAddCategory();
		setIcon('icon_not_selected');
	};

	return (
		<React.Fragment>
			<Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
				Create Category
			</Button>
			<ThemeProvider theme={theme}>
				<Dialog
					maxWidth="xs"
					open={dialogOpen}
					onClose={() => setDialogOpen(false)}
					TransitionComponent={TransitionGrow}
					aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Create Category</DialogTitle>

					<DialogContent>
						<Paper className={classes.dialogText}>
							<DialogContentText>
								To add a new category, choose category type, name and icon.
							</DialogContentText>
						</Paper>
						<div className={classes.switch}>
							<BtnSwitch
								toggleExpense={() => toggleIsExpense()}
								isExpense={isExpense}
							/>
						</div>
						<div className={classes.inputsContainer}>
							<Button
								disableRipple
								variant="outlined"
								onClick={() => {
									setIconDialogOpen(true);
								}}>
								<Avatar src={require(`../icons/${icon}.png`)} />
								<ExpandMoreIcon />
							</Button>
							<TextField
								className={classes.textField}
								autoFocus
								margin="dense"
								id="name"
								label="New Category"
								type="text"
								value={name}
								onChange={handleChange}
								variant="outlined"
								InputLabelProps={{
									style: {
										height: inputsHeight
									}
								}}
								InputProps={{ classes: { input: classes.input } }}
							/>
						</div>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setDialogOpen(false)} color="primary">
							Cancel
						</Button>
						<Button
							disabled={name.length === 0 || icon === 'icon_not_selected'}
							onClick={handleSubmit}
							color="primary">
							Add
						</Button>
					</DialogActions>
				</Dialog>
			</ThemeProvider>

			<SelectIconDialog
				TransitionComponent={TransitionGrow}
				open={iconDialogOpen}
				onClose={handleCloseCategoryDialog}
			/>
		</React.Fragment>
	);
}

export default NewCategoryForm;
