import React, { memo, useContext } from 'react';
import { DispatchContext } from '../context/transactions.context';
import { formatDate, formatAmount } from '../helpers';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import { SnackbarActionContext } from '../context/snackbar.context';

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
	root: {
		'&:hover button': {
			opacity: '1'
		},
		backgroundColor: '#fff'
	},
	iconContainer: {
		width: '12%',
		marginRight: spacing(1)
	},
	icon: {
		width: '55px',
		height: '55px'
	},
	title: {
		width: '39%',
		'& span': {}
	},
	date: {
		width: '17%',
		'& span': {
			fontWeight: 500,
			color: 'rgba(0,0,0,.5)'
		}
	},
	amount: {
		width: '32%',
		display: 'flex',
		flexDirection: 'Column',
		'& span, p': {
			marginLeft: 'auto',
			fontSize: '1rem',
			fontWeight: 500,
			marginRight: spacing(2.5)
		}
	},
	deleteButton: {
		marginRight: '-5px',
		[breakpoints.up('md')]: {
			opacity: '0',
			transition: 'opacity .3s'
		}
	}
}));

function TransactionItem({ id, category, icon, description, date, amount, type }) {
	const classes = useStyles();
	const dispatch = useContext(DispatchContext);
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('sm'));
	const { snackbarDeleteTransaction } = useContext(SnackbarActionContext);

	const handleDeleteItem = () => {
		dispatch({ type: 'REMOVE_TRANSACTION', id });
		snackbarDeleteTransaction();
	};

	let color = type === 'exp' ? 'secondary' : 'primary';
	return (
		<div className={classes.root}>
			<ListItem component="div">
				<ListItemAvatar className={classes.iconContainer}>
					<Avatar
						className={classes.icon}
						src={require(`../icons/${icon}.png`)}
						alt={category}
					/>
				</ListItemAvatar>
				<ListItemText
					className={classes.title}
					primary={category}
					secondary={description}
				/>
				<Hidden xsDown>
					<ListItemText
						className={classes.date}
						primary={formatDate(date, 'includeYear')}
						primaryTypographyProps={{ variant: 'body2' }}
					/>
				</Hidden>
				<ListItemText
					className={classes.amount}
					primary={formatAmount(amount)}
					secondary={!matches && formatDate(date)}
					primaryTypographyProps={{ color: color }}
				/>
				<ListItemSecondaryAction>
					<IconButton
						edge="end"
						aria-label="Delete"
						onClick={handleDeleteItem}
						className={classes.deleteButton}>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		</div>
	);
}

export default memo(TransactionItem);
