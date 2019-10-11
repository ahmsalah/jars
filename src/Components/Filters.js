import React from 'react';
import { Toolbar } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TextField from '@material-ui/core/TextField';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

const useStyles = makeStyles(({ spacing }) => ({
	root: {
		padding: spacing(1, 6),
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	sortBy: {
		margin: spacing(0.9, 2, 0.5),
		marginLeft: 'auto',
		minWidth: 120,
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
			marginTop: spacing(0.4)
		}
	},
	datePicker: {
		justifySelf: 'flex-start',
		minWidth: spacing(17.5),
		maxWidth: spacing(19),
		'& div div': {
			// color: 'rgba(0,0,0,.75)'
		},
		'& input': {
			// textAlign: 'center',
			paddingTop: spacing(2),
			paddingBottom: spacing(2),
			cursor: 'pointer'
		}
	}
}));

function Filters({
	isReversed,
	toggleListReverse,
	handleChange,
	sortBy,
	selectedDate,
	handleDateChange
}) {
	const classes = useStyles();

	const nextPreviousMonth = acc => {
		const newDate = selectedDate.setMonth(selectedDate.getMonth() + acc);
		handleDateChange(new Date(newDate));
	};

	const reversed = isReversed ? 'reversed' : '';
	return (
		<React.Fragment>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<Toolbar className={classes.root}>
					<IconButton onClick={() => nextPreviousMonth(-1)}>
						<ArrowLeftIcon />
					</IconButton>

					<DatePicker
						className={classes.datePicker}
						showTodayButton
						variant="dialog"
						inputVariant="outlined"
						openTo="month"
						views={[ 'year', 'month' ]}
						// label="Showing transactions for"
						// helperText="Start from year selection"
						value={selectedDate}
						onChange={handleDateChange}
						autoOk
					/>
					<IconButton onClick={() => nextPreviousMonth(+1)}>
						<ArrowRightIcon />
					</IconButton>

					<TextField
						select
						variant="outlined"
						label="Sorting by"
						value={sortBy}
						className={classes.sortBy}
						onChange={handleChange}>
						<MenuItem value="date">Date</MenuItem>
						<MenuItem value="amount">Amount</MenuItem>
						<MenuItem value="category">Category</MenuItem>
					</TextField>
					<ToggleButtonGroup
						className={classes.reverseButton}
						value={reversed}
						onChange={toggleListReverse}
						arial-label="text formatting">
						<ToggleButton value="reversed" aria-label="bold">
							<SwapVertIcon />
						</ToggleButton>
					</ToggleButtonGroup>
				</Toolbar>
				<Divider />
			</MuiPickersUtilsProvider>
		</React.Fragment>
	);
}

export default Filters;
