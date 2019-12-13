import React, { memo, Fragment } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';
import useStyles from './styles/tip.styles';

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
	child
}) {
	const up600 = useMediaQuery('(min-width:600px)');
	const props = { buttonTop, modal, up600, noArrow, placementTop: placement === 'top' };
	const classes = useStyles(props);

	const renderToolTip = () =>
		!!open ? (
			<Tooltip
				classes={{
					popper: noArrow ? clsx(classes.popper, classes.popperNoArrow) : '',
					tooltip: noArrow ? clsx(classes.tooltip, classes.tooltipNoArrow) : '',
					popperArrow: classes.popper,
					tooltipArrow: classes.tooltip,
					arrow: classes.arrow
				}}
				TransitionProps={{ timeout: 1000 }}
				placement={placement || 'bottom'}
				title={title}
				open={open}
				arrow={!noArrow}>
				<div className={classes.children}>{children}</div>
			</Tooltip>
		) : (
			<Fragment>{children}</Fragment>
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

	return (
		<Fragment>
			{modal ? (
				<Modal
					closeAfterTransition
					onClose={handleClose}
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 800
					}}
					open={open}>
					<Fade in={open} timeout={800}>
						{renderButton()}
					</Fade>
				</Modal>
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
	);
}

export default memo(Tip);
