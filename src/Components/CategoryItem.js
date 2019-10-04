import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import useStyles from '../styles/CategoryItemStyles';

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
