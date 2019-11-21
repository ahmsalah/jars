import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles(({ spacing, palette, breakpoints }) => ({
	root: {
		// minWidth: spacing(33),
		marginBottom: spacing(3),
		overflow: 'hidden'
	},
	expansionPanelDetails: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: 0
	},
	categoriesContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		'& > *': {
			margin: spacing(0.5)
		}
	},
	left: {
		padding: spacing(2, 4, 2, 3),
		flex: 0.7
	},
	right: {
		flex: 0.3,
		padding: spacing(2, 4, 2, 4)
	},
	title: {
		fontWeight: 500
	},
	titleContainer: {
		padding: spacing(1, 2, 0, 3),
		flex: 1,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	summary: {
		padding: 0,
		minHeight: '0 !important',
		'& > div': {
			display: 'block',
			margin: '0 0 8px !important'
		}
	},
	iconButton: {
		padding: 4
	},
	expandButton: {
		padding: 4,
		transform: props => (props.expanded ? 'rotate(180deg)' : 'rotate(0deg)'),
		transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
	},
	listItem: {
		padding: 0
	},
	listItemText: {
		marginTop: 2,
		'& > span': {
			fontSize: '0.875rem',
			fontWeight: 400,
			lineHeight: 1.43,
			letterSpacing: '0.01071em'
		},
		'& > p': {
			fontSize: '1rem',
			fontWeight: 500,
			lineHeight: 1.5,
			letterSpacing: '0.00938em',
			color: 'rgba(0, 0, 0, 0.87)'
		}
	},
	progress: {
		height: 6
	}
}));

const ExpansionPanelSummary = withStyles({
	root: {
		cursor: 'default !important'
	}
})(MuiExpansionPanelSummary);

function BudgetItem({ categories, list, actual, id }) {
	const [ expanded, setExpanded ] = useState(true);
	const actualAmount = actual < 0 ? actual * -1 : actual;
	const props = { expanded };
	const classes = useStyles(props);
	// <Grid item xs={11} md={9} lg={8}>
	return (
		<Paper className={classes.root}>
			<ExpansionPanel expanded={expanded}>
				<ExpansionPanelSummary className={classes.summary}>
					<LinearProgress
						variant="determinate"
						className={classes.progress}
						value={
							actualAmount > list.planned ? 100 : actualAmount / list.planned * 100
						}
					/>
					<div className={classes.titleContainer}>
						<Typography className={classes.title}>{list.title}</Typography>
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
								className={classes.iconButton}
								aria-label="Drag"
								onClick={e => e.stopPropagation()}
								disableRipple>
								<DragHandleIcon />
							</IconButton>
							<IconButton
								className={classes.expandButton}
								aria-label="Expand More"
								onClick={() => setExpanded(!expanded)}
								disableRipple>
								<ExpandMoreIcon />
							</IconButton>
						</div>
					</div>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails className={classes.expansionPanelDetails}>
					<div className={classes.left}>
						<div className={classes.categoriesContainer}>
							{categories.map(ct => (
								<Chip
									key={ct.id}
									avatar={
										<Avatar
											alt={ct.name}
											src={require(`../assets/icons/${ct.icon}.png`)}
										/>
									}
									label={ct.name}
									onDelete={() => console.log('deleted')}
									variant="outlined"
								/>
							))}
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
		</Paper>
	);
}

export default BudgetItem;
