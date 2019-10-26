import React, { memo, useContext } from 'react';
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

const useStyles = makeStyles(() => ({
	root: {
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
		minWidth: 65
	},
	icon: {
		width: '50px',
		height: '50px'
	},
	deleteButton: {
		opacity: '0',
		transition: 'opacity .3s'
	}
}));

const CategoryItem = SortableElement(({ id, type, name, icon }) => {
	const classes = useStyles();
	const dispatch = useContext(DispatchContext);

	return (
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
						onClick={() => dispatch({ type: 'REMOVE_CATEGORY', id })}
						className={classes.deleteButton}
						disableRipple>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		</div>
	);
});

export default memo(CategoryItem);
