import React, { memo, useContext, useState } from 'react';
import { DispatchContext } from '../context/transactions.context';
import { formatDate, formatAmount } from '../helpers';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles/transactionItem.styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useSnackbar } from 'notistack';
import Grow from '@material-ui/core/Grow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popover from '@material-ui/core/Popover';
import EditIcon from '@material-ui/icons/Edit';
import TransactionForm from './TransactionForm';
import Tooltip from '@material-ui/core/Tooltip';
import { CurrencyContext } from '../context/currency.context';

function TransactionItem({
	transaction: { id, category, description, date, amount, type },
	carousel
}) {
	const classes = useStyles();
	const dispatch = useContext(DispatchContext);
	const currency = useContext(CurrencyContext);
	const up600 = useMediaQuery('(min-width:600px)');
	const { enqueueSnackbar } = useSnackbar();
	const [ editDialogOpen, setEditDialogOpen ] = useState(false);

	const theme = createMuiTheme({
		typography: {
			fontSize: up600 ? 14 : 12
		},
		palette: {
			primary: { main: '#1aa333' },
			secondary: { main: '#de474e' }
		}
	});

	const [ anchorEl, setAnchorEl ] = useState(null);
	const popoverOpen = Boolean(anchorEl);
	const popoverId = popoverOpen ? 'simple-popover' : undefined;

	const handleDeleteItem = () => {
		setAnchorEl(null);
		dispatch({ type: 'REMOVE_TRANSACTION', id });
		enqueueSnackbar('Transaction Deleted');
	};

	let color = type === 'exp' ? 'secondary' : 'primary';

	return (
		<React.Fragment>
			<TransactionForm
				dialogOpen={editDialogOpen}
				setDialogOpen={setEditDialogOpen}
				edit_id={id}
				edit_category={category}
				edit_description={description}
				edit_amount={type === 'exp' ? amount * -1 : amount}
				edit_date={date}
				edit_type={type}
			/>
			<Grow in={!!id || !!carousel} timeout={carousel ? 0 : 800}>
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
							{up600 &&
							!carousel && (
								<ListItemText
									className={classes.date}
									primary={formatDate(date, 'includeYear')}
									primaryTypographyProps={{ variant: 'body2' }}
								/>
							)}
							<ListItemText
								className={classes.amount}
								primary={formatAmount(amount, currency)}
								secondary={(!up600 || !!carousel) && formatDate(date)}
								primaryTypographyProps={{ color: color }}
							/>
							{!carousel && (
								<ListItemSecondaryAction>
									<Tooltip
										title="Edit or delete transaction"
										placement="top"
										arrow>
										<IconButton
											edge="end"
											aria-label="more"
											onClick={e => setAnchorEl(e.currentTarget)}
											className={classes.moreButton}>
											<MoreVertIcon />
										</IconButton>
									</Tooltip>
									<Popover
										id={popoverId}
										open={popoverOpen}
										anchorEl={anchorEl}
										onClose={() => setAnchorEl(null)}
										anchorOrigin={{
											vertical: 'center',
											horizontal: 'center'
										}}
										transformOrigin={{
											vertical: 'center',
											horizontal: 'center'
										}}>
										<div className={classes.popoverButtonsContainer}>
											<div className={classes.popoverButton}>
												<Tooltip
													title="Edit Transaction"
													placement="top"
													arrow>
													<IconButton
														aria-label="Edit"
														onClick={() => {
															setEditDialogOpen(true);
															setAnchorEl(null);
														}}>
														<EditIcon />
													</IconButton>
												</Tooltip>
											</div>
											<div className={classes.popoverButton}>
												<Tooltip
													title="Delete Transaction"
													placement="top"
													arrow>
													<IconButton
														aria-label="Delete"
														onClick={handleDeleteItem}>
														<DeleteIcon />
													</IconButton>
												</Tooltip>
											</div>
										</div>
									</Popover>
								</ListItemSecondaryAction>
							)}
						</ListItem>
					</ThemeProvider>
				</div>
			</Grow>
		</React.Fragment>
	);
}

export default memo(TransactionItem);
