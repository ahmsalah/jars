import React, { memo } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import useStyles from './styles/budgetItem.styles';

function BudgetItemActionIcons({
	budgetId,
	setDeleteDialogOpen,
	setEditDialogOpen,
	expanded,
	setExpanded,
	providedList
}) {
	const props = { expanded };
	const classes = useStyles(props);

	return (
		<div className={classes.iconsContainer}>
			{budgetId !== 'budget-0' && (
				<Tooltip title="Delete Budget" placement="top" arrow>
					<IconButton
						className={classes.iconButton}
						aria-label="Delete"
						onClick={() => setDeleteDialogOpen(true)}
						disableRipple>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			)}
			<Tooltip title="Edit Budget" placement="top" arrow>
				<IconButton
					className={classes.iconButton}
					aria-label="Edit"
					onClick={() => setEditDialogOpen(true)}
					disableRipple>
					<EditIcon />
				</IconButton>
			</Tooltip>
			<Tooltip title="Drag Budget" placement="top" arrow>
				<IconButton
					className={classes.dragButton}
					aria-label="Drag"
					{...providedList.dragHandleProps}
					disableRipple>
					<DragHandleIcon fontSize="large" />
				</IconButton>
			</Tooltip>
			<Tooltip title="Expand Budget" placement="top" arrow>
				<IconButton
					className={classes.expandButton}
					aria-label="Expand More"
					onClick={() => setExpanded(!expanded)}
					disableRipple>
					<ExpandMoreIcon />
				</IconButton>
			</Tooltip>
		</div>
	);
}

export default memo(BudgetItemActionIcons);
