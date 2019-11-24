import React, { memo, useContext, useState } from 'react';
import { DispatchContext } from '../context/categories.context';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import DeleteDialog from './DeleteDialog';
import { Draggable } from 'react-beautiful-dnd';

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
	}
}));

const CategoryItem = ({ id, type, name, icon, index, categoriesLength }) => {
	const classes = useStyles();
	const dispatch = useContext(DispatchContext);
	const { enqueueSnackbar } = useSnackbar();
	const [ dialogOpen, setDialogOpen ] = useState(false);

	const handleDeleteItem = () => {
		dispatch({ type: 'REMOVE_CATEGORY', id, categoryType: type });
		setDialogOpen(false);
		enqueueSnackbar('Category Deleted');
	};

	return (
		<React.Fragment>
			<DeleteDialog
				onSubmit={handleDeleteItem}
				dialogOpen={dialogOpen}
				setDialogOpen={setDialogOpen}
				name={name}
				icon={icon}
			/>
			<Draggable draggableId={id} index={index}>
				{provided => (
					<div
						className={classes.root}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}>
						<ListItem
							component="div"
							ContainerComponent="div"
							divider={index < categoriesLength - 1}>
							<ListItemAvatar className={classes.iconContainer}>
								<Avatar
									className={classes.icon}
									src={require(`../assets/icons/${icon}.png`)}
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
				)}
			</Draggable>
		</React.Fragment>
	);
};

export default memo(CategoryItem);
