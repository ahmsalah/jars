import React from 'react';
import { formatDate, formatAmount } from '../helpers';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing }) => ({
	root: {
		'&:hover button': {
			opacity: '1'
		},
		backgroundColor: '#fff'
	},
	iconContainer: {
		width: '12%'
	},
	icon: {
		width: '55px',
		height: '55px'
	},
	title: {
		width: '40%',
		'& span': {}
	},
	date: {
		width: '15%',
		'& span': {
			fontWeight: 500,
			color: 'rgba(0,0,0,.5)'
		}
	},
	amount: {
		width: '33%',
		display: 'flex',
		'& span': {
			fontSize: '1rem',
			fontWeight: 500,
			marginLeft: 'auto',
			marginRight: spacing(2.5)
		}
	},
	deleteButton: {
		marginRight: '-5px',
		opacity: '0',
		transition: 'opacity .3s'
	}
}));

function TransactionItem({
	id,
	category,
	icon,
	description,
	date,
	amount,
	type,
	removeTransaction
}) {
	const classes = useStyles();
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
				<ListItemText
					className={classes.date}
					primary={formatDate(date)}
					primaryTypographyProps={{ variant: 'body2' }}
				/>
				<ListItemText
					className={classes.amount}
					primary={formatAmount(amount)}
					primaryTypographyProps={{ color: color }}
				/>
				<ListItemSecondaryAction>
					<IconButton
						edge="end"
						aria-label="Delete"
						onClick={() => removeTransaction(id)}
						className={classes.deleteButton}>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		</div>
	);
}

export default TransactionItem;
