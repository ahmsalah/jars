import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	root: {
		backgroundColor: '#fff',
		cursor: 'grab',
		'&:active': {
			cursor: 'grabbing '
		},
		'&:hover button': {
			opacity: '1'
		}
	},
	deleteButton: {
		opacity: '0',
		transition: 'opacity .3s',
		'&:hover': {
			backgroundColor: 'transparent'
		}
	}
}));

const CategoryItem = SortableElement(({ id, type, name, removeCategory }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<ListItem>
				<ListItemText>{name}</ListItemText>
				<ListItemSecondaryAction>
					<IconButton
						aria-label="Delete"
						onClick={() => removeCategory(id)}
						className={classes.deleteButton}
						disableRipple>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		</div>
	);
});

export default CategoryItem;
