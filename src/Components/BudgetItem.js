import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import EditIcon from '@material-ui/icons/Edit';
import LinearProgress from '@material-ui/core/LinearProgress';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import useStyles from './styles/budgetItem.styles';
import Collapse from '@material-ui/core/Collapse';

const ExpansionPanelSummary = withStyles({
	root: {
		cursor: 'default !important'
	}
})(MuiExpansionPanelSummary);

function BudgetItem({ categories, list, actual, id, index }) {
	const [ expanded, setExpanded ] = useState(true);
	const [ showExpSumAounts, setshowExpSumAounts ] = useState(false);

	const handleExpansion = () => {
		setExpanded(!expanded);
		setshowExpSumAounts(!showExpSumAounts);
	};

	const actualAmount = actual < 0 ? actual * -1 : actual;
	const props = { expanded };
	const classes = useStyles(props);

	return (
		<Draggable draggableId={id} index={index}>
			{providedList => (
				<Paper
					{...providedList.draggableProps}
					ref={providedList.innerRef}
					className={classes.root}>
					<Droppable droppableId={id}>
						{(provided, snapshot) => (
							<div ref={provided.innerRef} {...provided.droppableProps}>
								<ExpansionPanel expanded={expanded}>
									<ExpansionPanelSummary className={classes.summary}>
										<LinearProgress
											variant="determinate"
											className={classes.progressBar}
											value={
												actualAmount > list.planned ? (
													100
												) : (
													actualAmount / list.planned * 100
												)
											}
										/>
										<div className={classes.titleContainer}>
											<Typography className={classes.title}>
												{list.title}
											</Typography>
											<div>
												{id !== 'budget-0' && (
													<IconButton
														className={classes.iconButton}
														aria-label="Delete"
														onClick={e => e.stopPropagation()}
														disableRipple>
														<DeleteIcon />
													</IconButton>
												)}
												<IconButton
													className={classes.iconButton}
													aria-label="Edit"
													onClick={e => e.stopPropagation()}
													disableRipple>
													<EditIcon />
												</IconButton>
												<IconButton
													className={classes.dragButton}
													aria-label="Drag"
													{...providedList.dragHandleProps}
													disableRipple>
													<DragHandleIcon />
												</IconButton>
												<IconButton
													className={classes.expandButton}
													aria-label="Expand More"
													onClick={handleExpansion}
													disableRipple>
													<ExpandMoreIcon />
												</IconButton>
											</div>
										</div>
										<Collapse in={showExpSumAounts}>
											<div className={classes.summaryAmountsContainer}>
												<ListItemText
													className={classes.listItemText}
													primary="Planned"
													secondary={list.planned}
												/>
												<ListItemText
													className={classes.listItemText}
													primary="Spent"
													secondary={actualAmount}
												/>
												<ListItemText
													className={classes.listItemText}
													primary="Remaining"
													secondary={list.planned - actualAmount}
												/>
											</div>
										</Collapse>
									</ExpansionPanelSummary>
									<ExpansionPanelDetails
										className={classes.expansionPanelDetails}>
										<div className={classes.left}>
											<div
												style={{
													transition: 'background-color 0.2s ease',
													backgroundColor: snapshot.isDraggingOver
														? 'rgba(0,0,0,0.08)'
														: '#fff'
												}}
												className={classes.categoriesContainer}>
												{categories.map((ct, i) => (
													<Draggable
														key={ct.id}
														draggableId={ct.id}
														index={i}>
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
																onDelete={() =>
																	console.log('deleted')}
																variant="outlined"
															/>
														)}
													</Draggable>
												))}
												{provided.placeholder}
											</div>
										</div>

										<List className={classes.right}>
											<ListItem className={classes.listItem}>
												<ListItemText
													className={classes.listItemText}
													primary="Planned"
													secondary={list.planned}
												/>
											</ListItem>
											<ListItem className={classes.listItem}>
												<ListItemText
													className={classes.listItemText}
													primary="Spent"
													secondary={actualAmount}
												/>
											</ListItem>
											<ListItem className={classes.listItem}>
												<ListItemText
													className={classes.listItemText}
													primary="Remaining"
													secondary={list.planned - actualAmount}
												/>
											</ListItem>
										</List>
									</ExpansionPanelDetails>
								</ExpansionPanel>
							</div>
						)}
					</Droppable>
				</Paper>
			)}
		</Draggable>
	);
}

export default BudgetItem;
