import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const TransitionSlide = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
	root: {
		transform: `translateX(${theme.spacing(10)}px)`,
		zIndex: '2000 !important'
	}
}));

function SnackbarFeedback({ message, snackbarOpen, handleSnackbarClose }) {
	const classes = useStyles();
	return (
		<Snackbar
			className={classes.root}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left'
			}}
			open={snackbarOpen}
			autoHideDuration={4000}
			onClose={handleSnackbarClose}
			TransitionComponent={TransitionSlide}
			ContentProps={{
				'aria-describedby': 'message-id'
			}}
			message={<span id="message-id">{message}</span>}
			action={[
				<IconButton
					key="close"
					aria-label="close"
					color="inherit"
					className={classes.close}
					onClick={handleSnackbarClose}>
					<CloseIcon />
				</IconButton>
			]}
		/>
	);
}

export default SnackbarFeedback;
