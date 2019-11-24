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
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useSnackbar } from 'notistack';
import Grow from '@material-ui/core/Grow';

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
	root: {
		'&:hover button': {
			opacity: '1'
		},
		// '& li div:last-child': {
		// 	right: spacing(1)
		// },
		backgroundColor: '#fff'
	},
	iconContainer: {
		width: '10%',
		[breakpoints.up('sm')]: {
			marginRight: spacing(1)
		}
	},
	icon: {
		width: 48,
		height: 48,
		[breakpoints.up('sm')]: {
			width: 55,
			height: 55
		}
	},
	title: {
		width: '39%'
	},
	date: {
		width: '17%',
		'& span': {
			fontWeight: 500,
			color: 'rgba(0,0,0,.5)'
		}
	},
	amount: {
		[breakpoints.up('sm')]: {
			width: '32%'
		},
		display: 'flex',
		flexDirection: 'Column',
		'& span, p': {
			marginLeft: 'auto',
			fontWeight: 500,
			[breakpoints.up('sm')]: {
				marginRight: spacing(2.5)
			}
		}
	},
	deleteButton: {
		[breakpoints.up('md')]: {
			marginRight: '-5px',
			opacity: '0',
			transition: 'opacity .3s'
		}
	}
}));

function TransactionItem({ transaction: { id, category, description, date, amount, type } }) {
	const classes = useStyles();
	const dispatch = useContext(DispatchContext);
	const themeBP = useTheme();
	const matches = useMediaQuery(themeBP.breakpoints.up('sm'));
	const { enqueueSnackbar } = useSnackbar();

	const theme = createMuiTheme({
		typography: {
			fontSize: matches ? 14 : 12
		},
		palette: {
			primary: { main: '#1aa333' },
			secondary: { main: '#de474e' }
		}
	});

	const handleDeleteItem = () => {
		dispatch({ type: 'REMOVE_TRANSACTION', id });
		enqueueSnackbar('Transaction Deleted');
	};

	let color = type === 'exp' ? 'secondary' : 'primary';

	return (
		<Grow in={!!id} timeout={800}>
			<div className={classes.root}>
				<ThemeProvider theme={theme}>
					<ListItem component="div">
						<ListItemAvatar className={classes.iconContainer}>
							<Avatar
								className={classes.icon}
								src={require(`../assets/icons/${category.icon}.png`)}
								alt={category.name}
							/>
						</ListItemAvatar>
						<ListItemText
							className={classes.title}
							primary={category.name}
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
				</ThemeProvider>
			</div>
		</Grow>
	);
}

export default memo(TransactionItem);
