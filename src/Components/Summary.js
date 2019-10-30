import React, { useContext } from 'react';
import { TransactionsContext } from '../context/transactions.context';
import { getPercentageOfTwoNumbers, calcExpInc, formatAmount } from '../helpers';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles(({ spacing, palette, breakpoints }) => ({
	root: {
		marginBottom: spacing(5),
		overflow: 'hidden',
		[breakpoints.up('sm')]: {
			display: 'flex'
		}
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
		flex: 'none',
		marginLeft: spacing(2),
		'& span': {
			fontWeight: 500
		}
	},
	amountTitle: {
		width: 'initial'
	},
	barContainer: {
		flex: '1 1 auto',
		marginRight: 'auto'
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
		flex: 'none',
		display: 'flex',
		marginRight: spacing(2),
		marginLeft: spacing(2),
		'& span': {
			fontSize: '1rem'
		}
	},
	amountTotal: {
		marginTop: 0,
		marginLeft: 'auto',
		'& span': {
			fontSize: '1.25rem'
		}
	}
}));

function Summary() {
	const classes = useStyles();
	const { transactions } = useContext(TransactionsContext);
	const matches = useMediaQuery('(max-width:600px)');

	const renderTotal = () => {
		const percentage = totalInc && totalExp ? ` (${parseInt(total / totalInc * 100)}%)` : '';
		return matches ? formatAmount(total, false) + percentage : formatAmount(total, false);
	};

	const [ totalExp, totalInc ] = calcExpInc(transactions);
	const total = totalInc + totalExp;
	const colorTotal = total < 0 ? 'secondary' : 'primary';
	const [ incBarWidth, expBarWidth ] = getPercentageOfTwoNumbers(totalInc, totalExp * -1, true);

	return totalInc !== 0 || totalExp !== 0 ? (
		<Paper className={classes.root}>
			<Hidden xsDown>
				<div className={classes.report}>
					<Typography variant="h3">
						{totalInc !== 0 ? `${parseInt(total / totalInc * 100)}%` : '0%'}
					</Typography>
					<Typography align="center" variant="body2">
						{totalExp * -1 <= totalInc || totalInc === 0 ? (
							`Saved of `
						) : (
							`Spent more than `
						)}
						your income
					</Typography>
				</div>
			</Hidden>

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
						className={clsx(classes.amountTitle, classes.title)}
						primary={`${total < 0 ? 'Spent' : 'Saved'} this month`}
					/>
					<ListItemText
						className={clsx(classes.amount, classes.amountTotal)}
						primary={renderTotal()}
						primaryTypographyProps={{ color: colorTotal, variant: 'h6' }}
					/>
				</ListItem>
			</List>
		</Paper>
	) : null;
}

export default Summary;
