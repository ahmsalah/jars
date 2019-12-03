import React, { memo, useContext } from 'react';
import { TransactionsContext } from '../context/transactions.context';
import { getPercentageOfTwoNumbers, calcExpInc, formatAmount } from '../helpers';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './styles/summary.styles';
import Collapse from '@material-ui/core/Collapse';

function Summary() {
	const classes = useStyles();
	const transactions = useContext(TransactionsContext);
	const matches = useMediaQuery('(max-width:600px)');

	const renderTotal = () => {
		const percentage = totalInc && totalExp ? ` (${parseInt(total / totalInc * 100)}%)` : '';
		return matches
			? formatAmount(total, '£', 2, false) + percentage
			: formatAmount(total, '£', 2, false);
	};

	const [ totalExp, totalInc ] = calcExpInc(transactions);
	const total = totalInc + totalExp;
	const colorTotal = total < 0 ? 'secondary' : 'primary';
	const [ incBarWidth, expBarWidth ] = getPercentageOfTwoNumbers(totalInc, totalExp * -1, true);

	return (
		<Collapse in={totalInc !== 0 || totalExp !== 0} timeout={700}>
			<Paper className={classes.root}>
				{!matches && (
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
				)}

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
		</Collapse>
	);
}

export default memo(Summary);
