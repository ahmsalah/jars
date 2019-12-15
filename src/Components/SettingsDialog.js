import React, { memo, useContext, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { CurrencyContext, setCurrencyContext } from '../context/currency.context';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette, spacing, breakpoints }) => ({
	root: {}
}));

const TransitionGrow = React.forwardRef(function Transition(props, ref) {
	return <Grow {...props} />;
});

function settingsDialog({ dialogOpen, setDialogOpen }) {
	const up600 = useMediaQuery('(min-width:600px)');
	const classes = useStyles();

	const currency = useContext(CurrencyContext);
	const changeCurrency = useContext(setCurrencyContext);

	const [ value, setValue ] = useState('');
	const [ currencyDialogOpen, setCurrencyDialogOpen ] = useState(false);

	const handleSubmit = () => {
		changeCurrency('E');
	};

	return (
		<Dialog
			open={dialogOpen}
			onClose={() => setDialogOpen(false)}
			TransitionComponent={TransitionGrow}
			aria-labelledby="select-currency"
			aria-describedby="select-currency">
			<DialogTitle id="select-currency">Select your currency</DialogTitle>

			<DialogContent>{/* select currency dialog here */}</DialogContent>
			<DialogActions className={classes.dialogActions}>
				{/* <Button onClick={() => setDialogOpen(false)} color="primary" autoFocus>
					Cancel
				</Button> */}
				<Button disabled={false} onClick={handleSubmit} variant="contained" color="primary">
					Continue
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default settingsDialog;
