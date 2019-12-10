import React, { memo, useState, useContext, forwardRef } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import LinearProgress from '@material-ui/core/LinearProgress';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import useStyles from './styles/budgetItem.styles';
import Collapse from '@material-ui/core/Collapse';
import BudgetItemDetails from './BudgetItemDetails';
import DeleteDialog from './DeleteDialog';
import { useSnackbar } from 'notistack';
import { DispatchContext } from '../context/budgets.context';
import BudgetForm from './BudgetForm';
import Tip from './Tip';
import BudgetItemCategories from './BudgetItemCategories';
import BudgetItemActionIcons from './BudgetItemActionIcons';

const ExpansionPanelSummary = withStyles({
	root: {
		cursor: 'default !important'
	}
})(MuiExpansionPanelSummary);

const BudgetItem = forwardRef(
	(
		{ categories, budgetItem, actual, budgetId, index, pMonth, tipOpen, handleNextTip, tips },
		ref
	) => {
		const dispatch = useContext(DispatchContext);
		const [ expanded, setExpanded ] = useState(true);
		const [ deleteDialogOpen, setDeleteDialogOpen ] = useState(false);
		const [ editDialogOpen, setEditDialogOpen ] = useState(false);
		const { enqueueSnackbar } = useSnackbar();
		const actualAmount = actual < 0 ? actual * -1 : actual;
		const classes = useStyles();

		const handleDelete = () => {
			dispatch({ type: 'REMOVE_BUDGET', budgetId, pMonth });
			setDeleteDialogOpen(false);
			enqueueSnackbar('Budget Deleted');
		};

		return (
			<div ref={ref}>
				{budgetId === 'budget-3' &&
					[ ...new Array(3) ].map((v, i) => (
						<Tip
							key={i}
							noArrow
							buttonTop
							title={tips[i]}
							open={tipOpen[i]}
							badge={`${i + 1}/${tips.length}`}
							placement="top"
							buttonLabel="next"
							handleClose={i === 2 ? handleNextTip(i, ref) : handleNextTip(i)}>
							<div />
						</Tip>
					))}
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
													<BudgetItemActionIcons
														setDeleteDialogOpen={setDeleteDialogOpen}
														setEditDialogOpen={setEditDialogOpen}
														expanded={expanded}
														setExpanded={setExpanded}
														providedList={providedList}
													/>
												</div>
												<Collapse in={!expanded}>
													<div
														className={classes.summaryAmountsContainer}>
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
													{budgetId === 'budget-3' ? (
														<Tip
															buttonTop
															title={tipOpen[3] ? tips[3] : tips[4]}
															open={tipOpen[3] || tipOpen[4]}
															badge={
																tipOpen[3] ? (
																	`4/${tips.length}`
																) : (
																	`5/${tips.length}`
																)
															}
															placement="top"
															buttonLabel="next"
															handleClose={
																tipOpen[3] ? (
																	handleNextTip(3)
																) : (
																	handleNextTip(4)
																)
															}>
															{
																<BudgetItemCategories
																	snapshot={snapshot}
																	provided={snapshot}
																	categories={categories}
																/>
															}
														</Tip>
													) : (
														<BudgetItemCategories
															snapshot={snapshot}
															provided={snapshot}
															categories={categories}
														/>
													)}
												</div>
												<List className={classes.right}>
													<BudgetItemDetails
														setEditDialogOpen={setEditDialogOpen}
														budgetItem={budgetItem}
														spent={actualAmount}
														tipOpen={tipOpen}
														handleNextTip={handleNextTip}
														budgetId={budgetId}
														tips={tips}
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
			</div>
		);
	}
);

export default memo(BudgetItem);
