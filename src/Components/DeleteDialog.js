import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Grow from '@material-ui/core/Grow';

const TransitionGrow = React.forwardRef(function Transition(props, ref) {
	return <Grow {...props} />;
});

const useStyles = makeStyles(({ spacing }) => ({
	iconContainer: {
		minWidth: spacing(8)
	},
	icon: {
		width: '50px',
		height: '50px'
	},
	dialogTextTop: {
		margin: spacing(0, 0, 2)
	},
	dialogTextBottom: {
		margin: spacing(2, 0)
	},
	name: {
		'& span': {
			fontWeight: 500,
			textTransform: 'capitalize'
		}
	}
}));

function DeleteDialog({ name, icon, dialogOpen, setDialogOpen, onSubmit }) {
	const classes = useStyles();

	return (
		<Dialog
			open={dialogOpen}
			onClose={() => setDialogOpen(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			TransitionComponent={TransitionGrow}>
			<DialogContent>
				<Typography className={classes.dialogTextTop}>You are about to delete</Typography>
				<ListItem component="div" ContainerComponent="div">
					{icon && (
						<ListItemAvatar className={classes.iconContainer}>
							<Avatar
								className={classes.icon}
								src={require(`../assets/icons/${icon}.png`)}
								alt={name}
							/>
						</ListItemAvatar>
					)}

					<ListItemText className={classes.name}>{name}</ListItemText>
				</ListItem>
				<Typography className={classes.dialogTextBottom}>
					Do you wish to continue?
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setDialogOpen(false)} color="primary" autoFocus>
					Cancel
				</Button>
				<Button onClick={onSubmit} variant="contained" color="primary">
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default memo(DeleteDialog);
