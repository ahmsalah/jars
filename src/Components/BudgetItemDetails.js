import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { formatAmount } from '../helpers';

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
			<ListItemText
				className={classes.listItemText}
				primary="Planned"
				secondary={formatAmount(planned, false, 0, false)}
			/>
			<ListItemText
				className={classes.listItemText}
				primary="Spent"
				secondary={formatAmount(spent, false, 0, false)}
			/>
			<ListItemText
				className={classes.listItemText}
				primary="Remaining"
				secondary={
					spent > planned ? (
						`0 (${formatAmount(planned - spent, false, 0)})`
					) : (
						formatAmount(planned - spent, false, 0)
					)
				}
			/>
		</React.Fragment>
	) : (
		<React.Fragment>
			<ListItem className={classes.listItem}>
				<ListItemText
					className={classes.listItemText}
					primary="Planned"
					secondary={formatAmount(planned, false, 0, false)}
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
					secondary={
						spent > planned ? (
							`0 (${formatAmount(planned - spent, false, 0)})`
						) : (
							formatAmount(planned - spent, false, 0)
						)
					}
				/>
			</ListItem>
		</React.Fragment>
	);
}

export default memo(BudgetItemDetails);
