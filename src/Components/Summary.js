import React from 'react';
import { getPercentageOfTwoNumbers } from '../helpers';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { formatAmount } from '../helpers';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(({ spacing, palette }) => ({
	root: {
		marginBottom: spacing(5),
		display: 'flex'
	},
	report: {
		flexBasis: '25%',
		padding: spacing(4, 2, 2),
		backgroundColor: palette.grey.light[1],
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		'& h3': {
			fontSize: '2.9rem',
			marginBottom: spacing(0.5)
		}
	},
	list: {
		padding: spacing(2, 0),
		justifySelf: 'flex-end',
		flexBasis: '75%',
		'& > li:first-child': {
			paddingBottom: 0
		},
		'& > li:nth-child(2)': {
			paddingTop: 0
		}
	},
	title: {
		width: '23%',
		marginLeft: spacing(2),
		'& span': {
			fontWeight: 500
		}
	},
	barContainer: {
		flex: '1 1 auto',
		width: '61%'
	},
	bar: {
		height: '15px',
		borderRadius: '2px'
	},
	incBar: {
		backgroundColor: palette.tertiary.main
	},
	expBar: {
		backgroundColor: palette.tertiary.sub
	},
	amount: {
		width: '26%',
		display: 'flex',
		marginRight: spacing(2),
		'& span': {
			marginLeft: 'auto',
			fontSize: '1rem'
		}
	},
	amountTotal: {
		marginTop: 0,
		'& span': {
			marginLeft: 'auto',
			fontSize: '1.25rem'
		}
	}
}));

function Summary({ totalInc, totalExp }) {
	const classes = useStyles();
	const total = totalInc + totalExp;
	const colorTotal = total < 0 ? 'secondary' : 'primary';

	const [ incBarWidth, expBarWidth ] = getPercentageOfTwoNumbers(
		totalInc,
		totalExp * -1,
		true
	);

	return (
		<Paper className={classes.root}>
			<div className={classes.report}>
				<Typography variant="h3">{parseInt(total / totalInc * 100)}%</Typography>
				<Typography align="center" variant="body2">
					{totalExp * -1 <= totalInc ? `Saved of` : `Spent more than`} your
					income
				</Typography>
			</div>

			<List className={classes.list}>
				<ListItem>
					<ListItemText className={classes.title} primary={'Income'} />
					<div className={classes.barContainer}>
						<div
							className={clsx(classes.bar, classes.incBar)}
							style={{ width: `${incBarWidth}%` }}
						/>
					</div>
					<ListItemText
						className={classes.amount}
						primary={formatAmount(totalInc)}
						primaryTypographyProps={{ color: 'primary', variant: 'h6' }}
					/>
				</ListItem>
				<ListItem>
					<ListItemText className={classes.title} primary={'Expenses'} />
					<div className={classes.barContainer}>
						<div
							className={clsx(classes.expBar, classes.bar)}
							style={{ width: `${expBarWidth}%` }}
						/>
					</div>
					<ListItemText
						className={classes.amount}
						primary={formatAmount(totalExp)}
						primaryTypographyProps={{ color: 'secondary', variant: 'h6' }}
					/>
				</ListItem>
				<Divider variant="middle" />
				<ListItem>
					<ListItemText
						className={classes.title}
						primary={`${total < 0 ? 'Spent' : 'Saved'} this month`}
					/>
					<ListItemText
						className={clsx(classes.amount, classes.amountTotal)}
						primary={formatAmount(total, false)}
						primaryTypographyProps={{ color: colorTotal, variant: 'h6' }}
					/>
				</ListItem>
			</List>
		</Paper>
	);
}

export default Summary;
