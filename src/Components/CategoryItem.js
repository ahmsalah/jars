import React, { memo, useContext, useState } from 'react';
import { DispatchContext } from '../context/categories.context';
import { DispatchContext as DispatchBudgetsContext } from '../context/budgets.context';
import { DispatchContext as DispatchJarsContext } from '../context/jars.context';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import DeleteDialog from './DeleteDialog';
import { Draggable } from 'react-beautiful-dnd';
import Tip from './Tip';
import SwipeUpDownIcon from '../assets/svgs/SwipeUpDownIcon';
import Fade from '@material-ui/core/Fade';
import { AuthContext } from '../context/auth.context';

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
	swipeIcon: {
		[breakpoints.up('sm')]: {
			left: 'unset'
		},
		animation: '$swipe 2.5s infinite',
		position: 'fixed',
		left: 0,
		bottom: 0,
		'& svg': {
			width: '18em',
			height: '18em'
		}
	},
	'@keyframes swipe': {
		'0%': {
			opacity: 1,
			transform: 'translateY(160px)'
		},
		'35%': {
			opacity: 1
		},
		'70%': {
			opacity: 0,
			transform: 'translateY(10px)'
		},
		'100%': {
			opacity: 0
		}
	}
}));

const CategoryItem = ({ id, type, name, icon, index, categoriesLength }) => {
	const classes = useStyles();
	const dispatch = useContext(DispatchContext);
	const dispatchBudgets = useContext(DispatchBudgetsContext);
	const dispatchJars = useContext(DispatchJarsContext);
	const { enqueueSnackbar } = useSnackbar();
	const [ dialogOpen, setDialogOpen ] = useState(false);
	const currentUser = useContext(AuthContext);
	const [ tipOpen, setTipOpen ] = useState(!currentUser.isNewUser);

	const handleDeleteItem = () => {
		dispatch({ type: 'REMOVE_CATEGORY', id, categoryType: type });

		dispatchJars({ type: 'REMOVE_CATEGORY_FROM_JARS', id });

		if (type === 'exp') {
			dispatchBudgets({ type: 'REMOVE_CATEGORY_FROM_BUDGETS', id });
		}

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
			<Fade in={id === 'ctg-1' && tipOpen} timeout={1000}>
				<div className={classes.swipeIcon}>
					<SwipeUpDownIcon />
				</div>
			</Fade>
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
							<Tip
								title="To sort categories, hold and drag a category up or down"
								open={id === 'ctg-1' && tipOpen}
								buttonTop
								placement="top"
								handleClose={() => setTipOpen(false)}
								enableClickAway>
								<ListItemText>{name}</ListItemText>
							</Tip>
							<ListItemSecondaryAction>
								<Tooltip title="Delete Budget" placement="top" arrow>
									<IconButton
										aria-label="Delete"
										onClick={() => setDialogOpen(true)}
										className={classes.deleteButton}
										disableRipple>
										<DeleteIcon />
									</IconButton>
								</Tooltip>
							</ListItemSecondaryAction>
						</ListItem>
					</div>
				)}
			</Draggable>
		</React.Fragment>
	);
};

export default memo(CategoryItem);
