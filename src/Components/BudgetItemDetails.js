import React, { memo, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { formatAmount } from '../helpers';
import BudgetForm from './BudgetForm';
import Tip from './Tip';

const useStyles = makeStyles(() => ({
	listItem: {
		padding: 0
	},
	listItemText: {
		marginTop: 2,
		'& > span': {
			fontSize: '0.875rem',
			fontWeight: 400,
			lineHeight: 1.43,
			letterSpacing: '0.01071em',
			display: 'block'
		},
		'& > p': {
			fontSize: '1rem',
			fontWeight: 500,
			lineHeight: 1.5,
			letterSpacing: '0.00938em',
			color: 'rgba(0, 0, 0, 0.87)'
		}
	}
}));

function BudgetItemDetails({ budgetItem, spent, view, tipOpen, handleNextTip, budgetId, tips }) {
	const classes = useStyles();
	const [ editDialogOpen, setEditDialogOpen ] = useState(false);
	const planned = budgetItem.planned;

	const remaining =
		spent > planned
			? `0 (${formatAmount(planned - spent, false, 0)})`
			: formatAmount(planned - spent, false, 0);

	return (
		<Fragment>
			<BudgetForm
				edit_id={budgetItem.id}
				edit_title={budgetItem.title}
				edit_planned={budgetItem.planned}
				dialogOpen={editDialogOpen}
				setDialogOpen={setEditDialogOpen}
				editPlannedForm
			/>
			{view === 'summary' ? (
				<Fragment>
					<ListItemText
						className={classes.listItemText}
						primary="Planned"
						secondary={
							planned > 0 ? (
								formatAmount(planned, false, 0, false)
							) : (
								<Button
									variant="contained"
									color="primary"
									size="small"
									onClick={() => setEditDialogOpen(true)}>
									Plan
								</Button>
							)
						}
					/>
					<ListItemText
						className={classes.listItemText}
						primary="Spent"
						secondary={formatAmount(spent, false, 0, false)}
					/>
					<ListItemText
						className={classes.listItemText}
						primary="Remaining"
						secondary={remaining}
					/>
				</Fragment>
			) : (
				<Fragment>
					<ListItem className={classes.listItem}>
						<ListItemText
							disableTypography
							className={classes.listItemText}
							primary={<Typography component="span">Planned</Typography>}
							secondary={
								planned > 0 ? (
									<Typography>
										{formatAmount(planned, false, 0, false)}
									</Typography>
								) : (
									<Tip
										buttonTop
										title={tips[5]}
										open={tipOpen[5] && budgetId === 'budget-3'}
										badge={`6/${tips.length}`}
										placement="top"
										buttonLabel="next"
										handleClose={handleNextTip(5)}>
										<Button
											variant="contained"
											color="primary"
											size="small"
											onClick={() => setEditDialogOpen(true)}>
											Plan
										</Button>
									</Tip>
								)
							}
						/>
					</ListItem>
					<ListItem className={classes.listItem}>
						<ListItemText
							className={classes.listItemText}
							primary="Spent"
							secondary={formatAmount(spent, false, 0, false)}
						/>
					</ListItem>
					<ListItem className={classes.listItem}>
						<ListItemText
							className={classes.listItemText}
							primary="Remaining"
							secondary={remaining}
						/>
					</ListItem>
				</Fragment>
			)}
		</Fragment>
	);
}

export default memo(BudgetItemDetails);
