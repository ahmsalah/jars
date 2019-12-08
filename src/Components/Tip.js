import React, { useContext, Fragment } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../context/auth.context';
import Modal from '@material-ui/core/Modal';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(({ spacing, palette, breakpoints }) => ({
	'@keyframes rotate': {
		'0%': {
			transform: 'rotate(0)'
		},
		'46%': {
			transform: 'rotate(0)'
		},
		'49%': {
			transform: 'rotate(-10deg)'
		},
		'51%': {
			transform: 'rotate(10deg)'
		},
		'54%': {
			transform: 'rotate(0)'
		},
		'100%': {
			transform: 'rotate(0)'
		}
	},
	popperArrow: {
		margin: spacing(0, 4),
		[breakpoints.down('xs')]: {
			marginTop: props => (props.modal ? (props.placementTop ? 0 : -40) : 0),
			marginBottom: props => (props.modal ? (!props.placementTop ? 0 : -20) : 0)
		}
	},
	arrow: {
		color: '#fff'
	},
	tooltipArrow: {
		textAlign: 'center',
		backgroundColor: '#fff',
		color: palette.text.primary,
		padding: spacing(2),
		fontSize: '1rem',
		lineHeight: 1.6
	},
	background: {
		position: 'fixed',
		zIndex: 1500,
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0,0,0,0.5)'
	},
	buttonContainer: {
		position: 'fixed',
		bottom: props => (!props.buttonTop ? '15%' : 'unset'),
		top: props => (props.buttonTop ? '5%' : 'unset'),
		left: '50%',
		transform: 'translateX(-50%)',
		outline: 0
	},
	button: {
		position: 'relative',
		color: '#fff',
		animation: '$rotate 6s infinite 0s linear',
		fontSize: '1.5rem',
		padding: spacing(2, 6),
		backgroundColor: 'rgba(0,0,0,0.8)',
		whiteSpace: 'nowrap',
		'&:hover': {
			backgroundColor: 'rgba(0,0,0,1)'
		}
	},
	badge: {
		position: 'absolute',
		top: spacing(0.5),
		right: spacing(1.5),
		fontSize: '.8rem',
		fontWeight: 400
	},
	children: {
		'& > *': {
			zIndex: 1600
		}
	}
}));

function Tip({
	children,
	title,
	open,
	handleClose,
	enableClickAway,
	placement,
	buttonLabel,
	buttonTop,
	badge,
	noArrow,
	modal,
	newUser,
	child
}) {
	const currentUser = useContext(AuthContext);
	const up600 = useMediaQuery('(min-width:600px)');
	const props = { buttonTop, modal, up600, placementTop: placement === 'top' };
	const classes = useStyles(props);

	const renderToolTip = () => (
		<Tooltip
			classes={{
				popperArrow: classes.popperArrow,
				tooltipArrow: classes.tooltipArrow,
				arrow: classes.arrow
			}}
			TransitionProps={{ timeout: 1000 }}
			placement={placement || 'bottom'}
			title={title}
			open={open}
			arrow={!noArrow}>
			<div className={classes.children}>{children}</div>
		</Tooltip>
	);

	const renderButton = () => (
		<div className={classes.buttonContainer}>
			<Button
				size="large"
				variant="contained"
				className={classes.button}
				onClick={handleClose}>
				{buttonLabel || 'got it'}
				{badge && <span className={classes.badge}>{badge}</span>}
			</Button>
		</div>
	);

	return (newUser && !!currentUser.isNewUser) || !newUser ? (
		<Fragment>
			{modal ? (
				<Modal open={open}>{renderButton()}</Modal>
			) : (
				<Fade in={open} timeout={1000}>
					<div className={classes.background}>
						{child}
						{renderButton()}
					</div>
				</Fade>
			)}
			{enableClickAway ? (
				<ClickAwayListener onClickAway={handleClose}>{renderToolTip()}</ClickAwayListener>
			) : (
				renderToolTip()
			)}
		</Fragment>
	) : (
		<Fragment>{children}</Fragment>
	);
}

export default Tip;
