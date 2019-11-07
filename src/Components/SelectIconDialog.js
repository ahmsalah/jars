import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(({ spacing, palette }) => ({
	titleContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	closeButton: {
		marginRight: spacing(4),
		backgroundColor: 'transparent',
		minWidth: 0
	},
	iconsContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center'
	},
	iconWrapper: {
		padding: spacing(1, 1, 0.75),
		'&:hover': {
			backgroundColor: 'rgba(55, 120, 189, .12)',
			cursor: 'pointer'
		}
	},
	icon: {
		width: spacing(7.5),
		height: spacing(7.5)
	}
}));

function SelectIconDialog({ onClose, open, TransitionComponent }) {
	const classes = useStyles();

	const handleClick = evt => {
		const selectedIcon = evt.target.getAttribute('value');
		onClose(selectedIcon);
	};

	const icons = [ ...new Array(144) ].map((v, i) => `icon_${i}`);
	return (
		<Dialog TransitionComponent={TransitionComponent} maxWidth="sm" open={open}>
			<div className={classes.titleContainer}>
				<DialogTitle id="confirmation-dialog-title">Select icon</DialogTitle>
				<IconButton className={classes.closeButton} disableRipple onClick={() => onClose()}>
					<CloseIcon />
				</IconButton>
			</div>

			<DialogContent dividers>
				<div className={classes.iconsContainer}>
					{icons.map(icon => (
						<div
							key={icon}
							onClick={handleClick}
							value={icon}
							className={classes.iconWrapper}>
							<img
								className={classes.icon}
								value={icon}
								src={require(`../assets/icons/${icon}.png`)}
								alt="icon"
							/>
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default SelectIconDialog;
