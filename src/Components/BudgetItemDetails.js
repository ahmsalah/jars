import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

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
			letterSpacing: '0.01071em'
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

function BudgetItemDetails({ planned, spent, view }) {
	const classes = useStyles();

	return view === 'summary' ? (
		<React.Fragment>
			<ListItemText className={classes.listItemText} primary="Planned" secondary={planned} />
			<ListItemText className={classes.listItemText} primary="Spent" secondary={spent} />
			<ListItemText
				className={classes.listItemText}
				primary="Remaining"
				secondary={planned - spent}
			/>
		</React.Fragment>
	) : (
		<React.Fragment>
			<ListItem className={classes.listItem}>
				<ListItemText
					className={classes.listItemText}
					primary="Planned"
					secondary={planned}
				/>
			</ListItem>
			<ListItem className={classes.listItem}>
				<ListItemText className={classes.listItemText} primary="Spent" secondary={spent} />
			</ListItem>
			<ListItem className={classes.listItem}>
				<ListItemText
					className={classes.listItemText}
					primary="Remaining"
					secondary={planned - spent}
				/>
			</ListItem>
		</React.Fragment>
	);
}

export default BudgetItemDetails;
