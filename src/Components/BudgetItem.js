import React, { memo, useState, useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
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
import Tooltip from '@material-ui/core/Tooltip';
import BudgetItemDetails from './BudgetItemDetails';
import DeleteDialog from './DeleteDialog';
import { useSnackbar } from 'notistack';
import { DispatchContext } from '../context/budgets.context';
import BudgetForm from './BudgetForm';

const ExpansionPanelSummary = withStyles({
	root: {
		cursor: 'default !important'
	}
})(MuiExpansionPanelSummary);

function BudgetItem({ categories, budgetItem, actual, budgetId, index, pMonth }) {
	const dispatch = useContext(DispatchContext);
	const [ expanded, setExpanded ] = useState(true);
	const [ deleteDialogOpen, setDeleteDialogOpen ] = useState(false);
	const [ editDialogOpen, setEditDialogOpen ] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const actualAmount = actual < 0 ? actual * -1 : actual;
	const props = { expanded };
	const classes = useStyles(props);

	const handleDelete = () => {
		dispatch({ type: 'REMOVE_BUDGET', budgetId, pMonth });
		setDeleteDialogOpen(false);
		enqueueSnackbar('Budget Deleted');
	};

	return (
		<React.Fragment>
			<BudgetForm
				edit_id={budgetId}
				edit_title={budgetItem.title}
				edit_planned={budgetItem.planned}
				dialogOpen={editDialogOpen}
				setDialogOpen={setEditDialogOpen}
			/>
			<DeleteDialog
				onSubmit={handleDelete}
				dialogOpen={deleteDialogOpen}
				setDialogOpen={setDeleteDialogOpen}
				name={budgetItem.title}
			/>
			<Draggable draggableId={budgetId} index={index}>
				{providedList => (
					<Paper
						{...providedList.draggableProps}
						ref={providedList.innerRef}
						className={classes.root}>
						<Droppable droppableId={budgetId}>
							{(provided, snapshot) => (
								<div ref={provided.innerRef} {...provided.droppableProps}>
									<ExpansionPanel expanded={expanded}>
										<ExpansionPanelSummary className={classes.summary}>
											<LinearProgress
												variant="determinate"
												className={classes.progressBar}
												value={
													(budgetItem.planned - actualAmount) /
													budgetItem.planned *
													100
												}
											/>
											<div className={classes.titleContainer}>
												<Typography className={classes.title}>
													{budgetItem.title}{' '}
													{budgetId === 'budget-0' && (
														<span className={classes.titleDefault}>
															(default)
														</span>
													)}
												</Typography>
												<div className={classes.iconsContainer}>
													{budgetId !== 'budget-0' && (
														<Tooltip
															title="Delete Budget"
															placement="top"
															arrow>
															<IconButton
																className={classes.iconButton}
																aria-label="Delete"
																onClick={() =>
																	setDeleteDialogOpen(true)}
																disableRipple>
																<DeleteIcon />
															</IconButton>
														</Tooltip>
													)}
													<Tooltip
														title="Edit Budget"
														placement="top"
														arrow>
														<IconButton
															className={classes.iconButton}
															aria-label="Edit"
															onClick={() => setEditDialogOpen(true)}
															disableRipple>
															<EditIcon />
														</IconButton>
													</Tooltip>
													<Tooltip
														title="Drag Budget"
														placement="top"
														arrow>
														<IconButton
															className={classes.dragButton}
															aria-label="Drag"
															{...providedList.dragHandleProps}
															disableRipple>
															<DragHandleIcon fontSize="large" />
														</IconButton>
													</Tooltip>
													<Tooltip
														title="Expand Budget"
														placement="top"
														arrow>
														<IconButton
															className={classes.expandButton}
															aria-label="Expand More"
															onClick={() => setExpanded(!expanded)}
															disableRipple>
															<ExpandMoreIcon />
														</IconButton>
													</Tooltip>
												</div>
											</div>
											<Collapse in={!expanded}>
												<div className={classes.summaryAmountsContainer}>
													<BudgetItemDetails
														budgetItem={budgetItem}
														spent={actualAmount}
														setEditDialogOpen={setEditDialogOpen}
														view="summary"
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
															? 'rgba(0,0,0,0.1)'
															: !categories.length
																? 'rgba(0,0,0,0.05)'
																: '#fff'
													}}
													className={classes.categoriesContainer}>
													{!categories.length && (
														<div
															className={
																classes.noCategoriesContainer
															}>
															<Typography align="center">
																Drag categories from other budgets
																and drop them here
															</Typography>
														</div>
													)}
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
																	// onDelete={() =>
																	// 	console.log('deleted')}
																	variant="outlined"
																/>
															)}
														</Draggable>
													))}
													{provided.placeholder}
												</div>
											</div>
											<List className={classes.right}>
												<BudgetItemDetails
													setEditDialogOpen={setEditDialogOpen}
													budgetItem={budgetItem}
													spent={actualAmount}
												/>
											</List>
										</ExpansionPanelDetails>
									</ExpansionPanel>
								</div>
							)}
						</Droppable>
					</Paper>
				)}
			</Draggable>
		</React.Fragment>
	);
}

export default memo(BudgetItem);
