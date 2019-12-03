import React, { useContext } from 'react';
import { TransactionsContext } from '../context/transactions.context';
import TransactionItem from './TransactionItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import { useTransition, animated } from 'react-spring';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles(({ palette, spacing, breakpoints }) => ({
	root: {
		padding: 0
	},
	noTransactions: {
		padding: spacing(3, 2),
		backgroundColor: palette.grey.light[2],
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		'& img': {
			filter: 'grayscale(50%)',
			opacity: 0.9,
			width: spacing(25),
			marginTop: spacing(1)
		},
		'& > h4': {
			fontSize: '1.5rem',
			color: 'rgba(0,0,0,0.5)',
			textAlign: 'center',
			marginBottom: spacing(1),
			[breakpoints.up('sm')]: {
				fontSize: '2.125rem'
			}
		}
	}
}));

function TransactionsList() {
	const classes = useStyles();
	const transactions = useContext(TransactionsContext);

	// const transition = useTransition(transactions, tr => tr.id, {
	// 	from: { opacity: 0, marginLeft: -100, marginRight: 100 },
	// 	enter: { opacity: 1, marginLeft: 0, marginRight: 0 },
	// 	leave: { opacity: 0, marginLeft: -100, marginRight: 100 }
	// });

	return (
		<React.Fragment>
			<Collapse in={!!transactions.length}>
				<List component="div" className={classes.root}>
					{/* {transition.map(({ item, key, props }, i) => (
				<animated.div key={key} style={props}>
					<TransactionItem transaction={item} />
					{i < transactions.length - 1 && <Divider />}
				</animated.div>
			))} */}

					{transactions.map((tr, i) => (
						<React.Fragment key={tr.id}>
							<TransactionItem transaction={tr} />
							{i < transactions.length - 1 && <Divider />}
						</React.Fragment>
					))}
				</List>
			</Collapse>
			<Collapse timeout={500} in={!transactions.length}>
				<div className={classes.noTransactions}>
					<Typography variant="h4">No transactions here</Typography>
					<Typography variant="h4">Add your first one</Typography>
					<img src={require(`../assets/sad-jar.png`)} alt="No Transactions" />
				</div>
			</Collapse>
		</React.Fragment>
	);
}

export default TransactionsList;
