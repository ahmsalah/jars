import React, { memo } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { Draggable } from 'react-beautiful-dnd';
import useStyles from './styles/budgetItem.styles';
import Typography from '@material-ui/core/Typography';

function BudgetItemCategories({ snapshot, provided, categories }) {
	const classes = useStyles();

	return (
		<div
			style={{
				transition: 'background-color 0.2s ease',
				backgroundColor: snapshot.isDraggingOver
					? 'rgba(0,0,0,0.1)'
					: !categories.length ? 'rgba(0,0,0,0.05)' : '#fff'
			}}
			className={classes.categoriesContainer}>
			{!categories.length && (
				<div className={classes.noCategoriesContainer}>
					<Typography align="center">
						Drag categories from other budgets and drop them here
					</Typography>
				</div>
			)}
			{categories.map((ct, i) => (
				<Draggable key={ct.id} draggableId={ct.id} index={i}>
					{provided => (
						<Chip
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							ref={provided.innerRef}
							avatar={
								<Avatar
									alt={ct.name}
									src={require(`../assets/icons/${ct.icon}.png`)}
								/>
							}
							className={classes.chip}
							label={ct.name}
							// onDelete={() =>
							// 	console.log('deleted')}
							variant="outlined"
						/>
					)}
				</Draggable>
			))}
			{provided.placeholder}
		</div>
	);
}

export default memo(BudgetItemCategories);
