import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { SnackbarContext } from '../context/snackbar.context';

const TransitionSlide = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
	root: {
		transform: `translateX(${spacing(3)}px)`,
		[breakpoints.up('sm')]: {
			transform: `translateX(${spacing(6)}px)`
		},
		[breakpoints.up('md')]: {
			transform: `translateX(${spacing(10)}px)`
		},
		'& > div': {
			minWidth: 260,
			maxWidth: 260
		}
	},
	close: {
		padding: spacing(0.5)
	}
}));

function SnackbarFeedback() {
	const classes = useStyles();
	const { open, messageInfo, handleClose, handleExited } = useContext(SnackbarContext);

	return (
		<Snackbar
			key={messageInfo ? messageInfo.key : undefined}
			className={classes.root}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left'
			}}
			open={open}
			autoHideDuration={3000}
			onClose={handleClose}
			onExited={handleExited}
			TransitionComponent={TransitionSlide}
			ContentProps={{
				'aria-describedby': 'message-id'
			}}
			// message={<span id="message-id">{message}</span>}
			message={<span id="message-id">{messageInfo ? messageInfo.message : undefined}</span>}
			action={[
				<IconButton
					key="close"
					aria-label="close"
					color="inherit"
					className={classes.close}
					onClick={handleClose}>
					<CloseIcon />
				</IconButton>
			]}
		/>
	);
}

export default SnackbarFeedback;
