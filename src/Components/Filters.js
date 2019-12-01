import React, { memo, useContext, useState } from 'react';
import { TransactionFiltersContext } from '../context/transactions.context';
import { Toolbar } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Popover from '@material-ui/core/Popover';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Tooltip from '@material-ui/core/Tooltip';
import SelectedMonth from './SelectedMonth';

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
	root: {
		padding: spacing(1, 3, 1, 2),
		justifyContent: 'space-evenly',
		alignItems: 'center',
		[breakpoints.up('md')]: {
			padding: spacing(1, 7, 1, 6)
		}
	},
	sortBy: {
		margin: spacing(0.9, 2, 0.5),
		marginLeft: 'auto',
		minWidth: spacing(13.5),
		[breakpoints.up('sm')]: {
			minWidth: spacing(15)
		},
		'& div div': {
			paddingTop: spacing(2),
			paddingBottom: spacing(2),
			color: 'rgba(0,0,0,.75)'
		}
	},
	reverseButton: {
		'& button': {
			borderColor: 'rgba(0,0,0,.25)',
			width: spacing(7),
			height: spacing(6.375),
			margin: spacing(0.4, 0, 0),
			[breakpoints.up('sm')]: {
				margin: spacing(0.4, 1, 0)
			}
		}
	},
	dateContainer: {
		display: 'flex'
	},
	datePicker: {
		justifySelf: 'flex-start',
		minWidth: spacing(17.5),
		maxWidth: spacing(19),
		'& input': {
			paddingTop: spacing(2),
			paddingBottom: spacing(2),
			cursor: 'pointer'
		}
	},
	moreButton: {
		marginLeft: spacing(1)
	},
	morePopover: {
		padding: spacing(1.5, 2.5),
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
}));

function Filters() {
	const classes = useStyles();
	const [ anchorEl, setAnchorEl ] = useState(null);
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	const matches = useMediaQuery('(min-width:500px)');

	const { isReversed, toggleIsReversed, sortBy, setSortBy } = useContext(
		TransactionFiltersContext
	);

	return (
		<React.Fragment>
			<Toolbar className={classes.root}>
				<SelectedMonth />
				{matches ? (
					<React.Fragment>
						<TextField
							select
							variant="outlined"
							label="Sorting by"
							value={sortBy}
							className={classes.sortBy}
							onChange={setSortBy}>
							<MenuItem value="dateTimestamp">Date</MenuItem>
							<MenuItem value="amount">Amount</MenuItem>
							<MenuItem value="category">Category</MenuItem>
						</TextField>
						<Tooltip title="Reverse Order" placement="top" arrow>
							<ToggleButtonGroup
								className={classes.reverseButton}
								value={isReversed && 'reversed'}
								onChange={() => toggleIsReversed()}
								arial-label="text formatting">
								<ToggleButton value="reversed" aria-label="bold">
									<SwapVertIcon />
								</ToggleButton>
							</ToggleButtonGroup>
						</Tooltip>
					</React.Fragment>
				) : (
					<React.Fragment>
						<IconButton
							onClick={e => setAnchorEl(e.currentTarget)}
							className={classes.moreButton}
							aria-label="more options">
							<MoreHorizIcon fontSize="large" />
						</IconButton>
						<Popover
							id={id}
							open={open}
							anchorEl={anchorEl}
							onClose={() => setAnchorEl(null)}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'center'
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'center'
							}}>
							<div className={classes.morePopover}>
								<TextField
									select
									variant="outlined"
									label="Sorting by"
									value={sortBy}
									className={classes.sortBy}
									onChange={setSortBy}>
									<MenuItem value="dateTimestamp">Date</MenuItem>
									<MenuItem value="amount">Amount</MenuItem>
									<MenuItem value="category">Category</MenuItem>
								</TextField>
								<ToggleButtonGroup
									className={classes.reverseButton}
									value={isReversed && 'reversed'}
									onChange={() => toggleIsReversed()}
									arial-label="text formatting">
									<ToggleButton value="reversed" aria-label="bold">
										<SwapVertIcon />
									</ToggleButton>
								</ToggleButtonGroup>
							</div>
						</Popover>
					</React.Fragment>
				)}
			</Toolbar>
			<Divider />
		</React.Fragment>
	);
}

export default memo(Filters);
