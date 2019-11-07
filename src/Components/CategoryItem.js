import React, { memo, useContext, useState } from 'react';
import { DispatchContext } from '../context/categories.context';
import { SortableElement } from 'react-sortable-hoc';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles } from '@material-ui/core/styles';
import { SnackbarActionContext } from '../context/snackbar.context';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
	root: {
		userSelect: 'none',
		backgroundColor: '#fff',
		cursor: 'grab',
		'&:active': {
			cursor: 'grabbing'
		},
		'&:hover button': {
			opacity: '1'
		}
	},
	iconContainer: {
		minWidth: spacing(8)
	},
	icon: {
		width: '50px',
		height: '50px'
	},
	deleteButton: {
		[breakpoints.up('md')]: {
			opacity: '0',
			transition: 'opacity .3s'
		}
	},
	dialogText: {
		margin: spacing(2, 0)
	}
}));

const CategoryItem = SortableElement(({ id, type, name, icon }) => {
	const classes = useStyles();
	const dispatch = useContext(DispatchContext);
	const { snackbarDeleteCategory } = useContext(SnackbarActionContext);
	const [ dialogOpen, setDialogOpen ] = useState(false);

	const handleDeleteItem = () => {
		dispatch({ type: 'REMOVE_CATEGORY', id, categoryType: type });
		setDialogOpen(false);
		snackbarDeleteCategory();
	};

	return (
		<React.Fragment>
			<div className={classes.root}>
				<ListItem component="div" ContainerComponent="div">
					<ListItemAvatar className={classes.iconContainer}>
						<Avatar
							className={classes.icon}
							src={require(`../icons/${icon}.png`)}
							alt={name}
						/>
					</ListItemAvatar>

					<ListItemText>{name}</ListItemText>
					<ListItemSecondaryAction>
						<IconButton
							aria-label="Delete"
							onClick={() => setDialogOpen(true)}
							className={classes.deleteButton}
							disableRipple>
							<DeleteIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			</div>

			<Dialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>
					You are about to delete
				</DialogTitle>
				<DialogContent>
					<ListItem component="div" ContainerComponent="div">
						<ListItemAvatar className={classes.iconContainer}>
							<Avatar
								className={classes.icon}
								src={require(`../assets/icons/${icon}.png`)}
								alt={name}
							/>
						</ListItemAvatar>

						<ListItemText>{name}</ListItemText>
					</ListItem>
					<Typography className={classes.dialogText}>Do you wish to continue?</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDialogOpen(false)} color="primary" autoFocus>
						Cancel
					</Button>
					<Button onClick={handleDeleteItem} variant="contained" color="primary">
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
});

export default memo(CategoryItem);
